import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot, setDoc, deleteDoc, query } from 'firebase/firestore';
import { ChevronLeft, ChevronRight, Plus, X, Tag, User, Repeat, Info, Settings, LogIn, LogOut } from 'lucide-react';

// --- Firebase Configuration ---
const firebaseConfig = {
    apiKey: "AIzaSyDSh23j3GUG3B75GBG9JrtHWFFnGQpRc_c",
    authDomain: "rinksync-data.firebaseapp.com",
    projectId: "rinksync-data",
    storageBucket: "rinksync-data.firebasestorage.app",
    messagingSenderId: "314288698038",
    appId: "1:314288698038:web:fd90b95489a4584429ac17",
    measurementId: "G-5V5SLSYYTT"
};

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// --- App ID ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-hockey-app';

// --- Helper Functions & Constants ---
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DEFAULT_PLAYER_CONFIG = {
    'player1': { name: 'Oldest Daughter', avatar: '👧🏻', color: 'bg-pink-200', textColor: 'text-pink-800', borderColor: 'border-pink-400' },
    'player2': { name: 'Younger Daughter', avatar: '👩🏻', color: 'bg-purple-200', textColor: 'text-purple-800', borderColor: 'border-purple-400' },
    'player3': { name: 'Son', avatar: '👦🏻', color: 'bg-blue-200', textColor: 'text-blue-800', borderColor: 'border-blue-400' },
    'player4': { name: 'Hasan', avatar: '👨🏻', color: 'bg-green-200', textColor: 'text-green-800', borderColor: 'border-green-400' },
    'player5': { name: 'Yulduz', avatar: '👩🏻', color: 'bg-yellow-200', textColor: 'text-yellow-800', borderColor: 'border-yellow-400' },
};

const EMOJI_CATEGORIES = {
    'People': ['👧🏻', '👩🏻', '👦🏻', '👨🏻', '🧑🏻', '👱🏻‍♀️', '👱🏻‍♂️', '👩🏻‍🦰', '👨🏻‍🦰', '👩🏻‍🦳', '👨🏻‍🦳', '👶', '👮', '👷', '🕵️', '🧑‍⚕️', '🧑‍🌾', '🧑‍🍳', '🧑‍🎓', '🧑‍🎤', '🧑‍🏫', '🧑‍💻', '🧑‍🚀'],
    'Hockey': ['🏒', '🥅', '⛸️', '🏆', '🥇', '🥈', '🥉', '🏟️', '📣', '🚨', '⏱️'],
    'Hockey Slang': ['🎯', '🚀', '🎉', '💨', '💥', '💪', '🧱', '🎩'],
    'Animals & Mythical': [' Bigfoot ', '🐻', '🦊', '🐺', '🦁', '🐯', '🦄', '🐲', '🦅', '🦈', '🐍'],
    'Activities & Objects': ['💪', '🧠', '⚡', '🔥', '❄️', '⭐', '🍔', '🍕', '🌮', '🍿', '🎮', '🎨', '🎸', '📚'],
    'Symbols': ['🔴', '🔵', '🟢', '🟡', '🟣', '⚫', '⚪', '🔶', '🔷', '🔺', '🔻', '✅', '❌', '❓', '❗']
};

