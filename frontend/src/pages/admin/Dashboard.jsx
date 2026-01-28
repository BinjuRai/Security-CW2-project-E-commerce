import React from "react";
import {
  DashboardStats,
  TopSellingItems,
  PendingOrders,
} from "../../components/admin/admindashboard";
import {
  RefreshCw,
  Download,
  HelpCircle,
  ChevronRight,
  BarChart2,
} from "lucide-react";

const Dashboard = () => {
  return (
    <main className="flex-1 bg-[#fffcfc] text-[#494040] min-h-screen w-full transition-colors selection:bg-[#f1d1d1]">
      <div className="px-8 pt-10 pb-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40 mb-10">
          <span>Bagbelle</span>
          <ChevronRight size={10} className="text-[#f1d1d1]" />
          <span>Admin</span>
          <ChevronRight size={10} className="text-[#f1d1d1]" />
          <span className="text-[#494040]">Overview</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#f1d1d1]/30 pb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#f1d1d1]">
              <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
                Intelligence
              </span>
            </div>
            <h1 className="text-5xl font-serif italic tracking-tight">
              Operational{" "}
              <span className="font-sans not-italic font-light">Insight</span>
            </h1>
            <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] font-medium">
              Monitoring performance metrics and acquisition flow in real-time.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="group flex items-center gap-3 px-6 py-3 border border-[#f1d1d1] text-[#494040] rounded-full hover:bg-[#f1d1d1]/10 transition-all duration-500">
              <RefreshCw
                size={14}
                className="group-hover:rotate-180 transition-transform duration-700"
              />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                Refresh Registry
              </span>
            </button>

            <button className="group flex items-center gap-3 px-8 py-3 bg-[#494040] text-[#fffcfc] rounded-full shadow-xl hover:bg-[#362f2f] transition-all duration-500">
              <Download
                size={14}
                className="text-[#f1d1d1] group-hover:translate-y-1 transition-transform"
              />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                Export Report
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-8">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
            <span className="relative w-2 h-2 bg-green-500 rounded-full"></span>
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/30 italic font-serif">
            Registry Live —{" "}
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>
      </div>

      <div className="px-8 py-6 max-w-7xl mx-auto">
        <DashboardStats />
      </div>

      <div className="px-8 pb-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-6 my-16">
          <div className="h-[1px] flex-1 bg-[#f1d1d1]/20"></div>
          <div className="flex items-center gap-4 px-6 py-2 border border-[#f1d1d1]/40 rounded-full">
            <BarChart2 size={14} className="text-[#f1d1d1]" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]">
              Detailed Analytics
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-[#f1d1d1]/20"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="group relative">
            <div className="bg-[#fffcfc] border border-[#f1d1d1]/30 p-8 shadow-[0_10px_40px_rgba(73,64,64,0.03)] hover:shadow-[0_15px_50px_rgba(73,64,64,0.08)] transition-all duration-700">
              <div className="flex items-center justify-between mb-8 border-b border-[#f1d1d1]/20 pb-4">
                <h3 className="text-xl font-serif italic text-[#494040]">
                  Best Sellers
                </h3>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#f1d1d1]">
                  Performance
                </span>
              </div>
              <TopSellingItems />
            </div>
          </div>

          <div className="group relative">
            <div className="bg-[#fffcfc] border border-[#f1d1d1]/30 p-8 shadow-[0_10px_40px_rgba(73,64,64,0.03)] hover:shadow-[0_15px_50px_rgba(73,64,64,0.08)] transition-all duration-700">
              <div className="flex items-center justify-between mb-8 border-b border-[#f1d1d1]/20 pb-4">
                <h3 className="text-xl font-serif italic text-[#494040]">
                  Awaiting Curation
                </h3>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#f1d1d1]">
                  Operational
                </span>
              </div>
              <PendingOrders />
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-12 max-w-7xl mx-auto">
        <div className="bg-[#494040] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#f1d1d1]/10">
          <div className="flex items-center gap-6 text-[#fffcfc]">
            <div className="w-14 h-14 border border-[#f1d1d1]/30 flex items-center justify-center">
              <HelpCircle
                size={28}
                strokeWidth={1}
                className="text-[#f1d1d1]"
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold tracking-[0.2em] uppercase">
                Concierge Support
              </h4>
              <p className="text-xs text-[#fffcfc]/50 font-light italic font-serif">
                Requiring assistance with bagbelle operations?
              </p>
            </div>
          </div>

          <button className="px-10 py-4 bg-[#f1d1d1] text-[#494040] rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#fffcfc] transition-all duration-500 shadow-xl">
            Request Assistance
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
