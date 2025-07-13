import React from 'react';
import { X } from 'lucide-react';
import { dateToISO } from '../constants/appConstants';

// Note: This component now relies on a ThemeContext to get theme properties.
// The context will be provided by the main App component.
export const EventModal = ({ isOpen, onClose, onSave, event, selectedDate, playerConfig, theme }) => {
    const [title, setTitle] = React.useState('');
    const [players, setPlayers] = React.useState([]);
    const [eventType, setEventType] = React.useState('Practice');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [time, setTime] = React.useState('12:00');
    const [isRecurring, setIsRecurring] = React.useState(false);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        if (isOpen) {
            if (event) {
                setTitle(event.title); setPlayers(event.players); setEventType(event.eventType);
                setStartDate(event.startDate || event.date); setEndDate(event.endDate || '');
                setTime(event.time || '12:00'); setIsRecurring(!!event.recurring);
            } else {
                setTitle(''); setPlayers([]); setEventType('Practice');
                setStartDate(selectedDate ? dateToISO(selectedDate) : '');
                setEndDate(''); setTime('12:00'); setIsRecurring(false);
            }
            setError('');
        }
    }, [event, selectedDate, isOpen]);

    if (!isOpen) return null;

    const handlePlayerToggle = (playerId) => setPlayers(prev => prev.includes(playerId) ? prev.filter(id => id !== playerId) : [...prev, playerId]);
    const handleSave = () => {
        if (!title || players.length === 0 || !startDate) { setError('Please fill in Title, select at least one Player, and set a Start Date.'); return; }
        if (endDate && endDate < startDate) { setError('End date cannot be before the start date.'); return; }
        const eventData = { id: event?.id || `${Date.now()}-${Math.random()}`, title, players, eventType, startDate, endDate: endDate || '', time, recurring: isRecurring ? { type: 'weekly', endDate: '' } : null };
        onSave(eventData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className={`rounded-lg shadow-2xl p-6 w-full max-w-lg transform transition-all ${theme.calendarBg} ${theme.modalTextColor}`}>
                <div className="flex justify-between items-center mb-4"><h2 className={`text-2xl font-bold ${theme.modalTextColor}`}>{event ? 'Edit Event' : 'Create Event'}</h2><button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button></div>
                {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert"><p>{error}</p></div>}
                <div className="space-y-4">
                    <div><label className="block text-sm font-medium mb-1">Event Title</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800" /></div>
                    <div><label className="block text-sm font-medium mb-2">Players</label><div className="flex flex-wrap gap-2">{Object.entries(playerConfig).map(([id, player]) => (<button key={id} onClick={() => handlePlayerToggle(id)} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${players.includes(id) ? `${player.color} ${player.textColor} ring-2 ring-offset-1 ${player.borderColor}` : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}><span className="text-lg">{player.avatar}</span><span>{player.name}</span></button>))}</div></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium mb-1">Event Type</label><select value={eventType} onChange={e => setEventType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800">{Object.keys(theme.events).map(type => <option key={type} value={type}>{type}</option>)}</select></div>
                        <div><label className="block text-sm font-medium mb-1">Time</label><input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800" /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="block text-sm font-medium mb-1">Start Date</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800" /></div>
                        <div><label className="block text-sm font-medium mb-1">End Date (optional)</label><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800" /></div>
                    </div>
                    <div className="flex items-center"><input type="checkbox" id="recurring" checked={isRecurring} onChange={e => setIsRecurring(e.target.checked)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" /><label htmlFor="recurring" className="ml-2 block text-sm">Recurring Event</label></div>
                </div>
                <div className="mt-6 flex justify-end gap-3"><button onClick={onClose} className={`px-4 py-2 font-semibold rounded-md ${theme.secondaryButton}`}>Cancel</button><button onClick={handleSave} className={`px-4 py-2 font-semibold rounded-md ${theme.primaryButton}`}>Save</button></div>
            </div>
        </div>
    );
};
