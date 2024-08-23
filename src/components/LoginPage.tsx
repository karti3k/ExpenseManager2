'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import LoginBgImg from '@/assets/LoginBgImg.png';
import LoginPageImg from '@/assets/LoginPageImg.png';
import AppIcon from '@/assets/AppIcon.png';
import EmailIcon from '@/assets/email_icon.svg';
import UsernameIcon from '@/assets/username_icon.svg';
import PasswordIcon from '@/assets/password_icon.svg';

interface LoginPageProps {
    onLoginSuccess: () => void;  // Add a prop for handling successful login
  }

  const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const router = useRouter()
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const url = isSignUp
            ? 'http://localhost/project/ExpenseManager2/phpscripts/signup.php'
            : 'http://localhost/project/ExpenseManager2/phpscripts/signin.php';

        // const url = isSignUp
        //     ? 'http://expmanager.free.nf/signup.php'
        //     : 'http://expmanager.free.nf/signin.php';
    
        const body = isSignUp
            ? JSON.stringify({ email, username, password })
            : JSON.stringify({ username, password });
    
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, username, password }),
                });
            
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            
                const data = await response.json(); // This line will throw if the response is not valid JSON
                console.log(data);
            
                if (data.success) {
                    alert(`${isSignUp ? 'Sign Up' : 'Sign In'} successful ${isSignUp ? `with email: ${data.email}` : `by ${data.username}`}`);
                    onLoginSuccess(); 
                } else {
                    alert(`${isSignUp ? 'Sign Up' : 'Sign In'} failed: ${data.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
    };
    

    return (
        <div className="relative h-screen">
            <Image src={LoginBgImg} alt="Login Image" layout="fill" className="object-cover" />

            <div className="absolute inset-0 flex">
                <div className="hidden lg:flex lg:w-1/2 h-full bg-black bg-opacity-90 p-8 shadow-lg">
                    <div className='w-full px-8 flex flex-col items-center justify-evenly'>
                        <Image src={AppIcon} alt='AppIcon' width={70} />
                        <Image src={LoginPageImg} alt='login-page-icon' width={350} height={50} className='pr-12 pb-12 drop-shadow-lg' />
                        <div className='flex flex-col justify-center items-center gap-4'>
                            <h2 className='text-5xl font-bold text-stroke'>Hello User!</h2>
                            <h3 className='text-xl font-bold text-center'>Manage your expenses easily with this web-app.</h3>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 h-full bg-custom-sky-blue bg-opacity-80 p-8 shadow-lg flex justify-center items-center">
                    <div className="sm:w-3/4 md:w-[55%] lg:w-2/3 border-4 border-[#3997CB] bg-white p-8 rounded-3xl shadow-lg">
                        <div className="flex justify-center gap-2 mb-4">
                            <button
                                className={`px-4 py-2 ${!isSignUp ? 'text-custom-blueshade font-medium border-b-2 border-custom-blueshade' : 'text-custom-darkgray font-medium'}`}
                                onClick={() => setIsSignUp(false)}
                            >
                                Sign In
                            </button>
                            <button
                                className={`px-4 py-2 ${isSignUp ? 'text-custom-blueshade font-medium border-b-2 border-custom-blueshade' : 'text-custom-darkgray font-medium'}`}
                                onClick={() => setIsSignUp(true)}
                            >
                                Sign Up
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {isSignUp && (
                                <div className="mb-4 relative">
                                    <Image src={EmailIcon} alt="Email Icon" className="absolute left-3 top-2.5 w-5 h-5 icon-filter-gray" />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full py-2 pl-10 pr-4 bg-custom-lightgray text-custom-darkgray font-semibold border border-gray-300 rounded-3xl"
                                    />
                                </div>
                            )}
                            <div className="mb-4 relative">
                                <Image src={UsernameIcon} alt="Username Icon" className="absolute left-3 top-2.5 w-5 h-5 icon-filter-gray" />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full py-2 pl-10 pr-4 bg-custom-lightgray text-custom-darkgray font-semibold border border-gray-300 rounded-3xl"
                                />
                            </div>
                            <div className="mb-4 relative">
                                <Image src={PasswordIcon} alt="Password Icon" className="absolute left-3 top-2.5 w-5 h-5 icon-filter-gray" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full py-2 pl-10 pr-4 bg-custom-lightgray text-custom-darkgray font-semibold border border-gray-300 rounded-3xl"
                                />
                            </div>

                            {isSignUp ? (
                                <div className="mb-4">
                                    {/* Add password strength checker logic here */}
                                    <p className='text-custom-darkgray text-xs'>Password Strength: {/* Logic for password strength */}</p>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center mb-4">
                                    <label className="flex items-center hover:cursor-pointer">
                                        <input type="checkbox" className="mr-2 hover:cursor-pointer" />
                                        <p className='text-custom-darkgray lg:text-normal text-xs '>Remember me</p>
                                    </label>
                                    <a href="#" className="text-custom-blueshade lg:text-normal text-xs hover:text-custom-darkgray">Forgot password?</a>
                                </div>
                            )}

                            <button type="submit" className="w-full bg-custom-blueshade rounded-3xl text-white py-2 hover:brightness-90">
                                {isSignUp ? 'Sign Up' : 'Continue'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;