// import React from 'react';
import CategoryTable from '../../components/admin/CategoryTable';
import { Layers, Plus, ChevronRight, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CategoryManagement() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-12 px-8 selection:bg-[#f1d1d1]">
            <div className="max-w-6xl mx-auto">
                
                {/* Breadcrumbs */}
                <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40 mb-10">
                    <span>Atelier</span>
                    <ChevronRight size={10} className="text-[#f1d1d1]" />
                    <span>Registry</span>
                    <ChevronRight size={10} className="text-[#f1d1d1]" />
                    <span className="text-[#494040]">Collections</span>
                </div>

                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#f1d1d1]/30 pb-12 mb-12">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#f1d1d1]">
                            <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
                            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Architecture</span>
                        </div>
                        <h1 className="text-5xl font-serif italic tracking-tight">
                            The <span className="font-sans not-italic font-light">Collections</span>
                        </h1>
                        <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] font-medium max-w-md">
                            Organizing curated pieces into distinct departments for the discerning rider.
                        </p>
                    </div>

                    {/* Quick Action */}
                    <div className="flex flex-col items-end gap-4">
                        <button 
                            onClick={() => { /* Logic to open Add Category Modal if separate */ }}
                            className="group flex items-center gap-4 bg-[#494040] text-[#fffcfc] px-8 py-4 rounded-full transition-all duration-500 hover:bg-[#362f2f] hover:px-10 shadow-xl"
                        >
                            <Plus size={16} className="text-[#f1d1d1] transition-transform group-hover:rotate-90" />
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Create New Collection</span>
                        </button>
                    </div>
                </header>

                {/* Table Section Wrapper */}
                <div className="relative group">
                    {/* Decorative Background for the Table Area */}
                    <div className="absolute -inset-4 bg-[#f1d1d1]/5 rounded-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="bg-[#fffcfc] border border-[#f1d1d1]/30 shadow-[0_10px_40px_rgba(73,64,64,0.02)]">
                        {/* 
                            Note: The CategoryTable component should be updated internally
                            to use the same editorial styling (minimalist rows, #494040 text)
                        */}
                        <CategoryTable />
                    </div>
                </div>

                {/* Informational Footer */}
                <footer className="mt-16 flex flex-col md:flex-row justify-between items-center border-t border-[#f1d1d1]/20 pt-8 gap-4">
                    <div className="flex items-center gap-4 text-[#494040]/30 uppercase text-[9px] font-bold tracking-[0.2em]">
                        <Bookmark size={12} strokeWidth={1.5} />
                        <span>System Registry Log Active</span>
                    </div>
                    <p className="text-[10px] font-serif italic text-[#494040]/20">
                        BagBelle — Category Governance Protocol v1.8
                    </p>
                </footer>
            </div>

            {/* Corner Decorative Element */}
            <div className="fixed bottom-10 right-10 opacity-10 pointer-events-none hidden lg:block">
                <Layers size={120} strokeWidth={0.5} className="text-[#494040]" />
            </div>
        </div>
    );
}