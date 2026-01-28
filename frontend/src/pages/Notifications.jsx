

"use client"

import React, { useState } from "react"
import { useNotifications } from "../hooks/useNotification"
import { useContext } from "react"
import { AuthContext } from "../auth/AuthProvider"
import { Link } from "react-router-dom"
import { Bell, Check, Clock, Package, ChevronLeft, CheckCircle2, History } from "lucide-react"
import { motion } from "framer-motion"

export default function Notifications() {
  const { user } = useContext(AuthContext)
  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
  } = useNotifications(user?._id)

  const markAllRead = () => {
    notifications
      .filter((n) => !n.read)
      .forEach((notif) => markAsRead(notif._id))
  }

  const formatDateTime = (isoString) => {
    const date = new Date(isoString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)

    let relativeTime = ""
    if (diffMins < 1) relativeTime = "Just now"
    else if (diffMins < 60) relativeTime = `${diffMins}m ago`
    else if (diffHours < 24) relativeTime = `${diffHours}h ago`
    else relativeTime = date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })

    const fullDateTime = date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

    return { relativeTime, fullDateTime }
  }

  function getStatusConfig(message) {
    if (/pending/i.test(message)) {
      return {
        bg: "bg-[#f1d1d1]/20",
        color: "text-[#494040]",
        icon: <Clock size={16} />,
      }
    }
    if (/processing/i.test(message)) {
      return {
        bg: "bg-[#494040]",
        color: "text-[#fffcfc]",
        icon: <Package size={16} />,
      }
    }
    if (/completed|delivered/i.test(message)) {
      return {
        bg: "bg-[#f1d1d1]",
        color: "text-[#494040]",
        icon: <CheckCircle2 size={16} />,
      }
    }
    return {
      bg: "bg-transparent border border-[#f1d1d1]",
      color: "text-[#494040]",
      icon: <Bell size={16} />,
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffcfc] flex flex-col justify-center items-center">
        <div className="w-10 h-10 border-2 border-[#f1d1d1] border-t-[#494040] rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40">Opening Archive</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fffcfc] flex items-center justify-center p-8 text-[#494040]">
        <div className="text-center">
          <History className="w-12 h-12 text-[#f1d1d1] mx-auto mb-6" strokeWidth={1} />
          <h2 className="text-2xl font-serif italic mb-2">Registry Offline</h2>
          <p className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-8">Failed to synchronize your notifications.</p>
          <button onClick={() => window.location.reload()} className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-[#494040] pb-1">Reconnect</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-16 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <Link
          to="/normal/dash"
          className="group inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40 hover:text-[#494040] mb-12 transition-all"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Return to Boutique
        </Link>

        {/* Page Header */}
        <header className="mb-20 border-b border-[#f1d1d1]/30 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#f1d1d1]">
                <span className="w-10 h-[1px] bg-[#f1d1d1]"></span>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Archive Journal</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight">
                Notifications
              </h1>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">
                {unreadCount > 0 ? (
                  <>You have <span className="text-[#494040]">{unreadCount}</span> pending alerts</>
                ) : (
                  "The registry is current"
                )}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-3 bg-[#494040] text-[#fffcfc] px-8 py-4 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#362f2f] transition-all shadow-xl"
              >
                <Check size={14} />
                Clear All Alerts
              </button>
            )}
          </div>
        </header>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="py-32 text-center">
            <div className="w-20 h-20 border border-[#f1d1d1] rounded-full flex items-center justify-center mx-auto mb-8">
              <Bell className="w-8 h-8 text-[#f1d1d1]" strokeWidth={1} />
            </div>
            <h2 className="text-2xl font-serif italic text-[#494040]/40">All accounts are settled.</h2>
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#f1d1d1] mt-2">No new history to report</p>
          </div>
        ) : (
          <div className="space-y-6">
            {notifications.map((notif, index) => {
              const config = getStatusConfig(notif.message)
              const { relativeTime, fullDateTime } = formatDateTime(notif.createdAt)

              return (
                <motion.div
                  key={notif._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative p-6 transition-all duration-500 border border-[#f1d1d1]/20 ${
                    !notif.read ? "bg-[#f1d1d1]/5 shadow-[0_10px_30px_rgba(241,209,209,0.15)]" : "bg-white/50"
                  }`}
                >
                  <div className="flex gap-6 items-start">
                    {/* Status Icon */}
                    <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${config.bg} ${config.color}`}>
                      {config.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <p className={`text-sm leading-relaxed tracking-wide ${notif.read ? "text-[#494040]/70 font-light" : "text-[#494040] font-bold uppercase tracking-widest text-[11px]"}`}>
                          {notif.message}
                        </p>
                        {!notif.read && (
                          <button
                            onClick={() => markAsRead(notif._id)}
                            className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#f1d1d1] hover:text-[#494040] transition-colors border-b border-[#f1d1d1] pb-0.5"
                          >
                            Acknowledge
                          </button>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 opacity-40">
                          <Clock size={12} />
                          <span className="text-[9px] font-bold uppercase tracking-widest">{relativeTime}</span>
                        </div>
                        <span className="w-1 h-1 bg-[#f1d1d1] rounded-full opacity-50"></span>
                        <span className="text-[9px] font-medium tracking-widest uppercase opacity-30 italic font-serif lowercase">
                          {fullDateTime}
                        </span>
                      </div>
                    </div>

                    {/* New Indicator */}
                    {!notif.read && (
                      <div className="mt-2 w-2 h-2 bg-[#f1d1d1] rounded-full shadow-[0_0_10px_#f1d1d1]" />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}