'use client';

import React, { useState } from 'react';
import LoginPage from "@/components/LoginPage";
import MainPage from "@/components/MainPage";
import AdvPage from '@/components/AdvPage';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [showLoginPage, setShowLoginPage] = useState(false); // New state to track if the LoginPage should be shown

  // Function to set the login state and username
  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  // Function to handle the "Try it here!" button click
  const handleTryItHereClick = () => {
    setShowLoginPage(true);
  };

  return (
    <main className='bg-white'>
      {/* Conditionally render LoginPage or AdvPage based on the state */}
      {isLoggedIn ? (
        <MainPage username={username} />
      ) : showLoginPage ? (
        <LoginPage onLoginSuccess={handleLogin} />
      ) : (
        <AdvPage onTryItHereClick={handleTryItHereClick} />
      )}
    </main>
  );
}
