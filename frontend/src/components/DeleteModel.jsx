// export default function DeleteModel({ onClose, onConfirm, message }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//         <p className="mb-4 text-gray-700">{message}</p>
//         <div className="flex justify-end gap-3">
//           <button
//             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//             onClick={onConfirm}
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { AlertTriangle, Trash2, X } from "lucide-react";

export default function DeleteModel({ onClose, onConfirm, message }) {
  return (
    <div className="fixed inset-0 bg-[#494040]/40 backdrop-blur-md flex items-center justify-center z-[70] p-4 animate-in fade-in duration-300">
      <div className="bg-[#fffcfc] w-full max-w-md shadow-[0_20px_50px_rgba(73,64,64,0.15)] border border-[#f1d1d1]/30 relative overflow-hidden">
        
        {/* Subtle top accent indicating a warning */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-red-300 to-transparent opacity-50" />

        <div className="p-8 md:p-10">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-[#f1d1d1] mb-2">
              <span className="w-6 h-[1px] bg-red-300/50"></span>
              <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-red-400/80">
                Destructive Action
              </span>
            </div>
            <h3 className="text-3xl font-serif italic text-[#494040] flex items-center gap-3">
              <AlertTriangle className="text-red-400" size={24} strokeWidth={1.5} />
              Are you sure?
            </h3>
          </div>

          {/* Message Content */}
          <p className="text-sm font-light text-[#494040]/70 leading-relaxed mb-10">
            {message || "This action cannot be undone. Please confirm that you wish to permanently remove this item from the collection."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-end gap-6 pt-6 border-t border-[#f1d1d1]/30">
            <button
              onClick={onClose}
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 hover:text-[#494040] transition-colors"
            >
              Abort
            </button>

            <button
              onClick={onConfirm}
              className="w-full md:w-auto bg-[#494040] text-[#fffcfc] hover:bg-red-800 transition-colors duration-500 px-8 py-4 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase shadow-xl flex items-center justify-center gap-3 group"
            >
              <Trash2 size={14} className="group-hover:scale-110 transition-transform" />
              <span>Confirm Removal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}