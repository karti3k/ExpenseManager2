import React, { useState } from 'react';
import Image from 'next/image';
import LoginBgImg from '@/assets/LoginBgImg.png';
import LoginPageImg from '@/assets/LoginPageImg.png';
import AppIcon from '@/assets/AppIcon.png'
import GoogleIcon from '@/assets/google-icon.png';

const LoginPage: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="relative h-screen">
            <Image src={LoginBgImg} alt="Login Image" layout="fill" className="object-cover" />

            <div className="absolute inset-0 flex">
                <div className="w-1/2 flex felx-col h-full bg-black bg-opacity-90 p-8 shadow-lg">
                    <div className='w-full px-8 flex flex-col items-center justify-evenly'><Image src={AppIcon} alt='AppIcon' width={70}>
                        </Image><Image src={LoginPageImg} alt='login-page-icon' width={350} height={50} className='pr-12 pb-12 drop-shadow-lg' ></Image>
                        <div className='flex flex-col justify-center items-center gap-4'><h2 className='text-5xl font-bold text-stroke'>Hello User!</h2>
                            <h3 className='text-xl font-bold text-center'>Manage your expenses easily with our simpl & easy-to-use web-app.</h3>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-full bg-custom-sky-blue bg-opacity-80 p-8 shadow-lg flex justify-center items-center">
                    <div className="w-2/3 border-4 border-[#3997CB] bg-white p-8 rounded-3xl shadow-lg">
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

                        <button className="w-full border rounded-3xl border-custom-darkgray text-custom-darkgray flex justify-center mb-4 py-2 gap-3"><Image src={GoogleIcon} alt='GoogleIcon' width={25}></Image> <p className='font-semibold'>Continue with Google</p></button>

                        <p className="text-custom-darkgray text-center mb-4">or connect with</p>

                        <form>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full py-2 px-4 bg-custom-lightgray border border-gray-300 rounded-3xl"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full py-2 px-4 bg-custom-lightgray border border-gray-300 rounded-3xl"
                                />
                            </div>

                            {isSignUp ? (
                                <div className="mb-4">
                                    {/* Add password strength checker logic here */}
                                    <p className='text-custom-darkgray'>Password Strength: {/* Logic for password strength */}</p>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center mb-4">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                       <p className='text-custom-darkgray'>Remember me</p> 
                                    </label>
                                    <a href="#" className="text-custom-blueshade">Forgot password?</a>
                                </div>
                            )}

                            <button className="w-full bg-custom-blueshade rounded-3xl text-white py-2">
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