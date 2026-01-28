// import { Outlet, Link, useLocation } from "react-router-dom";
// import { AuthContext } from "../auth/AuthProvider";
// import { useContext, useState } from "react";
// import Header from './AdminHeader'
// import {
//     FaHome,
//     FaClipboardList,
//     FaCog,
//     FaPlusSquare,
//     FaOptinMonster,
//     FaImage,
//     FaChevronRight,
// } from "react-icons/fa";

// export default function AdminLayout() {
//     const { user, logout } = useContext(AuthContext);
//     const location = useLocation();
//     const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

//     const isActive = (path) => location.pathname === path;

//     return (
//         <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
//             <Header user={user} logout={logout} />

//             <div className="flex flex-1 overflow-hidden">
//                 {/* Sidebar */}
//                 <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-72'} bg-white dark:bg-gray-900 shadow-2xl overflow-auto border-r-4 border-[#0B2146] transition-all duration-300`}>
//                     {/* Sidebar Header */}
//                     <div className="p-6 border-b border-gray-200 dark:border-gray-800">
//                         <div className="flex items-center justify-between">
//                             {!isSidebarCollapsed && (
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-10 h-10 bg-[#0B2146] rounded-xl flex items-center justify-center shadow-lg">
//                                         <span className="text-[#E5BA41] font-bold text-lg">A</span>
//                                     </div>
//                                     <div>
//                                         <h2 className="text-lg font-bold text-[#0B2146] dark:text-white">Admin Panel</h2>
//                                         <p className="text-xs text-gray-500 dark:text-gray-400">Management Hub</p>
//                                     </div>
//                                 </div>
//                             )}
//                             <button
//                                 onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
//                                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
//                             >
//                                 <FaChevronRight className={`text-gray-600 dark:text-gray-400 transition-transform ${isSidebarCollapsed ? '' : 'rotate-180'}`} />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Navigation */}
//                     <nav className="p-4 space-y-2">
//                         <SidebarItem
//                             icon={<FaHome />}
//                             label="Dashboard"
//                             to="/admin/dashboard"
//                             active={isActive("/admin/dashboard")}
//                             collapsed={isSidebarCollapsed}
//                         />
//                         <SidebarItem
//                             icon={<FaClipboardList />}
//                             label="Users"
//                             to="/admin/user"
//                             active={isActive("/admin/user")}
//                             collapsed={isSidebarCollapsed}
//                         />
//                         <SidebarItem
//                             icon={<FaCog />}
//                             label="Product Add"
//                             to="/admin/addproduct"
//                             active={isActive("/admin/addproduct")}
//                             collapsed={isSidebarCollapsed}
//                         />
//                         <SidebarItem
//                             icon={<FaPlusSquare />}
//                             label="Product List"
//                             to="/admin/products"
//                             active={isActive("/admin/products")}
//                             collapsed={isSidebarCollapsed}
//                         />
//                         <SidebarItem
//                             icon={<FaOptinMonster />}
//                             label="Category Add"
//                             to="/admin/category"
//                             active={isActive("/admin/category")}
//                             collapsed={isSidebarCollapsed}
//                         />
//                         <SidebarItem
//                             icon={<FaImage />}
//                             label="Banner"
//                             to="/admin/banner/create"
//                             active={isActive("/admin/banner/create")}
//                             collapsed={isSidebarCollapsed}
//                         />
//                     </nav>

//                     {/* Sidebar Footer */}
//                     {!isSidebarCollapsed && (
//                         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
//                             <div className="bg-[#0B2146] rounded-xl p-4 text-white">
//                                 <div className="flex items-center gap-3 mb-2">
//                                     <div className="w-2 h-2 bg-[#E5BA41] rounded-full animate-pulse"></div>
//                                     <span className="text-sm font-semibold">System Status</span>
//                                 </div>
//                                 <p className="text-xs text-gray-300">All systems operational</p>
//                             </div>
//                         </div>
//                     )}
//                 </aside>

//                 {/* Main Content Area */}
//                 <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 transition-colors">
//                     <Outlet />
//                 </main>
//             </div>

//             {/* Footer */}
//             <footer className="bg-[#0B2146] text-white py-6 border-t-4 border-[#E5BA41]">
//                 <div className="container mx-auto px-6">
//                     <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//                         <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 bg-[#E5BA41] rounded-xl flex items-center justify-center shadow-lg">
//                                 <span className="text-[#0B2146] font-bold text-lg">R</span>
//                             </div>
//                             <div>
//                                 <h2 className="text-lg font-bold tracking-wide">RevModz</h2>
//                                 <p className="text-xs text-gray-300">Bike Parts & Accessories</p>
//                             </div>
//                         </div>

//                         <div className="text-center md:text-right">
//                             <p className="text-sm">
//                                 © {new Date().getFullYear()} RevModz. All rights reserved.
//                             </p>
//                             <p className="text-xs text-gray-400 mt-1">
//                                 Premium bike parts and accessories for riders
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// }

// // Enhanced SidebarItem component
// const SidebarItem = ({ icon, label, to = "#", active, collapsed }) => (
//     <Link to={to} className="block group">
//         <div className="relative">
//             {/* Active indicator bar */}
//             {active && (
//                 <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E5BA41] rounded-r-full"></div>
//             )}

//             <div
//                 className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-4'} px-4 py-3.5 rounded-xl transition-all duration-200
//                     ${active
//                         ? "bg-[#0B2146] text-white shadow-lg shadow-[#0B2146]/20"
//                         : "text-gray-700 dark:text-gray-300 hover:bg-[#0B2146]/5 dark:hover:bg-[#0B2146]/10"
//                     }
//                 `}
//             >
//                 <span className={`text-xl ${active ? 'text-[#E5BA41]' : ''} transition-colors`}>
//                     {icon}
//                 </span>

//                 {!collapsed && (
//                     <>
//                         <span className="font-semibold flex-1">{label}</span>

//                         {active && (
//                             <div className="flex items-center gap-1">
//                                 <div className="w-1.5 h-1.5 bg-[#E5BA41] rounded-full"></div>
//                                 <div className="w-1.5 h-1.5 bg-[#E5BA41] rounded-full opacity-60"></div>
//                                 <div className="w-1.5 h-1.5 bg-[#E5BA41] rounded-full opacity-30"></div>
//                             </div>
//                         )}

//                         {!active && (
//                             <FaChevronRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
//                         )}
//                     </>
//                 )}
//             </div>

//             {/* Tooltip for collapsed state */}
//             {collapsed && (
//                 <div className="absolute left-full ml-2 px-3 py-2 bg-[#0B2146] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl">
//                     {label}
//                     <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#0B2146]"></div>
//                 </div>
//             )}
//         </div>
//     </Link>
// );

import { Outlet, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext, useState } from "react";
import Header from './AdminHeader';
import {
    LayoutGrid,
    Users,
    PlusCircle,
    List,
    Layers,
    Image as ImageIcon,
    ChevronRight,
    Compass,
    ShieldCheck
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
                {/* Sidebar - Atelier Sidebar Design */}
                <aside className={`
                    ${isSidebarCollapsed ? 'w-20' : 'w-72'} 
                    bg-[#fffcfc] border-r border-[#f1d1d1]/30 transition-all duration-500 ease-in-out flex flex-col relative z-40
                `}>
                    
                    {/* Sidebar Header */}
                    <div className="p-8 border-b border-[#f1d1d1]/10">
                        <div className="flex items-center justify-between">
                            {!isSidebarCollapsed && (
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-[#f1d1d1] mb-1">
                                        <span className="w-6 h-[1px] bg-[#f1d1d1]"></span>
                                        <span className="text-[9px] font-bold tracking-[0.3em] uppercase">Curator</span>
                                    </div>
                                    <h2 className="text-2xl font-serif italic text-[#494040]">Management</h2>
                                </div>
                            )}
                            <button
                                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                                className="p-2 text-[#494040]/40 hover:text-[#494040] transition-colors"
                            >
                                <ChevronRight size={18} className={`transition-transform duration-500 ${isSidebarCollapsed ? '' : 'rotate-180'}`} />
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
                                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#fffcfc]">Atelier Online</p>
                                    <p className="text-[9px] text-[#fffcfc]/50 italic font-serif truncate">Integrity Verified</p>
                                </div>
                            </div>
                        </div>
                    )}
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto bg-[#fffcfc] custom-scrollbar">
                    <Outlet />
                </main>
            </div>

            {/* Premium Footer */}
            <footer className="bg-[#494040] text-[#fffcfc] py-10 border-t border-[#f1d1d1]/10 z-50">
                <div className="max-w-[1600px] mx-auto px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-xl font-serif italic tracking-tight">
                                    Rev<span className="font-sans not-italic font-light tracking-widest uppercase text-sm ml-1">Modz</span>
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
                className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-4'} px-6 py-4 transition-all duration-500
                    ${active
                        ? "text-[#494040] bg-[#f1d1d1]/10 border-r-2 border-[#494040]"
                        : "text-[#494040]/40 hover:text-[#494040] hover:bg-[#f1d1d1]/5"
                    }
                `}
            >
                <span className={`transition-colors duration-500 ${active ? 'text-[#494040]' : 'text-[#f1d1d1] group-hover:text-[#494040]'}`}>
                    {icon}
                </span>

                {!collapsed && (
                    <>
                        <span className={`text-[11px] font-bold tracking-[0.15em] uppercase flex-1 ${active ? 'opacity-100' : 'opacity-80'}`}>
                            {label}
                        </span>

                        {active && (
                            <ChevronRight size={12} className="text-[#f1d1d1]" />
                        )}
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