import React, { useState } from 'react';
import Image from 'next/image';
import ExpensesBttnIcon from '@/assets/expenses-bttn-icon.svg';
import GraphBttnIcon from '@/assets/graph_bttn-icon.svg';
import PlusIcon from '@/assets/plus.svg';
import CheckIcon from '@/assets/check.svg';
import DetailsEntryModal from './DetailsEntryModal';

const ExpenseContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className='w-full h-screen bg-[#E9F7FF] px-28 flex flex-col justify-end'>
      <div className='bg-white w-full h-[68%] rounded-3xl shadow-inner-custom flex flex-col justify-end'>
        <div className='w-full h-12 bg-[#E9F7FF] rounded-xl flex justify-center items-end'>
          <button className='hover:brightness-110 flex gap-2 justify-center items-center w-1/2 h-12 border-t border-custom-sky-blue button-linear-gradient rounded-l-xl drop-shadow-2xl button-inner-shadow font-poppins text-white text-lg'>
            <Image src={ExpensesBttnIcon} alt='E-icon' width={35} height={35}></Image> Expenses
          </button>

          <button className='hover:bg-custom-blueshade opacity-80 mb-4 z-10 absolute mx-auto w-12 h-12 rounded-full bg-custom-green border-2 border-custom-green flex justify-center items-center' onClick={toggleModal}>
            <Image className='w-full icon-filter-green ' src={isModalOpen ? CheckIcon : PlusIcon} alt={isModalOpen ? 'check' : 'add'}></Image>
          </button>

          <button className='hover:brightness-110 flex gap-2 justify-center items-center w-1/2 h-12 border-t border-custom-sky-blue button-linear-gradient rounded-r-xl drop-shadow-2xl button-inner-shadow font-poppins text-white text-lg'>
            <Image src={GraphBttnIcon} alt='G-icon' width={25} height={25}></Image> Graph
          </button>
        </div>

        {isModalOpen && (
          <div className='w-1/2 h-8 bottom-36 absolute left-[62.2%] transform -translate-x-1/2'>
            <DetailsEntryModal onClose={toggleModal} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseContainer;
