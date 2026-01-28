// import React from 'react';
// import {
//     DashboardStats,
//     TopSellingItems,
//     PendingOrders
// } from '../../components/admin/admindashboard';

// const Dashboard = () => {
//     return (
//         <main className="flex-1 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-[#0B2146] dark:to-gray-900 min-h-screen w-full transition-colors">
//             {/* Hero Header Section */}
//             <div className="relative overflow-hidden">
//                 {/* Decorative background elements */}
//                 <div className="absolute top-0 left-0 w-96 h-96 bg-[#E5BA41]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
//                 <div className="absolute top-0 right-0 w-96 h-96 bg-[#0B2146]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

//                 <div className="relative px-6 pt-8 pb-6">
//                     {/* Breadcrumb */}
//                     <div className="flex items-center gap-2 text-sm mb-4">
//                         <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                         </svg>
//                         <span className="text-gray-500 dark:text-gray-400">Admin</span>
//                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                         <span className="text-gray-700 dark:text-gray-300 font-medium">Dashboard</span>
//                     </div>

//                     {/* Header Content */}
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                         {/* Title Section */}
//                         <div>
//                             <div className="flex items-center gap-3 mb-2">
//                                 <div className="w-12 h-12 bg-gradient-to-br from-[#0B2146] to-[#1a3a6b] rounded-2xl flex items-center justify-center shadow-lg">
//                                     <svg className="w-7 h-7 text-[#E5BA41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                                     </svg>
//                                 </div>
//                                 <div>
//                                     <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//                                         Dashboard Overview
//                                     </h1>
//                                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
//                                         Monitor your business performance in real-time
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Quick Actions */}
//                         <div className="flex items-center gap-3">
//                             <button className="group relative px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[#E5BA41]">
//                                 <div className="flex items-center gap-2">
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                                     </svg>
//                                     <span className="font-medium text-sm">Refresh</span>
//                                 </div>
//                             </button>

//                             <button className="group relative px-5 py-2.5 bg-gradient-to-r from-[#0B2146] to-[#1a3a6b] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
//                                 <div className="flex items-center gap-2">
//                                     <svg className="w-5 h-5 text-[#E5BA41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                                     </svg>
//                                     <span className="font-medium text-sm">Export Report</span>
//                                 </div>
//                             </button>
//                         </div>
//                     </div>

//                     {/* Time indicator */}
//                     <div className="flex items-center gap-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         <span>Last updated: {new Date().toLocaleTimeString()}</span>
//                         <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-2"></span>
//                         <span className="text-green-600 dark:text-green-400 font-medium">Live</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Stats Section with spacing */}
//             <div className="px-6 py-6">
//                 <DashboardStats />
//             </div>

//             {/* Main Content Grid */}
//             <div className="px-6 pb-8">
//                 {/* Section divider */}
//                 <div className="flex items-center gap-4 mb-6">
//                     <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
//                     <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
//                         <div className="w-2 h-2 bg-[#E5BA41] rounded-full"></div>
//                         <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Detailed Analytics</span>
//                         <div className="w-2 h-2 bg-[#0B2146] rounded-full"></div>
//                     </div>
//                     <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
//                 </div>

//                 {/* Components Grid */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     {/* Top Selling Items Card */}
//                     <div className="group relative">
//                         <div className="absolute inset-0 bg-gradient-to-br from-[#E5BA41]/20 to-[#0B2146]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                         <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
//                             {/* Card header decoration */}
//                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E5BA41] via-[#0B2146] to-[#E5BA41]"></div>
//                             <div className="p-6">
//                                 <TopSellingItems />
//                             </div>
//                         </div>
//                     </div>

//                     {/* Pending Orders Card */}
//                     <div className="group relative">
//                         <div className="absolute inset-0 bg-gradient-to-br from-[#0B2146]/20 to-[#E5BA41]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                         <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
//                             {/* Card header decoration */}
//                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0B2146] via-[#E5BA41] to-[#0B2146]"></div>
//                             <div className="p-6">
//                                 <PendingOrders />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Footer info bar */}
//             <div className="px-6 pb-6">
//                 <div className="bg-gradient-to-r from-[#0B2146] to-[#1a3a6b] rounded-2xl p-4 shadow-xl">
//                     <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">
//                         <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 bg-[#E5BA41] rounded-xl flex items-center justify-center">
//                                 <svg className="w-6 h-6 text-[#0B2146]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                             </div>
//                             <div>
//                                 <p className="text-sm font-semibold">Need help?</p>
//                                 <p className="text-xs text-gray-300">Contact support for assistance</p>
//                             </div>
//                         </div>
//                         <button className="px-6 py-2 bg-[#E5BA41] text-[#0B2146] rounded-xl font-semibold text-sm hover:bg-[#d4a830] transition-colors shadow-lg">
//                             Get Support
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default Dashboard;

