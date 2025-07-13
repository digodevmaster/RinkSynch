import React from 'react';

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, theme }) => {
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
