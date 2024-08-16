import React, { useState } from 'react';
import AddCategoryicon from '@/assets/add_category_icon.svg'
import AddImagesIcon from '@/assets/AddImageIcon.svg'
import Image from 'next/image';

const DetailsEntryModal: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetails(e.target.value);
  };

  return (
    <>
        <div className="w-1/2 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center font-poppins">
          <div className="bg-white border-2 border-custom-darkgray p-6 pb-4 pt-16 rounded-lg shadow-lg w-80">

            <div className="mb-4">
              <label className="block text-gray-700 hidden">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-400"
                placeholder='Enter amount in RS'
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 hidden">Date</label>
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 hidden">Details</label>
              <textarea
                value={details}
                onChange={handleDetailsChange}
                className="w-full px-3 py-1 border rounded-lg resize-none text-gray-400"
                placeholder='Enter more details (optional)'
              />
            </div>

            <div className="flex justify-around">
              <button className="icon-filter-blue"><Image src={AddCategoryicon} alt='add category' width={30} height={30}></Image>
              </button>
              <button className="icon-filter-blue">
                <Image src={AddImagesIcon} alt='add images' width={30} height={30}></Image>
              </button>
            </div>
          </div>
        </div>
    </>
  );
};

export default DetailsEntryModal;
