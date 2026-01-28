


"use client"

import React, { useState } from "react"
import { useAdminCategory, useDeleteOneCategory } from "../../hooks/admin/useAdminCategory"
import { getBackendImageUrl } from "../../utils/backend-image"
import { Link } from "react-router-dom"
import DeleteModal from "../DeleteModal"
import { ImageIcon, Eye, Edit3, Trash2, Plus, Layers, Loader2, ArrowRight } from "lucide-react"

export default function CategoryTable() {
  const { categories, error, isPending } = useAdminCategory()
  const deleteCategoryHook = useDeleteOneCategory()
  const [deleteId, setDeleteId] = useState(null)
  const [imageLoadErrors, setImageLoadErrors] = useState(new Set())

  const handleDelete = () => {
    deleteCategoryHook.mutate(deleteId, {
      onSuccess: () => setDeleteId(null),
    })
  }

  const handleImageError = (categoryId) => {
    setImageLoadErrors((prev) => new Set([...prev, categoryId]))
  }

  // Premium Loading Skeleton
  const CategorySkeleton = () => (
    <div className="bg-white border border-[#f1d1d1]/30 p-4 animate-pulse">
      <div className="w-full aspect-[4/5] bg-[#f1d1d1]/10 mb-4"></div>
      <div className="h-4 bg-[#f1d1d1]/20 w-3/4 mx-auto"></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-10 selection:bg-[#f1d1d1]">
      <DeleteModal
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Protocol: Delete Collection"
        description="Are you certain you wish to remove this collection from the atelier? This action is permanent."
      />

      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#f1d1d1]/30 pb-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#f1d1d1]">
            <span className="w-10 h-[1px] bg-[#f1d1d1]"></span>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Archive Management</span>
          </div>
          <h2 className="text-5xl font-serif italic tracking-tight">
            The <span className="font-sans not-italic font-light">Collections</span>
          </h2>
        </div>
        <Link to="/admin/category/create">
          <button className="group relative flex items-center gap-4 bg-[#494040] text-[#fffcfc] px-8 py-4 rounded-full transition-all duration-500 hover:bg-[#362f2f] shadow-xl">
            <Plus className="w-4 h-4 text-[#f1d1d1] transition-transform group-hover:rotate-90" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">New Category</span>
          </button>
        </Link>
      </header>

      {/* Error State */}
      {error && (
        <div className="border border-red-100 bg-red-50/30 p-6 mb-12 text-center">
          <p className="text-[10px] font-bold tracking-widest text-red-400 uppercase italic">Registry Access Error: {error}</p>
        </div>
      )}

      {/* Loading State */}
      {isPending && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <CategorySkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isPending && categories?.length === 0 && (
        <div className="py-32 text-center border border-dashed border-[#f1d1d1] flex flex-col items-center">
          <Layers className="w-12 h-12 text-[#f1d1d1] mb-6" strokeWidth={1} />
          <h3 className="font-serif italic text-2xl text-[#494040]/40 mb-8">No collections curated yet.</h3>
          <Link to="/admin/category/create">
            <button className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040] border-b border-[#494040] pb-1">
              Begin Curating
            </button>
          </Link>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {!isPending &&
          categories?.map((cat, index) => (
            <div
              key={cat._id}
              className="group flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Editorial Frame */}
              <div className="relative w-full aspect-[4/5] bg-white border border-[#f1d1d1]/30 overflow-hidden mb-6 group-hover:border-[#494040]/40 transition-colors duration-500">
                {imageLoadErrors.has(cat._id) ? (
                  <div className="w-full h-full flex items-center justify-center bg-[#fffcfc]">
                    <ImageIcon className="w-8 h-8 text-[#f1d1d1]/40" strokeWidth={1} />
                  </div>
                ) : (
                  <img
                    src={getBackendImageUrl(cat.filepath) || "/placeholder.svg"}
                    alt={cat.name}
                    className="w-full h-full object-contain p-6 transition-transform duration-1000 ease-out group-hover:scale-110"
                    onError={() => handleImageError(cat._id)}
                    loading="lazy"
                  />
                )}

                {/* Refined Action Overlay */}
                <div className="absolute inset-0 bg-[#494040]/5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <Link to={`/admin/category/${cat._id}`}>
                      <button className="bg-[#fffcfc] text-[#494040] p-3 rounded-full shadow-xl hover:bg-[#494040] hover:text-[#fffcfc] transition-all">
                        <Eye size={14} strokeWidth={1.5} />
                      </button>
                    </Link>
                    <Link to={`/admin/category/${cat._id}/edit`}>
                      <button className="bg-[#fffcfc] text-[#494040] p-3 rounded-full shadow-xl hover:bg-[#494040] hover:text-[#fffcfc] transition-all">
                        <Edit3 size={14} strokeWidth={1.5} />
                      </button>
                    </Link>
                    <button
                      onClick={() => setDeleteId(cat._id)}
                      className="bg-[#fffcfc] text-[#494040] p-3 rounded-full shadow-xl hover:bg-red-500 hover:text-[#fffcfc] transition-all"
                    >
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Identity Section */}
              <div className="text-center space-y-1">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#f1d1d1]">Registry Ref.</span>
                <h3 className="text-xl font-medium tracking-tight text-[#494040] group-hover:text-[#f1d1d1] transition-colors duration-300">
                  {cat.name}
                </h3>
                <div className="w-6 h-[1px] bg-[#f1d1d1] mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          ))}
      </div>
      
      {/* Decorative Registry Tag */}
      <footer className="mt-32 pt-10 border-t border-[#f1d1d1]/20 flex justify-center">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#494040]/10">
       BagBelle — Catalogued 2024
        </p>
      </footer>
    </div>
  )
}