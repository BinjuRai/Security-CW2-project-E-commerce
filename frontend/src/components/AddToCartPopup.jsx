"use client";

import { useEffect } from "react";
import { Plus, Minus, X, ShoppingBag } from "lucide-react";

export default function AddToCartPopup({
  product,
  quantity,
  onIncrement,
  onDecrement,
  onClose,
  duration = 4000,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  if (!product) return null;

  return (
    <div className="fixed bottom-8 right-8 w-[340px] bg-[#fffcfc] shadow-[0_15px_50px_rgba(73,64,64,0.15)] border border-[#f1d1d1]/50 p-6 z-[9999] animate-in slide-in-from-right-10 duration-500">
      {/* Top Accent Line (Auto-close progress bar feel) */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-[#f1d1d1] animate-progress-shrink"
        style={{ animationDuration: `${duration}ms` }}
      ></div>

      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <ShoppingBag
              size={14}
              className="text-[#f1d1d1]"
              strokeWidth={1.5}
            />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">
              Added to Bag
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#494040]/20 hover:text-[#494040] transition-colors"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Product Details */}
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-white border border-[#f1d1d1]/20 flex-shrink-0 p-1">
            <img
              src={product.productImage}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-center overflow-hidden">
            <h4 className="font-serif italic text-[#494040] truncate text-lg leading-tight">
              {product.name}
            </h4>
            <p className="text-[10px] font-bold tracking-widest text-[#494040]/30 uppercase mt-1">
              Ref. #{product._id?.slice(-5).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#f1d1d1]/20"></div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/40">
            Adjust Quantity
          </span>
          <div className="flex items-center border border-[#f1d1d1] rounded-full px-3 py-1">
            <button
              onClick={onDecrement}
              disabled={quantity <= 1}
              className="p-1 text-[#494040] hover:text-[#f1d1d1] disabled:opacity-20 transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="px-4 text-xs font-bold text-[#494040] min-w-[30px] text-center">
              {quantity}
            </span>
            <button
              onClick={onIncrement}
              className="p-1 text-[#494040] hover:text-[#f1d1d1] transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Global CSS for progress animation if not using Tailwind config */}
      <style jsx>{`
        @keyframes progress-shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        .animate-progress-shrink {
          animation-name: progress-shrink;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
}
