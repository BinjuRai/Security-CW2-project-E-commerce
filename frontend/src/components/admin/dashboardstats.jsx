

import React, { useEffect, useState } from "react";
import { useFetchAllOrders } from "../../hooks/useCreateOrder";
import { 
  ShoppingBag, 
  Banknote, 
  CheckCircle2, 
  Clock, 
  Loader2, 
  TrendingUp 
} from "lucide-react";

const DashboardStats = () => {
  const { data: orders = [], isLoading } = useFetchAllOrders();

  const [completedTodayCount, setCompletedTodayCount] = useState(0);
  const [revenueToday, setRevenueToday] = useState(0);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [totalOrdersServed, setTotalOrdersServed] = useState(0);

  useEffect(() => {
    if (!orders.length) return;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const completedTodayOrders = orders.filter((order) => {
      if (order.status !== "completed") return false;
      const orderDate = new Date(order.date);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    });

    setCompletedTodayCount(completedTodayOrders.length);
    setRevenueToday(completedTodayOrders.reduce((sum, order) => sum + (order.total || 0), 0));
    setPendingOrdersCount(orders.filter(order => order.status === "pending").length);
    setTotalOrdersServed(orders.filter(order => order.status === "completed").length);
  }, [orders]);

  const stats = [
    {
      title: "Daily Acquisitions",
      value: completedTodayCount,
      icon: <ShoppingBag size={20} strokeWidth={1.5} />,
      label: "Orders"
    },
    {
      title: "Financial Yield",
      value: `NPR ${revenueToday.toLocaleString()}`,
      icon: <Banknote size={20} strokeWidth={1.5} />,
      label: "Today"
    },
    {
      title: "Registry Settled",
      value: totalOrdersServed,
      icon: <CheckCircle2 size={20} strokeWidth={1.5} />,
      label: "Lifetime"
    },
    {
      title: "Awaiting Curation",
      value: pendingOrdersCount,
      icon: <Clock size={20} strokeWidth={1.5} />,
      label: "Pending"
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-[#f1d1d1]/30 p-8 h-40 animate-pulse flex flex-col justify-between">
            <div className="w-10 h-10 bg-[#f1d1d1]/20 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-2 bg-[#f1d1d1]/20 w-1/2"></div>
              <div className="h-6 bg-[#f1d1d1]/20 w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group relative bg-[#fffcfc] border border-[#f1d1d1]/30 p-8 shadow-[0_10px_40px_rgba(73,64,64,0.02)] transition-all duration-700 hover:shadow-[0_20px_50px_rgba(73,64,64,0.05)] overflow-hidden"
        >
          {/* Subtle Background Interaction Accent */}
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#f1d1d1]/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 ease-out"></div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* Header: Icon & Category Label */}
            <div className="flex items-start justify-between mb-8">
              <div className="text-[#f1d1d1] group-hover:text-[#494040] transition-colors duration-500">
                {stat.icon}
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-[#494040]/30">{stat.label}</span>
                 <div className="w-1 h-1 rounded-full bg-[#f1d1d1]"></div>
              </div>
            </div>

            {/* Content: Title & Value */}
            <div className="space-y-1">
              <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/50 group-hover:text-[#f1d1d1] transition-colors duration-500">
                {stat.title}
              </h3>
              <p className="text-3xl font-serif italic text-[#494040] tracking-tight">
                {stat.value}
              </p>
            </div>

            {/* Bottom Progress Accent (Boutique Style) */}
            <div className="mt-6 pt-4 border-t border-[#f1d1d1]/20 flex items-center justify-between">
               <div className="flex gap-1">
                  <div className="w-4 h-[1px] bg-[#494040]"></div>
                  <div className="w-1 h-[1px] bg-[#f1d1d1]"></div>
                  <div className="w-1 h-[1px] bg-[#f1d1d1]"></div>
               </div>
               <TrendingUp size={12} className="text-[#f1d1d1] opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;