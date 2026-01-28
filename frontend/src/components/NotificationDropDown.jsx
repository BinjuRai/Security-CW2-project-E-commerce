// // // src/components/NotificationDropdown.jsx
// // "use client"

// // import React, { useState } from "react"
// // import { Bell, Clock, CheckCircle, Package, X } from "lucide-react"
// // import { Link } from "react-router-dom"
// // import { useNotifications } from "../hooks/useNotification"

// // export default function NotificationDropdown({ userId }) {
// //   const [isOpen, setIsOpen] = useState(false)
// //   const { notifications, unreadCount, markAsRead } = useNotifications(userId)

// //   const handleToggle = () => setIsOpen(!isOpen)
// //   const handleClose = () => setIsOpen(false)

// //   // Format message and status
// //   function formatNotification(notif) {
// //     const orderIdMatch = notif.message.match(/([a-zA-Z0-9]{8,})/)
// //     const orderId = orderIdMatch ? orderIdMatch[1] : null
// //     const shortOrderId = orderId ? orderId.slice(-4) : null

// //     const status =
// //       notif.status ||
// //       (() => {
// //         if (/pending/i.test(notif.message)) return "pending"
// //         if (/processing/i.test(notif.message)) return "processing"
// //         if (/completed/i.test(notif.message)) return "completed"
// //         return null
// //       })()

// //     let baseMsg = ""
// //     switch (status) {
// //       case "pending":
// //         baseMsg = "Your order is pending confirmation"
// //         break
// //       case "processing":
// //         baseMsg = "Your order is being prepared"
// //         break
// //       case "completed":
// //         baseMsg = "Your order has been delivered. Enjoy your meal!"
// //         break
// //       default:
// //         baseMsg = notif.message
// //     }

// //     return shortOrderId ? `${baseMsg}. Order #${shortOrderId}` : baseMsg
// //   }

// //   function formatDateTime(dateString) {
// //     const date = new Date(dateString)
// //     const now = new Date()
// //     const diffMs = now - date
// //     const diffMins = Math.floor(diffMs / 60000)
// //     const diffHours = Math.floor(diffMins / 60)
// //     const diffDays = Math.floor(diffHours / 24)

// //     if (diffMins < 1) return "Just now"
// //     if (diffMins < 60) return `${diffMins}m ago`
// //     if (diffHours < 24) return `${diffHours}h ago`
// //     if (diffDays < 7) return `${diffDays}d ago`

// //     return date.toLocaleDateString("en-GB", {
// //       day: "numeric",
// //       month: "short",
// //     })
// //   }

// //   function getStatusConfig(status) {
// //     switch (status) {
// //       case "pending":
// //         return {
// //           color: "text-amber-600",
// //           bg: "bg-amber-50",
// //           icon: <Clock className="w-4 h-4" />,
// //         }
// //       case "processing":
// //         return {
// //           color: "text-blue-400",
// //           bg: "bg-blue-50",
// //           icon: <Package className="w-4 h-4" />,
// //         }
// //       case "completed":
// //         return {
// //           color: "text-emerald-600",
// //           bg: "bg-emerald-50",
// //           icon: <CheckCircle className="w-4 h-4" />,
// //         }
// //       default:
// //         return {
// //           color: "text-gray-600",
// //           bg: "bg-gray-50",
// //           icon: <Bell className="w-4 h-4" />,
// //         }
// //     }
// //   }

// //   return (
// //     <div className="relative">
// //       {/* Bell Icon Button */}
// //       <button
// //         onClick={handleToggle}
// //         className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
// //         aria-label="Notifications"
// //       >
// //         <Bell className="w-6 h-6 text-gray-700" />
// //         {unreadCount > 0 && (
// //           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 shadow-lg">
// //             {unreadCount > 9 ? "9+" : unreadCount}
// //           </span>
// //         )}
// //       </button>

// //       {/* Dropdown Panel */}
// //       {isOpen && (
// //         <>
// //           {/* Backdrop */}
// //           <div
// //             className="fixed inset-0 z-40"
// //             onClick={handleClose}
// //           />

// //           {/* Dropdown Content */}
// //           <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
// //             {/* Header */}
// //             <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
// //               <div className="flex items-center gap-3">
// //                 <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center shadow-md">
// //                   <Bell className="w-5 h-5 text-white" />
// //                 </div>
// //                 <div>
// //                   <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
// //                   {unreadCount > 0 && (
// //                     <p className="text-xs text-gray-600">{unreadCount} unread</p>
// //                   )}
// //                 </div>
// //               </div>
// //               <button
// //                 onClick={handleClose}
// //                 className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
// //               >
// //                 <X className="w-5 h-5 text-gray-600" />
// //               </button>
// //             </div>

