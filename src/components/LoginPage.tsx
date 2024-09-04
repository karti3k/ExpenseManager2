'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import LoginBgImg from '@/assets/LoginBgImg.png';
import LoginPageImg from '@/assets/LoginPageImg.png';
import AppIcon from '@/assets/AppIcon.png';
import EmailIcon from '@/assets/email_icon.svg';
import UsernameIcon from '@/assets/username_icon.svg';
import PasswordIcon from '@/assets/password_icon.svg';
import Notification from './Notification';

interface LoginPageProps {
    onLoginSuccess: (username: string) => void;  // Updated to accept username
}


const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordStrength, setPasswordStrength] = useState<string>('');
    const [passwordStarted, setPasswordStarted] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (isSignUp) {
            setPasswordStrength(checkPasswordStrength(password));
        }
    }, [password, isSignUp]);

    // useEffect(() => {
    //     const token = localStorage.getItem('authToken');
    //     if (token) {
    //         // Verify the token with your backend or simply use it to avoid login
    //         onLoginSuccess(localStorage.getItem('rememberedUsername') || '');
    //     }
    // }, []);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (!passwordStarted && e.target.value.length > 0) {
            setPasswordStarted(true);
        }
    };

    const checkPasswordStrength = (password: string) => {
        const lengthCriteria = password.length >= 8;
        const uppercaseCriteria = /[A-Z]/.test(password);
        const numberCriteria = /[0-9]/.test(password);
        const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (lengthCriteria && uppercaseCriteria && numberCriteria && specialCharCriteria) {
            return 'Strong';
        } else if (lengthCriteria && (uppercaseCriteria || numberCriteria || specialCharCriteria)) {
            return 'Medium';
        } else {
            return 'Weak';
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const url = isSignUp
            ? 'http://localhost/expscripts/signup.php'
            : 'http://localhost/expscripts/signin.php';

//         const url = isSignUp
//     ? ' https://expmanager.vercel.app/api/signup'
//   : ' https://expmanager.vercel.app/api/signin';

        const body = isSignUp
            ? JSON.stringify({ email, username, password })
            : JSON.stringify({ username, password });

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setNotification({
                    message: `${isSignUp ? 'Sign Up' : 'Sign In'} successful!`,
                    type: 'success',
                });

                if (!isSignUp) {
                    localStorage.setItem('authToken', data.token); // Save token to localStorage
                    if (rememberMe) {
                        localStorage.setItem('rememberedUsername', data.username); // Save username if "Remember me" is checked
                    }
                    onLoginSuccess(data.username); // Call the login success function with the username
                } else {
                    setIsSignUp(false);
                    setEmail('');
                    setUsername('');
                    setPassword('');
                }
            } else {
                setNotification({
                    message: `${isSignUp ? 'Sign Up' : 'Sign In'} failed! ${data.message}`,
                    type: 'error',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setNotification({ message: 'An error occurred. Please try again.', type: 'error' });
        }
    };

 
    useEffect(() => {
        const storedUsername = localStorage.getItem('rememberedUsername');
        if (storedUsername) {
            setUsername(storedUsername);
            setRememberMe(true);
        }
    }, []);

    return (
        <div className="relative h-screen font-poppins">
            <Image src={LoginBgImg} alt="Login Image" layout="fill" className="object-cover" />
            <div className="absolute inset-0 flex">
                <div className="hidden lg:flex lg:w-1/2 h-full bg-black bg-opacity-90 p-8 shadow-lg">
                    <div className='w-full px-8 flex flex-col items-center justify-evenly'>
                        <Image src={AppIcon} alt='AppIcon' width={70} />
                        <Image src={LoginPageImg} alt='login-page-icon' width={350} height={50} className='pr-12 pb-12 drop-shadow-lg' />
                        <div className='flex flex-col justify-center items-center gap-4'>
                            <h2 className='text-5xl text-custom-sky-blue font-bold '>Hello User!</h2>
                            <h3 className='text-xl text-white font-extralight text-center'>Manage your monthly expenses easily with this web-app!</h3>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 h-full bg-custom-sky-blue bg-opacity-80 md:p-8 px-12 shadow-lg flex justify-center items-center">
                    <div className="w-[100%] md:w-[55%] lg:w-2/3 border-4 border-[#3997CB] bg-white p-8 rounded-3xl shadow-lg">
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
                                    onChange={handlePasswordChange}
                                    className="w-full py-2 pl-10 pr-4 bg-custom-lightgray text-custom-darkgray font-semibold border border-gray-300 rounded-3xl"
                                />
                            </div>
                            {isSignUp && passwordStarted && (
                                <div className="mb-4">
                                    <p className={`text-xs ${passwordStrength === 'Strong' ? 'text-green-500' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                                        Password Strength: {passwordStrength}
                                    </p>
                                </div>
                            )}
                            {!isSignUp && (
                                <div className="flex justify-between items-center mb-4">
                                    <label className="flex items-center hover:cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="mr-2 hover:cursor-pointer"
                                            checked={rememberMe}
                                            onChange={() => setRememberMe(!rememberMe)}
                                        />
                                        <p className="text-custom-darkgray lg:text-normal text-xs">Remember me</p>
                                    </label>
                                </div>
                            )}
                            <button type="submit" className="w-full bg-custom-blueshade rounded-3xl text-white py-2 hover:brightness-90">
                                {isSignUp ? 'Sign Up' : 'Continue'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
};

export default LoginPage;
