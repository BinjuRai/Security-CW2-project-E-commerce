// "use client"
// import { useContext, useState, useRef, useEffect } from "react"
// import { useNavigate, Link, useLocation } from "react-router-dom"
// import { AuthContext } from "../auth/AuthProvider"
// import { User, ChevronDown, Home, Package, ShoppingBag, LogOut } from "lucide-react"
// import { getBackendImageUrl } from "../utils/backend-image"
// import NotificationDropdown from "../components/NotificationDropDown"
// import { useLogoutUser } from "../hooks/useLoginUser" // 🔒 ADD THIS IMPORT

// export default function Header() {
//   const { user } = useContext(AuthContext) // 🔒 REMOVED logout from here
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [dropdownOpen, setDropdownOpen] = useState(false)
//   const dropdownRef = useRef(null)

//   // 🔒 NEW: Use logout hook
//   const { mutate: handleLogout, isPending: isLoggingOut } = useLogoutUser()

//   if (!user) return null

//   // 🔒 REMOVED: Old handleLogout function - now using the hook's mutate function

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   const isActive = (path) => location.pathname === path

//   return (
//     <header
//       className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 shadow-md backdrop-blur-lg bg-[#0B2146] dark:bg-gray-800/95"
//       style={{ backgroundColor: '#0B2146' }}
//     >
//       <div className="relative flex h-20 items-center justify-between px-6 max-w-screen-2xl mx-auto">
//         {/* Left - Logo */}
//         <div className="flex items-center gap-3 z-20">
//           <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
//             <span className="text-white font-bold text-xl select-none">R</span>
//             <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-400/20 to-transparent"></div>
//           </div>
//           <div>
//             <span className="font-bold text-xl text-white select-none">RevModz</span>
//             <p className="text-xs text-gray-200 dark:text-gray-400">Bike Parts Store</p>
//           </div>
//         </div>

//         {/* Center - Navigation Links */}
//         <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex gap-2 z-10">
//           <Link
//             to="/normal/home"
//             className={`
//           flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300
//           ${isActive("/normal/home")
//                 ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
//                 : "text-white dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-blue-700"
//               }
//         `}
//           >
//             <Home className="w-4 h-4" />
//             <span>Dashboard</span>
//           </Link>

//           <Link
//             to="/normal/dash"
//             className={`
//           flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300
//           ${isActive("/normal/dash")
//                 ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
//                 : "text-white dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-blue-700"
//               }
//         `}
//           >
//             <Package className="w-4 h-4" />
//             <span>All Products</span>
//           </Link>

//           <Link
//             to="/normal/myorders"
//             className={`
//           flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300
//           ${isActive("/normal/myorders")
//                 ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
//                 : "text-white dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-blue-700"
//               }
//         `}
//           >
//             <ShoppingBag className="w-4 h-4" />
//             <span>My Orders</span>
//           </Link>
//         </nav>

//         {/* Right - Profile + Notifications */}
//         <div className="flex items-center gap-4 z-20">
//           <NotificationDropdown userId={user._id} />

//           {/* Profile Dropdown */}
//           <div ref={dropdownRef} className="relative">
//             <div
//               className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer select-none group"
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//             >
//               <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-500 transition-all duration-300">
//                 {user.profileImage ? (
//                   <img
//                     src={getBackendImageUrl(user.profileImage)}
//                     alt="Profile"
//                     className="h-full w-full object-cover"
//                     onError={(e) => {
//                       e.currentTarget.onerror = null
//                       e.currentTarget.src = "/default-profile.png"
//                     }}
//                   />
//                 ) : (
//                   <span className="text-lg">{user.username ? user.username.charAt(0).toUpperCase() : "?"}</span>
//                 )}
//               </div>

//               <div className="hidden lg:flex flex-col items-start">
//                 <span className="text-sm font-semibold text-white">{user.username || "User"}</span>
//               </div>

//               <ChevronDown
//                 className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
//               />
//             </div>

//             {/* Dropdown Menu */}
//             {dropdownOpen && (
//               <div className="absolute right-0 top-16 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
//                 {/* User Info Header */}
//                 <div className="px-4 py-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-gray-200 dark:border-gray-700">
//                   <div className="flex items-center gap-3">
//                     <div className="h-12 w-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
//                       {user.profileImage ? (
//                         <img
//                           src={getBackendImageUrl(user.profileImage)}
//                           alt="Profile"
//                           className="h-full w-full object-cover"
//                         />
//                       ) : (
//                         <span className="text-xl">{user.username ? user.username.charAt(0).toUpperCase() : "?"}</span>
//                       )}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="font-semibold text-white truncate">{user.username || "User"}</p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                         {user.email || "user@email.com"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Menu Items */}
//                 <div className="py-2">
//                   <Link
//                     to="/normal/profile"
//                     className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 text-gray-700 dark:text-gray-300 group"
//                     onClick={() => setDropdownOpen(false)}
//                   >
//                     <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
//                       <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-sm">My Profile</p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">View and edit profile</p>
//                     </div>
//                   </Link>
//                 </div>