import React from 'react';
import { 
    DashboardStats, 
    TopSellingItems, 
    PendingOrders 
} from '../../components/admin/admindashboard';
import { RefreshCw, Download, HelpCircle, ChevronRight, BarChart2 } from 'lucide-react';

const Dashboard = () => {
    return (
        <main className="flex-1 bg-[#fffcfc] text-[#494040] min-h-screen w-full transition-colors selection:bg-[#f1d1d1]">
            
            {/* Header Section */}
            <div className="px-8 pt-10 pb-6 max-w-7xl mx-auto">
                {/* Breadcrumb - Minimalist */}
                <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40 mb-10">
                    <span>Atelier</span>
                    <ChevronRight size={10} className="text-[#f1d1d1]" />
                    <span>Admin</span>
                    <ChevronRight size={10} className="text-[#f1d1d1]" />
                    <span className="text-[#494040]">Overview</span>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#f1d1d1]/30 pb-12">
                    {/* Title Section */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[#f1d1d1]">
                            <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
                            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Intelligence</span>
                        </div>
                        <h1 className="text-5xl font-serif italic tracking-tight">
                            Operational <span className="font-sans not-italic font-light">Insight</span>
                        </h1>
                        <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] font-medium">
                            Monitoring performance metrics and acquisition flow in real-time.
                        </p>
                    </div>

                    {/* Quick Actions - Boutique Style */}
                    <div className="flex items-center gap-4">
                        <button className="group flex items-center gap-3 px-6 py-3 border border-[#f1d1d1] text-[#494040] rounded-full hover:bg-[#f1d1d1]/10 transition-all duration-500">
                            <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Refresh Registry</span>
                        </button>

                        <button className="group flex items-center gap-3 px-8 py-3 bg-[#494040] text-[#fffcfc] rounded-full shadow-xl hover:bg-[#362f2f] transition-all duration-500">
                            <Download size={14} className="text-[#f1d1d1] group-hover:translate-y-1 transition-transform" />
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Export Report</span>
                        </button>
                    </div>
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-3 mt-8">
                    <div className="relative flex items-center justify-center">
                        <span className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                        <span className="relative w-2 h-2 bg-green-500 rounded-full"></span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/30 italic font-serif">
                        Registry Live — {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                </div>
            </div>

            {/* Stats Cards Section */}
            <div className="px-8 py-6 max-w-7xl mx-auto">
                <DashboardStats />
            </div>

            {/* Detailed Analytics Section */}
            <div className="px-8 pb-12 max-w-7xl mx-auto">
                
                {/* Section Separator */}
                <div className="flex items-center gap-6 my-16">
                    <div className="h-[1px] flex-1 bg-[#f1d1d1]/20"></div>
                    <div className="flex items-center gap-4 px-6 py-2 border border-[#f1d1d1]/40 rounded-full">
                        <BarChart2 size={14} className="text-[#f1d1d1]" />
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]">Detailed Analytics</span>
                    </div>
                    <div className="h-[1px] flex-1 bg-[#f1d1d1]/20"></div>
                </div>

                {/* Analytics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Top Selling Items Card */}
                    <div className="group relative">
                        <div className="bg-[#fffcfc] border border-[#f1d1d1]/30 p-8 shadow-[0_10px_40px_rgba(73,64,64,0.03)] hover:shadow-[0_15px_50px_rgba(73,64,64,0.08)] transition-all duration-700">
                             <div className="flex items-center justify-between mb-8 border-b border-[#f1d1d1]/20 pb-4">
                                <h3 className="text-xl font-serif italic text-[#494040]">Best Sellers</h3>
                                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#f1d1d1]">Performance</span>
                             </div>
                             <TopSellingItems />
                        </div>
                    </div>

                    {/* Pending Orders Card */}
                    <div className="group relative">
                        <div className="bg-[#fffcfc] border border-[#f1d1d1]/30 p-8 shadow-[0_10px_40px_rgba(73,64,64,0.03)] hover:shadow-[0_15px_50px_rgba(73,64,64,0.08)] transition-all duration-700">
                             <div className="flex items-center justify-between mb-8 border-b border-[#f1d1d1]/20 pb-4">
                                <h3 className="text-xl font-serif italic text-[#494040]">Awaiting Curation</h3>
                                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#f1d1d1]">Operational</span>
                             </div>
                             <PendingOrders />
                        </div>
                    </div>

                </div>
            </div>

            {/* Help Bar */}
            <div className="px-8 pb-12 max-w-7xl mx-auto">
                <div className="bg-[#494040] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#f1d1d1]/10">
                    <div className="flex items-center gap-6 text-[#fffcfc]">
                        <div className="w-14 h-14 border border-[#f1d1d1]/30 flex items-center justify-center">
                            <HelpCircle size={28} strokeWidth={1} className="text-[#f1d1d1]" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold tracking-[0.2em] uppercase">Concierge Support</h4>
                            <p className="text-xs text-[#fffcfc]/50 font-light italic font-serif">Requiring assistance with atelier operations?</p>
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