'use client';

import React, { useState, useEffect } from 'react';
import ExpenseContainer from './ExpenseContainer';
import TopBar from './TopBar';

interface MainPageProps {
  username: string | null;
}

const MainPage: React.FC<MainPageProps> = ({ username }) => {
  const [totalIncome, setTotalIncome] = useState<number | null>(null);
  const [totalExpense, setTotalExpense] = useState<number | null>(null);

  // Fetch totals from the backend
  const fetchTotals = async () => {
    if (!username) return;
    try {
      const response = await fetch(`http://localhost/project/ExpenseManager2/phpscripts/fetchTotals.php?username=${username}`);
      const result = await response.json();

      if (result.success) {
        setTotalIncome(result.data.totalIncome);
        setTotalExpense(result.data.totalExpense);
      } else {
        console.error('Failed to fetch totals:', result.message);
      }
    } catch (error) {
      console.error('Error fetching totals:', error);
    }
  };

  // Fetch totals when username changes
  useEffect(() => {
    fetchTotals();
  }, [username]);

  // Callback to handle successful transaction
  const handleTransactionSuccess = () => {
    fetchTotals(); // Refresh totals when a transaction is successfully added
  };

  return (
    <div>
      <TopBar username={username} totalIncome={totalIncome} totalExpense={totalExpense} />
      <ExpenseContainer username={username} onTransactionSuccess={handleTransactionSuccess} />
    </div>
  );
};

export default MainPage;
