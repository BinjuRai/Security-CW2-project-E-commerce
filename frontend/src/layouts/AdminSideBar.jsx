import { Outlet, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext, useState } from "react";
import Header from "./AdminHeader";
import {
  LayoutGrid,
  Users,
  PlusCircle,
  List,
  Layers,
  Image as ImageIcon,
  ChevronRight,
  Compass,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col h-screen bg-[#fffcfc] text-[#494040] selection:bg-[#f1d1d1]">
      <Header user={user} logout={logout} />

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`
                    ${isSidebarCollapsed ? "w-20" : "w-72"} 
                    bg-[#fffcfc] border-r border-[#f1d1d1]/30 transition-all duration-500 ease-in-out flex flex-col relative z-40
                `}
        >
          <div className="p-8 border-b border-[#f1d1d1]/10">
            <div className="flex items-center justify-between">
              {!isSidebarCollapsed && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#f1d1d1] mb-1">
                    <span className="w-6 h-[1px] bg-[#f1d1d1]"></span>
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase">
                      Curator
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif italic text-[#494040]">
                    Management
                  </h2>
                </div>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 text-[#494040]/40 hover:text-[#494040] transition-colors"
              >
                <ChevronRight
                  size={18}
                  className={`transition-transform duration-500 ${isSidebarCollapsed ? "" : "rotate-180"}`}
                />
              </button>
            </div>
          </div>

          {/* Navigation - Minimalist List */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
            <SidebarItem
              icon={<LayoutGrid size={18} strokeWidth={1.5} />}
              label="Dashboard"
              to="/admin/dashboard"
              active={isActive("/admin/dashboard")}
              collapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={<Users size={18} strokeWidth={1.5} />}
              label="User Directory"
              to="/admin/user"
              active={isActive("/admin/user")}
              collapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={<PlusCircle size={18} strokeWidth={1.5} />}
              label="New Product"
              to="/admin/addproduct"
              active={isActive("/admin/addproduct")}
              collapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={<List size={18} strokeWidth={1.5} />}
              label="Product Registry"
              to="/admin/products"
              active={isActive("/admin/products")}
              collapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={<Layers size={18} strokeWidth={1.5} />}
              label="Collections"
              to="/admin/category"
              active={isActive("/admin/category")}
              collapsed={isSidebarCollapsed}
            />
            <SidebarItem
              icon={<ImageIcon size={18} strokeWidth={1.5} />}
              label="Banner Visuals"
              to="/admin/banner/create"
              active={isActive("/admin/banner/create")}
              collapsed={isSidebarCollapsed}
            />
          </nav>

          {/* Sidebar Status Footer */}
          {!isSidebarCollapsed && (
            <div className="p-6 border-t border-[#f1d1d1]/20">
              <div className="bg-[#494040] p-4 rounded-sm flex items-center gap-3">
                <div className="relative">
                  <span className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                  <span className="relative w-2 h-2 bg-green-500 rounded-full block"></span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#fffcfc]">
                    Atelier Online
                  </p>
                  <p className="text-[9px] text-[#fffcfc]/50 italic font-serif truncate">
                    Integrity Verified
                  </p>
                </div>
              </div>
            </div>
          )}
        </aside>

        <main className="flex-1 overflow-y-auto bg-[#fffcfc] custom-scrollbar">
          <Outlet />
        </main>
      </div>

      <footer className="bg-[#494040] text-[#fffcfc] py-10 border-t border-[#f1d1d1]/10 z-50">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-xl font-serif italic tracking-tight">
                  Bag
                  <span className="font-sans not-italic font-light tracking-widest uppercase text-sm ml-1">
                   Belle
                  </span>
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#fffcfc]/40 font-bold">
                  Administration Suite
                </span>
              </div>
            </div>

            <div className="text-center md:text-right space-y-1">
              <p className="text-[10px] tracking-widest uppercase text-[#fffcfc]/40">
                © {new Date().getFullYear()} BAGBELLE . ALL RIGHTS RESERVED.
              </p>
              <p className="text-[9px] font-serif italic text-[#f1d1d1]/60">
                Designed for the Discerning Rider
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const SidebarItem = ({ icon, label, to = "#", active, collapsed }) => (
  <Link to={to} className="block group">
    <div className="relative">
      <div
        className={`flex items-center ${collapsed ? "justify-center" : "space-x-4"} px-6 py-4 transition-all duration-500
                    ${
                      active
                        ? "text-[#494040] bg-[#f1d1d1]/10 border-r-2 border-[#494040]"
                        : "text-[#494040]/40 hover:text-[#494040] hover:bg-[#f1d1d1]/5"
                    }
                `}
      >
        <span
          className={`transition-colors duration-500 ${active ? "text-[#494040]" : "text-[#f1d1d1] group-hover:text-[#494040]"}`}
        >
          {icon}
        </span>

        {!collapsed && (
          <>
            <span
              className={`text-[11px] font-bold tracking-[0.15em] uppercase flex-1 ${active ? "opacity-100" : "opacity-80"}`}
            >
              {label}
            </span>

            {active && <ChevronRight size={12} className="text-[#f1d1d1]" />}
          </>
        )}
      </div>

      {/* Luxury Tooltip */}
      {collapsed && (
        <div className="absolute left-full ml-4 px-4 py-2 bg-[#494040] text-[#fffcfc] text-[10px] font-bold tracking-widest uppercase rounded-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 whitespace-nowrap z-50 shadow-2xl translate-x-[-10px] group-hover:translate-x-0">
          {label}
        </div>
      )}
    </div>
  </Link>
);
