// // components/StatCard.jsx
// import React from "react";

// export default function StatCard({ title, value, bgImage }) {
//   return (
//     <div
//       className="relative p-4 rounded shadow text-white h-40 flex flex-col justify-end"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Overlay for better text visibility */}
//       <div className="absolute inset-0 bg-black bg-opacity-40 rounded"></div>

//       {/* Content */}
//       <h3 className="relative text-sm font-semibold">{title}</h3>
//       <p className="relative text-2xl font-bold">{value}</p>
//     </div>
//   );
// }

// components/StatCard.jsx
import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div className="relative bg-[#fffcfc] border border-[#f1d1d1]/30 p-8 flex flex-col justify-between min-h-[180px] shadow-[0_10px_30px_rgba(73,64,64,0.02)] transition-all duration-500 hover:shadow-[0_15px_40px_rgba(73,64,64,0.05)] group overflow-hidden">
      
      {/* Subtle Decorative Background Accent */}
      <div className="absolute -right-6 -top-6 w-32 h-32 border border-[#f1d1d1]/20 rounded-full group-hover:scale-110 transition-transform duration-1000 ease-out" />
      
      {/* Header Section */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-6 h-[1px] bg-[#f1d1d1]"></span>
          <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#494040]/40">
            {title}
          </h3>
        </div>
      </div>

      {/* Value Section */}
      <div className="relative z-10 mt-auto">
        <p className="text-5xl font-serif italic text-[#494040] tracking-tighter transition-all duration-500 group-hover:text-[#f1d1d1]">
          {value}
        </p>
        
        {/* Subtle Bottom Registry Label */}
        <div className="mt-4 flex items-center justify-between border-t border-[#f1d1d1]/10 pt-3">
          <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-[#494040]/20">
            Verified Registry
          </span>
          <div className="w-1 h-1 rounded-full bg-[#f1d1d1]"></div>
        </div>
      </div>

      {/* Hover Background Tint */}
      <div className="absolute inset-0 bg-[#f1d1d1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}