import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ExpensesBttnIcon from '@/assets/expenses-bttn-icon.svg';
import GraphBttnIcon from '@/assets/graph_bttn-icon.svg';
import PlusIcon from '@/assets/plus.svg';
import DetailsEntryModal from './DetailsEntryModal';
import FoodIcon from '@/assets/Food.svg';
import EntertainmentIcon from '@/assets/Entertainment.svg';
import CashbackIcon from '@/assets/Cashback.png';
import ShoppingIcon from '@/assets/Shopping.png';
import ClockIcon from '@/assets/Clock.svg';
import DeleteIcon from '@/assets/Delete_Historyicon.svg';
import MoneyInIcon from '@/assets/MoneyIn.svg';
import MoneyOutIcon from '@/assets/MoneyOut.svg';

type Category = 'Food' | 'Entertainment' | 'Cashback' | 'Shopping';

const categoryIcons: Record<Category, any> = {
  Food: FoodIcon,
  Entertainment: EntertainmentIcon,
  Cashback: CashbackIcon,
  Shopping: ShoppingIcon,
};

const categoryStyles: Record<Category, string> = {
  Food: 'bg-[#E2DBFF] border-4 border-[#ee82ee59]',
Entertainment: 'bg-[#FFE4DB] border-4 border-[#e4893559]',
Cashback: 'bg-[#DCFACE] border-4 border-[#44d24459]',
Shopping: 'bg-[#FFF5DB] border-4 border-[#d2cd4459]',
};

interface ExpenseContainerProps {
  username: string | null;
  onTransactionSuccess: () => void; // Add callback prop
}