// --- Theming ---
const themes = {
    classic: {
        name: 'Classic Blue',
        bg: 'bg-gray-100', header: 'text-gray-800', modalTextColor: 'text-gray-800', calendarBg: 'bg-white', dayCell: 'bg-gray-50', otherMonthCell: 'bg-gray-200 text-gray-500', todayCell: 'bg-indigo-50 border-indigo-200', primaryButton: 'bg-indigo-600 hover:bg-indigo-700 text-white', secondaryButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
        events: { 'Practice': { color: 'bg-green-100', textColor: 'text-green-800' }, 'Practice (Goalie)': { color: 'bg-lime-100', textColor: 'text-lime-800' }, 'Tournament': { color: 'bg-yellow-100', textColor: 'text-yellow-800' }, 'League Game': { color: 'bg-red-100', textColor: 'text-red-800' }, 'Tryout': { color: 'bg-orange-100', textColor: 'text-orange-800' }, 'Dry-land Workout': { color: 'bg-indigo-100', textColor: 'text-indigo-800' }, 'Camp': { color: 'bg-teal-100', textColor: 'text-teal-800' }, 'Family': { color: 'bg-rose-100', textColor: 'text-rose-800' }, 'Appointment': { color: 'bg-fuchsia-100', textColor: 'text-fuchsia-800' }, 'School': { color: 'bg-sky-100', textColor: 'text-sky-800' }, 'Birthday': { color: 'bg-pink-100', textColor: 'text-pink-800' }, 'Other': { color: 'bg-gray-200', textColor: 'text-gray-800' } }
    },
    dark: {
        name: 'Midnight',
        bg: 'bg-gray-900', header: 'text-gray-100', modalTextColor: 'text-gray-100', calendarBg: 'bg-gray-800', dayCell: 'bg-gray-700/50', otherMonthCell: 'bg-gray-800 text-gray-500', todayCell: 'bg-blue-900/50 border-blue-500', primaryButton: 'bg-blue-600 hover:bg-blue-500 text-white', secondaryButton: 'bg-gray-700 hover:bg-gray-600 text-gray-200',
        events: { 'Practice': { color: 'bg-green-800/70', textColor: 'text-green-100' }, 'Practice (Goalie)': { color: 'bg-lime-800/70', textColor: 'text-lime-100' }, 'Tournament': { color: 'bg-yellow-800/70', textColor: 'text-yellow-100' }, 'League Game': { color: 'bg-red-800/70', textColor: 'text-red-100' }, 'Tryout': { color: 'bg-orange-800/70', textColor: 'text-orange-100' }, 'Dry-land Workout': { color: 'bg-indigo-800/70', textColor: 'text-indigo-100' }, 'Camp': { color: 'bg-teal-800/70', textColor: 'text-teal-100' }, 'Family': { color: 'bg-rose-800/70', textColor: 'text-rose-100' }, 'Appointment': { color: 'bg-fuchsia-800/70', textColor: 'text-fuchsia-100' }, 'School': { color: 'bg-sky-800/70', textColor: 'text-sky-100' }, 'Birthday': { color: 'bg-pink-800/70', textColor: 'text-pink-100' }, 'Other': { color: 'bg-gray-600/70', textColor: 'text-gray-200' } }
    },
    rink: {
        name: 'Hockey Rink',
        bg: 'bg-blue-50', header: 'text-blue-900', modalTextColor: 'text-blue-900', calendarBg: 'bg-white', dayCell: 'bg-gray-50', otherMonthCell: 'bg-gray-200 text-gray-400', todayCell: 'bg-red-100 border-red-300', primaryButton: 'bg-red-600 hover:bg-red-700 text-white', secondaryButton: 'bg-blue-200 hover:bg-blue-300 text-blue-800',
        events: { 'Practice': { color: 'bg-sky-200', textColor: 'text-sky-800' }, 'Practice (Goalie)': { color: 'bg-lime-200', textColor: 'text-lime-800' }, 'Tournament': { color: 'bg-amber-200', textColor: 'text-amber-800' }, 'League Game': { color: 'bg-rose-200', textColor: 'text-rose-800' }, 'Tryout': { color: 'bg-orange-200', textColor: 'text-orange-800' }, 'Dry-land Workout': { color: 'bg-green-200', textColor: 'text-green-800' }, 'Camp': { color: 'bg-cyan-200', textColor: 'text-cyan-800' }, 'Family': { color: 'bg-pink-200', textColor: 'text-pink-800' }, 'Appointment': { color: 'bg-fuchsia-200', textColor: 'text-fuchsia-800' }, 'School': { color: 'bg-indigo-200', textColor: 'text-indigo-800' }, 'Birthday': { color: 'bg-violet-200', textColor: 'text-violet-800' }, 'Other': { color: 'bg-slate-200', textColor: 'text-slate-800' } }
    },
    blueJackets: {
        name: 'Columbus Blue Jackets',
        bg: 'bg-[#002654]', header: 'text-white', modalTextColor: 'text-gray-800', calendarBg: 'bg-white', dayCell: 'bg-gray-100', otherMonthCell: 'bg-gray-200 text-gray-500', todayCell: 'bg-red-100 border-red-300', primaryButton: 'bg-[#CE1126] hover:bg-red-700 text-white', secondaryButton: 'bg-[#A7A8A9] hover:bg-gray-500 text-black',
        events: { 'Practice': { color: 'bg-blue-200', textColor: 'text-blue-900' }, 'Practice (Goalie)': { color: 'bg-sky-200', textColor: 'text-sky-900' }, 'Tournament': { color: 'bg-red-200', textColor: 'text-red-900' }, 'League Game': { color: 'bg-gray-300', textColor: 'text-gray-900' }, 'Tryout': { color: 'bg-blue-300', textColor: 'text-blue-900' }, 'Dry-land Workout': { color: 'bg-red-300', textColor: 'text-red-900' }, 'Camp': { color: 'bg-gray-400', textColor: 'text-black' }, 'Family': { color: 'bg-rose-200', textColor: 'text-rose-900' }, 'Appointment': { color: 'bg-fuchsia-200', textColor: 'text-fuchsia-900' }, 'School': { color: 'bg-teal-200', textColor: 'text-teal-900' }, 'Birthday': { color: 'bg-pink-200', textColor: 'text-pink-900' }, 'Other': { color: 'bg-slate-200', textColor: 'text-slate-800' } }
    },
    culverEagles: {
        name: 'Culver Eagles',
        bg: 'bg-gray-100', header: 'text-[#860038]', modalTextColor: 'text-[#860038]', calendarBg: 'bg-white', dayCell: 'bg-red-50', otherMonthCell: 'bg-gray-200 text-gray-500', todayCell: 'bg-red-100 border-red-300', primaryButton: 'bg-[#860038] hover:bg-red-900 text-white', secondaryButton: 'bg-gray-300 hover:bg-gray-400 text-black',
        events: { 'Practice': { color: 'bg-red-200', textColor: 'text-red-900' }, 'Practice (Goalie)': { color: 'bg-rose-200', textColor: 'text-rose-900' }, 'Tournament': { color: 'bg-yellow-200', textColor: 'text-yellow-900' }, 'League Game': { color: 'bg-red-300', textColor: 'text-red-900' }, 'Tryout': { color: 'bg-gray-300', textColor: 'text-gray-800' }, 'Dry-land Workout': { color: 'bg-red-100', textColor: 'text-red-800' }, 'Camp': { color: 'bg-yellow-100', textColor: 'text-yellow-800' }, 'Family': { color: 'bg-stone-200', textColor: 'text-stone-800' }, 'Appointment': { color: 'bg-fuchsia-200', textColor: 'text-fuchsia-800' }, 'School': { color: 'bg-sky-200', textColor: 'text-sky-800' }, 'Birthday': { color: 'bg-pink-200', textColor: 'text-pink-800' }, 'Other': { color: 'bg-slate-200', textColor: 'text-slate-800' } }
    },
    floridaPanthers: {
        name: 'Florida Panthers',
        bg: 'bg-[#041E42]', header: 'text-white', modalTextColor: 'text-gray-800', calendarBg: 'bg-white', dayCell: 'bg-gray-100', otherMonthCell: 'bg-blue-100 text-gray-500', todayCell: 'bg-red-100 border-red-300', primaryButton: 'bg-[#C8102E] hover:bg-red-700 text-white', secondaryButton: 'bg-[#B9975B] hover:bg-yellow-600 text-black',
        events: { 'Practice': { color: 'bg-blue-200', textColor: 'text-blue-900' }, 'Practice (Goalie)': { color: 'bg-sky-200', textColor: 'text-sky-900' }, 'Tournament': { color: 'bg-yellow-200', textColor: 'text-yellow-900' }, 'League Game': { color: 'bg-red-200', textColor: 'text-red-900' }, 'Tryout': { color: 'bg-blue-300', textColor: 'text-blue-900' }, 'Dry-land Workout': { color: 'bg-yellow-300', textColor: 'text-yellow-900' }, 'Camp': { color: 'bg-red-300', textColor: 'text-red-900' }, 'Family': { color: 'bg-rose-200', textColor: 'text-rose-900' }, 'Appointment': { color: 'bg-fuchsia-200', textColor: 'text-fuchsia-900' }, 'School': { color: 'bg-teal-200', textColor: 'text-teal-900' }, 'Birthday': { color: 'bg-pink-200', textColor: 'text-pink-900' }, 'Other': { color: 'bg-slate-200', textColor: 'text-slate-800' } }
    },
    seattleKraken: {
        name: 'Seattle Kraken',
        bg: 'bg-[#001628]', header: 'text-[#99D9D9]', modalTextColor: 'text-gray-800', calendarBg: 'bg-white', dayCell: 'bg-blue-50', otherMonthCell: 'bg-[#001628] text-gray-400', todayCell: 'bg-red-100 border-red-300', primaryButton: 'bg-[#E9072B] hover:bg-red-600 text-white', secondaryButton: 'bg-[#68A2B9] hover:bg-blue-400 text-black',
        events: { 'Practice': { color: 'bg-sky-200', textColor: 'text-sky-800' }, 'Practice (Goalie)': { color: 'bg-cyan-200', textColor: 'text-cyan-800' }, 'Tournament': { color: 'bg-red-300', textColor: 'text-red-900' }, 'League Game': { color: 'bg-[#99D9D9]', textColor: 'text-black' }, 'Tryout': { color: 'bg-sky-300', textColor: 'text-sky-900' }, 'Dry-land Workout': { color: 'bg-red-200', textColor: 'text-red-800' }, 'Camp': { color: 'bg-[#68A2B9]', textColor: 'text-black' }, 'Family': { color: 'bg-rose-300', textColor: 'text-rose-900' }, 'Appointment': { color: 'bg-fuchsia-300', textColor: 'text-fuchsia-900' }, 'School': { color: 'bg-teal-300', textColor: 'text-teal-900' }, 'Birthday': { color: 'bg-pink-300', textColor: 'text-pink-900' }, 'Other': { color: 'bg-slate-400', textColor: 'text-slate-900' } }
    }
};

