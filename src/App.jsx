import React from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { collection, doc, onSnapshot, setDoc, deleteDoc, query } from 'firebase/firestore';
import { Plus, Settings, LogIn, LogOut } from 'lucide-react';

// Import all our new separated modules
import { auth, db, googleProvider, appId } from './firebase/config';
import { themes } from './constants/themes';
import { DEFAULT_PLAYER_CONFIG } from './constants/appConstants';
import { Calendar } from './components/Calendar';
import { EventModal } from './components/EventModal';
import { SettingsModal } from './components/SettingsModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { FilterControls } from './components/FilterControls';

// Create a context to pass the theme down to all components
export const ThemeContext = React.createContext();

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

    const theme = themes[themeName] || themes['classic'];
    const userId = user ? user.uid : null;

    // Effect for handling authentication state
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsAuthReady(true);
        });
        return () => unsubscribe();
    }, []);

    // Effect for fetching data from Firestore
    React.useEffect(() => {
        if (!isAuthReady || !userId) {
            setEvents([]);
            setPlayerConfig(DEFAULT_PLAYER_CONFIG);
            setThemeName('classic');
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
            if (doc.exists() && doc.data().theme && themes[doc.data().theme]) {
                setThemeName(doc.data().theme);
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
        <ThemeContext.Provider value={theme}>
            <div className={`${theme.bg} min-h-screen p-4 md:p-8 font-sans`}>
                <div className="max-w-7xl mx-auto">
                    <header className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <div>
                            <h1 className={`text-4xl font-bold ${theme.header}`}>RinkSync</h1>
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
                            <FilterControls filters={filters} onFilterChange={handleFilterChange} view={view} setView={setView} playerConfig={playerConfig} theme={theme} />
                            <Calendar events={filteredEvents} onDateClick={handleDateClick} onEventClick={handleEventClick} onEventDelete={handleDeleteRequest} view={view} currentDate={currentDate} setCurrentDate={setCurrentDate} playerConfig={playerConfig} theme={theme} />
                        </>
                    )}

                    {!user && (
                        <div className="text-center py-20">
                            <h2 className={`text-2xl font-bold ${theme.header}`}>Welcome to RinkSync!</h2>
                            <p className="text-gray-500 mt-2">Please sign in to view and manage your schedule.</p>
                        </div>
                    )}

                    <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} onSavePlayers={handleSavePlayerConfig} playerConfig={playerConfig} onSaveTheme={handleSaveTheme} currentTheme={themeName} theme={theme} />
                    <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveEvent} event={selectedEvent} selectedDate={selectedDate} playerConfig={playerConfig} theme={theme} />
                    <ConfirmationModal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} onConfirm={confirmDeleteEvent} title="Confirm Deletion" message="Are you sure you want to delete this event? This action cannot be undone." theme={theme} />
                    <footer className="text-center mt-8 text-gray-500 text-sm"><p>RinkSync &copy; {new Date().getFullYear()}</p></footer>
                </div>
            </div>
        </ThemeContext.Provider>
    );
}
