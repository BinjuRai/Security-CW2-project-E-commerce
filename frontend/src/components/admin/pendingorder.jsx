
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