const ThemeContext = React.createContext();

// ... (The rest of your components: getSeason, dateToISO, EmojiPicker, etc. remain unchanged)
// --- NOTE: Only the App component and the constants above it are shown here for brevity. ---
// --- The other components (Calendar, Modals, etc.) are the same as your previous version. ---

const getSeason = (date) => {
    const month = date.getMonth();
    if (month >= 7 || month <= 1) return { name: 'Regular Season', color: 'bg-sky-100' };
    if (month >= 2 && month <= 5) return { name: 'Spring Season', color: 'bg-emerald-100' };
    if (month === 6) return { name: 'Off-Season', color: 'bg-slate-200' };
    return { name: '', color: 'bg-white' };
};

const dateToISO = (date) => date.toISOString().split('T')[0];

const EmojiPicker = ({ onSelect, onClose }) => (
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
);

const SettingsModal = ({ isOpen, onClose, onSavePlayers, playerConfig, onSaveTheme, currentTheme }) => {
    const [config, setConfig] = React.useState(playerConfig);
    const [editingAvatarFor, setEditingAvatarFor] = React.useState(null);
    const { theme } = React.useContext(ThemeContext); // Add this line
    // const activeTheme = themes[currentTheme]; // You can now delete this line

    React.useEffect(() => { setConfig(playerConfig); }, [playerConfig, isOpen]);
    if (!isOpen) return null;

    const handleNameChange = (playerId, newName) => setConfig(prev => ({ ...prev, [playerId]: { ...prev[playerId], name: newName } }));
    const handleAvatarSelect = (playerId, newAvatar) => {
        setConfig(prev => ({ ...prev, [playerId]: { ...prev[playerId], avatar: newAvatar } }));
        setEditingAvatarFor(null);
    };
    const handleSave = () => { onSavePlayers(config); onClose(); };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className={`rounded-lg shadow-2xl p-6 w-full max-w-md ${theme.calendarBg}`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-2xl font-bold ${theme.modalTextColor}`}>Settings</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>

                <h3 className={`text-lg font-bold mb-2 ${theme.modalTextColor}`}>Manage Players</h3>
                <div className="space-y-4 mb-6">
                    {Object.keys(config).map(playerId => (
                        <div key={playerId} className="flex items-center gap-4 p-3 bg-black/10 rounded-lg relative">
                            <button onClick={() => setEditingAvatarFor(editingAvatarFor === playerId ? null : playerId)} className="text-3xl w-16 h-12 flex items-center justify-center bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100">{config[playerId].avatar}</button>
                            {editingAvatarFor === playerId && <EmojiPicker onSelect={(emoji) => handleAvatarSelect(playerId, emoji)} onClose={() => setEditingAvatarFor(null)} />}
                            <input type="text" value={config[playerId].name} onChange={e => handleNameChange(playerId, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                        </div>
                    ))}
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

                <div className="mt-8 flex justify-end">
                    <button onClick={handleSave} className={`px-6 py-2 font-semibold rounded-md shadow-sm ${theme.primaryButton}`}>Save & Close</button>
                </div>
            </div>
        </div>
    );
};

const EventModal = ({ isOpen, onClose, onSave, event, selectedDate, playerConfig }) => {
    const [title, setTitle] = React.useState('');
    const [players, setPlayers] = React.useState([]);
    const [eventType, setEventType] = React.useState('Practice');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [time, setTime] = React.useState('12:00');
    const [isRecurring, setIsRecurring] = React.useState(false);
    const [error, setError] = React.useState('');
    const { theme } = React.useContext(ThemeContext);

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

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    const { theme } = React.useContext(ThemeContext);
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className={`rounded-lg shadow-2xl p-6 w-full max-w-sm ${theme.calendarBg}`}>
                <h3 className={`text-lg font-bold ${theme.header}`}>{title}</h3>
                <p className={`mt-2 mb-4 ${theme.header}`}>{message}</p>
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className={`px-4 py-2 font-semibold rounded-md ${theme.secondaryButton}`}>Cancel</button>
                    <button onClick={onConfirm} className={`px-4 py-2 font-semibold rounded-md bg-red-600 hover:bg-red-700 text-white`}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

const CalendarDay = ({ dayDate, type, getEventsForDate, playerConfig, ...props }) => {
    const dayEvents = getEventsForDate(dayDate);
    const isToday = dateToISO(new Date()) === dateToISO(dayDate);
    const dateStr = dateToISO(dayDate);
    const { theme } = React.useContext(ThemeContext);

    return (
        <div className={`border rounded-md p-1.5 min-h-[120px] flex flex-col relative ${isToday ? theme.todayCell : type === 'current' ? theme.dayCell : theme.otherMonthCell}`} onClick={() => type === 'current' && props.onDateClick(dayDate)}>
            <span className={`font-bold ${isToday ? 'text-indigo-600' : ''}`}>{dayDate.getDate()}</span>
            <div className="flex-grow space-y-1 mt-1 overflow-y-auto">
                {dayEvents.map(event => {
                    const eventStartDate = event.startDate || event.date;
                    const isMultiDay = event.endDate && event.endDate > eventStartDate;
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
};

const Calendar = ({ view, currentDate, setCurrentDate, events, playerConfig, ...props }) => {
    const { theme } = React.useContext(ThemeContext);
    const changeDate = (amount) => {
        const newDate = new Date(currentDate);
        if (view === 'week') newDate.setDate(newDate.getDate() + (amount * 7));
        else newDate.setMonth(newDate.getMonth() + (amount * (view === 'month' ? 1 : view === '2-month' ? 2 : 3)));
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
                if (event.recurring.type === 'bi-weekly' && recurrenceStartDate.getDay() === checkDate.getDay()) return (Math.floor(Math.abs(checkDate - recurrenceStartDate) / (1000 * 3600 * 24 * 7))) % 2 === 0;
            }
            return false;
        });
    };

    const renderMonths = () => {
        const numMonths = view === 'month' ? 1 : view === '2-month' ? 2 : 3;
        return Array.from({ length: numMonths }).map((_, i) => {
            const dateForMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
            const season = getSeason(dateForMonth);
            const firstDay = new Date(dateForMonth.getFullYear(), dateForMonth.getMonth(), 1).getDay();
            const daysInMonth = new Date(dateForMonth.getFullYear(), dateForMonth.getMonth() + 1, 0).getDate();
            const prevMonth = new Date(dateForMonth.getFullYear(), dateForMonth.getMonth(), 0);
            const grid = [];
            for (let i = 0; i < firstDay; i++) grid.push({ date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonth.getDate() - firstDay + i + 1), type: 'prev' });
            for (let i = 1; i <= daysInMonth; i++) grid.push({ date: new Date(dateForMonth.getFullYear(), dateForMonth.getMonth(), i), type: 'current' });
            const lastDay = new Date(dateForMonth.getFullYear(), dateForMonth.getMonth(), daysInMonth).getDay();
            for (let i = 1; i <= 6 - lastDay; i++) grid.push({ date: new Date(dateForMonth.getFullYear(), dateForMonth.getMonth() + 1, i), type: 'next' });

            return (
                <div key={i} className="flex-1">
                    <div className="text-center mb-2"><h3 className={`text-xl font-bold ${theme.modalTextColor}`}>{MONTH_NAMES[dateForMonth.getMonth()]} {dateForMonth.getFullYear()}</h3><span className={`px-3 py-1 text-sm font-semibold rounded-full ${season.color} text-gray-700`}>{season.name}</span></div>
                    <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-600 text-sm mb-2">{WEEK_DAYS.map(day => <div key={day}>{day}</div>)}</div>
                    <div className="grid grid-cols-7 gap-1">{grid.map(({ date, type }, index) => <CalendarDay key={index} dayDate={date} type={type} getEventsForDate={getEventsForDate} playerConfig={playerConfig} {...props} />)}</div>
                </div>
            );
        });
    };

    const renderWeekView = () => {``
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const weekDays = Array.from({length: 7}).map((_, i) => { const day = new Date(startOfWeek); day.setDate(day.getDate() + i); return day; });
        return (
            <div>
                <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-600 text-sm mb-2">{weekDays.map(d => <div key={d.toString()}>{WEEK_DAYS[d.getDay()]} {d.getDate()}</div>)}</div>
                <div className="grid grid-cols-7 gap-1">{weekDays.map(dayDate => <CalendarDay key={dayDate.toString()} dayDate={dayDate} type="current" getEventsForDate={getEventsForDate} playerConfig={playerConfig} {...props} />)}</div>
            </div>
        );
    };

    const getWeekTitle = () => {
        const startOfWeek = new Date(currentDate); startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(startOfWeek); endOfWeek.setDate(endOfWeek.getDate() + 6);
        return `${MONTH_NAMES[startOfWeek.getMonth()]} ${startOfWeek.getDate()} - ${MONTH_NAMES[endOfWeek.getMonth()]} ${endOfWeek.getDate()}`;
    };

    return (
        <div className={`rounded-lg shadow-lg p-4 md:p-6 ${theme.calendarBg}`}>
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeDate(-1)} className={`p-2 rounded-full ${theme.secondaryButton}`}><ChevronLeft /></button>
                <div className="text-center"><h2 className={`text-2xl font-bold ${theme.modalTextColor}`}>{view === 'week' ? getWeekTitle() : `Calendar`}</h2></div>
                <button onClick={() => changeDate(1)} className={`p-2 rounded-full ${theme.secondaryButton}`}><ChevronRight /></button>
            </div>
            {view.includes('month') && <div className="flex flex-col md:flex-row gap-4">{renderMonths()}</div>}
            {view === 'week' && renderWeekView()}
        </div>
    );
};

const FilterControls = ({ filters, onFilterChange, view, setView, playerConfig }) => {
    const { theme } = React.useContext(ThemeContext);
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

export default function App() {
    const [user, setUser] = React.useState(null);
    const [events, setEvents] = React.useState([]);
    const [playerConfig, setPlayerConfig] = React.useState(DEFAULT_PLAYER_CONFIG);
    const [themeName, setThemeName] = React.useState('classic');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = React.useState(false);
    const [selectedEvent, setSelectedEvent] = React.useState(null);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [filters, setFilters] = React.useState({ player: 'all', eventType: 'all' });
    const [isAuthReady, setIsAuthReady] = React.useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
    const [eventToDelete, setEventToDelete] = React.useState(null);
    const [view, setView] = React.useState('month');
    const [currentDate, setCurrentDate] = React.useState(new Date());

    const theme = themes[themeName] || themes['classic']; // Fallback for safety
    const userId = user ? user.uid : null;

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsAuthReady(true);
        });
        return () => unsubscribe();
    }, []);

    React.useEffect(() => {
        if (!isAuthReady || !userId) {
            setEvents([]);
            setPlayerConfig(DEFAULT_PLAYER_CONFIG);
            return;
        }

        const playerConfigDocRef = doc(db, `artifacts/${appId}/users/${userId}/config`, 'players');
        const unsubscribePlayers = onSnapshot(playerConfigDocRef, (doc) => {
            if (doc.exists()) {
                setPlayerConfig(doc.data());
            } else {
                setDoc(playerConfigDocRef, DEFAULT_PLAYER_CONFIG);
            }
        });

        const uiConfigDocRef = doc(db, `artifacts/${appId}/users/${userId}/config`, 'ui');
        const unsubscribeUi = onSnapshot(uiConfigDocRef, (doc) => {
            if (doc.exists()) {
                const firestoreThemeName = doc.data().theme;
                if (firestoreThemeName && themes[firestoreThemeName]) {
                    setThemeName(firestoreThemeName);
                } else {
                    setThemeName('classic');
                }
            } else {
                setThemeName('classic');
            }
        });

        const eventsCollectionPath = `artifacts/${appId}/users/${userId}/events`;
        const q = query(collection(db, eventsCollectionPath));
        const unsubscribeEvents = onSnapshot(q, (snapshot) => {
            setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => {
            unsubscribePlayers();
            unsubscribeUi();
            unsubscribeEvents();
        };
    }, [isAuthReady, userId]);

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Google sign-in failed:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Sign-out failed:", error);
        }
    };

    const handleSavePlayerConfig = async (newConfig) => {
        if (userId) await setDoc(doc(db, `artifacts/${appId}/users/${userId}/config`, 'players'), newConfig);
    };

    const handleSaveTheme = async (newThemeName) => {
        if (userId) await setDoc(doc(db, `artifacts/${appId}/users/${userId}/config`, 'ui'), { theme: newThemeName });
    };

    const handleSaveEvent = async (eventData) => {
        if (userId) await setDoc(doc(db, `artifacts/${appId}/users/${userId}/events`, eventData.id), eventData);
    };

    const handleDeleteRequest = (eventId) => {
        setEventToDelete(eventId);
        setIsConfirmModalOpen(true);
    };

    const confirmDeleteEvent = async () => {
        if (userId && eventToDelete) {
            await deleteDoc(doc(db, `artifacts/${appId}/users/${userId}/events`, eventToDelete));
        }
        setIsConfirmModalOpen(false);
        setEventToDelete(null);
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedEvent(null);
        setIsModalOpen(true);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setSelectedDate(null);
        setIsModalOpen(true);
    };

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredEvents = React.useMemo(() => {
        return events.filter(event =>
            (filters.player === 'all' || event.players.includes(filters.player)) &&
            (filters.eventType === 'all' || event.eventType === filters.eventType)
        );
    }, [events, filters]);

    if (!isAuthReady) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-lg">Loading Scheduler...</p>
            </div>
        );
    }

    return (
        <ThemeContext.Provider value={{ theme, setThemeName: handleSaveTheme }}>
            <div className={`${theme.bg} min-h-screen p-4 md:p-8 font-sans`}>
                <div className="max-w-7xl mx-auto">
                    <header className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <div>
                            <h1 className={`text-4xl font-bold ${theme.header}`}>RinkSync</h1>
                            {/*<p className={`mt-1 ${theme.header} opacity-75`}>Family Scheduling Made Simple.</p>*/}
                        </div>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            {user ? (
                                <>
                                    <button onClick={() => { setSelectedEvent(null); setSelectedDate(new Date()); setIsModalOpen(true); }} className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg shadow-md transition-colors ${theme.primaryButton}`}><Plus size={20} /> New Event</button>
                                    <button onClick={() => setIsSettingsModalOpen(true)} className={`flex items-center gap-2 px-4 py-3 font-semibold rounded-lg transition-colors ${theme.secondaryButton}`}><Settings size={20} /></button>

                                    <div className="flex items-center gap-3">
                                        <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full border-2 border-gray-300" />
                                        <span className={`hidden md:block font-semibold ${theme.header}`}>
                                            Hi, {user.displayName ? user.displayName.split(' ')[0] : 'User'}!
                                        </span>
                                    </div>
                                    <button onClick={handleSignOut} className={`flex items-center gap-2 px-4 py-3 font-semibold rounded-lg transition-colors ${theme.secondaryButton}`}><LogOut size={20} /></button>
                                </>
                            ) : (
                                <button onClick={handleGoogleSignIn} className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg shadow-md transition-colors ${theme.primaryButton}`}><LogIn size={20} /> Sign in with Google</button>
                            )}
                        </div>
                    </header>
                    {user && (
                        <>
                            <FilterControls filters={filters} onFilterChange={handleFilterChange} view={view} setView={setView} playerConfig={playerConfig} />
                            <Calendar events={filteredEvents} onDateClick={handleDateClick} onEventClick={handleEventClick} onEventDelete={handleDeleteRequest} view={view} currentDate={currentDate} setCurrentDate={setCurrentDate} playerConfig={playerConfig} />
                        </>
                    )}

                    {!user && (
                        <div className="text-center py-20">
                            <h2 className={`text-2xl font-bold ${theme.header}`}>Welcome to RinkSync!</h2>
                            <p className="text-gray-500 mt-2">Please sign in to view and manage your schedule.</p>
                        </div>
                    )}

                    <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} onSavePlayers={handleSavePlayerConfig} playerConfig={playerConfig} onSaveTheme={handleSaveTheme} currentTheme={themeName} />
                    <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveEvent} event={selectedEvent} selectedDate={selectedDate} playerConfig={playerConfig} />
                    <ConfirmationModal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} onConfirm={confirmDeleteEvent} title="Confirm Deletion" message="Are you sure you want to delete this event? This action cannot be undone." />
                    <footer className="text-center mt-8 text-gray-500 text-sm"><p>RinkSync &copy; {new Date().getFullYear()}</p></footer>
                </div>
            </div>
        </ThemeContext.Provider>
    );
}