// "use client"
// import { useParams, useNavigate } from "react-router-dom"
// import { useGetProductById } from "../../../hooks/admin/useAdminProduct"
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     Typography,
//     Chip,
//     Skeleton,
//     Alert,
//     Divider,
//     Box,
//     Button,
// } from "@mui/material"
// import { User, Package, IndianRupee, Tag, FileText, AlertCircle } from "lucide-react"
// import { useState } from "react"

// export default function ProductDetail() {
//     const { id } = useParams()
//     const navigate = useNavigate()
//     const { data, isLoading, error } = useGetProductById(id)
//     const [openDialog, setOpenDialog] = useState(false)


//     if (isLoading) {
//         return (
//             <Box maxWidth={768} mx="auto" p={3}>
//                 <Skeleton variant="rectangular" height={40} width="60%" sx={{ mb: 2 }} />
//                 <Skeleton variant="text" height={30} />
//                 <Skeleton variant="text" height={30} width="80%" />
//                 <Skeleton variant="rectangular" height={200} sx={{ mt: 4 }} />
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box maxWidth={768} mx="auto" p={3}>
//                 <Alert severity="error" icon={<AlertCircle size={20} />}>
//                     Error loading product: {error.message}
//                 </Alert>
//             </Box>
//         )
//     }

//     if (!data) {
//         return (
//             <Box maxWidth={768} mx="auto" p={3}>
//                 <Alert icon={<Package size={20} />}>Product not found</Alert>
//             </Box>
//         )
//     }

//     const product = data

//     // Image URL logic, adjust base URL as per your backend
//     const imageUrl = product.productImage
//         ? `http://localhost:5050/${product.productImage.replace("\\", "/")}`
//         : null

//     return (
//         <Box maxWidth={768} mx="auto" p={3} display="flex" flexDirection="column" gap={5}>
//             {/* Header Section */}
//             <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
//                 <Box>
//                     <Typography variant="h3" fontWeight="bold" gutterBottom>
//                         {product.name}
//                     </Typography>
//                     <Box display="flex" alignItems="center" gap={1}>
//                         <Typography variant="h5" fontWeight="semibold" color="green">
//                             Rs. {product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//                         </Typography>
//                         {/* <Typography variant="h5" fontWeight="semibold" color="green">
//                             {product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//                         </Typography> */}
//                     </Box>
//                 </Box>
//                 <Chip
//                     icon={<Package size={14} />}
//                     label={`Product ID: ${id}`}
//                     variant="outlined"
//                     size="small"
//                 />
//             </Box>
//             <Divider />

//             {/* Main Content Grid */}
//             <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={3}>
//                 {/* Product Information Card */}
//                 <Card
//                     sx={{
//                         boxShadow: 4,
//                         transition: "box-shadow 0.3s ease",
//                         "&:hover": { boxShadow: 8 },
//                     }}
//                 >
//                     <CardHeader
//                         title={
//                             <Box display="flex" alignItems="center" gap={1}>
//                                 <Tag size={20} color="#1976d2" />
//                                 <Typography variant="h6">Product Information</Typography>
//                             </Box>
//                         }
//                         sx={{ pb: 1 }}
//                     />
//                     <CardContent>
//                         <Box
//                             display="flex"
//                             justifyContent="space-between"
//                             p={1.5}
//                             bgcolor="action.hover"
//                             borderRadius={1}
//                             mb={2}
//                         >
//                             <Typography fontWeight="medium" color="text.secondary">
//                                 Category
//                             </Typography>
//                             <Chip variant="outlined" label={product.categoryId?.name || "N/A"} />
//                         </Box>

//                         <Box
//                             display="flex"
//                             justifyContent="space-between"
//                             p={1.5}
//                             bgcolor="action.hover"
//                             borderRadius={1}
//                         >
//                             <Typography fontWeight="medium" color="text.secondary">
//                                 Price
//                             </Typography>
//                             <Box display="flex" alignItems="center" gap={0.5}>
//                                 <IndianRupee size={16} color="green" />
//                                 <Typography fontWeight="semibold" color="green">
//                                     {product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//                                 </Typography>
//                             </Box>
//                         </Box>
//                     </CardContent>
//                 </Card>

