

import React from 'react';
import { 
    LayoutGrid, 
    ClipboardList, 
    Layers, 
    BarChart3, 
    Settings, 
    PlusCircle, 
    Compass,
    ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-72 bg-[#fffcfc] border-r border-[#f1d1d1]/30 h-screen flex flex-col sticky top-0 transition-all duration-300 selection:bg-[#f1d1d1]">
      
      {/* Editorial Header */}
      <div className="p-8 pt-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#f1d1d1] mb-2">
            <span className="w-6 h-[1px] bg-[#f1d1d1]"></span>
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#494040]/60">Curator</span>
          </div>
          <h2 className="text-3xl font-serif italic text-[#494040]">Registry</h2>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        <SidebarItem 
            icon={<Compass size={18} strokeWidth={1.5} />} 
            label="Dashboard" 
            to="/admin/dashboard" 
            active={isActive("/admin/dashboard")}
        />
        <SidebarItem 
            icon={<ClipboardList size={18} strokeWidth={1.5} />} 
            label="Acquisitions" 
            to="/admin/orders" 
            active={isActive("/admin/orders")}
        />
        <SidebarItem 
            icon={<Layers size={18} strokeWidth={1.5} />} 
            label="Collections" 
            to="/admin/categories" 
            active={isActive("/admin/categories")}
        />
        <SidebarItem 
            icon={<BarChart3 size={18} strokeWidth={1.5} />} 
            label="Intelligence" 
            to="/admin/analytics" 
            active={isActive("/admin/analytics")}
        />
        
        {/* Elegant Divider */}
        <div className="py-8 px-4">
            <div className="flex items-center gap-4">
                <span className="text-[9px] font-bold text-[#494040]/30 uppercase tracking-[0.3em] whitespace-nowrap">Inventory</span>
                <div className="h-[1px] flex-1 bg-[#f1d1d1]/40"></div>
            </div>
        </div>

        <SidebarItem 
            icon={<PlusCircle size={18} strokeWidth={1.5} />} 
            label="Register Piece" 
            to="/admin/addproduct" 
            active={isActive("/admin/addproduct")}
        />
        <SidebarItem 
            icon={<Settings size={18} strokeWidth={1.5} />} 
            label="System Config" 
            to="/admin/settings" 
            active={isActive("/admin/settings")}
        />
      </nav>

      {/* Aesthetic Footer */}
      <div className="p-8 border-t border-[#f1d1d1]/20">
        <div className="p-4 bg-[#f1d1d1]/10 rounded-sm">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040] mb-1">Servzz Atelier</p>
          <p className="text-[9px] text-[#494040]/50 italic font-serif">Management Suite v3.0</p>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, to = "#", active }) => (
  <Link to={to} className="block group">
    <div
      className={`
        relative flex items-center justify-between px-4 py-3.5 transition-all duration-500
        ${active
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
        <div className={`
          transition-colors duration-500
          ${active ? "text-[#494040]" : "text-[#f1d1d1] group-hover:text-[#494040]"}
        `}>
          {icon}
        </div>
        <span className={`
          text-[11px] font-bold tracking-[0.2em] uppercase
          ${active ? "opacity-100" : "opacity-70 group-hover:opacity-100"}
        `}>
          {label}
        </span>
      </div>

      <ChevronRight className={`
        w-3 h-3 transition-all duration-500
        ${active
          ? "opacity-100 translate-x-0 text-[#494040]"
          : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#f1d1d1]"
        }
      `} strokeWidth={1.5} />
    </div>
  </Link>
);

export default Sidebar;