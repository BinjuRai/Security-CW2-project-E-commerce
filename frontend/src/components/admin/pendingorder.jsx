// import React, { useState } from "react";
// import {
//     useFetchAllOrders,
//     useUpdateOrderStatus,
// } from "../../hooks/useCreateOrder";
// import OrderDetailsModal from "../OrderDetailsModal";

// const statusStyles = {
//     pending: "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-md",
//     processing: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md",
//     completed: "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md",
// };

// const PendingOrders = () => {
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const { data: orders = [], isLoading, isError } = useFetchAllOrders();
//     const { mutate: updateStatus } = useUpdateOrderStatus();
//     const [statusFilter, setStatusFilter] = useState("all");

//     const handleStatusChange = (orderId, newStatus) => {
//         updateStatus({ orderId, status: newStatus });
//     };

//     const filteredOrders =
//         statusFilter === "all"
//             ? orders
//             : orders.filter((order) => order.status === statusFilter);

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center p-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#E5BA41] border-t-transparent"></div>
//             </div>
//         );
//     }

//     if (isError) {
//         return (
//             <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg">
//                 <p className="text-red-700 dark:text-red-300 font-semibold">⚠️ Failed to load orders. Please try again.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-6">
//             {/* Header Section with Gradient */}
//             <div className="bg-gradient-to-r from-[#0B2146] to-[#1a3a6b] p-6 rounded-2xl shadow-xl">
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                     <div>
//                         <h2 className="text-2xl font-bold text-white flex items-center gap-2">
//                             <svg className="w-7 h-7 text-[#E5BA41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                             </svg>
//                             Orders Management
//                         </h2>
//                         <p className="text-[#E5BA41] text-sm mt-1">{orders.length} total orders</p>
//                     </div>

//                     {/* Filter Buttons */}
//                     <div className="flex flex-wrap gap-2">
//                         {["all", "pending", "processing", "completed"].map((status) => (
//                             <button
//                                 key={status}
//                                 onClick={() => setStatusFilter(status)}
//                                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${statusFilter === status
//                                         ? "bg-[#E5BA41] text-[#0B2146] shadow-lg scale-105"
//                                         : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
//                                     }`}
//                             >
//                                 {status.charAt(0).toUpperCase() + status.slice(1)}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Orders Grid */}
//             {filteredOrders.length === 0 ? (
//                 <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl shadow-lg text-center">
//                     <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//                         </svg>
//                     </div>
//                     <p className="text-gray-500 dark:text-gray-400 text-lg">No orders found</p>
//                     <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try adjusting your filters</p>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//                     {filteredOrders.map((order) => (
//                         <div
//                             key={order._id}
//                             className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-[#E5BA41] cursor-pointer"
//                             onClick={() => {
//                                 setSelectedOrder(order);
//                                 setIsModalOpen(true);
//                             }}
//                         >
//                             {/* Decorative gradient accent */}
//                             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0B2146] via-[#E5BA41] to-[#0B2146]"></div>

//                             <div className="p-5">
//                                 {/* Header */}
//                                 <div className="flex justify-between items-start mb-4">
//                                     <div className="flex items-center gap-3">
//                                         <div className="w-12 h-12 bg-gradient-to-br from-[#0B2146] to-[#1a3a6b] rounded-xl flex items-center justify-center shadow-md">
//                                             <span className="text-[#E5BA41] font-bold text-lg">#{order._id.slice(-5)}</span>
//                                         </div>
//                                         <div>
//                                             <p className="font-bold text-gray-900 dark:text-white text-lg">Order #{order._id.slice(-5)}</p>
//                                             <p className="text-xs text-gray-500 dark:text-gray-400">
//                                                 {order.userId?.username || "Unknown User"}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusStyles[order.status] || "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}>
//                                         {order.status.toUpperCase()}
//                                     </span>
//                                 </div>

//                                 {/* Order Details */}
//                                 <div className="space-y-3 mb-4">
//                                     <div className="flex items-center gap-2 text-sm">
//                                         <svg className="w-4 h-4 text-[#E5BA41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
//                                         </svg>
//                                         <span className="text-gray-700 dark:text-gray-300 font-medium">
//                                             Type: <span className="capitalize text-[#0B2146] dark:text-[#E5BA41]">{order.orderType || "N/A"}</span>
//                                         </span>
//                                     </div>