//                 {/* Logout */}
//                 <div className="border-t border-gray-200 dark:border-gray-700 p-2">
//                   <div
//                     onClick={() => handleLogout()} // 🔒 UPDATED: Now calls the mutation
//                     className={`flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors duration-200 cursor-pointer text-red-600 dark:text-red-400 group ${
//                       isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''
//                     }`} // 🔒 NEW: Disabled state
//                   >
//                     <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition-colors">
//                       {isLoggingOut ? ( // 🔒 NEW: Show spinner while logging out
//                         <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
//                       ) : (
//                         <LogOut className="h-4 w-4" />
//                       )}
//                     </div>
//                     <div>
//                       <p className="font-medium text-sm">
//                         {isLoggingOut ? 'Logging out...' : 'Log out'} {/* 🔒 NEW: Dynamic text */}
//                       </p>
//                       <p className="text-xs text-red-500/70 dark:text-red-400/70">
//                         Sign out of your account
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

"use client"
import { useContext, useState, useRef, useEffect } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { AuthContext } from "../auth/AuthProvider"
import { User, ChevronDown, ShoppingBag, LogOut, Settings, Bell } from "lucide-react"
import { getBackendImageUrl } from "../utils/backend-image"
import NotificationDropdown from "../components/NotificationDropDown"
import { useLogoutUser } from "../hooks/useLoginUser"

export default function Header() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const { mutate: handleLogout, isPending: isLoggingOut } = useLogoutUser()

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!user) return null

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fffcfc]/80 backdrop-blur-md border-b border-[#f1d1d1]/30">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left - Brand Logo */}
        <Link to="/normal/home" className="flex items-center gap-3 group">
          <div className="flex flex-col">
            <span className="text-2xl font-serif italic tracking-tighter text-[#494040]">
              Bag<span className="font-sans not-italic font-light tracking-widest uppercase text-lg ml-0.5">Belle</span>
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#494040]/40 font-bold -mt-1 transition-colors group-hover:text-[#f1d1d1]">
            Premium Handbags
            </span>
          </div>
        </Link>

        {/* Center - Minimalist Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { name: "Dashboard", path: "/normal/home" },
            { name: "Collection", path: "/normal/dash" },
            { name: "Orders", path: "/normal/myorders" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 py-2 ${
                isActive(link.path) ? "text-[#494040]" : "text-[#494040]/40 hover:text-[#494040]"
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#f1d1d1] animate-in slide-in-from-left-full duration-500" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right - Profile + Notifications */}
        <div className="flex items-center gap-6">
          <div className="relative group">
            <NotificationDropdown userId={user._id} />
          </div>

          <div className="h-6 w-[1px] bg-[#f1d1d1]/50 hidden sm:block"></div>

          {/* User Profile */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="flex flex-col items-end hidden lg:flex">
                <span className="text-[11px] font-bold text-[#494040] uppercase tracking-wider leading-none">
                  {user.username || "Guest"}
                </span>
                <span className="text-[9px] text-[#494040]/40 font-medium">Account</span>
              </div>
              
              <div className="relative h-10 w-10 p-[2px] border border-[#f1d1d1] rounded-full transition-transform duration-500 group-hover:scale-105">
                <div className="h-full w-full rounded-full overflow-hidden bg-[#494040]">
                  {user.profileImage ? (
                    <img
                      src={getBackendImageUrl(user.profileImage)}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-[#fffcfc] text-sm font-medium">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              <ChevronDown className={`w-3 h-3 text-[#f1d1d1] transition-transform duration-500 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Premium Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-4 w-64 bg-[#fffcfc] border border-[#f1d1d1]/50 shadow-[0_10px_40px_rgba(73,64,64,0.1)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Profile Header */}
                <div className="p-6 bg-[#f1d1d1]/10 border-b border-[#f1d1d1]/30">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 mb-1">Authenticated as</p>
                  <p className="text-sm font-medium text-[#494040] truncate">{user.email}</p>
                </div>

                {/* Menu Options */}
                <div className="p-2">
                  <Link
                    to="/normal/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center justify-between px-4 py-3 hover:bg-[#f1d1d1]/10 transition-colors group"
                  >
                    <span className="text-[11px] font-bold tracking-widest uppercase text-[#494040]">My Profile</span>
                    <User size={14} className="text-[#f1d1d1] group-hover:text-[#494040] transition-colors" />
                  </Link>
                  
                  <Link
                    to="/normal/myorders"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center justify-between px-4 py-3 hover:bg-[#f1d1d1]/10 transition-colors group"
                  >
                    <span className="text-[11px] font-bold tracking-widest uppercase text-[#494040]">Order History</span>
                    <ShoppingBag size={14} className="text-[#f1d1d1] group-hover:text-[#494040] transition-colors" />
                  </Link>
                </div>

                {/* Logout Action */}
                <div className="p-2 border-t border-[#f1d1d1]/30">
                  <button
                    onClick={() => handleLogout()}
                    disabled={isLoggingOut}
                    className="w-full flex items-center justify-between px-4 py-3 bg-[#494040] text-[#fffcfc] hover:bg-[#362f2f] transition-all group"
                  >
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                      {isLoggingOut ? "Processing..." : "Sign Out"}
                    </span>
                    {isLoggingOut ? (
                      <div className="w-3 h-3 border border-[#fffcfc] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <LogOut size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}