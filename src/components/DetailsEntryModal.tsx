import React, { useState, useRef } from 'react';
import AddCategoryicon from '@/assets/add_category_icon.svg';
import AddImagesIcon from '@/assets/AddImageIcon.svg';
import CloseIcon from '@/assets/CloseIcon.svg';
import Image from 'next/image';
import FoodIcon from '@/assets/Food.svg';
import EntertainmentIcon from '@/assets/Entertainment.svg';
import CashbackIcon from '@/assets/Cashback.svg';
import ShoppingIcon from '@/assets/Shopping.svg';

// Define the Category type
type Category = 'Food' | 'Entertainment' | 'Cashback' | 'Shopping';

interface DetailsEntryModalProps {
  onClose: () => void;
  onAddExpense: (expense: { amount: string; date: string; details: string; category: Category }) => void;
}

const DetailsEntryModal: React.FC<DetailsEntryModalProps> = ({ onClose, onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | ''>(''); // Use Category type
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: 'Food', icon: FoodIcon },
    { name: 'Entertainment', icon: EntertainmentIcon },
    { name: 'Cashback', icon: CashbackIcon },
    { name: 'Shopping', icon: ShoppingIcon },
  ];

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
    onClose();
  };

  const toggleCategoryMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCategoryMenuOpen(prev => !prev);
  };

  const selectCategory = (category: Category, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategory(category);
    setIsCategoryMenuOpen(false); // Close the category menu
  };

  const handleSubmit = () => {
    if (amount && date && selectedCategory) {
      onAddExpense({ amount, date, details, category: selectedCategory });
      handleClose();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="w-1/2 fixed inset-0 flex justify-center items-center font-poppins">
      <div
        ref={modalContainerRef}
        className="p-6 pb-4 pt-16 w-80 relative bg-[#d9d9d9]/40 rounded-lg shadow backdrop-blur-sm"
      >
        {/* Close Icon */}
        <button onClick={handleClose} className="absolute top-6 right-6">
          <Image src={CloseIcon} alt="Close" width={25} height={25} className='icon-filter-red'/>
        </button>

        {isCategoryMenuOpen ? (
          <div className="mb-4 max-h-40 overflow-y-auto bg-white border rounded-lg shadow-lg">
            <ul>
              {categories.map((category) => (
                <li
                  key={category.name}
                  onClick={(e) => selectCategory(category.name as Category, e)} // Cast to Category
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Image src={category.icon} alt={`${category.name} icon`} width={20} height={20} />
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
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
                className="bg-[#cdd4f9] w-full h-10 px-3 pt-1 border rounded-lg resize-none text-gray-400 shadow"
                maxLength={20}
                placeholder="Enter more details (optional)"
              />
            </div>
          </>
        )}

        <div className="flex justify-around relative">
          {selectedCategory ? (
            <div className="relative inline-block group">
              <button
                onClick={toggleCategoryMenu}
                className="text-sm text-gray-700 font-semibold px-4 py-2 border rounded-lg shadow cursor-pointer"
              >
                {selectedCategory}
              </button>
              <span className="absolute right-[0.4px] transform -translate-x-1/2 mt-1 text-gray-700 text-xs bg-white px-1 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-80 transition-opacity duration-200">
                Change Category
              </span>
            </div>
          ) : (
            <div className="relative inline-block group">
              <button
                onClick={toggleCategoryMenu}
                className="icon-filter-dark-bluish rounded-md shadow"
              >
                <Image src={AddCategoryicon} alt="add category" width={30} height={30} />
              </button>
              <span className="absolute right-[0.4px] transform -translate-x-1/2 mt-1 text-gray-700 text-xs bg-white px-1 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-80 transition-opacity duration-200">
                Add Category
              </span>
            </div>
          )}

          <div className="relative inline-block group">
            <button className="icon-filter-dark-bluish rounded-md shadow">
              <Image src={AddImagesIcon} alt="add images" width={30} height={30} />
            </button>
            <span className="absolute transform translate-x-[4.8px] mt-1 text-gray-700 text-xs bg-white px-2 py-1 rounded-md shadow-lg opacity-0 text-right group-hover:opacity-100 transition-opacity duration-200">
              Add Images
            </span>
          </div>
        </div>

        <button 
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg shadow"
          onClick={handleSubmit}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default DetailsEntryModal;