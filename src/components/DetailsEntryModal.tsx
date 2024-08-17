import React, { useState, useEffect, useRef } from 'react';
import AddCategoryicon from '@/assets/add_category_icon.svg';
import AddImagesIcon from '@/assets/AddImageIcon.svg';
import CloseIcon from '@/assets/CloseIcon.svg';
import Image from 'next/image';

interface DetailsEntryModalProps {
  onClose: () => void;
}

const DetailsEntryModal: React.FC<DetailsEntryModalProps> = ({ onClose }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetails(e.target.value);
  };

  const handleClose = () => {
    onClose(); // Call the parent's toggleModal function
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose(); // Close the modal if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="w-1/2 fixed inset-0 flex justify-center items-center font-poppins ">
        <div ref={modalRef} className="p-6 pb-4 pt-16 w-80 relative bg-[#d9d9d9]/40 rounded-lg shadow backdrop-blur-sm">
          {/* Close Icon */}
          <button onClick={handleClose} className="absolute top-6 left-6">
            <Image src={CloseIcon} alt="Close" width={25} height={25} className='icon-filter-red'/>
          </button>

          <div className="mb-4">
            <label className="block text-gray-700 hidden">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-400 shadow"
              placeholder="Enter amount in RS"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 hidden">Date</label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="bg-[#f0f9cd] w-full px-3 py-2 border rounded-lg text-gray-400 shadow"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 hidden">Details</label>
            <textarea
              value={details}
              onChange={handleDetailsChange}
              className="bg-[#cdd4f9] w-full px-3 py-1 border rounded-lg resize-none text-gray-400 shadow"
              placeholder="Enter more details (optional)"
            />
          </div>

          <div className="flex justify-around">
  <div className="relative inline-block group">
    <button className="icon-filter-dark-bluish rounded-md shadow">
      <Image src={AddCategoryicon} alt="add category" width={30} height={30} />
    </button>
    <span className="absolute right-[0.4px] transform -translate-x-1/2 mt-1 text-gray-700 text-xs bg-white px-1 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-80 transition-opacity duration-200">
      Add Category
    </span>
  </div>

  <div className="relative inline-block group">
    <button className="icon-filter-dark-bluish rounded-md shadow">
      <Image src={AddImagesIcon} alt="add images" width={30} height={30} />
    </button>
    <span className="absolute transform translate-x-[4.8px] mt-1 text-gray-700 text-xs bg-white px-2 py-1 rounded-md shadow-lg opacity-0 text-right group-hover:opacity-100 transition-opacity duration-200">
      Add Images
    </span>
  </div>
</div>
        </div>
      </div>
    </>
  );
};

export default DetailsEntryModal;