// //             {/* Notifications List */}
// //             {notifications.length === 0 ? (
// //               <div className="p-12 text-center">
// //                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //                   <Bell className="w-8 h-8 text-gray-400" />
// //                 </div>
// //                 <p className="text-gray-500 font-medium">No notifications</p>
// //                 <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
// //               </div>
// //             ) : (
// //               <div className="max-h-96 overflow-y-auto">
// //                 {notifications.slice(0, 5).map((notif) => {
// //                   const statusConfig = getStatusConfig(notif.status)
// //                   return (
// //                     <button
// //                       key={notif._id}
// //                       onClick={() => {
// //                         markAsRead(notif._id)
// //                         handleClose()
// //                       }}
// //                       className={`w-full text-left px-5 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${!notif.read ? "bg-blue-50/50" : ""
// //                         }`}
// //                     >
// //                       <div className="flex gap-3">
// //                         {/* Status Icon */}
// //                         <div className={`flex-shrink-0 w-10 h-10 ${statusConfig.bg} rounded-full flex items-center justify-center ${statusConfig.color}`}>
// //                           {statusConfig.icon}
// //                         </div>

// //                         {/* Content */}
// //                         <div className="flex-1 min-w-0">
// //                           <p className={`text-sm ${notif.read ? "text-gray-700" : "text-gray-900 font-semibold"}`}>
// //                             {formatNotification(notif)}
// //                           </p>
// //                           <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
// //                             <Clock className="w-3 h-3" />
// //                             {formatDateTime(notif.createdAt)}
// //                           </p>
// //                         </div>

// //                         {/* Unread Indicator */}
// //                         {!notif.read && (
// //                           <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
// //                         )}
// //                       </div>
// //                     </button>
// //                   )
// //                 })}
// //               </div>
// //             )}

// //             {/* Footer */}
// //             {notifications.length > 0 && (
// //               <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
// //                 <Link
// //                   to="/normal/notification"
// //                   onClick={handleClose}
// //                   className="text-blue-400 hover:text-blue-500 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
// //                 >
// //                   View all notifications
// //                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //                   </svg>
// //                 </Link>
// //               </div>
// //             )}
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   )
// // }

// // src/components/NotificationDropdown.jsx
// "use client"

// import React, { useState } from "react"
// import { Bell, Clock, Check, Package, X, ArrowRight } from "lucide-react"
// import { Link } from "react-router-dom"
// import { useNotifications } from "../hooks/useNotification"

// export default function NotificationDropdown({ userId }) {
//   const [isOpen, setIsOpen] = useState(false)
//   const { notifications, unreadCount, markAsRead } = useNotifications(userId)

//   const handleToggle = () => setIsOpen(!isOpen)
//   const handleClose = () => setIsOpen(false)

//   function formatNotification(notif) {
//     const orderIdMatch = notif.message.match(/([a-zA-Z0-9]{8,})/)
//     const orderId = orderIdMatch ? orderIdMatch[1] : null
//     const shortOrderId = orderId ? orderId.slice(-4).toUpperCase() : null

//     const status = notif.status || (() => {
//         if (/pending/i.test(notif.message)) return "pending"
//         if (/processing/i.test(notif.message)) return "processing"
//         if (/completed/i.test(notif.message)) return "completed"
//         return null
//       })()

//     let baseMsg = ""
//     switch (status) {
//       case "pending":
//         baseMsg = "Order is awaiting confirmation"
//         break
//       case "processing":
//         baseMsg = "Your selection is being prepared"
//         break
//       case "completed":
//         baseMsg = "Delivery successfully completed"
//         break
//       default:
//         baseMsg = notif.message
//     }

//     return shortOrderId ? `${baseMsg} (#${shortOrderId})` : baseMsg
//   }

//   function formatDateTime(dateString) {
//     const date = new Date(dateString)
//     const now = new Date()
//     const diffMs = now - date
//     const diffMins = Math.floor(diffMs / 60000)
//     if (diffMins < 60) return `${diffMins}m ago`
//     return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
//   }