//                                     <div className="flex items-center gap-2 text-sm">
//                                         <svg className="w-4 h-4 text-[#E5BA41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                                         </svg>
//                                         <span className="text-gray-700 dark:text-gray-300 font-medium">
//                                             {order.products.length} {order.products.length === 1 ? 'item' : 'items'}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 {/* Price */}
//                                 <div className="bg-gradient-to-r from-[#0B2146]/5 to-[#E5BA41]/5 dark:from-[#0B2146]/20 dark:to-[#E5BA41]/20 p-3 rounded-xl mb-4">
//                                     <div className="flex justify-between items-center">
//                                         <span className="text-sm text-gray-600 dark:text-gray-400">Total Amount</span>
//                                         {/* <span className="text-2xl font-bold text-[#0B2146] dark:text-[#E5BA41]">
//                                             Rs {order.total.toLocaleString()} */}
//                                             <span>Rs {(order.total || 0).toLocaleString()}</span>
                                        
//                                     </div>
//                                 </div>

//                                 {/* Status Selector */}
//                                 <div
//                                     className="pt-3 border-t border-gray-200 dark:border-gray-700"
//                                     onClick={(e) => e.stopPropagation()}
//                                 >
//                                     <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">
//                                         Update Status
//                                     </label>
//                                     <select
//                                         className="w-full text-sm font-medium border-2 border-gray-200 dark:border-gray-600 rounded-lg p-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-[#E5BA41] focus:ring-2 focus:ring-[#E5BA41]/20 transition-all cursor-pointer"
//                                         value={order.status}
//                                         onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                                     >
//                                         <option value="pending">📋 Pending</option>
//                                         <option value="processing">⚙️ Processing</option>
//                                         <option value="completed">✅ Completed</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             {/* Hover indicator */}
//                             <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[40px] border-b-[#E5BA41] border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                 <svg className="w-4 h-4 text-[#0B2146] absolute -bottom-6 -right-2 transform rotate-45" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//                                 </svg>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Order Details Modal */}
//             <OrderDetailsModal
//                 order={selectedOrder}
//                 isOpen={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//             />
//         </div>
//     );
// };

// export default PendingOrders;

import React, { useState } from "react";
import {
    useFetchAllOrders,
    useUpdateOrderStatus,
} from "../../hooks/useCreateOrder";
import OrderDetailsModal from "../OrderDetailsModal";
import { 
    ClipboardList, 
    Filter, 
    Clock, 
    RefreshCw, 
    CheckCircle2, 
    ArrowRight, 
    Loader2, 
    Package,
    User,
    ChevronDown
} from "lucide-react";

const statusConfig = {
    pending: {
        label: "Awaiting Action",
        border: "border-[#f1d1d1]",
        text: "text-[#494040]",
        bg: "bg-[#f1d1d1]/10",
        icon: <Clock size={14} />
    },
    processing: {
        label: "In Production",
        border: "border-[#494040]",
        text: "text-[#fffcfc]",
        bg: "bg-[#494040]",
        icon: <RefreshCw size={14} className="animate-spin-slow" />
    },
    completed: {
        label: "Settled",
        border: "border-[#f1d1d1]",
        text: "text-[#494040]",
        bg: "bg-[#fffcfc]",
        icon: <CheckCircle2 size={14} />
    },
};

