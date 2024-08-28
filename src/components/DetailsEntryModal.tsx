import React, { useState, useRef } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AddCategoryicon from '@/assets/add_category_icon.svg';
import AddImagesIcon from '@/assets/AddImageIcon.svg';
import CloseIcon from '@/assets/CloseIcon.svg';
import RupeesIcon from '@/assets/RuppesIcon.svg';
import FoodIcon from '@/assets/Food.svg';
import EntertainmentIcon from '@/assets/Entertainment.svg';
import CashbackIcon from '@/assets/Cashback.png';
import ShoppingIcon from '@/assets/Shopping.png';
import { startOfMonth, endOfMonth } from 'date-fns';
import ChooseDateIcon from '@/assets/ChooseDate.svg'

type Category = 'Food' | 'Entertainment' | 'Cashback' | 'Shopping';

interface DetailsEntryModalProps {
  onClose: () => void;
  onAddExpense: (expense: { amount: number; date: string; details: string; category: Category }) => void;
}

const DetailsEntryModal: React.FC<DetailsEntryModalProps> = ({ onClose, onAddExpense }) => {
  const [amount, setAmount] = useState<number>();
  const [date, setDate] = useState<Date | null>(null);
  const [details, setDetails] = useState('');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: 'Food', icon: FoodIcon },
    { name: 'Entertainment', icon: EntertainmentIcon },
    { name: 'Cashback', icon: CashbackIcon },
    { name: 'Shopping', icon: ShoppingIcon },
  ];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.target.value, 10);
    setAmount(!isNaN(parsedValue) ? parsedValue : 0);
  };

  const handleDateChange = (date: Date | null) => {
    setDate(date);
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
    setIsCategoryMenuOpen(false);
  };

  const handleSubmit = () => {
    if (amount && date && selectedCategory) {
      onAddExpense({ amount, date: date.toISOString().split('T')[0], details, category: selectedCategory });
      handleClose();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="w-1/2 inset-0 flex justify-center items-center font-poppins">
      <div
        ref={modalContainerRef}
        className="p-6 pb-4 pt-16 w-80 relative bg-[#d9d9d9]/40 rounded-lg shadow backdrop-blur-sm"
      >
        <button onClick={handleClose} className="absolute top-6 right-6">
          <Image src={CloseIcon} alt="Close" width={25} height={25} className="icon-filter-red" />
        </button>

        {isCategoryMenuOpen ? (
          <div className="mb-4 max-h-40 overflow-y-auto bg-white border rounded-lg shadow-lg">
            <ul>
              {categories.map((category) => (
                <li
                  key={category.name}
                  onClick={(e) => selectCategory(category.name as Category, e)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center gap-2 border-2 border-b-custom-lightgray"
                >
                  <Image src={category.icon} alt={`${category.name} icon`} width={20} height={20} />
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <div className="mb-4 relative">
              <label className="block text-gray-700 hidden">Amount</label>
              <div className="flex items-center">
                <span className="absolute left-3">
                  <Image src={RupeesIcon} alt="Rupees Icon" width={14} height={14} />
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="bg-white w-full pl-10 pr-3 py-2 border rounded-lg text-gray-700 shadow"
                  placeholder="Enter amount in RS"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 hidden">Details</label>
              <textarea
                value={details}
                onChange={handleDetailsChange}
                className="bg-white w-full h-10 px-3 pt-1 border rounded-lg resize-none text-gray-700 shadow"
                maxLength={20}
                placeholder="Enter more details (optional)"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 hidden">Date</label>
              <div className="relative">
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                dateFormat="dd MMM yyyy"
                minDate={startOfMonth(new Date())}
                maxDate={endOfMonth(new Date())}
                placeholderText="Select date"
                className="pl-10 bg-white w-full px-3 py-2 border rounded-lg text-gray-400 shadow cursor-pointer"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Image src={ChooseDateIcon} alt="Choose Date Icon" width={14} height={14} />
                </span>
              </div>
            </div>
          </>
        )}

        <div className="flex gap-20 justify-center items-center relative">
          {selectedCategory ? (
            <div className=" w-1/2 relative inline-block group">
              <button
                onClick={toggleCategoryMenu}
                className="text-sm text-white font-semibold px-4 py-2 border rounded-lg shadow cursor-pointer bg-custom-darkgray"
              >
                {selectedCategory}
              </button>
            </div>
          ) : (
            <div className="relative inline-block group">
              <button
                onClick={toggleCategoryMenu}
                className="icon-filter-gray rounded-md"
              >
                <Image src={AddCategoryicon} alt="add category" width={30} height={30} />
              </button>
              <span className="absolute right-[0.4px] transform -translate-x-1/2 mt-1 text-gray-700 text-xs bg-white px-1 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-80 transition-opacity duration-200 text-right">
                Add Category
              </span>
            </div>
          )}

          {/* <div className="relative inline-block group">
            <button className="icon-filter-gray rounded-md shadow">
              <Image src={AddImagesIcon} alt="add images" width={30} height={30} />
            </button>
            <span className="absolute transform translate-x-[4.8px] mt-1 text-gray-700 text-xs bg-white px-1 py-1 rounded-md shadow-lg opacity-0 text-left group-hover:opacity-100 transition-opacity duration-200">
              Add Images
            </span>
          </div> */}
        

        <button
          className="hover:brightness-110 mt-4 w-1/2 border-t border-custom-sky-blue button-linear-gradient rounded-xl py-2 drop-shadow-2xl button-inner-shadow font-poppins text-white text-lg"
          onClick={handleSubmit}
        >
          Add Expense
        </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsEntryModal;