//                 {/* Seller Information Card */}
//                 <Card
//                     sx={{
//                         boxShadow: 4,
//                         transition: "box-shadow 0.3s ease",
//                         "&:hover": { boxShadow: 8 },
//                     }}
//                 >
//                     <CardHeader
//                         title={
//                             <Box display="flex" alignItems="center" gap={1}>
//                                 <User size={20} color="#1976d2" />
//                                 <Typography variant="h6">Seller Information</Typography>
//                             </Box>
//                         }
//                         sx={{ pb: 1 }}
//                     />
//                     <CardContent>
//                         <Box
//                             display="flex"
//                             justifyContent="space-between"
//                             p={1.5}
//                             bgcolor="action.hover"
//                             borderRadius={1}
//                             mb={2}
//                         >
//                             <Typography fontWeight="medium" color="text.secondary">
//                                 Name
//                             </Typography>
//                             <Typography fontWeight="semibold">
//                                 {product.sellerId?.firstName || "N/A"}
//                             </Typography>
//                         </Box>

//                         <Box
//                             display="flex"
//                             justifyContent="space-between"
//                             p={1.5}
//                             bgcolor="action.hover"
//                             borderRadius={1}
//                         >
//                             <Typography fontWeight="medium" color="text.secondary">
//                                 Email
//                             </Typography>
//                             <Typography color="text.secondary" fontSize="0.875rem">
//                                 {product.sellerId?.email || "N/A"}
//                             </Typography>
//                         </Box>
//                     </CardContent>
//                 </Card>
//             </Box>

//             {/* Description Section */}
//             <Card
//                 sx={{
//                     boxShadow: 4,
//                     transition: "box-shadow 0.3s ease",
//                     "&:hover": { boxShadow: 8 },
//                 }}
//             >
//                 <CardHeader
//                     title={
//                         <Box display="flex" alignItems="center" gap={1}>
//                             <FileText size={20} color="#1976d2" />
//                             <Typography variant="h6">Product Description</Typography>
//                         </Box>
//                     }
//                     sx={{ pb: 1 }}
//                 />
//                 <CardContent>
//                     <Box
//                         p={2}
//                         bgcolor="action.selected"
//                         borderRadius={1}
//                         borderLeft={4}
//                         borderColor="primary.main"
//                     >
//                         <Typography color="text.secondary" lineHeight={1.6}>
//                             {product.description || "No description available."}
//                         </Typography>
//                     </Box>
//                 </CardContent>
//             </Card>

//             {/* Product Images Section with Edit Button */}
//             <Card
//                 sx={{
//                     boxShadow: 4,
//                     transition: "box-shadow 0.3s ease",
//                     "&:hover": { boxShadow: 8 },
//                 }}
//             >
//                 <CardHeader
//                     title={
//                         <Box display="flex" alignItems="center" gap={1} justifyContent="space-between">
//                             <Box display="flex" alignItems="center" gap={1}>
//                                 <Package size={20} color="#1976d2" />
//                                 <Typography variant="h6">Product Images</Typography>
//                             </Box>
//                             <Button
//                                 variant="contained"
//                                 size="small"
//                                 onClick={() => navigate(`/admin/products/${id}/edit`)}
//                             >
//                                 Edit Product
//                             </Button>
//                         </Box>
//                     }
//                     sx={{ pb: 1 }}
//                 />
//                 <CardContent>
//                     {imageUrl ? (
//                         <Box
//                             display="flex"
//                             justifyContent="center"
//                             alignItems="center"
//                             sx={{
//                                 mt: 1,
//                                 borderRadius: 2,
//                                 overflow: "hidden",
//                             }}
//                         >
//                             <img
//                                 src={imageUrl}
//                                 alt="Product"
//                                 style={{ maxHeight: 300, width: "auto", borderRadius: 8 }}
//                             />
//                         </Box>
//                     ) : (
//                         <Box
//                             height={128}
//                             display="flex"
//                             alignItems="center"
//                             justifyContent="center"
//                             bgcolor="action.selected"
//                             borderRadius={1}
//                             border="2px dashed"
//                             borderColor="text.disabled"
//                             flexDirection="column"
//                             gap={1}
//                         >
//                             <Package size={32} color="rgba(0,0,0,0.2)" />
//                             <Typography variant="body2" color="text.disabled" textAlign="center">
//                                 Product images will be displayed here
//                             </Typography>
//                         </Box>
//                     )}
//                 </CardContent>
//             </Card>
//         </Box>
//     )
// }





// // this below is working code  images too



// // import React, { useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import {
// //   Typography,
// //   Paper,
// //   Button,
// //   Snackbar,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogContentText,
// //   DialogTitle,
// //   useTheme,
// // } from "@mui/material";
// // import { useGetProductById } from "../../../hooks/admin/useAdminProduct";
// // import { deleteProductService } from "../../../services/admin/productService";

// // export default function ProductDetail() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const { data, isLoading, error, refetch } = useGetProductById(id);
// //   const theme = useTheme();

// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

// //   if (isLoading) return <Typography>Loading product details...</Typography>;
// //   if (error) return <Typography color="error">Error: {error.message}</Typography>;
// //   if (!data) return <Typography>Product not found</Typography>;

// //   const product = data;

// //   const handleDelete = async () => {
// //     try {
// //       await deleteProductService(product._id);
// //       setSnackbar({ open: true, message: "Product deleted successfully", severity: "success" });
// //       navigate("/admin/products");
// //     } catch (err) {
// //       setSnackbar({ open: true, message: "Failed to delete product", severity: "error" });
// //     } finally {
// //       setOpenDialog(false);
// //     }
// //   };

// //   return (
// //     <Paper
// //       elevation={4}
// //       sx={{
// //         p: 4,
// //         maxWidth: 800,
// //         mx: "auto",
// //         mt: 5,
// //         bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.100",
// //         color: theme.palette.text.primary,
// //         borderRadius: 3,
// //       }}
// //     >
// //       <Typography variant="h4" gutterBottom>{product.name}</Typography>
// //       <Typography variant="h6">Price: Rs. {product.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</Typography>
// //       <Typography>Category: {product.categoryId?.name || "N/A"}</Typography>
// //       <Typography>Seller: {product.sellerId?.firstName || "N/A"} ({product.sellerId?.email || "N/A"})</Typography>
// //       <Typography mt={2}>Description: {product.description || "No description available."}</Typography>

// //       {product.productImage && (
// //         <img
// //           src={`http://localhost:5050/${product.productImage.replace("\\", "/")}`}
// //           alt="Product"
// //           style={{ marginTop: 20, borderRadius: 8, maxHeight: 300 }}
// //         />
// //       )}

// //       <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
// //         <Button variant="contained" color="primary" onClick={() => navigate(`/admin/products/${product._id}/edit`)}>
// //           Edit Product
// //         </Button>
// //         <Button variant="outlined" color="error" onClick={() => setOpenDialog(true)}>
// //           Delete Product
// //         </Button>
// //       </div>

// //       {/* Confirmation Modal */}
// //       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
// //         <DialogTitle>Confirm Delete</DialogTitle>
// //         <DialogContent>
// //           <DialogContentText>Are you sure you want to delete this product?</DialogContentText>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
// //           <Button color="error" onClick={handleDelete}>Delete</Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* Toast Notification */}
// //       <Snackbar
// //         open={snackbar.open}
// //         autoHideDuration={3000}
// //         onClose={() => setSnackbar({ ...snackbar, open: false })}
// //         message={snackbar.message}
// //       />
// //     </Paper>
// //   );
// // }

