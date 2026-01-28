

"use client";

import { useFetchOrdersByUser, useDeleteOrder } from "../hooks/useCreateOrder";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { ShoppingBag, Calendar, Package, ArrowRight, Loader2, History } from "lucide-react";
import MyOrderCard from "../components/MyOrderCard";
import DeleteModal from "../components/DeleteModal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const groupOrdersByDate = (orders) => {
  const grouped = {};
  orders.forEach((order) => {
    const dateKey = new Date(order.date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(order);
  });
  return grouped;
};

export default function MyOrders() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = user?._id;

  const { data: orders = [], isLoading, isError } = useFetchOrdersByUser(userId);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const deleteOrderMutation = useDeleteOrder();

  const openDeleteModal = (orderId) => {
    setOrderToDelete(orderId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setOrderToDelete(null);
  };

  const confirmDelete = () => {
    if (!orderToDelete) return;
    deleteOrderMutation.mutate(orderToDelete, {
      onSuccess: () => closeDeleteModal(),
      onError: () => {
        toast.error("Failed to delete order.");
        closeDeleteModal();
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fffcfc] flex flex-col justify-center items-center">
        <Loader2 className="w-10 h-10 text-[#f1d1d1] animate-spin mb-4" strokeWidth={1} />
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40">Retrieving Archive</p>
      </div>
    );
  }

  if (isError)
    return (
      <div className="min-h-screen bg-[#fffcfc] flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <History className="w-12 h-12 text-[#f1d1d1] mx-auto mb-6" strokeWidth={1} />
          <h2 className="text-2xl font-serif italic text-[#494040] mb-2">Archive Unavailable</h2>
          <p className="text-xs text-[#494040]/50 tracking-wide uppercase mb-8">We encountered an error curating your history.</p>
          <button onClick={() => window.location.reload()} className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040] border-b border-[#494040] pb-1">Retry Access</button>
        </div>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="min-h-screen bg-[#fffcfc] flex items-center justify-center p-8">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 border border-[#f1d1d1] rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag className="w-8 h-8 text-[#f1d1d1]" strokeWidth={1} />
          </div>
          <h2 className="text-4xl font-serif italic text-[#494040] mb-4">No Curations Found</h2>
          <p className="text-sm font-light text-[#494040]/60 mb-10 leading-relaxed">
            Your collection history is currently empty. Start your journey by exploring our masterfully crafted selection.
          </p>
          <button 
            onClick={() => navigate("/normal/dash")}
            className="bg-[#494040] text-[#fffcfc] px-10 py-4 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#362f2f] transition-all"
          >
            Enter the Boutique
          </button>
        </div>
      </div>
    );

  const groupedOrders = groupOrdersByDate(orders);

  return (
    <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <header className="mb-20">
          <div className="flex items-center gap-3 text-[#f1d1d1] mb-4">
            <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Private Archive</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight">
            Order <span className="font-sans not-italic font-light">History</span>
          </h1>
          <p className="mt-4 text-[#494040]/50 font-light text-sm max-w-md italic font-serif">
            A comprehensive record of your acquisitions and bespoke modifications.
          </p>
        </header>

 
        <div className="space-y-24">
          {Object.entries(groupedOrders).map(([date, ordersOnDate], sectionIndex) => (
            <section key={date} className="relative">
        
              <div className="absolute -left-12 top-0 hidden xl:block">
                 <div className="rotate-90 origin-left text-[9px] font-bold tracking-[0.5em] uppercase text-[#f1d1d1] whitespace-nowrap">
                   {date}
                 </div>
              </div>

           
              <div className="flex items-center gap-4 mb-10 xl:mb-12 border-b border-[#f1d1d1]/20 pb-4">
                <Calendar className="w-4 h-4 text-[#f1d1d1]" strokeWidth={1.5} />
                <h2 className="text-xl font-serif italic text-[#494040]/80">{date}</h2>
                <span className="text-[9px] font-bold tracking-widest text-[#f1d1d1] uppercase ml-auto">
                  {ordersOnDate.length} {ordersOnDate.length === 1 ? 'Record' : 'Records'}
                </span>
              </div>

      
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
                {ordersOnDate.map((order) => (
                  <MyOrderCard key={order._id} order={order} onDelete={openDeleteModal} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>


      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Protocol: Delete Record"
        description="Are you sure you wish to permanently remove this acquisition from your archive? This action is irreversible."
      />
    </div>
  );
}