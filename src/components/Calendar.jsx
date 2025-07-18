import React from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { MONTH_NAMES, WEEK_DAYS, getSeason, dateToISO } from '../constants/appConstants';

const CalendarDay = React.memo(({ dayDate, type, getEventsForDate, playerConfig, theme, ...props }) => {
    const dayEvents = getEventsForDate(dayDate);
    const isToday = dateToISO(new Date()) === dateToISO(dayDate);

    return (
        <div className={`border rounded-lg p-1.5 min-h-[120px] flex flex-col relative transition-colors ${theme.cellHoverBg} ${type === 'current' ? theme.dayCell : theme.otherMonthCell}`} onClick={() => type === 'current' && props.onDateClick(dayDate)}>
            <span className={`font-bold w-8 h-8 flex items-center justify-center mb-1 ${isToday ? `bg-indigo-600 text-white rounded-full` : ''}`}>
                {dayDate.getDate()}
            </span>
            <div className="flex-grow space-y-1 overflow-y-auto">
                {dayEvents.map(event => {
                    const eventStartDate = event.startDate || event.date;
                    const isMultiDay = event.endDate && event.endDate > eventStartDate;
                    const dateStr = dateToISO(dayDate);
                    const isStart = isMultiDay && dateStr === eventStartDate;
                    const isEnd = isMultiDay && dateStr === event.endDate;
                    const isMiddle = isMultiDay && !isStart && !isEnd;
                    let borderRadiusClass = 'rounded-md';
                    if (isStart) borderRadiusClass = 'rounded-l-md rounded-r-none';
                    if (isEnd) borderRadiusClass = 'rounded-r-md rounded-l-none';
                    if (isMiddle) borderRadiusClass = 'rounded-none';

                    const eventTheme = theme.events[event.eventType] || theme.events['Other'];

                    return (
                        <div key={event.id} className={`text-xs cursor-pointer relative group overflow-hidden shadow-sm ${borderRadiusClass}`} onClick={(e) => { e.stopPropagation(); props.onEventClick(event); }}>
                            <div className={`p-1 ${eventTheme.color} ${eventTheme.textColor}`}>
                                <div className="flex items-center justify-between"><p className="font-semibold truncate flex-1">{event.title}</p><div className="flex -space-x-2">{event.players.map(playerId => playerConfig[playerId] ? <span key={playerId} className="text-lg">{playerConfig[playerId].avatar}</span> : null)}</div></div>
                                <p className="text-xs">{event.time}</p>
                            </div>
                            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={(e) => { e.stopPropagation(); props.onEventDelete(event.id); }} className="p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600"><X size={12}/></button></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

const CalendarComponent = ({ view, currentDate, setCurrentDate, events, playerConfig, theme, ...props }) => {
    const changeDate = (amount) => {
        const newDate = new Date(currentDate);
        if (view === 'week') {
            newDate.setDate(newDate.getDate() + (amount * 7));
        } else {
            const monthIncrement = view === 'month' ? 1 : view === '2-month' ? 2 : 3;
            newDate.setMonth(newDate.getMonth() + (amount * monthIncrement));
        }
        setCurrentDate(newDate);
    };

    const getEventsForDate = (checkDate) => {
        const dateStr = dateToISO(checkDate);
        return events.filter(event => {
            const eventStartDate = event.startDate || event.date;
            if (event.endDate && event.endDate >= eventStartDate) return dateStr >= eventStartDate && dateStr <= event.endDate;
            if (!event.endDate || event.endDate === eventStartDate) return eventStartDate === dateStr;
            if (event.recurring) {
                const recurrenceStartDate = new Date(eventStartDate);
                const recurrenceEndDate = event.recurring.endDate ? new Date(event.recurring.endDate) : null;
                if (checkDate < recurrenceStartDate || (recurrenceEndDate && checkDate > recurrenceEndDate)) return false;
                if (event.recurring.type === 'weekly' && recurrenceStartDate.getDay() === checkDate.getDay()) return true;
                if (event.recurring.type === 'bi-weekly' && recurrenceStartDate.getDay() === checkDate.getDay()) {
                    const weekDiff = Math.floor((checkDate - recurrenceStartDate) / (1000 * 3600 * 24 * 7));
                    return weekDiff % 2 === 0;
                }
            }
            return false;
        });
    };

    const getCalendarGrid = (dateForMonth) => {
        const firstDay = new Date(dateForMonth.getFullYear(), dateForMonth.getMonth(), 1).getDay();
        const daysInMonth = new Date(dateForMonth.getFullYear(), dateForMonth.getMonth() + 1, 0).getDate();
        const prevMonth = new Date(dateForMonth.getFullYear(), dateForMonth.getMonth(), 0);
        const grid = [];
        for (let i = 0; i < firstDay; i++) {
            grid.push({ date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonth.getDate() - firstDay + i + 1), type: 'prev' });
        }
        for (let i = 1; i <= daysInMonth; i++) {
            grid.push({ date: new Date(dateForMonth.getFullYear(), dateForMonth.getMonth(), i), type: 'current' });
        }
        const lastDay = new Date(dateForMonth.getFullYear(), dateForMonth.getMonth(), daysInMonth).getDay();
        for (let i = 1; i <= 6 - lastDay; i++) {
            grid.push({ date: new Date(dateForMonth.getFullYear(), dateForMonth.getMonth() + 1, i), type: 'next' });
        }
        return grid;
    };

    const renderMonths = () => {
        const numMonths = view === 'month' ? 1 : view === '2-month' ? 2 : 3;
        return Array.from({ length: numMonths }).map((_, i) => {
            const dateForMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
            return (
                <div key={i} className="flex-1">
                    <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-600 text-sm mb-2">{WEEK_DAYS.map(day => <div key={day}>{day}</div>)}</div>
                    <div className="grid grid-cols-7 gap-1">
                        {getCalendarGrid(dateForMonth).map(({ date, type }, index) =>
                            <CalendarDay key={index} dayDate={date} type={type} getEventsForDate={getEventsForDate} playerConfig={playerConfig} theme={theme} {...props} />
                        )}
                    </div>
                </div>
            );
        });
    };

    const renderWeekView = () => {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const weekDays = Array.from({length: 7}).map((_, i) => {
            const day = new Date(startOfWeek);
            day.setDate(day.getDate() + i);
            return day;
        });
        return (
            <div>
                <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-600 text-sm mb-2">
                    {weekDays.map(d => <div key={d.toString()}>{WEEK_DAYS[d.getDay()]} {d.getDate()}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {weekDays.map(dayDate => <CalendarDay key={dayDate.toString()} dayDate={dayDate} type="current" getEventsForDate={getEventsForDate} playerConfig={playerConfig} theme={theme} {...props} />)}
                </div>
            </div>
        );
    };

    // This function now correctly renders the main title for all views.
    const renderTitle = () => {
        let title;
        let season;

        if (view.includes('month')) {
            const dateForMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            season = getSeason(dateForMonth);
            title = `${MONTH_NAMES[dateForMonth.getMonth()]} ${dateForMonth.getFullYear()}`;
        } else { // 'week' view
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(endOfWeek.getDate() + 6);

            if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
                title = `${MONTH_NAMES[startOfWeek.getMonth()]} ${startOfWeek.getDate()} - ${endOfWeek.getDate()}`;
            } else {
                title = `${MONTH_NAMES[startOfWeek.getMonth()]} ${startOfWeek.getDate()} - ${MONTH_NAMES[endOfWeek.getMonth()]} ${endOfWeek.getDate()}`;
            }
        }

        return (
            <div className="flex items-center justify-center gap-4">
                <h2 className={`text-3xl font-bold ${theme.modalTextColor}`}>{title}</h2>
                {season && season.name && <span className={`px-3 py-1 text-xs font-semibold rounded-full ${season.color} text-gray-700`}>{season.name}</span>}
            </div>
        );
    };

    return (
        <div className={`rounded-2xl shadow-lg p-4 md:p-6 ${theme.calendarBg}`}>
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => changeDate(-1)} className={`p-2 rounded-full ${theme.secondaryButton}`}><ChevronLeft /></button>
                {/* The new title rendering function is called here */}
                {renderTitle()}
                <button onClick={() => changeDate(1)} className={`p-2 rounded-full ${theme.secondaryButton}`}><ChevronRight /></button>
            </div>
            {view.includes('month') ? (
                <div className="flex flex-col md:flex-row gap-8">{renderMonths()}</div>
            ) : (
                renderWeekView()
            )}
        </div>
    );
};

export const Calendar = React.memo(CalendarComponent);
