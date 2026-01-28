import React from "react";
import { Banknote, CreditCard, X, ArrowRight, ShieldCheck } from "lucide-react";

export default function PaymentMethodModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#494040]/40 backdrop-blur-md flex items-center justify-center z-[60] p-4 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-[#fffcfc] w-full max-w-2xl shadow-[0_20px_50px_rgba(73,64,64,0.15)] border border-[#f1d1d1]/30 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-[#494040]/40 hover:text-[#494040] transition-colors z-10"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <div className="p-10 md:p-16 flex flex-col items-center">
          {/* Header Section */}
          <div className="text-center mb-12 space-y-3">
            <div className="flex items-center justify-center gap-2 text-[#f1d1d1]">
              <span className="w-8 h-[1px] bg-[#f1d1d1]"></span>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#494040]/60">
                Settlement
              </span>
              <span className="w-8 h-[1px] bg-[#f1d1d1]"></span>
            </div>
            <h2 className="text-4xl font-serif italic text-[#494040]">
              Select{" "}
              <span className="font-sans not-italic font-light">
                Payment Method
              </span>
            </h2>
            <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] font-medium">
              Choose your preferred method of transaction
            </p>
          </div>

          {/* Payment Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
            {/* Cash on Delivery Option */}
            <button
              onClick={() => onSelect("cash")}
              className="group flex flex-col items-center p-10 border border-[#f1d1d1]/40 hover:border-[#494040] transition-all duration-500 bg-white hover:bg-[#f1d1d1]/5"
            >
              <div className="w-16 h-16 rounded-full bg-[#f1d1d1]/10 flex items-center justify-center mb-6 group-hover:bg-[#494040] transition-colors duration-500">
                <Banknote
                  className="text-[#494040] group-hover:text-[#fffcfc] transition-colors"
                  size={28}
                  strokeWidth={1}
                />
              </div>
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#494040] mb-2">
                Liquid Currency
              </span>
              <p className="text-[10px] text-[#494040]/40 italic font-serif">
                Cash on Delivery
              </p>

              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={14} className="text-[#f1d1d1]" />
              </div>
            </button>

            {/* Online Payment Option */}
            <button
              onClick={() => onSelect("online")}
              className="group flex flex-col items-center p-10 border border-[#f1d1d1]/40 hover:border-[#494040] transition-all duration-500 bg-white hover:bg-[#f1d1d1]/5"
            >
              <div className="w-16 h-16 rounded-full bg-[#f1d1d1]/10 flex items-center justify-center mb-6 group-hover:bg-[#494040] transition-colors duration-500">
                <CreditCard
                  className="text-[#494040] group-hover:text-[#fffcfc] transition-colors"
                  size={28}
                  strokeWidth={1}
                />
              </div>
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#494040] mb-2">
                Digital Transfer
              </span>
              <p className="text-[10px] text-[#494040]/40 italic font-serif">
                Secure eSewa Payment
              </p>

              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={14} className="text-[#f1d1d1]" />
              </div>
            </button>
          </div>

          {/* Security & Cancel */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#f1d1d1]/5 border border-[#f1d1d1]/20 rounded-full">
              <ShieldCheck size={14} className="text-[#f1d1d1]" />
              <span className="text-[9px] font-bold tracking-widest uppercase text-[#494040]/40">
                Encrypted Gateway Protocol
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 hover:text-red-400 transition-colors border-b border-transparent hover:border-red-400 pb-1"
            >
              Go Back to Bag
            </button>
          </div>
        </div>

        {/* Bottom Aesthetic Detail */}
        <div className="h-1 w-full bg-[#f1d1d1]/10"></div>
      </div>
    </div>
  );
}
