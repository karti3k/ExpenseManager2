import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ExpensesBttnIcon from '@/assets/expenses-bttn-icon.svg';
import GraphBttnIcon from '@/assets/graph_bttn-icon.svg';
import PlusIcon from '@/assets/plus.svg';
import DetailsEntryModal from './DetailsEntryModal';
import FoodIcon from '@/assets/Food.png';
import EntertainmentIcon from '@/assets/Entertainment.svg';
import CashbackIcon from '@/assets/Cashback.png';
import ShoppingIcon from '@/assets/Shopping.png';
import ClockIcon from '@/assets/Clock.svg';
import DeleteIcon from '@/assets/Delete_Historyicon.svg';
import MoneyInIcon from '@/assets/MoneyIn.png';
import MoneyOutIcon from '@/assets/MoneyOut.png';
import Notification from './Notification';
import ConfirmationBox from './ConfirmationBox';

type Category = 'Food' | 'Entertainment' | 'Cashback' | 'Shopping' | 'Income';

const categoryIcons: Record<Category, any> = {
  Food: FoodIcon,
  Entertainment: EntertainmentIcon,
  Cashback: CashbackIcon,
  Shopping: ShoppingIcon,
  Income: CashbackIcon,
};

const categoryStyles: Record<Category, string> = {
Food: 'bg-[#E2DBFF] border-4 border-[#ee82ee59] dark:bg-[#e366b1]',
Entertainment: 'bg-[#FFE4DB] border-4 border-[#e4893559] dark:bg-[#c68863]',
Cashback: 'bg-[#DCFACE] border-4 border-[#44d24459] dark:bg-[#7bb662]',
Shopping: 'bg-[#FFF5DB] border-4 border-[#d2cd4459] dark:bg-[#d6b85a]',
Income: 'bg-[#DCFACE] border-4 border-[#44d24459] dark:bg-[#7bb662]',
};

interface ExpenseContainerProps {
  username: string | null;
  onTransactionSuccess: () => void; // Add callback prop
}

