// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//     Typography,
//     TextField,
//     Button,
//     Box,
//     Paper,
//     Snackbar,
//     IconButton,
//     Stack,
// } from "@mui/material";
// import { Add, Delete } from "@mui/icons-material";
// import { useGetProductById, useUpdateProduct } from "../../../hooks/admin/useAdminProduct";
// import { getBackendImageUrl } from "../../../utils/backend-image";

// export default function EditProduct() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { data: product, isLoading, error } = useGetProductById(id);
//     const updateProduct = useUpdateProduct();

//     const [form, setForm] = useState({
//         name: "",
//         price: "",
//         description: "",
//         categoryId: "",
//         addons: [],
//         image: null,
//     });

//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//     useEffect(() => {
//         if (product) {
//             setForm({
//                 name: product.name || "",
//                 price: product.price || "",
//                 description: product.description || "",
//                 categoryId: product.categoryId?._id || "",
//                 addons: product.addons || [],
//                 image: null,
//             });
//         }
//     }, [product]);

//     if (isLoading) return <Typography>Loading product data...</Typography>;
//     if (error) return <Typography color="error">Error loading product: {error.message}</Typography>;

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setForm((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleAddonChange = (index, field, value) => {
//         const updatedAddons = [...form.addons];
//         updatedAddons[index][field] = field === "price" ? Number(value) : value;
//         setForm((prev) => ({ ...prev, addons: updatedAddons }));
//     };

//     const addAddon = () => {
//         setForm((prev) => ({ ...prev, addons: [...prev.addons, { name: "", price: 0 }] }));
//     };

//     const removeAddon = (index) => {
//         setForm((prev) => ({ ...prev, addons: prev.addons.filter((_, i) => i !== index) }));
//     };

//     const handleFileChange = (e) => {
//         setForm((prev) => ({ ...prev, image: e.target.files[0] }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const formData = new FormData();
//             formData.append("name", form.name);
//             formData.append("price", form.price);
//             formData.append("description", form.description);
//             formData.append("categoryId", form.categoryId);
//             formData.append("addons", JSON.stringify(form.addons));
//             if (form.image) {
//                 formData.append("productImage", form.image);
//             }

//             await updateProduct.mutateAsync({ id, data: formData });

//             setSnackbar({ open: true, message: "Product updated successfully!", severity: "success" });

//             setTimeout(() => {
//                 navigate(`/admin/products/${id}`);
//             }, 1500);
//         } catch (err) {
//             setSnackbar({ open: true, message: "Failed to update product.", severity: "error" });
//         }
//     };


//     return (
//         <Paper sx={{ maxWidth: 600, p: 4, mx: "auto", mt: 6 }}>
//             <Typography variant="h5" gutterBottom>
//                 Edit Product
//             </Typography>

//             <Box
//                 component="form"
//                 onSubmit={handleSubmit}
//                 noValidate
//                 sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//             >
//                 <TextField
//                     label="Name"
//                     name="name"
//                     value={form.name}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <TextField
//                     label="Price"
//                     name="price"
//                     type="number"
//                     value={form.price}
//                     onChange={handleInputChange}
//                     required
//                     inputProps={{ min: 0 }}
//                 />
//                 <TextField
//                     label="Description"
//                     name="description"
//                     multiline
//                     rows={4}
//                     value={form.description}
//                     onChange={handleInputChange}
//                 />
//                 <TextField
//                     label="Category ID"
//                     name="categoryId"
//                     value={form.categoryId}
//                     onChange={handleInputChange}
//                     required
//                 />

//                 {/* Add-ons */}
//                 <Box>
//                     <Typography variant="subtitle1" gutterBottom>
//                         Add-ons
//                     </Typography>
//                     {form.addons.map((addon, index) => (
//                         <Stack direction="row" spacing={1} alignItems="center" key={index} mb={1}>
//                             <TextField
//                                 label="Name"
//                                 value={addon.name}
//                                 onChange={(e) => handleAddonChange(index, "name", e.target.value)}
//                                 required
//                             />
//                             <TextField
//                                 label="Price"
//                                 type="number"
//                                 inputProps={{ min: 0 }}
//                                 value={addon.price}
//                                 onChange={(e) => handleAddonChange(index, "price", e.target.value)}
//                                 required
//                             />
//                             <IconButton color="error" onClick={() => removeAddon(index)} size="large">
//                                 <Delete />
//                             </IconButton>
//                         </Stack>
//                     ))}
//                     <Button startIcon={<Add />} variant="outlined" onClick={addAddon}>
//                         Add Add-on
//                     </Button>
//                 </Box>

//                 {/* Image upload */}
//                 <Box>
//                     <Typography variant="subtitle1" gutterBottom>
//                         Product Image
//                     </Typography>
//                     <input type="file" accept="image/*" onChange={handleFileChange} />
//                     {product.productImage && (
//                         <Box mt={2}>
//                             <img
//                                 src={getBackendImageUrl(product.productImage)}
//                                 alt="Current product"
//                                 style={{ maxWidth: "100%", borderRadius: 8 }}
//                             />
//                         </Box>
//                     )}
//                 </Box>

//                 <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
//                     Save Changes
//                 </Button>
//             </Box>

//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={3000}
//                 onClose={() => setSnackbar({ ...snackbar, open: false })}
//                 message={snackbar.message}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//             />
//         </Paper>
//     );
// }
"use client"

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    ChevronLeft, 
    Plus, 
    Trash2, 
    Upload, 
    Check, 
    X, 
    RefreshCw, 
    Package, 
    ShieldCheck,
    Loader2
} from "lucide-react";
import { useGetProductById, useUpdateProduct } from "../../../hooks/admin/useAdminProduct";
import { getBackendImageUrl } from "../../../utils/backend-image";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: product, isLoading, error } = useGetProductById(id);
    const updateProduct = useUpdateProduct();

    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        categoryId: "",
        addons: [],
        image: null,
    });

    const [status, setStatus] = useState({ show: false, message: "", type: "success" });

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name || "",
                price: product.price || "",
                description: product.description || "",
                categoryId: product.categoryId?._id || "",
                addons: product.addons || [],
                image: null,
            });
        }
    }, [product]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#fffcfc] flex flex-col justify-center items-center">
                <Loader2 className="w-10 h-10 text-[#f1d1d1] animate-spin mb-4" strokeWidth={1} />
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40">Accessing Archive</p>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddonChange = (index, field, value) => {
        const updatedAddons = [...form.addons];
        updatedAddons[index][field] = field === "price" ? Number(value) : value;
        setForm((prev) => ({ ...prev, addons: updatedAddons }));
    };

    const addAddon = () => {
        setForm((prev) => ({ ...prev, addons: [...prev.addons, { name: "", price: 0 }] }));
    };

    const removeAddon = (index) => {
        setForm((prev) => ({ ...prev, addons: prev.addons.filter((_, i) => i !== index) }));
    };

    const handleFileChange = (e) => {
        setForm((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("price", form.price);
            formData.append("description", form.description);
            formData.append("categoryId", form.categoryId);
            formData.append("addons", JSON.stringify(form.addons));
            if (form.image) {
                formData.append("productImage", form.image);
            }

            await updateProduct.mutateAsync({ id, data: formData });
            setStatus({ show: true, message: "Registry Updated Successfully", type: "success" });
            setTimeout(() => navigate(`/admin/products`), 2000);
        } catch (err) {
            setStatus({ show: true, message: "Revision Protocol Failed", type: "error" });
        }
    };

    return (
        <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-16 px-6 lg:px-12 selection:bg-[#f1d1d1]">
            <div className="max-w-4xl mx-auto">
                
                {/* Editorial Header */}
                <header className="mb-16">
                    <button 
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 text-[#494040]/40 hover:text-[#494040] transition-all mb-8 uppercase text-[10px] font-bold tracking-[0.2em]"
                    >
                        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Registry
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#f1d1d1]/30 pb-10">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[#f1d1d1]">
                                <span className="w-10 h-[1px] bg-[#f1d1d1]"></span>
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#494040]/60">Registry Revision</span>
                            </div>
                            <h1 className="text-5xl font-serif italic tracking-tight">
                                Edit <span className="font-sans not-italic font-light">Masterpiece</span>
                            </h1>
                        </div>
                        <ShieldCheck className="hidden md:block w-12 h-12 text-[#f1d1d1]/20" strokeWidth={1} />
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-20">
                    
                    {/* Section 1: Core Registry Info */}
                    <section className="space-y-10">
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">01. Identity Parameters</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/60">Nomenclature</label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light text-lg"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/60">Market Value (NPR)</label>
                                <input
                                    name="price"
                                    type="number"
                                    value={form.price}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-serif italic text-2xl"
                                    required
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/60">Narrative Description</label>
                                <textarea
                                    name="description"
                                    rows={3}
                                    value={form.description}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-all font-light resize-none leading-relaxed"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Section 2: Visual Assets */}
                    <section className="space-y-10">
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">02. Visual Documentation</span>
                        <div className="flex flex-col md:flex-row gap-10 items-start">
                            <div className="w-full md:w-64 aspect-square bg-white border border-[#f1d1d1] p-4 flex items-center justify-center relative group">
                                <img
                                    src={form.image ? URL.createObjectURL(form.image) : getBackendImageUrl(product?.productImage)}
                                    alt="Product"
                                    className="max-full max-h-full object-contain mix-blend-multiply"
                                />
                                <div className="absolute inset-0 bg-[#494040]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            
                            <div className="flex-1 space-y-4">
                                <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-[#f1d1d1] bg-[#fffcfc] cursor-pointer hover:bg-[#f1d1d1]/5 transition-all group">
                                    <Upload className="w-6 h-6 text-[#f1d1d1] mb-2 group-hover:-translate-y-1 transition-transform" strokeWidth={1.5} />
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">Replace Imagery</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                </label>
                                <p className="text-[9px] text-[#494040]/30 italic uppercase text-center tracking-widest">Recommended: Transparent PNG or Studio White Background</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Enhancements */}
                    <section className="space-y-10">
                        <div className="flex justify-between items-end border-b border-[#f1d1d1]/20 pb-4">
                            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">03. Optional Enhancements</span>
                            <button 
                                type="button" 
                                onClick={addAddon}
                                className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#f1d1d1] hover:text-[#494040] transition-colors"
                            >
                                <Plus size={14} /> Add Line Item
                            </button>
                        </div>

                        <div className="space-y-6">
                            {form.addons.map((addon, index) => (
                                <div key={index} className="grid grid-cols-12 gap-6 items-end group animate-in fade-in duration-500">
                                    <div className="col-span-7 space-y-1">
                                        <label className="text-[8px] font-bold tracking-widest uppercase text-[#494040]/30">Enhancement Name</label>
                                        <input
                                            value={addon.name}
                                            onChange={(e) => handleAddonChange(index, "name", e.target.value)}
                                            className="w-full bg-transparent border-b border-[#f1d1d1]/40 py-2 focus:outline-none focus:border-[#494040] text-sm font-light transition-colors"
                                        />
                                    </div>
                                    <div className="col-span-4 space-y-1">
                                        <label className="text-[8px] font-bold tracking-widest uppercase text-[#494040]/30">Surcharge (NPR)</label>
                                        <input
                                            type="number"
                                            value={addon.price}
                                            onChange={(e) => handleAddonChange(index, "price", e.target.value)}
                                            className="w-full bg-transparent border-b border-[#f1d1d1]/40 py-2 focus:outline-none focus:border-[#494040] text-sm font-serif italic transition-colors"
                                        />
                                    </div>
                                    <div className="col-span-1 flex justify-end">
                                        <button 
                                            type="button" 
                                            onClick={() => removeAddon(index)} 
                                            className="text-[#f1d1d1] hover:text-red-400 transition-colors p-2"
                                        >
                                            <Trash2 size={16} strokeWidth={1.5} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Submit Area */}
                    <div className="pt-10 border-t border-[#494040] flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">Finalize Changes</p>
                            <p className="text-xs font-serif italic text-[#f1d1d1]">Inventory ID: #{id.slice(-8).toUpperCase()}</p>
                        </div>

                        <button
                            type="submit"
                            disabled={updateProduct.isPending}
                            className="w-full md:w-auto px-16 py-5 bg-[#494040] text-[#fffcfc] rounded-full flex items-center justify-center gap-4 group hover:bg-[#362f2f] transition-all duration-500 shadow-xl disabled:opacity-50"
                        >
                            {updateProduct.isPending ? (
                                <RefreshCw size={18} className="animate-spin text-[#f1d1d1]" />
                            ) : (
                                <>
                                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Save Registry Revisions</span>
                                    <Check size={16} className="text-[#f1d1d1] group-hover:scale-125 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Custom Boutique Notification */}
            {status.show && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-10">
                    <div className={`px-8 py-4 border shadow-2xl flex items-center gap-4 ${
                        status.type === 'success' ? 'bg-[#494040] text-[#fffcfc] border-[#f1d1d1]/30' : 'bg-red-50 text-red-500 border-red-200'
                    }`}>
                        {status.type === 'success' ? <Check size={16} className="text-[#f1d1d1]" /> : <X size={16} />}
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{status.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
}