import React, { useState } from 'react';
import Deleting from '@/assets/deleting.gif'
import Image from 'next/image';

interface ConfirmationBoxProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationBox: React.FC<ConfirmationBoxProps> = ({ message, onConfirm, onCancel }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = () => {
    setIsDeleting(true);
    onConfirm();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="mt-4 bg-[#232323] p-6 rounded-lg shadow-lg">
        {isDeleting ? (
          <div className="flex flex-col items-center">
            <p className="text-sm md:text-lg text-custom-darkgray mb-4">Deleting your transaction...</p>
            <Image src={Deleting} alt='.' width={50} height={50}></Image>
            {/* <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div> */}
          </div>
        ) : (
          <>
            <p className="text-sm md:text-lg text-custom-darkgray mb-4">{message}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmationBox;
