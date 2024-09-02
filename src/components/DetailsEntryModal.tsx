import React, { useState, useRef } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AddCategoryicon from '@/assets/add_category_icon.svg';
import CloseIcon from '@/assets/CloseIcon.svg';
import RupeesIcon from '@/assets/RuppesIcon.svg';
import FoodIcon from '@/assets/Food.png';
import EntertainmentIcon from '@/assets/Entertainment.svg';
import CashbackIcon from '@/assets/Cashback.png';
import ShoppingIcon from '@/assets/Shopping.png';
import { startOfMonth, endOfMonth } from 'date-fns';
import ChooseDateIcon from '@/assets/ChooseDate.svg';
import AddDetailsIcon from '@/assets/AddDetailsIcon.svg'
import Notification from './Notification';

type Category = 'Food' | 'Entertainment' | 'Cashback' | 'Shopping' | 'Income';

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
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const categories = [
    { name: 'Food', icon: FoodIcon },
    { name: 'Entertainment', icon: EntertainmentIcon },
    { name: 'Cashback', icon: CashbackIcon },
    { name: 'Shopping', icon: ShoppingIcon },
    { name: 'Income', icon: CashbackIcon },
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
      // Adjust the date to local time before converting to ISO string
      const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const isoDate = adjustedDate.toISOString().split('T')[0]; // Get only the date part in ISO format
      onAddExpense({ amount, date: isoDate, details, category: selectedCategory });
      handleClose();
    } else {
      setNotificationMessage('Please fill in all required fields.');
      setShowNotification(true);
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="lg:w-1/2 h-full lg:h-[62%] w-full md:dark:bg-black/70 dark:bg-black/80 bg-custom-sky-blue/30 lg:bg-custom-sky-blue/0 lg:dark:bg-black/0 inset-0 flex justify-center items-center font-poppins">
      <div
        ref={modalContainerRef}
        className="p-6 pb-4 pt-16 lg:w-80 md:w-1/2 w-[82%] md:h-[40%] h-max lg:h-full relative bg-white/65 dark:bg-black-theme-light/95 rounded-lg shadow backdrop-blur-sm border-2 border-white dark:border-custom-sky-blue dark:border"
      >
        <button onClick={handleClose} className="bg-white rounded-full absolute top-6 right-6">
          <Image src={CloseIcon} alt="Close" width={25} height={25} className="icon-filter-redish" />
        </button>

        {isCategoryMenuOpen ? (
          <div className="mb-4 mt-10 lg:mt-0 max-h-40 overflow-y-auto bg-white dark:bg-black-theme-very-light border rounded-lg shadow-lg dark:text-white">
            <ul>
              {categories.map((category) => (
                <li
                  key={category.name}
                  onClick={(e) => selectCategory(category.name as Category, e)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 hover:dark:bg-black-theme-light flex items-center gap-2 border-2 border-b-custom-lightgray dark:border-b-slate-900 dark:bg-gray-500"
                >
                  <Image src={category.icon} alt={`${category.name} icon`} width={20} height={20} />
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <div className="mb-4 mt-8 lg:mt-0 relative border-2 border-white dark:border-black-theme-very-light rounded-lg">
              <label className="block text-gray-700 hidden">Amount</label>
              <div className="flex items-center">
                <span className="absolute left-3">
                  <Image src={RupeesIcon} alt="Rupees Icon" width={14} height={14} />
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="bg-white dark:bg-black w-full pl-10 pr-3 py-2 border rounded-lg text-gray-700 dark:text-white shadow"
                  placeholder="Enter amount in RS"
                />
              </div>
            </div>

            <div className="mb-4 relative border-2 border-[#CED5FA] dark:border-black-theme-very-light rounded-lg">
          <label className="block text-gray-700 hidden">Details</label>
          <div className="flex items-center">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Image src={AddDetailsIcon} alt="Add Details Icon" width={14} height={14} />
            </span>
            <textarea
              value={details}
              onChange={handleDetailsChange}
              className="bg-[#CED5FA] dark:bg-black w-full pl-10 h-10 px-3 pt-1 border rounded-lg resize-none text-black dark:text-white shadow"
              maxLength={20}
              placeholder="Add details (optional)"
            />
          </div>
        </div>

            <div className="mb-4 border-2 border-white dark:border-black-theme-very-light rounded-lg">
              <label className="block text-gray-700 hidden">Date</label>
              <div className="relative">
                <DatePicker
                  selected={date}
                  onChange={handleDateChange}
                  dateFormat="dd MMM yyyy"
                  minDate={startOfMonth(new Date())}
                  maxDate={endOfMonth(new Date())}
                  placeholderText="Choose date"
                  className="pl-10 bg-[#F1FACE] dark:bg-black w-full px-3 py-2 border rounded-lg text-gray-400 shadow cursor-pointer"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Image src={ChooseDateIcon} alt="Choose Date Icon" width={14} height={14} />
                </span>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-between items-center gap-4 lg:mt-4 mt-8">
          {selectedCategory ? (
            <button
              onClick={toggleCategoryMenu}
              className="hover:brightness-110 font-normal px-4 py-2 rounded-lg cursor-pointer button-linear-gradient-second border-t border-custom-darkgray w-full drop-shadow-2xl button-inner-shadow font-poppins text-white text-sm"
            >
              {selectedCategory}
            </button>
          ) : (
            <button
              onClick={toggleCategoryMenu}
              className="hover:brightness-110 dark:border-white dark:border-2 font-normal px-4 py-2 rounded-lg cursor-pointer button-linear-gradient-second border-t border-custom-darkgray w-full drop-shadow-2xl button-inner-shadow font-poppins text-white text-sm"
            >
              Set Category
            </button>
          )}

          <button
            className="hover:brightness-110 dark:border-custom-sky-blue dark:border-2 w-full border-t border-custom-sky-blue button-linear-gradient rounded-xl py-2 drop-shadow-2xl button-inner-shadow font-poppins text-white text-sm"
            onClick={handleSubmit}
          >
            Add Expense
          </button>
        </div>
        {showNotification && (
          <Notification
            message={notificationMessage}
            type="error"
            onClose={handleCloseNotification}
          />
        )}
      </div>
    </div>
  );
};

export default DetailsEntryModal;
