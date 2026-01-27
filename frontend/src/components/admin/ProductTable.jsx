// "use client"

// import React, { useState } from "react"
// import {
//   Package,
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   Trash2,
// } from "lucide-react"
// import {
//   useAdminProduct,
//   useDeleteProduct,
// } from "../../hooks/admin/useAdminProduct"
// import DeleteModal from "../DeleteModal"
// import {
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   Skeleton,
// } from "@mui/material"

// export default function ProductTable() {
//   const {
//     data,
//     error,
//     isPending,
//     products,
//     pageNumber,
//     setPageNumber,
//     pagination,
//     canNextPage,
//     canPreviousPage,
//     pageSize,
//     setPageSize,
//     search,
//     setSearch,
//   } = useAdminProduct()

//   const { mutate: deleteProduct, isLoading: isDeleting } = useDeleteProduct()
//   const [selectedProduct, setSelectedProduct] = useState(null)
//   const [showModal, setShowModal] = useState(false)

//   const handleDeleteClick = (product) => {
//     setSelectedProduct(product)
//     setShowModal(true)
//   }

//   const confirmDelete = () => {
//     if (selectedProduct) {
//       deleteProduct(selectedProduct._id)
//     }
//     setShowModal(false)
//     setSelectedProduct(null)
//   }

//   const handlePrev = () => {
//     if (canPreviousPage) setPageNumber((prev) => prev - 1)
//   }
//   const handleNext = () => {
//     if (canNextPage) setPageNumber((prev) => prev + 1)
//   }
//   const handleSearch = (e) => {
//     setPageNumber(1)
//     setSearch(e.target.value)
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 text-white rounded-lg shadow-xl p-8">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
//               <Package className="h-8 w-8" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold mb-2">Product Management</h1>
//               <p className="text-blue-100 text-lg">Manage your inventory</p>
//             </div>
//           </div>
//           <div className="hidden md:flex items-center space-x-6 text-right">
//             <div>
//               <div className="text-2xl font-bold">{products.length}</div>
//               <div className="text-blue-100 text-sm">Total Products</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold">{pagination.total || 0}</div>
//               <div className="text-blue-100 text-sm">All Items</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Controls and Table */}
//       <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-xl p-8">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
//           <div className="flex items-center space-x-4">
//             <label htmlFor="pageSize" className="text-sm font-medium text-gray-700 dark:text-gray-200">
//               Show:
//             </label>
//             <Select
//               value={pagination.limit}
//               onChange={(e) => setPageSize(Number(e.target.value))}
//               size="small"
//               sx={{ minWidth: 80, bgcolor: "background.paper", color: "text.primary" }}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={20}>20</MenuItem>
//               <MenuItem value={30}>30</MenuItem>
//             </Select>
//             <span className="text-sm text-gray-500 dark:text-gray-400">entries</span>
//           </div>

//           <TextField
//             label="Search products"
//             variant="outlined"
//             size="small"
//             value={search}
//             onChange={handleSearch}
//             sx={{ maxWidth: 300 }}
//             InputProps={{
//               startAdornment: <Search className="mr-2 h-4 w-4 text-gray-500" />,
//             }}
//           />
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
//           <table className="min-w-full border-collapse">
//             <thead className="bg-gray-50 dark:bg-gray-800">
//               <tr>
//                 <th className="text-left px-6 py-4 font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
//                   Name
//                 </th>
//                 <th className="text-left px-6 py-4 font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
//                   Price
//                 </th>
//                 <th className="text-right px-6 py-4 font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {isPending
//                 ? Array.from({ length: 5 }).map((_, i) => (
//                   <tr key={i}>
//                     <td className="px-6 py-4">
//                       <Skeleton variant="text" width={120} />
//                     </td>
//                     <td className="px-6 py-4">
//                       <Skeleton variant="text" width={80} />
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <Skeleton variant="rectangular" width={100} height={32} />
//                     </td>
//                   </tr>
//                 ))
//                 : products.map((product) => (
//                   <tr
//                     key={product._id}
//                     className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700"
//                   >
//                     <td className="px-6 py-4">{product.name}</td>
//                     <td className="px-6 py-4 font-mono font-semibold text-green-600">
//                       Rs. {product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <Button
//                         variant="contained"
//                         color="error"
//                         size="small"
//                         startIcon={<Trash2 className="w-4 h-4" />}
//                         onClick={() => handleDeleteClick(product)}
//                         disabled={isDeleting}
//                       >
//                         Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Controls */}
//         <div className="mt-8 flex justify-between items-center">
//           <Button
//             variant="outlined"
//             startIcon={<ChevronLeft />}
//             onClick={handlePrev}
//             disabled={!canPreviousPage}
//           >
//             Previous
//           </Button>
//           <span className="text-gray-700 dark:text-gray-100 font-medium">
//             Page {pagination.page} of {pagination.totalPages}
//           </span>
//           <Button
//             variant="outlined"
//             endIcon={<ChevronRight />}
//             onClick={handleNext}
//             disabled={!canNextPage}
//           >
//             Next
//           </Button>
//         </div>
//       </div>

//       {/* Delete Modal */}
//       <DeleteModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         onConfirm={confirmDelete}
//         title="Delete Product"
//         description={`Are you sure you want to delete "${selectedProduct?.name}"?`}
//       />
//     </div>
//   )
// }

"use client"

import React, { useState } from "react"
import {
  Package,
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Filter,
  ArrowUpRight,
  Loader2
} from "lucide-react"
import {
  useAdminProduct,
  useDeleteProduct,
} from "../../hooks/admin/useAdminProduct"
import DeleteModal from "../DeleteModal"
import {
  Skeleton,
} from "@mui/material"

