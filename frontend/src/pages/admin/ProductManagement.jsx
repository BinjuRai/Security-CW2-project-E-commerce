// import React from 'react'
// import ProductTable from '../../components/admin/ProductTable'

// export default function ProductManagement() {

//     return (
//         <div>

//             <ProductTable />
//         </div>
//     )
// }
import React from 'react';
import ProductTable from '../../components/admin/ProductTable';
import { Plus, ChevronRight, ClipboardList, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductManagement() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-12 px-8 selection:bg-[#f1d1d1]">
            <div className="max-w-[1600px] mx-auto">
                
                {/* Editorial Breadcrumbs */}
                <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40 mb-10">
                    <span>Atelier</span>
                    <ChevronRight size={10} className="text-[#f1d1d1]" />
                    <span>Admin</span>
                    <ChevronRight size={10} className="text-[#f1d1d1]" />
                    <span className="text-[#494040]">Product Registry</span>
                </div>

                {/* Header Section */}
                <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#f1d1d1]/30 pb-12 mb-12">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#f1d1d1]">
                            <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
                            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Inventory Management</span>
                        </div>
                        <h1 className="text-5xl font-serif italic tracking-tight">
                            Product <span className="font-sans not-italic font-light">Registry</span>
                        </h1>
                        <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] font-medium max-w-lg">
                            A comprehensive ledger of every masterpiece and component currently curated within the BagBelle collection.
                        </p>
                    </div>

                    {/* Action Suite */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <button 
                            className="group flex items-center gap-3 px-6 py-3 border border-[#f1d1d1] text-[#494040] rounded-full hover:bg-[#f1d1d1]/10 transition-all duration-500"
                        >
                            <Filter size={14} className="text-[#f1d1d1]" />
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Filter Registry</span>
                        </button>

                        <button 
                            onClick={() => navigate("/admin/addproduct")}
                            className="group flex items-center gap-4 bg-[#494040] text-[#fffcfc] px-8 py-4 rounded-full transition-all duration-500 hover:bg-[#362f2f] hover:px-10 shadow-xl"
                        >
                            <Plus size={16} className="text-[#f1d1d1] transition-transform group-hover:rotate-90" />
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Register New Piece</span>
                        </button>
                    </div>
                </header>

                {/* Main Table Area */}
                <div className="relative group">
                    {/* Subtle aesthetic backdrop */}
                    <div className="absolute -inset-4 bg-[#f1d1d1]/5 rounded-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="bg-[#fffcfc] border border-[#f1d1d1]/30 shadow-[0_10px_40px_rgba(73,64,64,0.02)] overflow-hidden">
                        {/* 
                            ProductTable should be updated internally to use 
                            border-[#f1d1d1]/10 and font-light for a premium look
                        */}
                        <ProductTable />
                    </div>
                </div>

                {/* Registry Footer */}
                <footer className="mt-16 flex flex-col md:flex-row justify-between items-center border-t border-[#f1d1d1]/20 pt-8 gap-4">
                    <div className="flex items-center gap-4 text-[#494040]/30 uppercase text-[9px] font-bold tracking-[0.2em]">
                        <ClipboardList size={12} strokeWidth={1.5} />
                        <span>All modifications and stock updates are logged.</span>
                    </div>
                    <p className="text-[10px] font-serif italic text-[#494040]/20">
                       BagBelle  — Inventory Protocol v3.11
                    </p>
                </footer>
            </div>

            {/* Subtle Decorative Backdrop Icon */}
            <div className="fixed bottom-20 left-10 opacity-[0.03] pointer-events-none hidden xl:block">
                <ClipboardList size={300} strokeWidth={0.5} className="text-[#494040]" />
            </div>
        </div>
    );
}