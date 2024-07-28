'use client';

import React, { useState } from 'react';
import LoginPage from "@/components/LoginPage";
import MainPage from "@/components/MainPage";
import Image from "next/image";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <main>
      {isLoggedIn ? <MainPage /> : <LoginPage onLogin={handleLogin} />}
    </main>
  );
}
