// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useAdminCategory } from '../hooks/admin/useAdminCategory';
// import { Grid3x3, Tag, ChevronRight, Package } from 'lucide-react';

// export default function Sidebar() {
//   const { categories, isLoading, isError } = useAdminCategory();
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   return (
//     <aside className="w-72 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-xl p-6 h-screen flex flex-col transition-all duration-300">

//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center gap-3 mb-2">
//           <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
//             <Package className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h2 className="text-xl font-bold text-gray-900 dark:text-white">Browse Products</h2>
//             <p className="text-xs text-gray-500 dark:text-gray-400">Find what you need</p>
//           </div>
//         </div>
//       </div>

//       {/* Scrollable Navigation */}
//       <div className="flex-1 overflow-y-auto custom-scrollbar">
//         <nav className="space-y-2">

//           {/* All Menu Item */}
//           <SidebarItem
//             icon={<Grid3x3 className="w-5 h-5" />}
//             label="All Products"
//             to="/normal/dash"
//             active={isActive("/normal/dash")}
//           />

//           {/* Divider */}
//           <div className="pt-4 pb-2">
//             <div className="flex items-center gap-2 px-2">
//               <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
//               <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categories</span>
//               <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
//             </div>
//           </div>

//           {/* Loading State */}
//           {isLoading && (
//             <div className="flex flex-col items-center justify-center py-8">
//               <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
//               <p className="text-sm text-gray-500 dark:text-gray-400">Loading categories...</p>
//             </div>
//           )}

//           {/* Error State */}
//           {isError && (
//             <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
//               <p className="text-red-600 dark:text-red-400 text-sm font-medium">Failed to load categories</p>
//             </div>
//           )}

//           {/* Category Items */}
//           {!isLoading && !isError && categories.map((cat) => (
//             <SidebarItem
//               key={cat._id}
//               icon={<Tag className="w-5 h-5" />}
//               label={cat.name}
//               to={`/normal/user/category/${cat._id}`}
//               active={isActive(`/normal/user/category/${cat._id}`)}
//             />
//           ))}

//           {/* Empty State */}
//           {!isLoading && !isError && categories.length === 0 && (
//             <div className="text-center py-8">
//               <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
//               <p className="text-sm text-gray-500 dark:text-gray-400">No categories available</p>
//             </div>
//           )}
//         </nav>
//       </div>

//       {/* Footer */}
//       <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
//         <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
//           <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">RevModz</p>
//           <p className="text-xs text-gray-500 dark:text-gray-400">User Panel</p>
//         </div>
//       </div>
//     </aside>
//   );
// }

// const SidebarItem = ({ icon, label, to = "#", active }) => (
//   <Link to={to} className="block">
//     <div
//       className={`
//         group relative flex items-center justify-between px-4 py-3 rounded-xl
//         transition-all duration-300 overflow-hidden
//         ${active
//           ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
//           : "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md"
//         }
//       `}
//     >
//       {/* Background gradient on hover (non-active) */}
//       {!active && (
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//       )}

//       <div className="relative flex items-center gap-3">
//         <div className={`
//           transition-all duration-300
//           ${active
//             ? "text-white"
//             : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
//           }
//         `}>
//           {icon}
//         </div>
//         <span className={`
//           font-semibold text-sm
//           ${active ? "text-white" : "group-hover:text-gray-900 dark:group-hover:text-white"}
//         `}>
//           {label}
//         </span>
//       </div>

//       {/* Arrow indicator */}
//       <ChevronRight className={`
//         w-4 h-4 transition-all duration-300
//         ${active
//           ? "text-white opacity-100 translate-x-0"
//           : "text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
//         }
//       `} />

//       {/* Active indicator bar */}
//       {active && (
//         <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
//       )}
//     </div>
//   </Link>
// );

// // Custom scrollbar styles - add this to your global CSS
// const customScrollbarStyles = `
//   .custom-scrollbar::-webkit-scrollbar {
//     width: 6px;
//   }
  
//   .custom-scrollbar::-webkit-scrollbar-track {
//     background: transparent;
//   }
  
//   .custom-scrollbar::-webkit-scrollbar-thumb {
//     background: #cbd5e1;
//     border-radius: 3px;
//   }
  
//   .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//     background: #94a3b8;
//   }
  
//   .dark .custom-scrollbar::-webkit-scrollbar-thumb {
//     background: #475569;
//   }
  
//   .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//     background: #64748b;
//   }
// `;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminCategory } from '../hooks/admin/useAdminCategory';
import { LayoutGrid, Tag, ChevronRight, Compass, Loader2 } from 'lucide-react';

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
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase">Discovery</span>
          </div>
          <h2 className="text-3xl font-serif italic text-[#494040]">The <br />Collections</h2>
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
              <span className="text-[10px] font-bold text-[#494040]/30 uppercase tracking-[0.25em] whitespace-nowrap">Categories</span>
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
            <p className="px-4 text-[10px] text-red-400 italic font-serif text-center">Failed to curate categories.</p>
          )}
        </nav>
      </div>

      {/* Sidebar Footer - Identity */}
      <div className="p-8 border-t border-[#f1d1d1]/20">
        <div className="p-4 bg-[#f1d1d1]/10 rounded-sm">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040] mb-1">BagBelle</p>
          <p className="text-[9px] text-[#494040]/50 italic font-serif">Curated Selection v2.0</p>
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
          text-[11px] font-bold tracking-[0.15em] uppercase
          ${active ? "opacity-100" : "opacity-80"}
        `}>
          {label}
        </span>
      </div>

      <ChevronRight className={`
        w-3 h-3 transition-all duration-500
        ${active
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#f1d1d1]"
        }
      `} strokeWidth={1.5} />
    </div>
  </Link>
);