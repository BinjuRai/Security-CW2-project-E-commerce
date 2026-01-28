// import { FaUtensils, FaShoppingBag } from "react-icons/fa";
// import React from "react";

// export default function OrderTypeModal({ isOpen, onClose, onSelect }) {
//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 flex items-center justify-center z-50"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="order-type-title"
//     >
//       <div
//         className="bg-white dark:bg-gray-900 rounded-2xl p-12 w-full max-w-3xl h-[60vh] shadow-3xl flex flex-col justify-center items-center space-y-12 animate-fade-in"
//         tabIndex={-1}
//       >
//         <h2
//           id="order-type-title"
//           className="text-4xl font-extrabold text-gray-900 dark:text-gray-100"
//         >
//           Select Order Type
//         </h2>
//         <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-xl">
//           Please choose how you want to receive your order
//         </p>

//         <div className="flex justify-center gap-12 w-full">
//           <button
//             onClick={() => onSelect("dine-in")}
//             className="flex flex-col items-center justify-center gap-4 bg-blue-700 hover:bg-blue-800 focus:ring-6 focus:ring-blue-500 focus:outline-none text-white font-bold rounded-xl px-12 py-8 w-full max-w-[200px] transition"
//             aria-label="Select Dine-In order type"
//           >
//             <FaUtensils className="text-6xl" />
//             <span className="text-2xl">Dine-In</span>
//           </button>

//           <button
//             onClick={() => onSelect("takeaway")}
//             className="flex flex-col items-center justify-center gap-4 bg-green-700 hover:bg-green-800 focus:ring-6 focus:ring-green-500 focus:outline-none text-white font-bold rounded-xl px-12 py-8 w-full max-w-[200px] transition"
//             aria-label="Select Takeaway order type"
//           >
//             <FaShoppingBag className="text-6xl" />
//             <span className="text-2xl">Takeaway</span>
//           </button>
//         </div>

//         <button
//           onClick={onClose}
//           className="mt-auto text-red-600 dark:text-red-500 hover:underline focus:outline-none focus:ring-2 focus:ring-red-400 rounded text-lg font-semibold"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

import { Utensils, ShoppingBag, X, ArrowRight } from "lucide-react";
import React from "react";

export default function OrderTypeModal({ isOpen, onClose, onSelect }) {
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
        {/* Close Icon */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-[#494040]/40 hover:text-[#494040] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-10 md:p-16 flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-12 space-y-3">
            <div className="flex items-center justify-center gap-2 text-[#f1d1d1]">
              <span className="w-8 h-[1px] bg-[#f1d1d1]"></span>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Service Choice</span>
              <span className="w-8 h-[1px] bg-[#f1d1d1]"></span>
            </div>
            <h2 className="text-4xl font-serif italic text-[#494040]">
              How shall we <span className="font-sans not-italic font-light">Serve You?</span>
            </h2>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
            {/* Dine-In Option */}
            <button
              onClick={() => onSelect("dine-in")}
              className="group flex flex-col items-center p-10 border border-[#f1d1d1]/40 hover:border-[#494040] transition-all duration-500 bg-white hover:bg-[#f1d1d1]/5"
            >
              <div className="w-16 h-16 rounded-full bg-[#f1d1d1]/10 flex items-center justify-center mb-6 group-hover:bg-[#494040] transition-colors duration-500">
                <Utensils className="text-[#494040] group-hover:text-[#fffcfc] transition-colors" size={28} strokeWidth={1} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#494040] mb-2">At the Atelier</span>
              <p className="text-[10px] text-[#494040]/40 italic font-serif">Dine-In Experience</p>
              
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={14} className="text-[#f1d1d1]" />
              </div>
            </button>

            {/* Takeaway Option */}
            <button
              onClick={() => onSelect("takeaway")}
              className="group flex flex-col items-center p-10 border border-[#f1d1d1]/40 hover:border-[#494040] transition-all duration-500 bg-white hover:bg-[#f1d1d1]/5"
            >
              <div className="w-16 h-16 rounded-full bg-[#f1d1d1]/10 flex items-center justify-center mb-6 group-hover:bg-[#494040] transition-colors duration-500">
                <ShoppingBag className="text-[#494040] group-hover:text-[#fffcfc] transition-colors" size={28} strokeWidth={1} />
              </div>
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#494040] mb-2">Curbside Pickup</span>
              <p className="text-[10px] text-[#494040]/40 italic font-serif">Takeaway Service</p>

              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={14} className="text-[#f1d1d1]" />
              </div>
            </button>
          </div>

          {/* Secondary Action */}
          <button
            onClick={onClose}
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 hover:text-red-400 transition-colors border-b border-transparent hover:border-red-400 pb-1"
          >
            Go Back to Bag
          </button>
        </div>

        {/* Bottom Accent */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#f1d1d1] to-transparent opacity-30"></div>
      </div>
    </div>
  );
}