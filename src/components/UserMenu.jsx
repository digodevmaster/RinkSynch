import React from 'react';
import { LogOut, X } from 'lucide-react';

// This is the new UserMenu component. It's a dropdown that shows user info and a sign-out button.
// It's designed to be positioned absolutely relative to the user avatar button in the header.
export const UserMenu = React.memo(({ user, onSignOut, onClose, theme }) => {
    if (!user) return null;

    return (
        // Added a subtle animation for appearing
        <div className={`absolute top-full right-0 mt-2 w-64 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 p-2 animate-fade-in-down ${theme.calendarBg}`}>
            <div className="flex items-center justify-between p-2">
                <span className="text-xs font-semibold uppercase">Account</span>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-black/10">
                    <X size={16} />
                </button>
            </div>
            <div className="p-2 flex items-center gap-4">
                <img src={user.photoURL} alt={user.displayName} className="w-12 h-12 rounded-full" />
                <div className="font-semibold">
                    <p className={theme.header}>{user.displayName}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>
            </div>
            <div className="w-full h-px bg-black/10 my-1"></div>
            <button
                onClick={onSignOut}
                className={`w-full flex items-center gap-3 p-2 rounded-lg text-left text-sm font-semibold hover:bg-black/10 transition-colors`}
            >
                <LogOut size={16} />
                Sign Out
            </button>
        </div>
    );
});
