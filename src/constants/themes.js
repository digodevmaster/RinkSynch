export const themes = {
    classic: {
        name: 'Classic Blue',
        bg: 'bg-slate-50', header: 'text-gray-800', modalTextColor: 'text-gray-800', calendarBg: 'bg-white',
        cellHoverBg: 'hover:bg-slate-100',
        dayCell: 'bg-white', otherMonthCell: 'bg-slate-100 text-gray-400',
        todayCell: 'bg-indigo-50', // A subtle background for the cell
        primaryButton: 'bg-indigo-600 hover:bg-indigo-700 text-white', secondaryButton: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
        events: { 'Practice': { color: 'bg-green-100', textColor: 'text-green-800' }, 'Practice (Goalie)': { color: 'bg-lime-100', textColor: 'text-lime-800' }, 'Tournament': { color: 'bg-yellow-100', textColor: 'text-yellow-800' }, 'League Game': { color: 'bg-red-100', textColor: 'text-red-800' }, 'Tryout': { color: 'bg-orange-100', textColor: 'text-orange-800' }, 'Dry-land Workout': { color: 'bg-indigo-100', textColor: 'text-indigo-800' }, 'Camp': { color: 'bg-teal-100', textColor: 'text-teal-800' }, 'Family': { color: 'bg-rose-100', textColor: 'text-rose-800' }, 'Appointment': { color: 'bg-fuchsia-100', textColor: 'text-fuchsia-800' }, 'School': { color: 'bg-sky-100', textColor: 'text-sky-800' }, 'Birthday': { color: 'bg-pink-100', textColor: 'text-pink-800' }, 'Other': { color: 'bg-gray-200', textColor: 'text-gray-800' } }
    },
    dark: {
        name: 'Midnight',
        bg: 'bg-gray-900', header: 'text-gray-100', modalTextColor: 'text-gray-100', calendarBg: 'bg-gray-800',
        cellHoverBg: 'hover:bg-gray-700/60',
        dayCell: 'bg-transparent', otherMonthCell: 'bg-gray-900/50 text-gray-500',
        todayCell: 'bg-blue-900/50',
        primaryButton: 'bg-blue-600 hover:bg-blue-500 text-white', secondaryButton: 'bg-gray-700 hover:bg-gray-600 text-gray-200',
        events: { 'Practice': { color: 'bg-green-800/70', textColor: 'text-green-100' }, 'Practice (Goalie)': { color: 'bg-lime-800/70', textColor: 'text-lime-100' }, 'Tournament': { color: 'bg-yellow-800/70', textColor: 'text-yellow-100' }, 'League Game': { color: 'bg-red-800/70', textColor: 'text-red-100' }, 'Tryout': { color: 'bg-orange-800/70', textColor: 'text-orange-100' }, 'Dry-land Workout': { color: 'bg-indigo-800/70', textColor: 'text-indigo-100' }, 'Camp': { color: 'bg-teal-800/70', textColor: 'text-teal-100' }, 'Family': { color: 'bg-rose-800/70', textColor: 'text-rose-100' }, 'Appointment': { color: 'bg-fuchsia-800/70', textColor: 'text-fuchsia-100' }, 'School': { color: 'bg-sky-800/70', textColor: 'text-sky-100' }, 'Birthday': { color: 'bg-pink-800/70', textColor: 'text-pink-100' }, 'Other': { color: 'bg-gray-600/70', textColor: 'text-gray-200' } }
    },
    rink: {
        name: 'Hockey Rink',
        bg: 'bg-blue-50', header: 'text-blue-900', modalTextColor: 'text-blue-900', calendarBg: 'bg-white',
        cellHoverBg: 'hover:bg-slate-100',
        dayCell: 'bg-white', otherMonthCell: 'bg-gray-200 text-gray-400',
        todayCell: 'bg-red-100',
        primaryButton: 'bg-red-600 hover:bg-red-700 text-white', secondaryButton: 'bg-blue-200 hover:bg-blue-300 text-blue-800',
        events: { 'Practice': { color: 'bg-sky-200', textColor: 'text-sky-800' }, 'Practice (Goalie)': { color: 'bg-lime-200', textColor: 'text-lime-800' }, 'Tournament': { color: 'bg-amber-200', textColor: 'text-amber-800' }, 'League Game': { color: 'bg-rose-200', textColor: 'text-rose-800' }, 'Tryout': { color: 'bg-orange-200', textColor: 'text-orange-800' }, 'Dry-land Workout': { color: 'bg-green-200', textColor: 'text-green-800' }, 'Camp': { color: 'bg-cyan-200', textColor: 'text-cyan-800' }, 'Family': { color: 'bg-pink-200', textColor: 'text-pink-800' }, 'Appointment': { color: 'bg-fuchsia-200', textColor: 'text-fuchsia-800' }, 'School': { color: 'bg-indigo-200', textColor: 'text-indigo-800' }, 'Birthday': { color: 'bg-violet-200', textColor: 'text-violet-800' }, 'Other': { color: 'bg-slate-200', textColor: 'text-slate-800' } }
    },
    blueJackets: {
        name: 'Columbus Blue Jackets',
        bg: 'bg-[#002654]', header: 'text-white', modalTextColor: 'text-gray-800', calendarBg: 'bg-white',
        cellHoverBg: 'hover:bg-gray-200',
        dayCell: 'bg-gray-100', otherMonthCell: 'bg-gray-200 text-gray-500',
        todayCell: 'bg-red-100',
        primaryButton: 'bg-[#CE1126] hover:bg-red-700 text-white', secondaryButton: 'bg-[#A7A8A9] hover:bg-gray-500 text-black',
        events: { 'Practice': { color: 'bg-blue-200', textColor: 'text-blue-900' }, 'Practice (Goalie)': { color: 'bg-sky-200', textColor: 'text-sky-900' }, 'Tournament': { color: 'bg-red-200', textColor: 'text-red-900' }, 'League Game': { color: 'bg-gray-300', textColor: 'text-gray-900' }, 'Tryout': { color: 'bg-blue-300', textColor: 'text-blue-900' }, 'Dry-land Workout': { color: 'bg-red-300', textColor: 'text-red-900' }, 'Camp': { color: 'bg-gray-400', textColor: 'text-black' }, 'Family': { color: 'bg-rose-200', textColor: 'text-rose-900' }, 'Appointment': { color: 'bg-fuchsia-200', textColor: 'text-fuchsia-900' }, 'School': { color: 'bg-teal-200', textColor: 'text-teal-900' }, 'Birthday': { color: 'bg-pink-200', textColor: 'text-pink-900' }, 'Other': { color: 'bg-slate-200', textColor: 'text-slate-800' } }
    },
    culverEagles: {
        name: 'Culver Eagles',
        bg: 'bg-gray-100', header: 'text-[#860038]', modalTextColor: 'text-[#860038]', calendarBg: 'bg-white',
        cellHoverBg: 'hover:bg-gray-200',
        dayCell: 'bg-red-50', otherMonthCell: 'bg-gray-200 text-gray-500',
        todayCell: 'bg-red-200',
        primaryButton: 'bg-[#860038] hover:bg-red-900 text-white', secondaryButton: 'bg-gray-300 hover:bg-gray-400 text-black',
        events: { 'Practice': { color: 'bg-red-200', textColor: 'text-red-900' }, 'Practice (Goalie)': { color: 'bg-rose-200', textColor: 'text-rose-900' }, 'Tournament': { color: 'bg-yellow-200', textColor: 'text-yellow-900' }, 'League Game': { color: 'bg-red-300', textColor: 'text-red-900' }, 'Tryout': { color: 'bg-gray-300', textColor: 'text-gray-800' }, 'Dry-land Workout': { color: 'bg-red-100', textColor: 'text-red-800' }, 'Camp': { color: 'bg-yellow-100', textColor: 'text-yellow-800' }, 'Family': { color: 'bg-stone-200', textColor: 'text-stone-800' }, 'Appointment': { color: 'bg-fuchsia-200', textColor: 'text-fuchsia-800' }, 'School': { color: 'bg-sky-200', textColor: 'text-sky-800' }, 'Birthday': { color: 'bg-pink-200', textColor: 'text-pink-800' }, 'Other': { color: 'bg-slate-200', textColor: 'text-slate-800' } }
    },
    floridaPanthers: {
        name: 'Florida Panthers',
        bg: 'bg-[#041E42]', header: 'text-white', modalTextColor: 'text-gray-800', calendarBg: 'bg-white',
        cellHoverBg: 'hover:bg-gray-200',
        dayCell: 'bg-gray-100', otherMonthCell: 'bg-blue-100 text-gray-500',
        todayCell: 'bg-red-200',
        primaryButton: 'bg-[#C8102E] hover:bg-red-700 text-white', secondaryButton: 'bg-[#B9975B] hover:bg-yellow-600 text-black',
        events: { 'Practice': { color: 'bg-blue-200', textColor: 'text-blue-900' }, 'Practice (Goalie)': { color: 'bg-sky-200', textColor: 'text-sky-900' }, 'Tournament': { color: 'bg-yellow-200', textColor: 'text-yellow-900' }, 'League Game': { color: 'bg-red-200', textColor: 'text-red-900' }, 'Tryout': { color: 'bg-blue-300', textColor: 'text-blue-900' }, 'Dry-land Workout': { color: 'bg-yellow-300', textColor: 'text-yellow-900' }, 'Camp': { color: 'bg-red-300', textColor: 'text-red-900' }, 'Family': { color: 'bg-rose-200', textColor: 'text-rose-900' }, 'Appointment': { color: 'bg-fuchsia-200', textColor: 'text-fuchsia-900' }, 'School': { color: 'bg-teal-200', textColor: 'text-teal-900' }, 'Birthday': { color: 'bg-pink-200', textColor: 'text-pink-900' }, 'Other': { color: 'bg-slate-200', textColor: 'text-slate-800' } }
    },
    seattleKraken: {
        name: 'Seattle Kraken',
        bg: 'bg-[#001628]', header: 'text-[#99D9D9]', modalTextColor: 'text-gray-800', calendarBg: 'bg-white',
        cellHoverBg: 'hover:bg-blue-900/50',
        dayCell: 'bg-blue-50', otherMonthCell: 'bg-[#001628] text-gray-400',
        todayCell: 'bg-red-200',
        primaryButton: 'bg-[#E9072B] hover:bg-red-600 text-white', secondaryButton: 'bg-[#68A2B9] hover:bg-blue-400 text-black',
        events: { 'Practice': { color: 'bg-sky-200', textColor: 'text-sky-800' }, 'Practice (Goalie)': { color: 'bg-cyan-200', textColor: 'text-cyan-800' }, 'Tournament': { color: 'bg-red-300', textColor: 'text-red-900' }, 'League Game': { color: 'bg-[#99D9D9]', textColor: 'text-black' }, 'Tryout': { color: 'bg-sky-300', textColor: 'text-sky-900' }, 'Dry-land Workout': { color: 'bg-red-200', textColor: 'text-red-800' }, 'Camp': { color: 'bg-[#68A2B9]', textColor: 'text-black' }, 'Family': { color: 'bg-rose-300', textColor: 'text-rose-900' }, 'Appointment': { color: 'bg-fuchsia-300', textColor: 'text-fuchsia-900' }, 'School': { color: 'bg-teal-300', textColor: 'text-teal-900' }, 'Birthday': { color: 'bg-pink-300', textColor: 'text-pink-900' }, 'Other': { color: 'bg-slate-400', textColor: 'text-slate-900' } }
    }
};
