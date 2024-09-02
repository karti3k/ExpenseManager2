import React from 'react';

interface ConfirmationBoxProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationBox: React.FC<ConfirmationBoxProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="mt-4 bg-white dark:bg-black-theme-dark p-6 rounded-lg shadow-lg">
        <p className="text-sm md:text-lg text-custom-darkgray mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onCancel} 
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;
