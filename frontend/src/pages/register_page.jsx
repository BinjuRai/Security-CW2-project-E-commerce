// import React from 'react';
// import RegisterForm from '../components/auth/RegisterForm'; // Adjust path if needed

// const Register = () => {
//   return (
//     <div className="w-full max-w-3xl mx-auto mt-20 p-6 border border-red-500 rounded-lg shadow-md font-sans">
//       <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
//       <RegisterForm />
//     </div>
//   );
// };

// export default Register;

import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f1dcdc] to-[#fffcfc] px-4">
      
      <div className="w-full max-w-lg bg-[#fffcfc] rounded-2xl shadow-xl p-8 md:p-10">
        
        <h2 className="text-3xl font-semibold text-[#544545] mb-2 text-center">
          Create Account
        </h2>

        <p className="text-sm text-[#544545]/70 mb-8 text-center">
          Join us and start your journey
        </p>

        <RegisterForm />
      </div>

    </div>
  );
};

export default Register;
