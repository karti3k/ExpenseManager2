// 'use client';

// import React, { useState } from 'react';
// import LoginPage from "@/components/LoginPage";
// import MainPage from "@/components/MainPage";
// import Image from "next/image";

// export default function Home() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   return (
//     <main className='bg-white'>
//       {isLoggedIn ? <MainPage /> : <LoginPage/>}
//       {/* <MainPage /> */}
//     </main>
//   );
// }

'use client';

import React, { useState } from 'react';
import LoginPage from "@/components/LoginPage";
import MainPage from "@/components/MainPage";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to set the login state
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <main className='bg-white'>
      {/* Conditionally render LoginPage or MainPage based on login state */}
      {isLoggedIn ? <MainPage /> : <LoginPage onLoginSuccess={handleLogin} />}
    </main>
  );
}
