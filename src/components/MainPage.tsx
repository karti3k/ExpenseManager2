// import React from 'react';
// import TopBar from './TopBar';
// import ExpenseContainer from './ExpenseContainer';

// const MainPage = () => {
//   return (
//     <div>
//       <TopBar />
//       <ExpenseContainer />
//     </div>
//   );
// };

// export default MainPage;

'use client';

import React from 'react';
import ExpenseContainer from './ExpenseContainer';
import TopBar from './TopBar';

interface MainPageProps {
  username: string | null;
}

const MainPage: React.FC<MainPageProps> = ({ username }) => {
  return (
    <div>
      <TopBar username={username}/>
      <ExpenseContainer username={username}/>
    </div>
  );
};

export default MainPage;