export default function ProductTable() {
  const {
    error,
    isPending,
    products,
    setPageNumber,
    pagination,
    canNextPage,
    canPreviousPage,
    setPageSize,
    search,
    setSearch,
  } = useAdminProduct()

  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleDeleteClick = (product) => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  const confirmDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct._id)
    }
    setShowModal(false)
    setSelectedProduct(null)
  }

  const handleSearch = (e) => {
    setPageNumber(1)
    setSearch(e.target.value)
  }

  return (
    <div className="bg-[#fffcfc] text-[#494040] min-h-screen selection:bg-[#f1d1d1]">
      <div className="max-w-[1600px] mx-auto py-10 px-8">
        
        {/* Editorial Header Section */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#f1d1d1]/30 pb-12 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#f1d1d1]">
              <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#494040]/60">Stock Ledger</span>
            </div>
            <h1 className="text-5xl font-serif italic tracking-tight">
              Inventory <span className="font-sans not-italic font-light">Registry</span>
            </h1>
            <div className="flex gap-6 mt-4">
               <div className="flex flex-col">
                  <span className="text-[9px] font-bold tracking-widest text-[#f1d1d1] uppercase">Total Masterpieces</span>
                  <span className="text-xl font-light">{pagination.total || 0}</span>
               </div>
               <div className="w-[1px] h-8 bg-[#f1d1d1]/30"></div>
               <div className="flex flex-col">
                  <span className="text-[9px] font-bold tracking-widest text-[#f1d1d1] uppercase">Viewing</span>
                  <span className="text-xl font-light">{products.length}</span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#f1d1d1] group-focus-within:text-[#494040] transition-colors" strokeWidth={1.5} />
                <input 
                  type="text"
                  placeholder="Query by nomenclature..."
                  value={search}
                  onChange={handleSearch}
                  className="bg-transparent border-b border-[#f1d1d1]/50 pl-7 py-2 focus:outline-none focus:border-[#494040] transition-colors text-sm font-light w-64"
                />
             </div>
          </div>
        </header>

        {/* Table Controls */}
        <div className="flex justify-between items-center mb-8">
           <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/40">Entries:</span>
              <select 
                value={pagination.limit}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-transparent border border-[#f1d1d1] text-[10px] font-bold px-3 py-1 rounded-full focus:outline-none"
              >
                {[10, 20, 30].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
           </div>
           
           <div className="flex items-center gap-2 px-4 py-2 bg-[#f1d1d1]/10 border border-[#f1d1d1]/30 rounded-full">
              <Filter size={12} className="text-[#f1d1d1]" />
              <span className="text-[9px] font-bold tracking-widest uppercase">Sort: Alphabetical</span>
           </div>
        </div>

        {/* Custom Editorial Table */}
        <div className="bg-white border border-[#f1d1d1]/30 shadow-[0_10px_40px_rgba(73,64,64,0.02)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f1d1d1]/5 border-b border-[#f1d1d1]/30">
                <th className="px-8 py-5 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">Nomenclature</th>
                <th className="px-8 py-5 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">Financial Value</th>
                <th className="px-8 py-5 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60 text-right">Registry Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1d1d1]/10">
              {isPending
                ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-8 py-6"><Skeleton variant="text" sx={{ bgcolor: '#f1d1d1/20' }} width="60%" /></td>
                    <td className="px-8 py-6"><Skeleton variant="text" sx={{ bgcolor: '#f1d1d1/20' }} width="30%" /></td>
                    <td className="px-8 py-6 text-right"><Skeleton variant="circular" width={32} height={32} sx={{ ml: 'auto' }} /></td>
                  </tr>
                ))
                : products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-[#f1d1d1]/5 transition-all duration-300 group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-[#f1d1d1] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="text-sm font-medium tracking-wide uppercase">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-serif italic text-lg text-[#494040]">
                        NPR {product.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button className="p-2 text-[#494040]/40 hover:text-[#494040] transition-colors">
                           <ArrowUpRight size={18} strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          disabled={isDeleting}
                          className="p-2 text-[#f1d1d1] hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4.5 h-4.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          
          {!isPending && products.length === 0 && (
             <div className="py-20 text-center border-t border-[#f1d1d1]/20">
                <p className="font-serif italic text-[#494040]/40">No items currently catalogued in the registry.</p>
             </div>
          )}
        </div>

        {/* Pagination Controls */}
        <footer className="mt-12 flex justify-between items-center border-t border-[#f1d1d1]/30 pt-10">
          <button
            onClick={() => setPageNumber(p => p - 1)}
            disabled={!canPreviousPage}
            className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${
              canPreviousPage ? "text-[#494040] hover:-translate-x-1" : "text-gray-300 pointer-events-none"
            }`}
          >
            <ChevronLeft size={14} /> Previous Ledger
          </button>
          
          <div className="flex items-center gap-4">
             <span className="w-8 h-[1px] bg-[#f1d1d1]"></span>
             <span className="text-xs font-serif italic">
               Registry Page {pagination.page} of {pagination.totalPages}
             </span>
             <span className="w-8 h-[1px] bg-[#f1d1d1]"></span>
          </div>

          <button
            onClick={() => setPageNumber(p => p + 1)}
            disabled={!canNextPage}
            className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${
              canNextPage ? "text-[#494040] hover:translate-x-1" : "text-gray-300 pointer-events-none"
            }`}
          >
            Next Ledger <ChevronRight size={14} />
          </button>
        </footer>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        title="Protocol: Delete Record"
        description={`Confirming the permanent removal of "${selectedProduct?.name}" from the master inventory registry.`}
      />
    </div>
  )
}