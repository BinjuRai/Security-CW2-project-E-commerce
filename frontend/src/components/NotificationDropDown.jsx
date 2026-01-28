"use client";

import React, { useState } from "react";
import {
  Bell,
  Clock,
  Check,
  Package,
  X,
  Shield,
  LogIn,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNotifications } from "../hooks/useNotification";

export default function NotificationDropdown({ userId }) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    notifications = [],
    unreadCount = 0,
    markAsRead,
  } = useNotifications(userId);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  /* -----------------------------
     LOGIC UNTOUCHED
  ----------------------------- */
  function formatNotification(notif) {
    if (!notif?.message) return "";
    const isOrderNotification =
      /order/i.test(notif.message) ||
      notif.type === "order" ||
      ["pending", "processing", "completed", "shipped", "delivered"].includes(
        notif.status,
      );
    let orderId = null;
    let shortOrderId = null;
    if (isOrderNotification) {
      const orderIdMatch = notif.message.match(
        /order[:\s#]*([a-zA-Z0-9]{8,})/i,
      );
      orderId = orderIdMatch ? orderIdMatch[1] : null;
      shortOrderId = orderId ? orderId.slice(-4) : null;
    }
    const status =
      notif.status ||
      (() => {
        if (/pending/i.test(notif.message)) return "pending";
        if (/processing/i.test(notif.message)) return "processing";
        if (/completed|delivered/i.test(notif.message)) return "completed";
        return null;
      })();
    let baseMsg = notif.message;
    if (isOrderNotification && status) {
      switch (status) {
        case "pending":
          baseMsg = "Your order is pending confirmation";
          break;
        case "processing":
          baseMsg = "Your order is being prepared";
          break;
        case "completed":
          baseMsg = "Your order has been delivered. Enjoy your meal!";
          break;
      }
    }
    return shortOrderId ? `${baseMsg} - Order #${shortOrderId}` : baseMsg;
  }

  function formatDateTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  }

  /* UPDATED COLORS IN STATUS CONFIG TO MATCH PALETTE */
  function getStatusConfig(notif) {
    const message = notif.message?.toLowerCase() || "";
    const status = notif.status;
    if (message.includes("password") || message.includes("login")) {
      return {
        color: "text-[#494040]",
        bg: "bg-[#f1d1d1]/20",
        icon: <Shield className="w-4 h-4" strokeWidth={1.5} />,
      };
    }
    switch (status) {
      case "pending":
        return {
          color: "text-[#494040]",
          bg: "bg-[#f1d1d1]/20",
          icon: <Clock className="w-4 h-4" strokeWidth={1.5} />,
        };
      case "processing":
        return {
          color: "text-[#fffcfc]",
          bg: "bg-[#494040]",
          icon: <Package className="w-4 h-4" strokeWidth={1.5} />,
        };
      case "completed":
        return {
          color: "text-[#494040]",
          bg: "bg-[#f1d1d1]",
          icon: <Check className="w-4 h-4" strokeWidth={1.5} />,
        };
      default:
        return {
          color: "text-[#494040]/60",
          bg: "bg-transparent border border-[#f1d1d1]",
          icon: <Bell className="w-4 h-4" strokeWidth={1.5} />,
        };
    }
  }

  /* -----------------------------
     UI REDESIGN
  ----------------------------- */
  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={handleToggle}
        className="relative p-2.5 text-[#494040] hover:text-[#f1d1d1] transition-all duration-300"
        aria-label="Notifications"
      >
        <Bell size={22} strokeWidth={1.5} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 bg-[#f1d1d1] text-[#494040] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-[#fffcfc] shadow-sm">
            {unreadCount > 9 ? "9" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={handleClose}
          />

          {/* Dropdown Container */}
          <div className="absolute right-0 mt-4 w-80 md:w-96 bg-[#fffcfc] shadow-[0_20px_50px_rgba(73,64,64,0.15)] border border-[#f1d1d1]/30 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header Section */}
            <div className="px-6 py-6 border-b border-[#f1d1d1]/20">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#f1d1d1] mb-1">
                    <span className="w-6 h-[1px] bg-[#f1d1d1]"></span>
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#494040]/60">
                      Registry
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif italic text-[#494040]">
                    Notifications
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  className="text-[#494040]/30 hover:text-[#494040] transition-colors"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
              {unreadCount > 0 && (
                <p className="text-[9px] font-bold tracking-widest uppercase text-[#f1d1d1] mt-2">
                  {unreadCount} pending updates
                </p>
              )}
            </div>

            {/* Notifications List */}
            {notifications.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <p className="font-serif italic text-[#494040]/40 text-lg">
                  Registry is settled.
                </p>
                <p className="text-[9px] font-bold tracking-widest uppercase text-[#f1d1d1]">
                  No new entries
                </p>
              </div>
            ) : (
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {notifications.slice(0, 5).map((notif) => {
                  const statusConfig = getStatusConfig(notif);

                  return (
                    <button
                      key={notif._id}
                      onClick={() => {
                        markAsRead(notif._id);
                        handleClose();
                      }}
                      className={`w-full text-left px-6 py-5 border-b border-[#f1d1d1]/10 flex items-start gap-4 transition-all duration-300 hover:bg-[#f1d1d1]/5 ${
                        !notif.read ? "bg-[#f1d1d1]/5" : ""
                      }`}
                    >
                      {/* Status Icon Circle */}
                      <div
                        className={`mt-1 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${statusConfig.bg} ${statusConfig.color}`}
                      >
                        {statusConfig.icon}
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-[11px] leading-relaxed tracking-wide ${
                            notif.read
                              ? "text-[#494040]/60 font-light"
                              : "text-[#494040] font-bold uppercase"
                          }`}
                        >
                          {formatNotification(notif)}
                        </p>

                        <div className="flex items-center gap-2 mt-2 opacity-40">
                          <Clock size={10} />
                          <span className="text-[9px] font-bold uppercase tracking-widest">
                            {formatDateTime(notif.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Unread Glow Dot */}
                      {!notif.read && (
                        <div className="mt-2 w-1.5 h-1.5 bg-[#f1d1d1] rounded-full shadow-[0_0_8px_#f1d1d1]" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Footer Section */}
            {notifications.length > 0 && (
              <div className="p-4 bg-[#f1d1d1]/10">
                <Link
                  to="/normal/notification"
                  onClick={handleClose}
                  className="w-full flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040] hover:text-[#f1d1d1] transition-colors py-2"
                >
                  View Archive <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
