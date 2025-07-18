import React from 'react';
import { X, Plus } from 'lucide-react'; // Import the Plus icon
import { EMOJI_CATEGORIES } from '../constants/appConstants';
import { themes } from '../constants/themes';

const EmojiPicker = React.memo(({ onSelect, onClose }) => (
    <div className="absolute top-full mt-2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg z-20 p-2 max-h-64 overflow-y-auto">
        <div className="flex justify-between items-center mb-2 sticky top-0 bg-white py-1">
            <h4 className="text-sm font-semibold">Select Avatar</h4>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={16}/></button>
        </div>
        {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
            <div key={category}>
                <h5 className="text-xs font-bold text-gray-500 uppercase mt-2 mb-1">{category}</h5>
                <div className="grid grid-cols-8 gap-1">{emojis.map(emoji => (<button key={emoji} onClick={() => onSelect(emoji)} className="text-2xl rounded-md hover:bg-gray-200 p-1 transition-colors">{emoji}</button>))}</div>
            </div>
        ))}
    </div>
));

const SettingsModalComponent = ({ isOpen, onClose, onSavePlayers, playerConfig, onSaveTheme, currentTheme, theme }) => {
    const [config, setConfig] = React.useState(playerConfig);
    const [editingAvatarFor, setEditingAvatarFor] = React.useState(null);

    React.useEffect(() => { setConfig(playerConfig); }, [playerConfig, isOpen]);
    if (!isOpen) return null;

    const handleNameChange = (playerId, newName) => setConfig(prev => ({ ...prev, [playerId]: { ...prev[playerId], name: newName } }));
    const handleAvatarSelect = (playerId, newAvatar) => {
        setConfig(prev => ({ ...prev, [playerId]: { ...prev[playerId], avatar: newAvatar } }));
        setEditingAvatarFor(null);
    };

    const handlePlayerDelete = (playerId) => {
        setConfig(prev => {
            const newConfig = { ...prev };
            delete newConfig[playerId];
            return newConfig;
        });
    };

    // New function to handle adding a player
    const handlePlayerAdd = () => {
        const newPlayerId = `player_${Date.now()}`;
        const newPlayer = {
            name: 'New Player',
            avatar: '🏒', // Default avatar
            color: 'bg-gray-200',
            textColor: 'text-gray-800',
            borderColor: 'border-gray-400'
        };
        setConfig(prev => ({ ...prev, [newPlayerId]: newPlayer }));
    };

    const handleSave = () => { onSavePlayers(config); onClose(); };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className={`rounded-lg shadow-2xl w-full max-w-md ${theme.calendarBg} flex flex-col max-h-[90vh]`}>
                <div className="flex-shrink-0 p-6 pb-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className={`text-2xl font-bold ${theme.modalTextColor}`}>Settings</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto px-6">
                    <h3 className={`text-lg font-bold mb-2 ${theme.modalTextColor}`}>Manage Players</h3>
                    <div className="space-y-4 mb-6">
                        {Object.keys(config).map(playerId => (
                            <div key={playerId} className="flex items-center gap-3 p-3 bg-black/10 rounded-lg relative">
                                <button onClick={() => setEditingAvatarFor(editingAvatarFor === playerId ? null : playerId)} className="text-3xl w-16 h-12 flex-shrink-0 flex items-center justify-center bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100">{config[playerId].avatar}</button>
                                {editingAvatarFor === playerId && <EmojiPicker onSelect={(emoji) => handleAvatarSelect(playerId, emoji)} onClose={() => setEditingAvatarFor(null)} />}
                                <input type="text" value={config[playerId].name} onChange={e => handleNameChange(playerId, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                                <button onClick={() => handlePlayerDelete(playerId)} className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>
                        ))}
                        {/* "Add New Player" button added here */}
                        <button
                            onClick={handlePlayerAdd}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 mt-2 font-semibold rounded-lg shadow-sm transition-colors ${theme.secondaryButton}`}
                        >
                            <Plus size={20} />
                            Add New Player
                        </button>
                    </div>

                    <h3 className={`text-lg font-bold mb-3 ${theme.modalTextColor}`}>Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {Object.entries(themes).map(([key, themeOption]) => (
                            <button key={key} onClick={() => onSaveTheme(key)} className={`p-3 rounded-lg border-2 ${currentTheme === key ? 'border-indigo-500' : 'border-transparent'}`}>
                                <div className={`w-full h-8 rounded-md mb-2 ${themeOption.primaryButton}`}></div>
                                <div className="flex gap-1">
                                    <div className={`w-1/2 h-4 rounded-sm ${themeOption.events.Tournament.color}`}></div>
                                    <div className={`w-1/2 h-4 rounded-sm ${themeOption.events['League Game'].color}`}></div>
                                </div>
                                <p className={`text-sm font-semibold mt-2 ${theme.modalTextColor}`}>{themeOption.name}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-shrink-0 p-6 pt-6">
                    <div className="flex justify-end">
                        <button onClick={handleSave} className={`px-6 py-2 font-semibold rounded-md shadow-sm ${theme.primaryButton}`}>Save & Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export const SettingsModal = React.memo(SettingsModalComponent);
