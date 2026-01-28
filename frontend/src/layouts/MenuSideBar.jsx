import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAdminCategory } from "../hooks/admin/useAdminCategory";
import { LayoutGrid, Tag, ChevronRight, Compass, Loader2 } from "lucide-react";

export default function Sidebar() {
  const { categories, isLoading, isError } = useAdminCategory();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-72 bg-[#fffcfc] border-r border-[#f1d1d1]/30 h-screen flex flex-col sticky top-0 transition-all duration-300">
      {/* Header - Editorial Title */}
      <div className="p-8 pt-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#f1d1d1] mb-2">
            <span className="w-6 h-[1px] bg-[#f1d1d1]"></span>
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase">
              Discovery
            </span>
          </div>
          <h2 className="text-3xl font-serif italic text-[#494040]">
            The <br />
            Collections
          </h2>
        </div>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar">
        <nav className="space-y-1">
          {/* All Menu Item */}
          <SidebarItem
            icon={<Compass size={18} strokeWidth={1.5} />}
            label="All Products"
            to="/normal/dash"
            active={isActive("/normal/dash")}
          />

          {/* Elegant Divider */}
          <div className="py-8 px-4">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-[#494040]/30 uppercase tracking-[0.25em] whitespace-nowrap">
                Categories
              </span>
              <div className="h-[1px] flex-1 bg-[#f1d1d1]/40"></div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="w-5 h-5 text-[#f1d1d1] animate-spin" />
            </div>
          )}

          {/* Category Items */}
          {!isLoading && !isError && (
            <div className="space-y-1">
              {categories.map((cat) => (
                <SidebarItem
                  key={cat._id}
                  icon={<Tag size={16} strokeWidth={1.5} />}
                  label={cat.name}
                  to={`/normal/user/category/${cat._id}`}
                  active={isActive(`/normal/user/category/${cat._id}`)}
                />
              ))}
            </div>
          )}

          {/* Error / Empty States */}
          {isError && (
            <p className="px-4 text-[10px] text-red-400 italic font-serif text-center">
              Failed to curate categories.
            </p>
          )}
        </nav>
      </div>

      {/* Sidebar Footer - Identity */}
      <div className="p-8 border-t border-[#f1d1d1]/20">
        <div className="p-4 bg-[#f1d1d1]/10 rounded-sm">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040] mb-1">
            BagBelle
          </p>
          <p className="text-[9px] text-[#494040]/50 italic font-serif">
            Curated Selection v2.0
          </p>
        </div>
      </div>
    </aside>
  );
}

const SidebarItem = ({ icon, label, to = "#", active }) => (
  <Link to={to} className="block group">
    <div
      className={`
        relative flex items-center justify-between px-4 py-3 transition-all duration-500
        ${
          active
            ? "text-[#494040]"
            : "text-[#494040]/50 hover:text-[#494040] hover:translate-x-1"
        }
      `}
    >
      {/* Background active indicator */}
      {active && (
        <div className="absolute inset-0 bg-[#f1d1d1]/20 border-r-2 border-[#494040] animate-in fade-in slide-in-from-left-2 duration-300"></div>
      )}

      <div className="relative flex items-center gap-4">
        <div
          className={`
          transition-colors duration-500
          ${active ? "text-[#494040]" : "text-[#f1d1d1] group-hover:text-[#494040]"}
        `}
        >
          {icon}
        </div>
        <span
          className={`
          text-[11px] font-bold tracking-[0.15em] uppercase
          ${active ? "opacity-100" : "opacity-80"}
        `}
        >
          {label}
        </span>
      </div>

      <ChevronRight
        className={`
        w-3 h-3 transition-all duration-500
        ${
          active
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#f1d1d1]"
        }
      `}
        strokeWidth={1.5}
      />
    </div>
  </Link>
);
