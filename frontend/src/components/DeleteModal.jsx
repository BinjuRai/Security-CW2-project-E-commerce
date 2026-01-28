import React from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  description = "Are you sure you want to remove this item? This action cannot be reversed.",
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#494040]/40 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-[#fffcfc] w-full max-w-md shadow-[0_20px_50px_rgba(73,64,64,0.15)] border border-[#f1d1d1]/30 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Line */}
        <div className="h-1 w-full bg-[#f1d1d1]/20"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#494040]/30 hover:text-[#494040] transition-colors"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <div className="p-10 flex flex-col items-center text-center">
          {/* Minimalist Warning Icon */}
          <div className="w-16 h-16 rounded-full bg-[#f1d1d1]/10 flex items-center justify-center mb-6">
            <AlertTriangle
              className="text-[#494040]/40"
              size={28}
              strokeWidth={1}
            />
          </div>

          {/* Header */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-center gap-2 text-[#f1d1d1]">
              <span className="w-6 h-[1px] bg-[#f1d1d1]"></span>
              <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#494040]/60">
                Protocol
              </span>
              <span className="w-6 h-[1px] bg-[#f1d1d1]"></span>
            </div>
            <h2 className="text-3xl font-serif italic text-[#494040] leading-tight">
              {title}
            </h2>
          </div>

          {/* Description */}
          <p className="text-[11px] text-[#494040]/50 uppercase tracking-widest leading-relaxed mb-10 max-w-[280px]">
            {description}
          </p>

          {/* Actions */}
          <div className="flex flex-col w-full gap-3">
            <button
              onClick={onConfirm}
              className="w-full bg-[#494040] text-[#fffcfc] py-4 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-red-500 transition-all duration-500 flex items-center justify-center gap-2 group"
            >
              <Trash2
                size={14}
                className="opacity-50 group-hover:opacity-100"
              />
              Confirm Removal
            </button>

            <button
              onClick={onClose}
              className="w-full py-2 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 hover:text-[#494040] transition-colors"
            >
              Keep Item
            </button>
          </div>
        </div>

        {/* Aesthetic Detail */}
        <div className="flex justify-center pb-6">
          <div className="w-1 h-1 rounded-full bg-[#f1d1d1]"></div>
        </div>
      </div>
    </div>
  );
}
