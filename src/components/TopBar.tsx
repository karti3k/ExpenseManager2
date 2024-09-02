import React from 'react';
import Image from 'next/image';
import UsernameIcon from '@/assets/username_icon.svg';
import HelpIcon from '@/assets/help_icon.svg';
import DeleteHistoryIcon from '@/assets/Delete_Historyicon.svg';
import AddCategoryicon from '@/assets/add_category_icon.svg';
import DarkModeIcon from '@/assets/dar_mode_icon.svg';
import AccountSelectIcon from '@/assets/AccountSelectIcon.svg';
import Happyicon from '@/assets/happy_icon.svg';
import LoadingGIF from '@/assets/loading.gif';
import SadEmoji from '@/assets/sad_emoji.svg'

interface TopBarProps {
    username: string | null;
    totalIncome: number | null;
    totalExpense: number | null;
}

const TopBar: React.FC<TopBarProps> = ({ username, totalIncome, totalExpense }) => {
    return (
        <header className='absolute z-10 w-full'>
            <nav className='w-full h-10 bg-custom-gradient dark:bg-black-theme-dark text-white flex items-center justify-between md:px-14 px-8'>
                <h1 className='pb-2 drop-shadow-3xl md:text-3xl text-lg'>Expense Manager</h1>
                <ul className='font-poppins md:text-md text-xs flex font-light'>
                    <li className='flex gap-1 hover:cursor-pointer ml-8 drop-shadow-lg'><Image src={DarkModeIcon} alt='change theme:' width={14} height={14} className='icon-filter-white'></Image>Theme</li>
                    {/* <li className='flex gap-2 hover:cursor-pointer ml-8 drop-shadow-lg'><Image src={AddCategoryicon} alt='add category:' width={16} height={16} className='icon-filter-white'></Image>Categories</li>
                    <li className='flex gap-1 hover:cursor-pointer ml-8 drop-shadow-lg'><Image src={DeleteHistoryIcon} alt='deleted history:' width={16} height={16} className='icon-filter-white'></Image>Trash</li>
                    <li className='flex gap-1 hover:cursor-pointer ml-6 drop-shadow-lg'><Image src={HelpIcon} alt='help:' width={24} height={24} className='icon-filter-white'></Image>Help</li> */}
                    <li className='flex gap-1 hover:cursor-pointer ml-8 drop-shadow-lg'> <Image src={UsernameIcon} alt='username:' width={17} height={17} className='icon-filter-white'></Image>{username ? username : 'Guest'}</li>
                </ul>
            </nav>

            <div className='w-full text-xs md:text-lg h-20 bg-white dark:bg-black-theme-dark rounded-b-xl drop-shadow-lg shadow-sm flex font-poppins'>
                <div className='w-1/3 flex flex-col justify-center'>
                    <div className='flex justify-center text-custom-darkgray'>This Month <span className='pl-1 text-custom-red font-semibold'>Expense</span></div> 
                    <div className='flex text-lg justify-center font-bold text-custom-red'>{totalExpense !== null ? `₹${totalExpense}` : '₹0'}</div>
                </div>
                <div className='w-1/3 flex flex-col justify-center gap-1 items-center border-x-2 border-slate-200 dark:border-slate-500'>
                <div className='text-xs md:text-lg flex justify-center text-custom-darkgray'>
  {(totalIncome !== null && totalExpense !== null) && (totalIncome - totalExpense < 0) ? (
    <span className='text-[#BF3636] text-xs md:text-lg font-extralight font-semibold flex flex-col justify-center items-center'>Budget deficit ! <Image src={SadEmoji} alt='sad-emoji' width={35} height={35} className='pt-2 md:pt-0'></Image> </span>
  ) : (
    <>
      Current <span className='pl-1 text-[#d2cd44] font-semibold'>Savings</span>
    </>
  )}
</div>
<div className='flex justify-center font-bold text-lg text-[#d2cd44]'>
  {(totalIncome !== null && totalExpense !== null) ? (
    totalIncome - totalExpense < 0 ? '' : `₹${totalIncome - totalExpense}`
  ) : '₹0'}
</div>
                </div>
                <div className='w-1/3 flex flex-col justify-center'>
                    <div className='flex justify-center text-custom-darkgray'>This Month <span className='pl-1 text-custom-green dark:text-custom-light-green font-semibold'>Income</span></div>
                    <div className='flex text-lg font-bold justify-center text-custom-green dark:text-custom-light-green'>{totalIncome !== null ? `₹${totalIncome}` : '₹0'}</div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
