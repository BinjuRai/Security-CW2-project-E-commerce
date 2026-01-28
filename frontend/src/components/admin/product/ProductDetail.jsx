

"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useGetProductById } from "../../../hooks/admin/useAdminProduct"
import { 
    Package, 
    User, 
    Tag, 
    FileText, 
    ChevronLeft, 
    ShieldCheck, 
    Edit3, 
    History,
    Loader2,
    ArrowUpRight
} from "lucide-react"

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: product, isLoading, error } = useGetProductById(id)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#fffcfc] flex flex-col justify-center items-center">
                <Loader2 className="w-10 h-10 text-[#f1d1d1] animate-spin mb-4" strokeWidth={1} />
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40">Analyzing Registry</p>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-[#fffcfc] flex items-center justify-center p-8">
                <div className="text-center">
                    <History className="w-12 h-12 text-[#f1d1d1] mx-auto mb-6" strokeWidth={1} />
                    <h2 className="text-2xl font-serif italic text-[#494040] mb-2">Record Not Found</h2>
                    <button onClick={() => navigate(-1)} className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-[#494040] pb-1">Return to Registry</button>
                </div>
            </div>
        )
    }

    const imageUrl = product.productImage
        ? `http://localhost:5050/${product.productImage.replace("\\", "/")}`
        : null

    return (
        <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-16 px-6 lg:px-12 selection:bg-[#f1d1d1]">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <header className="mb-16">
                    <button 
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 text-[#494040]/40 hover:text-[#494040] transition-all mb-8 uppercase text-[10px] font-bold tracking-[0.2em]"
                    >
                        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Return to Registry
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#f1d1d1]/30 pb-12">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[#f1d1d1]">
                                <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#494040]/60">Registry Inspection</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight leading-none">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4 pt-2">
                                <span className="text-2xl font-light text-[#494040]">NPR {product.price.toLocaleString()}</span>
                                <span className="w-[1px] h-4 bg-[#f1d1d1]"></span>
                                <span className="text-[10px] font-bold tracking-widest uppercase text-[#f1d1d1]">Ref ID: {id.slice(-8).toUpperCase()}</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => navigate(`/admin/products/${id}/edit`)}
                            className="group flex items-center gap-4 bg-[#494040] text-[#fffcfc] px-10 py-4 rounded-full transition-all duration-500 hover:bg-[#362f2f] shadow-xl"
                        >
                            <Edit3 size={16} className="text-[#f1d1d1]" />
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Modify Masterpiece</span>
                        </button>
                    </div>
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Left Side: Editorial Image Frame */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="relative group">
                            {/* Subtle Background Shape */}
                            <div className="absolute -inset-4 bg-[#f1d1d1]/10 rounded-sm -z-10 transition-transform duration-1000 group-hover:scale-105"></div>
                            
                            <div className="bg-white border border-[#f1d1d1]/40 p-4 shadow-[0_20px_50px_rgba(73,64,64,0.05)]">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={product.name}
                                        className="w-full object-contain bg-[#fffcfc] transition-transform duration-700 group-hover:scale-[1.02]"
                                        style={{ maxHeight: '600px' }}
                                    />
                                ) : (
                                    <div className="aspect-square flex flex-col items-center justify-center bg-[#fffcfc] text-[#f1d1d1]">
                                        <Package size={64} strokeWidth={1} />
                                        <p className="mt-4 text-[10px] font-bold tracking-widest uppercase opacity-40">No Visual Documented</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Narrative Description Section */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <FileText size={18} className="text-[#f1d1d1]" strokeWidth={1.5} />
                                <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-[#494040]/80">The Narrative</h3>
                            </div>
                            <div className="border-l border-[#f1d1d1] pl-8">
                                <p className="text-sm font-light leading-relaxed text-[#494040]/70 italic font-serif">
                                    {product.description || "No curatorial description provided for this specific acquisition."}
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Right Side: Technical Specs & Meta */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        {/* Section 1: Classification */}
                        <section className="space-y-8">
                            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 border-b border-[#f1d1d1]/20 pb-2">Classification</h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/60">Department</span>
                                    <span className="text-sm font-medium border-b border-[#f1d1d1] pb-1">{product.categoryId?.name || "Unclassified"}</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/60">Stock Status</span>
                                    <span className="flex items-center gap-2 text-[10px] font-bold tracking-tighter text-green-600 uppercase">
                                        <div className="w-1 h-1 bg-green-500 rounded-full"></div> Available in Atelier
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Curation Meta */}
                        <section className="space-y-8">
                            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 border-b border-[#f1d1d1]/20 pb-2">Curation Meta</h3>
                            <div className="bg-[#f1d1d1]/10 border border-[#f1d1d1]/30 p-8 space-y-6">
                                <div className="flex items-start gap-4">
                                    <User size={20} className="text-[#f1d1d1]" strokeWidth={1} />
                                    <div>
                                        <p className="text-[9px] font-bold tracking-widest uppercase text-[#494040]/40 mb-1">Assigned Curator</p>
                                        <p className="text-sm font-medium">{product.sellerId?.firstName || "System Curator"}</p>
                                        <p className="text-[10px] text-[#494040]/50 font-serif italic lowercase">{product.sellerId?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <ShieldCheck size={20} className="text-[#f1d1d1]" strokeWidth={1} />
                                    <div>
                                        <p className="text-[9px] font-bold tracking-widest uppercase text-[#494040]/40 mb-1">Authenticity</p>
                                        <p className="text-sm font-medium uppercase tracking-tighter">BagBelle Verified</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Add-on Enhancements */}
                        {product.addons && product.addons.length > 0 && (
                            <section className="space-y-8">
                                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 border-b border-[#f1d1d1]/20 pb-2">Enhancements</h3>
                                <div className="space-y-4">
                                    {product.addons.map((addon, idx) => (
                                        <div key={idx} className="flex justify-between items-center group cursor-default">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1 h-1 bg-[#f1d1d1] rounded-full"></div>
                                                <span className="text-xs font-medium uppercase tracking-wide group-hover:text-[#f1d1d1] transition-colors">{addon.name}</span>
                                            </div>
                                            <span className="text-xs font-serif italic text-[#494040]/60">+ NPR {addon.price.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {/* Footer Reference */}
                <footer className="mt-32 pt-10 border-t border-[#f1d1d1]/20 flex justify-center">
                    <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#494040]/10">
                        BagBelle — Registry Record v4.11
                    </p>
                </footer>
            </div>
        </div>
    )
}