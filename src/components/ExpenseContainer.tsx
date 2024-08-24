import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ExpensesBttnIcon from '@/assets/expenses-bttn-icon.svg';
import GraphBttnIcon from '@/assets/graph_bttn-icon.svg';
import PlusIcon from '@/assets/plus.svg';
import CheckIcon from '@/assets/check.svg';
import DetailsEntryModal from './DetailsEntryModal';

// Define a type for transactions
interface Transaction {
  amount: number;  // Changed to 'number' for better data consistency
  date: string;
  details: string;
}

interface ExpenseContainerProps {
  username: string | null;
}

const ExpenseContainer: React.FC<ExpenseContainerProps> = ({ username }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Fetch transactions from the backend
  const fetchTransactions = async () => {
    if (!username) return; // Do not fetch if username is not available

    try {
      const response = await fetch(`http://localhost/project/ExpenseManager2/phpscripts/transactions.php?username=${username}`);
      const result = await response.json();

      if (result.success) {
        setTransactions(result.data);  // This should be an array of transactions
      } else {
        alert('Failed to fetch transactions');
        console.error('Failed to fetch transactions:', result);
      }
    } catch (error) {
      alert('Error fetching transactions');
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions(); // Fetch transactions when the component mounts
  }, [username]); // Depend on username

  // Callback function to handle after a transaction is added
  const handleTransactionAdded = () => {
    fetchTransactions(); // Refresh transactions after adding a new one
  };

  return (
    <div className='w-full h-screen bg-[#E9F7FF] px-28 flex flex-col justify-end font-poppins'>
      <div className='bg-white w-full h-[68%] rounded-3xl shadow-inner-custom flex flex-col justify-end'>

        {/* Display fetched transactions */}
      <div className='transaction-list mt-4'>
        {Array.isArray(transactions) && transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <div key={index} className='transaction-item p-4 border-b border-gray-300'>
              <p><strong>Amount:</strong> {transaction.amount}</p>
              <p><strong>Date:</strong> {transaction.date}</p>
              <p><strong>Details:</strong> {transaction.details}</p>
            </div>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </div>

        <div className='w-full h-12 bg-[#E9F7FF] rounded-xl flex justify-center items-end'>
          <button className='hover:brightness-110 flex gap-2 justify-center items-center w-1/2 h-12 border-t border-custom-sky-blue button-linear-gradient rounded-l-xl drop-shadow-2xl button-inner-shadow font-poppins text-white text-lg'>
            <Image src={ExpensesBttnIcon} alt='E-icon' width={35} height={35}></Image> Expenses
          </button>

          <button className='hover:bg-custom-blueshade opacity-80 mb-4 z-10 absolute mx-auto w-12 h-12 rounded-full bg-custom-green border-2 border-custom-green flex justify-center items-center' onClick={toggleModal}>
            <Image className='w-full icon-filter-green ' src={isModalOpen ? CheckIcon : PlusIcon} alt={isModalOpen ? 'check' : 'add'}></Image>
          </button>

          <button className='hover:brightness-110 flex gap-2 justify-center items-center w-1/2 h-12 border-t border-custom-sky-blue button-linear-gradient rounded-r-xl drop-shadow-2xl button-inner-shadow font-poppins text-white text-lg'>
            <Image src={GraphBttnIcon} alt='Graph-icon' width={35} height={35}></Image> Graph
          </button>
        </div>
      </div>
      
      {/* Show modal if isModalOpen is true */}
      {isModalOpen && <DetailsEntryModal username={username} onClose={toggleModal} onTransactionAdded={handleTransactionAdded} />}

    </div>
  );
};

export default ExpenseContainer;
