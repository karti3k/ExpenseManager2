import React, { useEffect } from 'react';


interface NotificationProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {

    useEffect(() => {
        // Set a timer to automatically close the notification after 5 seconds
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        // Clear the timer if the component unmounts before the timer completes
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
         <div className={`fixed lg:top-20 md:top-40 top-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-w-sm lg:w-[90%] p-4 rounded-lg shadow-lg
            ${type === 'success' ? 'bg-white dark:bg-black border border-black text-green-700 dark:text-custom-light-green' : 'text-red-500 bg-white dark:bg-black border border-black'}`}>
            <div className="flex justify-between items-center">
                <p className="text-sm font-medium">{message}</p>
                <button onClick={onClose} className="ml-4 text-xl font-bold">
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Notification;