const ExpenseContainer: React.FC<ExpenseContainerProps> = ({ username, onTransactionSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState<{ amount: number; date: string; details: string; category: Category; time: string }[]>([]);
  const [view, setView] = useState<'expenses' | 'comingSoon'>('expenses');
  const [chartUrl, setChartUrl] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Initialize with default theme

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  //Changes
  useEffect(() => {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    setTheme(currentTheme);
    fetchTransactions(); // Fetch transactions when the component mounts
    fetchCharts();
  }, [username]); // Depend on username

  const fetchCharts = async () => {
    if (username) {
      try {
        // const response = await fetch(`http://localhost/project/ExpenseManager2/phpscripts/charts.php?username=${username}`);
        const response = await fetch(`http://localhost/expscripts/api/charts.php?username=${username}&theme=${theme}`);
        // const response = await fetch(`https://expmanager.free.nf/phpscripts/charts.php?username=${username}&theme=${theme}`);
        const result = await response.json();
        if (result.success) {
          setChartUrl(result.chart_url);
        } else {
            setNotification({ message: `Failed to fetch chart: ${result.message}`, type: 'error' });
          }
        } catch (error) {
          setNotification({ message: 'Error fetching chart.', type: 'error' });
          console.error('Error fetching chart:', error);
        }
      }
    };
  // Fetch transactions from the backend
  const fetchTransactions = async () => {
    if (!username) return;

    try {
      const response = await fetch(`http://localhost/expscripts/api/transactions.php?username=${username}&theme=${theme}`);
      // const response = await fetch(`https://expmanager.free.nf/phpscripts/transactions.php?username=${username}`);
      const result = await response.json();

      if (result.success) {
        setExpenses(result.data);
      } else {
        setNotification({ message: `Failed to fetch transactions: ${result.message}`, type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Error fetching transactions.', type: 'error' });
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
    // const response = await fetch('https://expmanager.free.nf/phpscripts/transactions.php', {
      const response = await fetch('http://localhost/expscripts/api/transactions.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });

    const result = await response.json();

    if (result.success) {
      setNotification({ message: 'Transaction added successfully.', type: 'success' });
      fetchTransactions();
      fetchCharts();
      onTransactionSuccess();
      toggleModal();
    } else {
      setNotification({ message: `Failed to add transaction: ${result.message}`, type: 'error' });
    }
  } catch (error) {
    setNotification({ message: 'Error adding transaction.', type: 'error' });
    console.error('Error adding transaction:', error);
  }
};


const handleDeleteExpense = async (index: number) => {
  setExpenseToDelete(index);
  setIsConfirmationOpen(true);
};
  
const confirmDelete = async () => {
  if (expenseToDelete !== null) {
    const expenseToDeleteDetails = expenses[expenseToDelete];

    try {
      const response = await fetch('http://localhost/expscripts/api/deletetransactions.php', {
      // const response = await fetch('https://expmanager.free.nf/phpscripts/deletetransactions.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: expenseToDeleteDetails.amount,
          date: expenseToDeleteDetails.date,
          time: expenseToDeleteDetails.time,
          category: expenseToDeleteDetails.category,
          username: username,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setNotification({ message: 'Transaction deleted successfully.', type: 'success' });
        fetchTransactions();
        fetchCharts();
        onTransactionSuccess();
      } else {
        setNotification({ message: `Failed to delete transaction: ${result.message}`, type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Error deleting transaction.', type: 'error' });
      console.error('Error deleting transaction:', error);
    } finally {
      setIsConfirmationOpen(false);
      setExpenseToDelete(null);
    }
  }
};
const cancelDelete = () => {
  setIsConfirmationOpen(false);
  setExpenseToDelete(null);
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

  const convertToCSV = () => {
    const csvRows = ['Category,Details,Amount,Date,Time'];
  
    expenses.forEach(expense => {
      const { category, details, amount, date, time } = expense;
  
      // Use your custom formatDate function to format the date
      const formattedDate = formatDate(date);
  
      // Escape any commas or special characters in details
      const escapedDetails = `"${details.replace(/"/g, '""')}"`;
  
      csvRows.push(`${category},${escapedDetails},${amount},${formattedDate},${time}`);
    });
  
    return csvRows.join('\n');
  };
  

  // Trigger download of the CSV file
  const downloadCSV = () => {
    const csvData = convertToCSV();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions.csv');
    link.click();
  };
  return (
    <div className='font-poppins w-full h-screen bg-[#E9F7FF] dark:bg-black-theme-very-light md:px-28 flex flex-col justify-end items-center'>
      <button
          className="bg-white dark:bg-black text-[#3997CB] dark:text-white font-medium py-1 px-2 mb-4 rounded-full shadow-md text-sm hover:opacity-70 ml-4 border-4 border-[#3997CB89]"
          onClick={downloadCSV}
        >
          Download Transactions
        </button>
      <div className='bg-white dark:border-t-2 dark:border-white dark:bg-black-theme-dark w-full lg:h-[68%] md:h-[81%] h-[70%] rounded-3xl shadow-inner-custom flex flex-col justify-between'>
        <div className='p-6 md:px-12 py-12 lg:py-6 overflow-y-auto '>
        {view === 'expenses' ? (
          expenses.length === 0 ? (
            <p className='text-center text-gray-500 dark:text-white pt-40 opacity-40'>No expenses added yet!</p>
          ) : (
            sortedDates.map((date) => (
              <div key={date}>
                <h2 className='text-lg font-semibold text-custom-darkgray'>{date}</h2>
                <ul className='lg:mb-4 mb-8'>
                  {groupedExpenses[date]
                    .sort((a, b) => {
                      const timeA = new Date(`${a.date} ${a.time}`).getTime();
                      const timeB = new Date(`${b.date} ${b.time}`).getTime();
                      return timeB - timeA;
                    })
                    .map((expense, groupIndex) => {
                      const expenseIndex = expenses.findIndex(
                        (exp) => exp.amount === expense.amount && exp.date === expense.date && exp.time === expense.time && exp.category === expense.category && exp.details === expense.details
                      );
                      const icon = categoryIcons[expense.category];
                      const isCashback = expense.category === 'Cashback' ||  expense.category === 'Income';
                      const amountClass = isCashback ? 'dark:text-green-300 text-green-500' : 'dark:text-red-100 text-red-500';
                      const amountIcon = isCashback ? MoneyInIcon : MoneyOutIcon;
                      const listItemStyle = categoryStyles[expense.category];

                      return (
                        <li key={groupIndex} className={`mt-2 flex justify-between items-center lg:py-2 py-2 rounded-full px-2 ${listItemStyle}`}>
                          <div className='flex items-center'>
                            <Image src={icon} alt={`${expense.category} icon`} width={28} height={28} className='mr-2 drop-shadow-xl' />
                            <p className='lg:w-60 text-sm md:text-lg md:pr-8 pr-4 lg:pr-0 font-light md:font-semibold dark:text-white'>{expense.category}</p>
                            <p className='hidden lg:flex w-80 dark:text-white'><strong className='text-black pr-4'>Details:</strong> {expense.details}</p>
                            <div className='flex gap-2'><Image src={ClockIcon} width={17} height={17} alt='clock' className='hidden md:flex'></Image><p className='lg:w-75 pr-4 md:pr-12 text-xs md:text-lg lg:text-md'>{expense.time}</p></div>
                            <p className={`${amountClass} drop-shadow-xl text-sm md:text-lg flex items-center`}>
                              <strong>Rs {expense.amount}</strong>
                              <Image src={amountIcon} alt={`${isCashback ? 'MoneyIn' : 'MoneyOut'}Icon`} width={24} height={24} className='ml-2' />
                            </p>
                          </div>
                          <button onClick={() => handleDeleteExpense(expenseIndex)} className=""><Image className='drop-shadow-2xl icon-filter-redish' src={DeleteIcon} alt='delete' width={20} height={20}></Image></button>
                        </li>
                      );
                    })}
                </ul>
              </div>
              
            ))
          )
        ) : (
          <div className='flex items-center justify-center'>
            <p className='flex items-center justify-center text-white pt-28 mt-28 md:pt-28 md:mt-0'><span>Currently unavailable!</span></p>
            {/* <p className='lg:-mt-28 lg:w-[80%] lg:h-[20%] lg:flex justify-center items-center lg:items-start'>{chartUrl ? (
              <img src={`${chartUrl}`} alt="Expense Chart" className='hidden' />
            ) : (
              <span>Please add expenses first!</span>
            )}</p> */}
          </div>
        )}
        </div>
        <div className='w-full h-12 bg-[#E9F7FF] rounded-xl flex justify-center items-end'>
          <button onClick={() => setView('expenses')} className='hover:brightness-110 flex gap-2 dark:border-custom-sky-blue dark:border-t justify-center items-center w-1/2 h-12 border-t border-custom-sky-blue dark:border-black-theme-dark bg-custom-gradient dark:bg-black-theme-dark rounded-l-xl drop-shadow-2xl button-inner-shadow font-poppins text-white text-lg'>
            <Image src={ExpensesBttnIcon} alt='E-icon' width={35} height={35}></Image> Expenses
          </button>

          <button className='bg-white dark:bg-black font-bold text-2xl text-[#2AA1E2] mb-4 z-10 absolute mx-auto w-12 h-12 border-4 hover:border-custom-light-green rounded-full drop-shadow-xl flex justify-center items-center dark:border-custom-sky-blue' onClick={toggleModal}>+
          </button>

          <button onClick={() => setView('comingSoon')}
  className='hover:brightness-110 flex gap-2 justify-center items-center w-1/2 h-12 dark:border-custom-sky-blue dark:border-t border-t border-custom-sky-blue dark:border-black-theme-dark bg-custom-gradient dark:bg-black-theme-dark rounded-r-xl drop-shadow-2xl button-inner-shadow font-poppins text-white text-lg cursor-pointer'
>
  <Image src={GraphBttnIcon} alt='G-icon' width={25} height={25} /> 
  Graph
</button>
        </div>
      </div>
      {isModalOpen && ( <div className='flex justify-center items-end absolute  w-full h-screen right-[0%] pb-14'><DetailsEntryModal onClose={toggleModal} onAddExpense={handleAddExpense} /></div>)}

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {isConfirmationOpen && (
        <ConfirmationBox
          message='Are you sure you want to delete this transaction?'
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default ExpenseContainer;


