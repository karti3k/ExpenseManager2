import React from 'react'
import Image from 'next/image'
import ExpensesBttnIcon from '@/assets/expenses-bttn-icon.svg'
import GraphBttnIcon from '@/assets/graph_bttn-icon.svg'
const ExpenseContainer = () => {
  return (
    <div className='w-full h-screen bg-[#E9F7FF] px-28 flex flex-col justify-end'>
        <div className='bg-white w-full h-[68%] rounded-3xl shadow-inner-custom flex flex-col justify-end'>
            <div className='w-full h-12 bg-[#E9F7FF] rounded-xl flex'>
                <button className='hover:font-bold flex gap-2 justify-center items-center w-1/2 h-12 border-t border-custom-sky-blue button-linear-gradient rounded-l-xl drop-shadow-2xl button-inner-shadow font-poppins text-white text-lg'><Image src={ExpensesBttnIcon} alt='E-icon' width={35} height={35}></Image> Expenses</button>
                <button className='hover:font-bold flex gap-2 justify-center items-center w-1/2 h-12 border-t border-custom-sky-blue button-linear-gradient rounded-r-xl drop-shadow-2xl button-inner-shadow font-poppins text-white text-lg'><Image src={GraphBttnIcon} alt='G-icon' width={25} height={25}></Image> Graph</button>
            </div>
        </div>
    </div>
  )
}

export default ExpenseContainer