"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useGetProductById } from "../../../hooks/admin/useAdminProduct"
import { 
    Package, 
    User, 
    Tag, 
    FileText, 
    ChevronLeft, 
    ShieldCheck, 
    Edit3, 
    History,
    Loader2,
    ArrowUpRight
} from "lucide-react"

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data: product, isLoading, error } = useGetProductById(id)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#fffcfc] flex flex-col justify-center items-center">
                <Loader2 className="w-10 h-10 text-[#f1d1d1] animate-spin mb-4" strokeWidth={1} />
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40">Analyzing Registry</p>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-[#fffcfc] flex items-center justify-center p-8">
                <div className="text-center">
                    <History className="w-12 h-12 text-[#f1d1d1] mx-auto mb-6" strokeWidth={1} />
                    <h2 className="text-2xl font-serif italic text-[#494040] mb-2">Record Not Found</h2>
                    <button onClick={() => navigate(-1)} className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-[#494040] pb-1">Return to Registry</button>
                </div>
            </div>
        )
    }

    const imageUrl = product.productImage
        ? `http://localhost:5050/${product.productImage.replace("\\", "/")}`
        : null

    return (
        <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-16 px-6 lg:px-12 selection:bg-[#f1d1d1]">
            <div className="max-w-6xl mx-auto">
                
                {/* Header Section */}
                <header className="mb-16">
                    <button 
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 text-[#494040]/40 hover:text-[#494040] transition-all mb-8 uppercase text-[10px] font-bold tracking-[0.2em]"
                    >
                        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Return to Registry
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#f1d1d1]/30 pb-12">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[#f1d1d1]">
                                <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#494040]/60">Registry Inspection</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight leading-none">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4 pt-2">
                                <span className="text-2xl font-light text-[#494040]">NPR {product.price.toLocaleString()}</span>
                                <span className="w-[1px] h-4 bg-[#f1d1d1]"></span>
                                <span className="text-[10px] font-bold tracking-widest uppercase text-[#f1d1d1]">Ref ID: {id.slice(-8).toUpperCase()}</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => navigate(`/admin/products/${id}/edit`)}
                            className="group flex items-center gap-4 bg-[#494040] text-[#fffcfc] px-10 py-4 rounded-full transition-all duration-500 hover:bg-[#362f2f] shadow-xl"
                        >
                            <Edit3 size={16} className="text-[#f1d1d1]" />
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Modify Masterpiece</span>
                        </button>
                    </div>
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Left Side: Editorial Image Frame */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="relative group">
                            {/* Subtle Background Shape */}
                            <div className="absolute -inset-4 bg-[#f1d1d1]/10 rounded-sm -z-10 transition-transform duration-1000 group-hover:scale-105"></div>
                            
                            <div className="bg-white border border-[#f1d1d1]/40 p-4 shadow-[0_20px_50px_rgba(73,64,64,0.05)]">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={product.name}
                                        className="w-full object-contain bg-[#fffcfc] transition-transform duration-700 group-hover:scale-[1.02]"
                                        style={{ maxHeight: '600px' }}
                                    />
                                ) : (
                                    <div className="aspect-square flex flex-col items-center justify-center bg-[#fffcfc] text-[#f1d1d1]">
                                        <Package size={64} strokeWidth={1} />
                                        <p className="mt-4 text-[10px] font-bold tracking-widest uppercase opacity-40">No Visual Documented</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Narrative Description Section */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <FileText size={18} className="text-[#f1d1d1]" strokeWidth={1.5} />
                                <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-[#494040]/80">The Narrative</h3>
                            </div>
                            <div className="border-l border-[#f1d1d1] pl-8">
                                <p className="text-sm font-light leading-relaxed text-[#494040]/70 italic font-serif">
                                    {product.description || "No curatorial description provided for this specific acquisition."}
                                </p>
                            </div>
                        </section>
                    </div>

                    {/* Right Side: Technical Specs & Meta */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        {/* Section 1: Classification */}
                        <section className="space-y-8">
                            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 border-b border-[#f1d1d1]/20 pb-2">Classification</h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/60">Department</span>
                                    <span className="text-sm font-medium border-b border-[#f1d1d1] pb-1">{product.categoryId?.name || "Unclassified"}</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/60">Stock Status</span>
                                    <span className="flex items-center gap-2 text-[10px] font-bold tracking-tighter text-green-600 uppercase">
                                        <div className="w-1 h-1 bg-green-500 rounded-full"></div> Available in Atelier
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Curation Meta */}
                        <section className="space-y-8">
                            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 border-b border-[#f1d1d1]/20 pb-2">Curation Meta</h3>
                            <div className="bg-[#f1d1d1]/10 border border-[#f1d1d1]/30 p-8 space-y-6">
                                <div className="flex items-start gap-4">
                                    <User size={20} className="text-[#f1d1d1]" strokeWidth={1} />
                                    <div>
                                        <p className="text-[9px] font-bold tracking-widest uppercase text-[#494040]/40 mb-1">Assigned Curator</p>
                                        <p className="text-sm font-medium">{product.sellerId?.firstName || "System Curator"}</p>
                                        <p className="text-[10px] text-[#494040]/50 font-serif italic lowercase">{product.sellerId?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <ShieldCheck size={20} className="text-[#f1d1d1]" strokeWidth={1} />
                                    <div>
                                        <p className="text-[9px] font-bold tracking-widest uppercase text-[#494040]/40 mb-1">Authenticity</p>
                                        <p className="text-sm font-medium uppercase tracking-tighter">BagBelle Verified</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: Add-on Enhancements */}
                        {product.addons && product.addons.length > 0 && (
                            <section className="space-y-8">
                                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 border-b border-[#f1d1d1]/20 pb-2">Enhancements</h3>
                                <div className="space-y-4">
                                    {product.addons.map((addon, idx) => (
                                        <div key={idx} className="flex justify-between items-center group cursor-default">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1 h-1 bg-[#f1d1d1] rounded-full"></div>
                                                <span className="text-xs font-medium uppercase tracking-wide group-hover:text-[#f1d1d1] transition-colors">{addon.name}</span>
                                            </div>
                                            <span className="text-xs font-serif italic text-[#494040]/60">+ NPR {addon.price.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {/* Footer Reference */}
                <footer className="mt-32 pt-10 border-t border-[#f1d1d1]/20 flex justify-center">
                    <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#494040]/10">
                        BagBelle — Registry Record v4.11
                    </p>
                </footer>
            </div>
        </div>
    )
}