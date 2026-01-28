// import React from 'react'
// import { useParams } from 'react-router-dom';
// import { useGetOneCategory } from '../../hooks/admin/useAdminCategory'
// import { getBackendImageUrl } from '../../utils/backend-image'

// export default function ViewCategory() {
//   const { id } = useParams()
//   const { category, error, isPending } = useGetOneCategory(id)
//   if (error) <>{error}</>
//   return (
//     <div>ViewCategory
//       {category.name}
//       <img src={getBackendImageUrl(category.filepath)}></img>
//     </div>
//   )
// // }
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useGetOneCategory } from '../../hooks/admin/useAdminCategory';
// import { getBackendImageUrl } from '../../utils/backend-image';

// export default function ViewCategory() {
//   const { id } = useParams();
//   const { category, error, isPending } = useGetOneCategory(id);

//   if (isPending) {
//     return <p className="text-gray-500">Loading category...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">Error: {error.message || error}</p>;
//   }

//   if (!category) {
//     return <p className="text-gray-500">Category not found.</p>;
//   }

//   return (
//     <div className="p-8 max-w-xl mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-xl shadow-lg border border-blue-200 mt-12">

//       <img
//         src={getBackendImageUrl(category.filepath)}
//         alt={category.name}
//         className="w-full h-72 object-cover rounded-lg shadow-md border border-blue-300 mb-6"
//       />

//       <h2 className="text-2xl font-semibold text-blue-900 mb-4">
//         Category: <span className="font-bold">"{category.name}"</span>
//       </h2>

//       <hr className="border-blue-300 mb-6" />


//     </div>
//   );


// }
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOneCategory } from '../../hooks/admin/useAdminCategory';
import { getBackendImageUrl } from '../../utils/backend-image';
import { ChevronLeft, Eye, Layers, Calendar, Bookmark } from 'lucide-react';

export default function ViewCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { category, error, isPending } = useGetOneCategory(id);

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#fffcfc] flex flex-col justify-center items-center">
        <div className="w-10 h-10 border-2 border-[#f1d1d1] border-t-[#494040] rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40">Inspecting Registry</p>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen bg-[#fffcfc] flex items-center justify-center p-8">
        <div className="text-center">
          <Layers className="w-12 h-12 text-[#f1d1d1] mx-auto mb-6" strokeWidth={1} />
          <h2 className="text-2xl font-serif italic text-[#494040] mb-2">Registry Error</h2>
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/40 mb-8">
            {error?.message || "The requested collection could not be curated."}
          </p>
          <button 
            onClick={() => navigate(-1)}
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040] border-b border-[#494040] pb-1"
          >
            Return to Registry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-16 px-6 lg:px-12 selection:bg-[#f1d1d1]">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation & Header */}
        <header className="mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-[#494040]/40 hover:text-[#494040] transition-all mb-8 uppercase text-[10px] font-bold tracking-[0.2em]"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Collections
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#f1d1d1]/30 pb-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#f1d1d1]">
                <span className="w-10 h-[1px] bg-[#f1d1d1]"></span>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Collection Identity</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight">
                {category.name}
              </h1>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-[#f1d1d1]/10 border border-[#f1d1d1]/30 rounded-sm">
                <Eye size={14} className="text-[#494040]/60" />
                <span className="text-[9px] font-bold tracking-widest uppercase text-[#494040]">Inspection Mode</span>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Atelier Image Frame */}
          <div className="lg:col-span-7">
            <div className="relative group">
               <div className="absolute -inset-4 bg-[#f1d1d1]/5 rounded-sm -z-10"></div>
               <div className="bg-white border border-[#f1d1d1]/40 p-4 shadow-[0_20px_50px_rgba(73,64,64,0.05)]">
                  <img
                    src={getBackendImageUrl(category.filepath)}
                    alt={category.name}
                    className="w-full aspect-square object-contain bg-[#fffcfc] transition-transform duration-700 group-hover:scale-[1.02]"
                  />
               </div>
            </div>
          </div>

          {/* Right: Technical Details */}
          <div className="lg:col-span-5 space-y-10 pt-4">
            <section className="space-y-6">
               <div className="space-y-1">
                 <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">Registry Nomenclature</p>
                 <h3 className="text-2xl font-light tracking-tight">{category.name}</h3>
               </div>

               <div className="space-y-1">
                 <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">Unique Identifier</p>
                 <p className="text-xs font-mono text-[#f1d1d1] font-bold">#REF_{category._id.slice(-8).toUpperCase()}</p>
               </div>

               <div className="flex items-center gap-8 pt-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[#494040]/60">
                       <Calendar size={12} strokeWidth={1.5} />
                       <span className="text-[10px] font-bold tracking-widest uppercase">Logged At</span>
                    </div>
                    <p className="text-xs font-light">Jan 2024</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-[#494040]/60">
                       <Bookmark size={12} strokeWidth={1.5} />
                       <span className="text-[10px] font-bold tracking-widest uppercase">Status</span>
                    </div>
                    <p className="text-xs font-bold text-green-600/60 uppercase tracking-tighter">Active</p>
                  </div>
               </div>
            </section>

            <div className="pt-8 border-t border-[#f1d1d1]/20">
               <button 
                 onClick={() => navigate(`/admin/category/update/${category._id}`)}
                 className="w-full bg-[#494040] text-[#fffcfc] py-4 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#362f2f] transition-all duration-500 shadow-xl"
               >
                 Modify Collection Details
               </button>
            </div>
          </div>
        </div>

        {/* Footer Reference */}
        <footer className="mt-24 text-center">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#494040]/10">
                BagBelle — Master Registry Record v1.0
            </p>
        </footer>
      </div>
    </div>
  );
}