const PendingOrders = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: orders = [], isLoading, isError } = useFetchAllOrders();
    const { mutate: updateStatus } = useUpdateOrderStatus();
    const [statusFilter, setStatusFilter] = useState("all");

    const handleStatusChange = (orderId, newStatus) => {
        updateStatus({ orderId, status: newStatus });
    };

    const filteredOrders = statusFilter === "all"
        ? orders
        : orders.filter((order) => order.status === statusFilter);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-24">
                <Loader2 className="w-10 h-10 text-[#f1d1d1] animate-spin mb-4" strokeWidth={1} />
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/30">Synchronizing Ledger</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="border border-red-100 bg-red-50/30 p-12 text-center">
                <h2 className="text-xl font-serif italic text-red-400">Ledger Access Error</h2>
                <button onClick={() => window.location.reload()} className="mt-4 text-[10px] font-bold tracking-widest uppercase border-b border-[#494040] pb-1">Retry Authentication</button>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Header Section */}
            <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#f1d1d1]/30 pb-10">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[#f1d1d1]">
                        <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Operations</span>
                    </div>
                    <h1 className="text-5xl font-serif italic tracking-tight text-[#494040]">
                        Acquisition <span className="font-sans not-italic font-light">Management</span>
                    </h1>
                    <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] font-medium">
                        Processing {orders.length} unique client settlement requests.
                    </p>
                </div>

                {/* Refined Filter Controls */}
                <div className="flex flex-wrap gap-3">
                    {["all", "pending", "processing", "completed"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-6 py-2.5 text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-full border ${
                                statusFilter === status
                                    ? "bg-[#494040] border-[#494040] text-[#fffcfc] shadow-lg"
                                    : "border-[#f1d1d1]/40 text-[#494040]/50 hover:border-[#494040]"
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </header>

            {/* Orders Grid */}
            {filteredOrders.length === 0 ? (
                <div className="py-32 text-center border border-dashed border-[#f1d1d1] bg-[#f1d1d1]/5">
                    <Package className="w-10 h-10 text-[#f1d1d1]/40 mx-auto mb-4" strokeWidth={1} />
                    <p className="font-serif italic text-[#494040]/40 text-lg">No acquisitions found in this department.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {filteredOrders.map((order) => {
                        const currentStatus = statusConfig[order.status] || statusConfig.pending;
                        return (
                            <div
                                key={order._id}
                                className="group bg-white border border-[#f1d1d1]/30 p-8 shadow-[0_10px_40px_rgba(73,64,64,0.02)] hover:shadow-[0_20px_50px_rgba(73,64,64,0.05)] transition-all duration-500 relative overflow-hidden cursor-pointer"
                                onClick={() => {
                                    setSelectedOrder(order);
                                    setIsModalOpen(true);
                                }}
                            >
                                {/* Subtle Hover Accent */}
                                <div className="absolute top-0 left-0 w-[2px] h-full bg-[#f1d1d1] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>

                                {/* Card Header */}
                                <div className="flex justify-between items-start mb-10">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold tracking-widest text-[#f1d1d1] uppercase">Registry Reference</p>
                                        <h3 className="text-xl font-serif italic text-[#494040]">#{order._id.slice(-8).toUpperCase()}</h3>
                                    </div>
                                    <div className={`flex items-center gap-2 px-4 py-1.5 border rounded-full ${currentStatus.border} ${currentStatus.bg}`}>
                                        <span className={currentStatus.text}>{currentStatus.icon}</span>
                                        <span className={`text-[9px] font-bold tracking-widest uppercase ${currentStatus.text}`}>
                                            {currentStatus.label}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Details Context */}
                                <div className="grid grid-cols-2 gap-8 mb-10">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-[#494040]/40">
                                            <User size={12} strokeWidth={1.5} />
                                            <span className="text-[9px] font-bold tracking-widest uppercase">Client Identity</span>
                                        </div>
                                        <p className="text-xs font-medium uppercase truncate">{order.userId?.username || "Guest Client"}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-[#494040]/40">
                                            <Package size={12} strokeWidth={1.5} />
                                            <span className="text-[9px] font-bold tracking-widest uppercase">Manifest</span>
                                        </div>
                                        <p className="text-xs font-medium uppercase">{order.products.length} Items Logged</p>
                                    </div>
                                </div>

                                {/* Financial Yield Section */}
                                <div className="bg-[#f1d1d1]/10 p-6 flex justify-between items-end mb-8">
                                    <div className="space-y-1">
                                        <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">Total Settlement</span>
                                        <p className="text-2xl font-serif italic text-[#494040]">
                                            NPR {(order.total || 0).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 block mb-1">Method</span>
                                        <span className="text-[10px] font-bold text-[#f1d1d1] uppercase border-b border-[#f1d1d1] pb-0.5">{order.orderType || "Retail"}</span>
                                    </div>
                                </div>

                                {/* Status Update Control */}
                                <div
                                    className="relative flex items-center group/select"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <label className="absolute left-4 text-[8px] font-bold tracking-widest uppercase text-[#494040]/30 group-hover/select:text-[#f1d1d1] transition-colors">
                                        Protocol Update
                                    </label>
                                    <select
                                        className="w-full bg-transparent border border-[#f1d1d1]/40 rounded-full pl-32 pr-10 py-3 text-[10px] font-bold uppercase tracking-widest text-[#494040] focus:outline-none focus:border-[#494040] transition-all appearance-none cursor-pointer"
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        <option value="pending">Pending Review</option>
                                        <option value="processing">Move to Production</option>
                                        <option value="completed">Finalize Settlement</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 w-3 h-3 text-[#f1d1d1] pointer-events-none" strokeWidth={3} />
                                </div>
                                
                                {/* Bottom Action Indicator */}
                                <div className="mt-8 pt-4 border-t border-[#f1d1d1]/10 flex justify-center">
                                    <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#494040]/20 flex items-center gap-2 group-hover:text-[#494040]/60 transition-colors">
                                        View Full Dossier <ArrowRight size={10} />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Order Details Modal (Matches overall theme) */}
            <OrderDetailsModal
                order={selectedOrder}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default PendingOrders;