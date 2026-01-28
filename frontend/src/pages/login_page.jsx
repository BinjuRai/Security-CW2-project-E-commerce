

import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import loginBg from '../assets/images/login_pic.png';

export default function Login() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#f1dcdc] to-[#fffcfc]">
            
   
            <div
                className="hidden md:flex md:w-1/2 relative bg-cover bg-center"
                style={{ backgroundImage: `url(${loginBg})` }}
            >
           
                <div className="absolute inset-0 bg-[#544545]/40" />

       
                <div className="relative z-10 flex items-center justify-center w-full">
                    <h1 className="text-4xl font-serif text-[#fffcfc] tracking-wide">
                        BagBelle
                    </h1>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center px-6">
                <div className="w-full max-w-md bg-[#fffcfc] rounded-2xl shadow-xl p-8 md:p-10">
                    
                    <h2 className="text-3xl font-semibold text-[#544545] mb-2 text-center">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-[#544545]/70 mb-8 text-center">
                        Please sign in to continue
                    </p>

                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
