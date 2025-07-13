import React from 'react';
import { Tag, User } from 'lucide-react';

export const FilterControls = ({ filters, onFilterChange, view, setView, playerConfig, theme }) => {
    return (
        <div className={`p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center justify-between ${theme.calendarBg}`}>
            <div className="flex flex-wrap items-center gap-4">
                <h3 className={`text-lg font-semibold ${theme.header} mr-4`}>Filters:</h3>
                <div className="flex items-center gap-2"><User className="text-gray-500" /><select value={filters.player} onChange={e => onFilterChange('player', e.target.value)} className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md"><option value="all">All Players</option>{Object.entries(playerConfig).map(([id, player]) => <option key={id} value={id}>{player.name}</option>)}</select></div>
                <div className="flex items-center gap-2"><Tag className="text-gray-500" /><select value={filters.eventType} onChange={e => onFilterChange('eventType', e.target.value)} className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md"><option value="all">All Event Types</option>{Object.keys(theme.events).map(type => <option key={type} value={type}>{type}</option>)}</select></div>
            </div>
            <div className="flex items-center gap-2">{['week', 'month', '2-month', '3-month'].map(v => (<button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 rounded-md text-sm font-semibold ${view === v ? theme.primaryButton : theme.secondaryButton}`}>{v.replace('-', ' ')}</button>))}</div>
        </div>
    );
};
