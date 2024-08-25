'use client';

import React, { useState } from 'react';
import LoginPage from "@/components/LoginPage";
import MainPage from "@/components/MainPage";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Function to set the login state and username
  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  return (
    <main className='bg-white'>
      {/* Conditionally render LoginPage or MainPage based on login state */}
      {isLoggedIn ? <MainPage username={username} /> : <LoginPage onLoginSuccess={handleLogin} />}
    </main>
  );
}