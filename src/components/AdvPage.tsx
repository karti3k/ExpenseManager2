import React from 'react';
import LoginBgImg from '@/assets/LoginBgImg.png';
import LoginPageImg from '@/assets/LoginPageImg.png';
import AppIcon from '@/assets/AppIcon.png';
import SmileIcon from '@/assets/smile_emoji.svg';
import Image from 'next/image';

interface AdvPageProps {
  onTryItHereClick: () => void;
}

const AdvPage: React.FC<AdvPageProps> = ({ onTryItHereClick }) => {
  return (
    <div className="relative h-screen font-poppins">
      <Image src={LoginBgImg} alt="Login Image" layout="fill" className="object-cover" />
      <div className="absolute inset-0 flex md:flex-row flex-col">
        <div className='w-full md:w-1/2 h-full bg-custom-sky-blue/70 flex flex-col justify-center items-center gap-2'>
          <Image src={LoginPageImg} alt='login-page-icon' width={450} height={50} className='p-8 lg:p-0 lg:pr-12 pb-12 drop-shadow-lg' />
          <h1 className='text-3xl lg:text-5xl text-white font-bold textShadow'>Expense Manager</h1>
          <p className='flex flex-col lg:flex-row justify-center items-center gap-2 text-xl text-white font-medium text-center'>To use this app, please SignIn/SignUp first! <Image src={SmileIcon} alt='icon-1' width={40} height={21} className='pb-4'></Image></p>
        </div>
        <div className='w-full md:w-1/2 h-full bg-black/80 flex flex-col justify-center items-center gap-4 p-12'>
          <div className='flex flex-col gap-4 p-4 bg-black/90 rounded-3xl'>
            <p className='text-justify text-white font-normal'>
              Introducing a user-friendly and free web app designed to simplify expense management: the Expense Manager. With this intuitive tool, keeping track of your finances has never been easier.
            </p>
            <p className='text-justify text-white font-normal'>
              The Expense Manager is built with a clean and modern interface, ensuring a seamless user experience for individuals seeking a hassle-free way to manage your expenses. Whether you are a budget-conscious individual, a small business owner, or someone looking to gain control over their spending habits, this web app has you covered.
            </p>
          </div>

          <button
            className='px-4 py-2 text-white font-medium border border-white rounded-3xl'
            onClick={onTryItHereClick} // Trigger the function on click
          >
            Try it here!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvPage;
