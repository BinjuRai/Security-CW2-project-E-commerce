"use client";
import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import {
  User,
  ChevronDown,
  ShoppingBag,
  LogOut,
  Settings,
  Bell,
} from "lucide-react";
import { getBackendImageUrl } from "../utils/backend-image";
import NotificationDropdown from "../components/NotificationDropDown";
import { useLogoutUser } from "../hooks/useLoginUser";

export default function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { mutate: handleLogout, isPending: isLoggingOut } = useLogoutUser();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fffcfc]/80 backdrop-blur-md border-b border-[#f1d1d1]/30">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left - Brand Logo */}
        <Link to="/normal/home" className="flex items-center gap-3 group">
          <div className="flex flex-col">
            <span className="text-2xl font-serif italic tracking-tighter text-[#494040]">
              Bag
              <span className="font-sans not-italic font-light tracking-widest uppercase text-lg ml-0.5">
                Belle
              </span>
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
                isActive(link.path)
                  ? "text-[#494040]"
                  : "text-[#494040]/40 hover:text-[#494040]"
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
                <span className="text-[9px] text-[#494040]/40 font-medium">
                  Account
                </span>
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
              <ChevronDown
                className={`w-3 h-3 text-[#f1d1d1] transition-transform duration-500 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Premium Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-4 w-64 bg-[#fffcfc] border border-[#f1d1d1]/50 shadow-[0_10px_40px_rgba(73,64,64,0.1)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Profile Header */}
                <div className="p-6 bg-[#f1d1d1]/10 border-b border-[#f1d1d1]/30">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 mb-1">
                    Authenticated as
                  </p>
                  <p className="text-sm font-medium text-[#494040] truncate">
                    {user.email}
                  </p>
                </div>

                {/* Menu Options */}
                <div className="p-2">
                  <Link
                    to="/normal/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center justify-between px-4 py-3 hover:bg-[#f1d1d1]/10 transition-colors group"
                  >
                    <span className="text-[11px] font-bold tracking-widest uppercase text-[#494040]">
                      My Profile
                    </span>
                    <User
                      size={14}
                      className="text-[#f1d1d1] group-hover:text-[#494040] transition-colors"
                    />
                  </Link>

                  <Link
                    to="/normal/myorders"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center justify-between px-4 py-3 hover:bg-[#f1d1d1]/10 transition-colors group"
                  >
                    <span className="text-[11px] font-bold tracking-widest uppercase text-[#494040]">
                      Order History
                    </span>
                    <ShoppingBag
                      size={14}
                      className="text-[#f1d1d1] group-hover:text-[#494040] transition-colors"
                    />
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
                      <LogOut
                        size={14}
                        className="opacity-50 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
