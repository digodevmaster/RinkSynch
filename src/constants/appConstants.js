export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const DEFAULT_PLAYER_CONFIG = {
    'player1': { name: 'Oldest Daughter', avatar: '👧🏻', color: 'bg-pink-200', textColor: 'text-pink-800', borderColor: 'border-pink-400' },
    'player2': { name: 'Younger Daughter', avatar: '👩🏻', color: 'bg-purple-200', textColor: 'text-purple-800', borderColor: 'border-purple-400' },
    'player3': { name: 'Son', avatar: '👦🏻', color: 'bg-blue-200', textColor: 'text-blue-800', borderColor: 'border-blue-400' },
    'player4': { name: 'Hasan', avatar: '👨🏻', color: 'bg-green-200', textColor: 'text-green-800', borderColor: 'border-green-400' },
    'player5': { name: 'Yulduz', avatar: '👩🏻', color: 'bg-yellow-200', textColor: 'text-yellow-800', borderColor: 'border-yellow-400' },
};

export const EMOJI_CATEGORIES = {
    'People': ['👧🏻', '👩🏻', '👦🏻', '👨🏻', '🧑🏻', '👱🏻‍♀️', '👱🏻‍♂️', '👩🏻‍🦰', '👨🏻‍🦰', '👩🏻‍🦳', '👨🏻‍🦳', '👶', '👮', '👷', '🕵️', '🧑‍⚕️', '🧑‍🌾', '🧑‍🍳', '🧑‍🎓', '🧑‍🎤', '🧑‍🏫', '🧑‍💻', '🧑‍🚀'],
    'Hockey': ['🏒', '🥅', '⛸️', '🏆', '🥇', '🥈', '🥉', '🏟️', '📣', '🚨', '⏱️'],
    'Hockey Slang': ['🎯', '🚀', '🎉', '💨', '💥', '💪', '🧱', '🎩'],
    'Animals & Mythical': [' Bigfoot ', '🐻', '🦊', '🐺', '🦁', '🐯', '🦄', '🐲', '🦅', '🦈', '🐍'],
    'Activities & Objects': ['💪', '🧠', '⚡', '🔥', '❄️', '⭐', '🍔', '🍕', '🌮', '🍿', '🎮', '🎨', '🎸', '📚'],
    'Symbols': ['🔴', '🔵', '🟢', '🟡', '🟣', '⚫', '⚪', '🔶', '🔷', '🔺', '🔻', '✅', '❌', '❓', '❗']
};

export const getSeason = (date) => {
    const month = date.getMonth();
    if (month >= 7 || month <= 1) return { name: 'Regular Season', color: 'bg-sky-100' };
    if (month >= 2 && month <= 5) return { name: 'Spring Season', color: 'bg-emerald-100' };
    if (month === 6) return { name: 'Off-Season', color: 'bg-slate-200' };
    return { name: '', color: 'bg-white' };
};

export const dateToISO = (date) => date.toISOString().split('T')[0];
