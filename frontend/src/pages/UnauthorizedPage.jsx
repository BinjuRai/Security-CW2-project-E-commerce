

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

// export default function Unauthorized() {
//     const navigate = useNavigate();

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
//             <div className="max-w-md w-full text-center">
//                 {/* Icon */}
//                 <div className="inline-flex p-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-6 shadow-2xl">
//                     <ShieldAlert className="w-16 h-16 text-white" />
//                 </div>

//                 {/* Error Code */}
//                 <h1 className="text-6xl font-bold text-gray-800 mb-2">403</h1>

//                 {/* Title */}
//                 <h2 className="text-3xl font-bold text-gray-800 mb-4">
//                     Access Denied
//                 </h2>

//                 {/* Description */}
//                 <p className="text-gray-600 mb-8">
//                     You don't have permission to access this page.
//                     This area is restricted to administrators only.
//                 </p>

//                 {/* Actions */}
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
//                     >
//                         <ArrowLeft className="w-5 h-5" />
//                         Go Back
//                     </button>

//                     <Link
//                         to="/normal/home"
//                         className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
//                     >
//                         <Home className="w-5 h-5" />
//                         Go Home
//                     </Link>
//                 </div>

//                 {/* Security Notice */}
//                 <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
//                     <p className="text-sm text-red-700">
//                         <strong>Security Notice:</strong> This attempt has been logged.
//                         Repeated unauthorized access attempts may result in account suspension.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Compass, ChevronLeft } from 'lucide-react';

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#fffcfc] text-[#494040] flex items-center justify-center p-6 selection:bg-[#f1d1d1]">
            <div className="max-w-xl w-full text-center">
                
                {/* Protocol Tag */}
                <div className="flex items-center justify-center gap-3 text-[#f1d1d1] mb-8">
                    <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Security Protocol</span>
                    <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
                </div>

                {/* Error Code Hero */}
                <div className="relative inline-block mb-10">
                    <h1 className="text-[120px] font-serif italic leading-none opacity-5 select-none">
                        403
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ShieldAlert className="w-16 h-16 text-[#f1d1d1]" strokeWidth={1} />
                    </div>
                </div>

                {/* Title */}
                <div className="space-y-4 mb-10">
                    <h2 className="text-4xl font-serif italic">
                        Restricted <span className="font-sans not-italic font-light">Access</span>
                    </h2>
                    <p className="text-sm font-light text-[#494040]/60 leading-relaxed max-w-sm mx-auto italic font-serif">
                        This department of the BagBelle is reserved for senior curators. Your credentials do not grant entry to this specific collection.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 hover:text-[#494040] transition-all"
                    >
                        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Go Back
                    </button>

                    <Link
                        to="/normal/home"
                        className="flex items-center gap-4 px-10 py-4 bg-[#494040] text-[#fffcfc] rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#362f2f] transition-all shadow-xl group"
                    >
                        <Compass size={14} className="group-hover:rotate-45 transition-transform duration-500" />
                        Return to Discovery
                    </Link>
                </div>

                {/* Security Footer Notice */}
                <div className="mt-20 pt-8 border-t border-[#f1d1d1]/30">
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#494040]/30 max-w-xs mx-auto">
                        Identity logging is active for restricted acquisition attempts. 
                        <br />
                        <span className="text-[#f1d1d1]">BagBelle Internal Registry.</span>
                    </p>
                </div>

                {/* Corner Decorative Dots */}
                <div className="fixed bottom-10 left-10 hidden lg:block">
                    <div className="w-1 h-1 rounded-full bg-[#f1d1d1] mb-2"></div>
                    <div className="w-1 h-1 rounded-full bg-[#f1d1d1]/40 mb-2"></div>
                    <div className="w-1 h-1 rounded-full bg-[#f1d1d1]/20"></div>
                </div>
            </div>
        </div>
    );
}