//   function getStatusConfig(status) {
//     switch (status) {
//       case "pending":
//         return { icon: <Clock size={14} />, bg: "bg-[#f1d1d1]/20", color: "text-[#494040]" }
//       case "processing":
//         return { icon: <Package size={14} />, bg: "bg-[#494040]", color: "text-[#fffcfc]" }
//       case "completed":
//         return { icon: <Check size={14} />, bg: "bg-[#f1d1d1]", color: "text-[#494040]" }
//       default:
//         return { icon: <Bell size={14} />, bg: "bg-transparent border border-[#f1d1d1]", color: "text-[#494040]" }
//     }
//   }

//   return (
//     <div className="relative">
//       {/* Bell Icon Button */}
//       <button
//         onClick={handleToggle}
//         className="relative p-2.5 text-[#494040] hover:text-[#f1d1d1] transition-colors duration-300"
//         aria-label="Notifications"
//       >
//         <Bell size={22} strokeWidth={1.5} />
//         {unreadCount > 0 && (
//           <span className="absolute top-2 right-2 bg-[#f1d1d1] text-[#494040] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm border border-[#fffcfc]">
//             {unreadCount > 9 ? "9" : unreadCount}
//           </span>
//         )}
//       </button>

//       {/* Dropdown Panel */}
//       {isOpen && (
//         <>
//           <div className="fixed inset-0 z-40 bg-transparent" onClick={handleClose} />

//           <div className="absolute right-0 mt-4 w-80 md:w-96 bg-[#fffcfc] shadow-[0_20px_50px_rgba(73,64,64,0.15)] border border-[#f1d1d1]/30 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
//             {/* Header */}
//             <div className="px-6 py-6 border-b border-[#f1d1d1]/20">
//               <div className="flex items-center justify-between">
//                 <div className="space-y-1">
//                   <div className="flex items-center gap-2 text-[#f1d1d1] mb-1">
//                     <span className="w-6 h-[1px] bg-[#f1d1d1]"></span>
//                     <span className="text-[9px] font-bold tracking-[0.3em] uppercase">Alerts</span>
//                   </div>
//                   <h3 className="text-2xl font-serif italic text-[#494040]">Notifications</h3>
//                 </div>
//                 <button onClick={handleClose} className="text-[#494040]/30 hover:text-[#494040] transition-colors">
//                   <X size={18} strokeWidth={1.5} />
//                 </button>
//               </div>
//             </div>

//             {/* List */}
//             {notifications.length === 0 ? (
//               <div className="py-20 text-center space-y-3">
//                 <p className="font-serif italic text-[#494040]/40">Your archive is empty.</p>
//                 <p className="text-[9px] font-bold tracking-widest uppercase text-[#f1d1d1]">No new updates</p>
//               </div>
//             ) : (
//               <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
//                 {notifications.slice(0, 5).map((notif) => {
//                   const config = getStatusConfig(notif.status)
//                   return (
//                     <button
//                       key={notif._id}
//                       onClick={() => { markAsRead(notif._id); handleClose(); }}
//                       className={`w-full text-left px-6 py-5 border-b border-[#f1d1d1]/10 flex items-start gap-4 transition-all duration-300 hover:bg-[#f1d1d1]/5 ${!notif.read ? "bg-[#f1d1d1]/5" : ""}`}
//                     >
//                       {/* Status Icon */}
//                       <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${config.bg} ${config.color}`}>
//                         {config.icon}
//                       </div>

//                       {/* Info */}
//                       <div className="flex-1 min-w-0">
//                         <p className={`text-[11px] leading-relaxed tracking-wide ${notif.read ? "text-[#494040]/60" : "text-[#494040] font-bold uppercase"}`}>
//                           {formatNotification(notif)}
//                         </p>
//                         <div className="flex items-center gap-2 mt-2 opacity-40">
//                           <Clock size={10} />
//                           <span className="text-[9px] font-bold uppercase tracking-widest">{formatDateTime(notif.createdAt)}</span>
//                         </div>
//                       </div>

//                       {/* Unread dot */}
//                       {!notif.read && (
//                         <div className="mt-2 w-1.5 h-1.5 bg-[#f1d1d1] rounded-full shadow-[0_0_8px_#f1d1d1]" />
//                       )}
//                     </button>
//                   )
//                 })}
//               </div>
//             )}

//             {/* Footer */}
//             {notifications.length > 0 && (
//               <div className="p-4 bg-[#f1d1d1]/10">
//                 <Link
//                   to="/normal/notification"
//                   onClick={handleClose}
//                   className="w-full flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040] hover:text-[#f1d1d1] transition-colors py-2"
//                 >
//                   View Archive <ArrowRight size={12} />
//                 </Link>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   )
// }
"use client"

