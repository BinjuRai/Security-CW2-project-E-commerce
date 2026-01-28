"use client";

import {
  Clock,
  Check,
  RefreshCw,
  Trash2,
  Package,
  Calendar,
  Tag,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { getBackendImageUrl } from "../utils/backend-image";

const statusConfig = {
  pending: {
    label: "Awaiting Confirmation",
    border: "border-[#f1d1d1]",
    textColor: "text-[#494040]",
    icon: <Clock size={14} />,
    dot: "bg-[#f1d1d1]",
  },
  processing: {
    label: "In Production",
    border: "border-[#494040]",
    textColor: "text-[#494040]",
    icon: <RefreshCw size={14} className="animate-spin-slow" />,
    dot: "bg-[#494040]",
  },
  completed: {
    label: "Order Finalized",
    border: "border-[#f1d1d1]",
    textColor: "text-[#fffcfc]",
    bg: "bg-[#494040]",
    icon: <Check size={14} />,
    dot: "bg-[#f1d1d1]",
  },
  default: {
    label: "Status Unknown",
    border: "border-gray-200",
    textColor: "text-gray-400",
    icon: <Package size={14} />,
    dot: "bg-gray-200",
  },
};

function formatCurrency(amount) {
  return amount.toLocaleString("en-IN");
}

function calculateGrandTotal(products) {
  return products.reduce((total, item) => {
    const addonsTotal = item.addons
      ? item.addons.reduce(
          (sum, addon) => sum + addon.price * addon.quantity,
          0,
        )
      : 0;
    return total + item.price * item.quantity + addonsTotal;
  }, 0);
}

export default function MyOrderCard({ order, onDelete }) {
  const status = statusConfig[order.status] || statusConfig.default;
  const grandTotal = calculateGrandTotal(order.products || []);

  return (
    <article
      aria-label={`Order ${order._id}`}
      className="bg-[#fffcfc] border border-[#f1d1d1]/30 overflow-hidden shadow-[0_10px_40px_rgba(73,64,64,0.03)] group"
    >
      {/* Editorial Header */}
      <div className="p-6 md:p-8 border-b border-[#f1d1d1]/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#f1d1d1] mb-1">
            <span className="w-6 h-[1px] bg-[#f1d1d1]"></span>
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase">
              Order Reference
            </span>
          </div>
          <h3 className="text-2xl font-serif italic text-[#494040]">
            #{order._id.slice(-8).toUpperCase()}
          </h3>
        </div>

        <div
          className={`flex items-center gap-3 px-6 py-2 border rounded-full ${status.border} ${status.bg || ""}`}
        >
          <span className={status.textColor}>{status.icon}</span>
          <span
            className={`text-[10px] font-bold tracking-[0.2em] uppercase ${status.textColor}`}
          >
            {status.label}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 md:p-8 space-y-8">
        {/* Meta Bar */}
        <div className="flex items-center gap-8 border-b border-[#f1d1d1]/10 pb-6">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold tracking-widest text-[#494040]/30 uppercase mb-1">
              Placement Date
            </span>
            <div className="flex items-center gap-2 text-[#494040] text-xs font-medium uppercase tracking-wider">
              <Calendar size={12} className="text-[#f1d1d1]" />
              {new Date(order.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold tracking-widest text-[#494040]/30 uppercase mb-1">
              Curation Size
            </span>
            <div className="flex items-center gap-2 text-[#494040] text-xs font-medium uppercase tracking-wider">
              <Package size={12} className="text-[#f1d1d1]" />
              {order.products?.length || 0} Products
            </div>
          </div>
        </div>

        {/* Product Items */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">
              Items Summary
            </span>
          </div>

          <div className="grid gap-6">
            {order.products?.map((item) => {
              const imgSrc = item.productImage?.startsWith("http")
                ? item.productImage
                : getBackendImageUrl(item.productImage);

              const addonsTotal = item.addons
                ? item.addons.reduce(
                    (sum, addon) => sum + addon.price * addon.quantity,
                    0,
                  )
                : 0;

              return (
                <div
                  key={item._id}
                  className="flex gap-6 pb-6 border-b border-[#f1d1d1]/10 last:border-0 items-start"
                >
                  {/* Image Frame */}
                  <div className="relative flex-shrink-0 w-20 h-24 bg-white border border-[#f1d1d1]/30 p-2">
                    <img
                      src={imgSrc || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute -top-2 -right-2 bg-[#494040] text-[#fffcfc] text-[9px] font-bold px-2 py-0.5 rounded-full">
                      {item.quantity}
                    </div>
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-[#494040]">
                        {item.name}
                      </h4>
                      <span className="text-sm font-serif italic text-[#494040]">
                        NPR{" "}
                        {formatCurrency(
                          item.price * item.quantity + addonsTotal,
                        )}
                      </span>
                    </div>

                    {/* Add-ons List */}
                    {item.addons && item.addons.length > 0 && (
                      <div className="mt-3 bg-[#f1d1d1]/5 p-3 space-y-1 border-l border-[#f1d1d1]">
                        {item.addons.map((addon, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-[10px] text-[#494040]/50 tracking-wide uppercase"
                          >
                            <span>
                              + {addon.name} (x{addon.quantity})
                            </span>
                            <span>
                              NPR {formatCurrency(addon.price * addon.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grand Total & Actions */}
        <div className="pt-8 mt-4 border-t border-[#494040] flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="flex flex-col items-start md:items-start">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40 mb-1">
              Total Investment
            </span>
            <p className="text-4xl font-serif text-[#494040]">
              NPR {formatCurrency(grandTotal)}
            </p>
          </div>

          <div className="flex items-center gap-6 w-full md:w-auto">
            <button
              onClick={() => onDelete(order._id)}
              className="flex-1 md:flex-none text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 hover:text-red-400 transition-colors py-4 px-2"
            >
              Cancel Order
            </button>
            <button className="flex-1 md:flex-none bg-[#494040] text-[#fffcfc] px-10 py-4 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-3 group hover:bg-[#362f2f] transition-all">
              Details{" "}
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
