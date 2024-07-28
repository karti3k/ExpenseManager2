import React from 'react'
import Image from 'next/image'
import UsernameIcon from '@/assets/username_icon.svg'
import HelpIcon from '@/assets/help_icon.svg'
import DeleteHistoryIcon from '@/assets/Delete_Historyicon.svg'
import AddCategoryicon from '@/assets/add_category_icon.svg'
import DarkModeIcon from '@/assets/dar_mode_icon.svg'
import AccountSelectIcon from '@/assets/AccountSelectIcon.svg'
import Happyicon from '@/assets/happy_icon.svg'
import LoadingGIF from '@/assets/loading.gif'

const TopBar = () => {
    return (
        <header>
            <nav className='w-full h-12 bg-custom-gradient text-white flex items-center justify-between px-14'>
                <h1 className='pb-2 drop-shadow-2xl text-3xl'>Expense Manager</h1>
                <ul className='font-poppins text-md flex font-light'>
                    <li className='flex gap-2 hover:cursor-pointer ml-8'><Image src={DarkModeIcon} alt='change theme:' width={16} height={16} className='icon-filter-white'></Image>Theme</li>
                    <li className='flex gap-2 hover:cursor-pointer ml-8'><Image src={AddCategoryicon} alt='add category:' width={16} height={16} className='icon-filter-white'></Image>Categories</li>
                    <li className='flex gap-1 hover:cursor-pointer ml-8'><Image src={DeleteHistoryIcon} alt='deleted history:' width={16} height={16} className='icon-filter-white'></Image>Trash</li>
                    <li className='flex gap-1 hover:cursor-pointer ml-6'><Image src={HelpIcon} alt='help:' width={24} height={24} className='icon-filter-white'></Image>Help</li>
                    <li className='flex gap-1 hover:cursor-pointer ml-8'> <Image src={UsernameIcon} alt='username:' width={17} height={17} className='icon-filter-white'></Image>karti3k<Image src={AccountSelectIcon} alt='username:' width={16} height={16} className='icon-filter-white'></Image></li>
                </ul>
            </nav>

            <div className='w-full h-20 bg-white rounded-b-xl drop-shadow-lg shadow-sm flex font-poppins'>
                <div className='w-1/3 flex flex-col justify-center'>
                    <div className='flex justify-center text-custom-darkgray'>This Month <span className='pl-1 text-custom-red font-semibold'>Expense</span></div> 
                    <div className='flex justify-center'>--</div>
                </div>
                <div className='w-1/3 flex flex-col justify-center gap-1 items-center border-x-2 border-slate-200'>
                    <div className='flex justify-center'>
                        <Image src={LoadingGIF} alt='happy-icon' width={100} height={50} className=''></Image> 
                    </div>
                </div>
                <div className='w-1/3 flex flex-col justify-center'>
                    <div className='flex justify-center text-custom-darkgray'>This Month <span className='pl-1 text-custom-green font-semibold'>Income</span></div>
                    <div className='flex justify-center'>--</div>
                </div>
            </div>
        </header>
    )
}

export default TopBar