const ExpenseContainer: React.FC<ExpenseContainerProps> = ({ username, onTransactionSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState<{ amount: number; date: string; details: string; category: Category; time: string }[]>([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  //Changes
  useEffect(() => {
    fetchTransactions(); // Fetch transactions when the component mounts
  }, [username]); // Depend on username

  // Fetch transactions from the backend
  const fetchTransactions = async () => {
    if (!username) return; // Do not fetch if username is not available

    try {
      const response = await fetch(`http://localhost/project/ExpenseManager2/phpscripts/transactions.php?username=${username}`);
      const result = await response.json();

      if (result.success) {
        setExpenses(result.data);  // This should be an array of transactions
      } else {
        //alert('Failed to fetch transactions');
        //console.error('Failed to fetch transactions:', result);
        console.log("message: ",result.message);
      }
    } catch (error) {
      alert('Error fetching transactions');
      console.error('Error fetching transactions:', error);
    }
  };

  const handleAddExpense = async (expense: { amount: number; date: string; details: string; category: Category }) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const transaction = {
    amount: expense.amount,
    date: expense.date,
    details: expense.details,
    category: expense.category,
    time: currentTime,
    username, // Include the username in the transaction object
  };

  try {
    const response = await fetch('http://localhost/project/ExpenseManager2/phpscripts/transactions.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });

    const result = await response.json();

    if (result.success) {
      alert('Transaction added successfully');
      fetchTransactions();  // Refresh the list of transactions after a successful addition
      onTransactionSuccess(); // Notify the MainPage that a transaction was added
      toggleModal();  // Close the modal after a successful transaction
    } else {
      alert(result.message || 'Failed to add transaction');
    }
  } catch (error) {
    console.error('Error adding transaction:', error);
    alert('Error adding transaction');
  }
};


const handleDeleteExpense = async (index: number) => {
  const confirmed = window.confirm('Are you sure you want to delete this transaction?');
  
  if (confirmed) {
    // Retrieve the expense details to delete
    const expenseToDelete = expenses[index];

    try {
      const response = await fetch('http://localhost/project/ExpenseManager2/phpscripts/deletetransactions.php',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: expenseToDelete.amount,
          date: expenseToDelete.date,
          time: expenseToDelete.time,
          category: expenseToDelete.category,
          username: username, // Assuming `username` is passed as a prop to the component
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Transaction deleted successfully');
        fetchTransactions();
      } else {
        alert(result.message || 'Failed to delete transaction');
        console.error('Failed to delete transaction:', result);
      }
    } catch (error) {
      console.error('Catched Error deleting transaction:', error);
      alert('Catched Error deleting transaction');
    }
  }
};

  const formatDate = (date: string) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dateObj = new Date(date);
    const dayOfWeek = daysOfWeek[dateObj.getDay()];
    const day = dateObj.getDate();
    const daySuffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day}${daySuffix} ${month} ${year}, ${dayOfWeek}`;
  };

  const groupedExpenses = expenses.reduce((groups, expense) => {
    const formattedDate = formatDate(expense.date);
    if (!groups[formattedDate]) {
      groups[formattedDate] = [];
    }
    groups[formattedDate].push(expense);
    return groups;
  }, {} as Record<string, { amount: number; date: string; details: string; category: Category; time: string }[]>);

  const sortedDates = Object.keys(groupedExpenses).sort((a, b) => {
    const dateA = new Date(groupedExpenses[a][0].date);
    const dateB = new Date(groupedExpenses[b][0].date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className='font-poppins w-full h-screen bg-[#E9F7FF] px-28 flex flex-col justify-end'>
      <div className='bg-white w-full h-[72%] rounded-3xl shadow-inner-custom flex flex-col justify-between'>
        <div className='p-6 overflow-y-auto'>
          {expenses.length === 0 ? (
            <p className='text-center text-gray-500 pt-40 opacity-40'>No expenses added yet!</p>
          ) : (
            sortedDates.map((date) => (
              <div key={date}>
                <h2 className='text-lg font-semibold text-custom-darkgray'>{date}</h2>
                <ul className='mb-4'>
                  {groupedExpenses[date]
                    .sort((a, b) => {
                      const timeA = new Date(`${a.date} ${a.time}`).getTime();
                      const timeB = new Date(`${b.date} ${b.time}`).getTime();
                      return timeB - timeA;
                    })
                    .map((expense, index) => {
                      const icon = categoryIcons[expense.category];
                      const isCashback = expense.category === 'Cashback';
                      const amountClass = isCashback ? 'text-green-500' : 'text-red-500';
                      const amountIcon = isCashback ? MoneyInIcon : MoneyOutIcon;
                      const listItemStyle = categoryStyles[expense.category];

                      return (
                        <li key={index} className={`mt-2 flex justify-between items-center py-1 rounded-full px-2 ${listItemStyle}`}>
                          <div className='flex items-center'>
                            <Image src={icon} alt={`${expense.category} icon`} width={28} height={28} className='mr-2' />
                            <p className='w-60'>{expense.category}</p>
                            <p className='w-80'><strong>Details:</strong> {expense.details}</p>
                            <div className='flex gap-2'><Image src={ClockIcon} width={17} height={17} alt='clock'></Image><p className='w-60'>{expense.time}</p></div>
                            <p className={`${amountClass} flex items-center`}>
                              <strong>Rs {expense.amount}</strong>
                              <Image src={amountIcon} alt={`${isCashback ? 'Money In' : 'Money Out'} icon`} width={24} height={24} className='ml-2' />
                            </p>
                          </div>
                          <button onClick={() => handleDeleteExpense(index)} className=""><Image className='icon-filter-red' src={DeleteIcon} alt='delete' width={20} height={20}></Image></button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))
          )}
        </div>
        <div className='w-full h-12 bg-[#E9F7FF] rounded-xl flex justify-center items-end'>
          <button className='hover:brightness-110 flex gap-2 justify-center items-center w-1/2 h-12 border-t border-custom-sky-blue button-linear-gradient rounded-l-xl drop-shadow-2xl button-inner-shadow font-poppins text-white text-lg'>
            <Image src={ExpensesBttnIcon} alt='E-icon' width={35} height={35}></Image> Expenses
          </button>

          <button className='bg-white font-bold text-2xl text-[#2AA1E2] mb-4 z-10 absolute mx-auto w-12 h-12 border-4 hover:border-custom-light-green rounded-full drop-shadow-xl flex justify-center items-center' onClick={toggleModal}>+
          </button>

          <button className='hover:brightness-110 flex gap-2 justify-center items-center w-1/2 h-12 border-t border-custom-sky-blue button-linear-gradient rounded-r-xl drop-shadow-2xl button-inner-shadow font-poppins text-white text-lg'>
            <Image src={GraphBttnIcon} alt='G-icon' width={25} height={25}></Image> Graph
          </button>
        </div>
      </div>
      {isModalOpen && ( <div className='flex justify-center items-end absolute  w-full h-screen right-[0%] pb-14'><DetailsEntryModal onClose={toggleModal} onAddExpense={handleAddExpense} /></div>)}
    </div>
  );
};

export default ExpenseContainer;


