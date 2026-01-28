


import React from 'react';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

const TopSellingItems = () => {
  const items = [
    { name: 'RE Exhaust', qty: 45, revenue: 'Rs 67,500.00' },
    { name: 'KTM Tailtidy', qty: 30, revenue: 'Rs 27,000.00' },
  ];

  return (
    <div className="bg-[#fffcfc] text-[#494040] selection:bg-[#f1d1d1]">
      {/* Editorial Header */}
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2 text-[#f1d1d1]">
          <span className="w-8 h-[1px] bg-[#f1d1d1]"></span>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Intelligence</span>
        </div>
        <h2 className="text-3xl font-serif italic text-[#494040]">
          Best <span className="font-sans not-italic font-light">Sellers</span>
        </h2>
        <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] font-medium">
          Leading acquisitions by quantity sold within this cycle.
        </p>
      </div>

      {/* Premium Data List */}
      <div className="overflow-hidden border border-[#f1d1d1]/30">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f1d1d1]/10 border-b border-[#f1d1d1]/30">
              <th className="px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">Masterpiece</th>
              <th className="px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">Volume</th>
              <th className="px-6 py-4 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60 text-right">Yield</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1d1d1]/20">
            {items.map((item, idx) => (
              <tr
                key={idx}
                className="group hover:bg-[#f1d1d1]/5 transition-all duration-500"
              >
                <td className="px-6 py-5">
                   <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f1d1d1] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#494040]">
                        {item.name}
                      </span>
                   </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-light italic font-serif">
                    {item.qty} units
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-sm font-medium tracking-tight">
                      {item.revenue}
                    </span>
                    <ArrowUpRight size={12} className="text-[#f1d1d1] opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* List Footer */}
        <div className="p-4 bg-[#f1d1d1]/5 border-t border-[#f1d1d1]/20 flex justify-between items-center">
            <span className="text-[9px] font-bold tracking-widest uppercase text-[#494040]/30 italic font-serif">
             BagBelle Performance Analytics
            </span>
            <div className="flex gap-1">
               <div className="w-1 h-1 rounded-full bg-[#f1d1d1]"></div>
               <div className="w-1 h-1 rounded-full bg-[#f1d1d1]/50"></div>
               <div className="w-1 h-1 rounded-full bg-[#f1d1d1]/20"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TopSellingItems;