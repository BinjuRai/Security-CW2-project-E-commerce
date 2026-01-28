// import React from 'react';
// import Sidebar from '../../components/admin/sidebar';
// import AddProductForm from '../../components/admin/AddProductForm';

// const AddProductPage = () => {
//     return (
//         <div className="flex min-h-screen bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">

//             <div className="flex-1 p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
//                 <AddProductForm />
//             </div>
//         </div>
//     );
// };

// export default AddProductPage;
import React from 'react';
import { PlusCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AddProductForm from '../../components/admin/AddProductForm';

const AddProductPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-12 px-8">
            <div className="max-w-5xl mx-auto">
                
                {/* Header Section */}
                <header className="mb-12">
                    {/* Back Button - Minimalist */}
                    <button 
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 text-[#494040]/40 hover:text-[#494040] transition-all mb-8 uppercase text-[10px] font-bold tracking-[0.2em]"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Registry
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#f1d1d1]/30 pb-10">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[#f1d1d1] font-medium tracking-widest uppercase text-[10px]">
                                <span className="w-10 h-[1px] bg-[#f1d1d1]"></span>
                                Product Management
                            </div>
                            <h1 className="text-5xl font-serif italic tracking-tight">
                                New <span className="font-sans not-italic font-light">Acquisition</span>
                            </h1>
                            <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] font-medium">
                                Registering a new masterpiece into the BagBelle Collection.
                            </p>
                        </div>
                        
                        {/* Decorative Icon */}
                        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-[#f1d1d1]/5 border border-[#f1d1d1]/20 rounded-full">
                            <ShieldCheck size={14} className="text-[#f1d1d1]" />
                            <span className="text-[9px] font-bold tracking-widest uppercase text-[#494040]/40">Security Verified Entry</span>
                        </div>
                    </div>
                </header>

                {/* Form Container */}
                <div className="relative group">
                    {/* Subtle Background Decoration */}
                    <div className="absolute -inset-4 bg-[#f1d1d1]/5 rounded-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="bg-white border border-[#f1d1d1]/30 shadow-[0_10px_40px_rgba(73,64,64,0.03)] p-8 md:p-12">
                        {/* 
                            Note: The AddProductForm component itself should be updated 
                            internally to use the same #494040 inputs and #f1d1d1 accents 
                        */}
                        <AddProductForm />
                    </div>
                </div>

                {/* Footer Note */}
                <footer className="mt-12 text-center">
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/20">
                       BagBelle  — Inventory Protocol v2.4
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default AddProductPage;