import React, { useState } from "react"
import {
  Bell,
  Clock,
  Check,
  Package,
  X,
  Shield,
  LogIn,
  ArrowRight,
} from "lucide-react"
import { Link } from "react-router-dom"
import { useNotifications } from "../hooks/useNotification"

export default function NotificationDropdown({ userId }) {
  const [isOpen, setIsOpen] = useState(false)

  const { notifications = [], unreadCount = 0, markAsRead } =
    useNotifications(userId)

  const handleToggle = () => setIsOpen((prev) => !prev)
  const handleClose = () => setIsOpen(false)

  /* -----------------------------
     LOGIC UNTOUCHED
  ----------------------------- */
  function formatNotification(notif) {
    if (!notif?.message) return ""
    const isOrderNotification =
      /order/i.test(notif.message) ||
      notif.type === "order" ||
      ["pending", "processing", "completed", "shipped", "delivered"].includes(
        notif.status
      )
    let orderId = null
    let shortOrderId = null
    if (isOrderNotification) {
      const orderIdMatch = notif.message.match(/order[:\s#]*([a-zA-Z0-9]{8,})/i)
      orderId = orderIdMatch ? orderIdMatch[1] : null
      shortOrderId = orderId ? orderId.slice(-4) : null
    }
    const status = notif.status || (() => {
        if (/pending/i.test(notif.message)) return "pending"
        if (/processing/i.test(notif.message)) return "processing"
        if (/completed|delivered/i.test(notif.message)) return "completed"
        return null
      })()
    let baseMsg = notif.message
    if (isOrderNotification && status) {
      switch (status) {
        case "pending": baseMsg = "Your order is pending confirmation"; break
        case "processing": baseMsg = "Your order is being prepared"; break
        case "completed": baseMsg = "Your order has been delivered. Enjoy your meal!"; break
      }
    }
    return shortOrderId ? `${baseMsg} - Order #${shortOrderId}` : baseMsg
  }

  function formatDateTime(dateString) {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)
    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
  }

  /* UPDATED COLORS IN STATUS CONFIG TO MATCH PALETTE */
  function getStatusConfig(notif) {
    const message = notif.message?.toLowerCase() || ""
    const status = notif.status
    if (message.includes("password") || message.includes("login")) {
      return {
        color: "text-[#494040]",
        bg: "bg-[#f1d1d1]/20",
        icon: <Shield className="w-4 h-4" strokeWidth={1.5} />,
      }
    }
    switch (status) {
      case "pending":
        return { color: "text-[#494040]", bg: "bg-[#f1d1d1]/20", icon: <Clock className="w-4 h-4" strokeWidth={1.5} /> }
      case "processing":
        return { color: "text-[#fffcfc]", bg: "bg-[#494040]", icon: <Package className="w-4 h-4" strokeWidth={1.5} /> }
      case "completed":
        return { color: "text-[#494040]", bg: "bg-[#f1d1d1]", icon: <Check className="w-4 h-4" strokeWidth={1.5} /> }
      default:
        return { color: "text-[#494040]/60", bg: "bg-transparent border border-[#f1d1d1]", icon: <Bell className="w-4 h-4" strokeWidth={1.5} /> }
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
          <div className="fixed inset-0 z-40 bg-transparent" onClick={handleClose} />

          {/* Dropdown Container */}
          <div className="absolute right-0 mt-4 w-80 md:w-96 bg-[#fffcfc] shadow-[0_20px_50px_rgba(73,64,64,0.15)] border border-[#f1d1d1]/30 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header Section */}
            <div className="px-6 py-6 border-b border-[#f1d1d1]/20">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#f1d1d1] mb-1">
                    <span className="w-6 h-[1px] bg-[#f1d1d1]"></span>
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#494040]/60">Registry</span>
                  </div>
                  <h3 className="text-2xl font-serif italic text-[#494040]">Notifications</h3>
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
                <p className="font-serif italic text-[#494040]/40 text-lg">Registry is settled.</p>
                <p className="text-[9px] font-bold tracking-widest uppercase text-[#f1d1d1]">No new entries</p>
              </div>
            ) : (
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {notifications.slice(0, 5).map((notif) => {
                  const statusConfig = getStatusConfig(notif)

                  return (
                    <button
                      key={notif._id}
                      onClick={() => {
                        markAsRead(notif._id)
                        handleClose()
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
                  )
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
  )
}