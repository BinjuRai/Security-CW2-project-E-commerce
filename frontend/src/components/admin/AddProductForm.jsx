// import React, { useState, useContext, useEffect } from "react";
// import {
//     TextField,
//     Button,
//     MenuItem,
//     Typography,
//     Paper,
//     Grid,
//     IconButton,
//     Box,
//     InputLabel,
//     FormControl,
//     Select,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { Add, Delete } from "@mui/icons-material";
// import { AuthContext } from "../../auth/AuthProvider";
// import { useCreateProduct } from "../../hooks/admin/useAdminProduct";
// import { useAdminCategory } from "../../hooks/admin/useAdminCategory";

// const FormWrapper = styled(Paper)(({ theme }) => ({

//     padding: theme.spacing(4),
//     marginTop: theme.spacing(5),
//     maxWidth: "800px",
//     marginLeft: "auto",
//     marginRight: "auto",
//     backgroundColor: theme.palette.background.paper,
//     color: theme.palette.text.primary,
// }));

// export default function AddProductForm() {
//     const { user } = useContext(AuthContext);
//     const userId = user?._id;
//     const { categories, isLoading: loadingCategories } = useAdminCategory();
//     const { mutate: createProduct, isLoading: creating } = useCreateProduct();

//     const [formData, setFormData] = useState({
//         category: "",
//         itemName: "",
//         description: "",
//         price: "",
//         image: null,
//         addons: [{ name: "", price: "" }],
//     });
//     const [previewUrl, setPreviewUrl] = useState(null);
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         if (!formData.image) {
//             setPreviewUrl(null);
//             return;
//         }
//         const objectUrl = URL.createObjectURL(formData.image);
//         setPreviewUrl(objectUrl);
//         return () => URL.revokeObjectURL(objectUrl);
//     }, [formData.image]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleImageChange = (e) => {
//         setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
//     };

//     const handleAddonChange = (index, field, value) => {
//         const updatedAddons = [...formData.addons];
//         updatedAddons[index][field] = value;
//         setFormData((prev) => ({ ...prev, addons: updatedAddons }));
//     };

//     const addAddon = () => {
//         setFormData((prev) => ({
//             ...prev,
//             addons: [...prev.addons, { name: "", price: "" }],
//         }));
//     };

//     const removeAddon = (index) => {
//         setFormData((prev) => ({
//             ...prev,
//             addons: prev.addons.filter((_, i) => i !== index),
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setMessage("");

//         if (!userId) {
//             setMessage("You must be logged in to add a product.");
//             return;
//         }

//         if (!formData.itemName || !formData.price || !formData.category) {
//             setMessage("Please fill required fields.");
//             return;
//         }

//         const data = new FormData();
//         data.append("name", formData.itemName);
//         data.append("price", formData.price);
//         data.append("categoryId", formData.category);
//         data.append("userId", userId);
//         data.append("description", formData.description);

//         if (formData.image) {
//             data.append("productImage", formData.image);
//         }

//         formData.addons.forEach((addon, index) => {
//             if (addon.name.trim()) {
//                 data.append(`addons[${index}][name]`, addon.name);
//                 data.append(`addons[${index}][price]`, addon.price || "0");
//             }
//         });

//         createProduct(data, {
//             onSuccess: () => {
//                 setMessage("Product created successfully!");
//                 setFormData({
//                     category: "",
//                     itemName: "",
//                     description: "",
//                     price: "",
//                     image: null,
//                     addons: [{ name: "", price: "" }],
//                 });
//                 setPreviewUrl(null);
//             },
//             onError: (error) => {
//                 setMessage(error?.message || "Failed to create product.");
//             },
//         });
//     };

//     return (
//         <FormWrapper elevation={3} component="form" onSubmit={handleSubmit}>
//             <Typography variant="h4" gutterBottom>
//                 Add New Product
//             </Typography>

//             <FormControl fullWidth margin="normal">
//                 <InputLabel>Category *</InputLabel>
//                 <Select
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     required
//                     label="Category *"
//                 >
//                     <MenuItem value="">
//                         <em>Select a category</em>
//                     </MenuItem>
//                     {loadingCategories ? (
//                         <MenuItem disabled>Loading...</MenuItem>
//                     ) : (
//                         categories.map((cat) => (
//                             <MenuItem key={cat._id} value={cat._id}>
//                                 {cat.name}
//                             </MenuItem>
//                         ))
//                     )}
//                 </Select>
//             </FormControl>

//             <TextField
//                 fullWidth
//                 name="itemName"
//                 label="Item Name *"
//                 value={formData.itemName}
//                 onChange={handleChange}
//                 margin="normal"
//                 required
//             />

//             <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 name="description"
//                 label="Description *"
//                 value={formData.description}
//                 onChange={handleChange}
//                 margin="normal"
//                 required
//             />

//             <TextField
//                 fullWidth
//                 type="number"
//                 name="price"
//                 label="Price *"
//                 value={formData.price}
//                 onChange={handleChange}
//                 margin="normal"
//                 required
//             />

//             <Box my={2}>
//                 <Button variant="contained" component="label">
//                     Upload Product Image
//                     <input
//                         type="file"
//                         hidden
//                         accept="image/*"
//                         onChange={handleImageChange}
//                     />
//                 </Button>
//                 {formData.image && (
//                     <Typography variant="body2" mt={1}>
//                         {formData.image.name}
//                     </Typography>
//                 )}
//             </Box>

//             {previewUrl && (
//                 <Box my={2}>
//                     <img
//                         src={previewUrl}
//                         alt="preview"
//                         style={{ width: 200, height: 200, objectFit: "cover", borderRadius: 8 }}
//                     />
//                 </Box>
//             )}

//             <Typography variant="h6" mt={4}>
//                 Add-ons (Optional)
//             </Typography>

//             {formData.addons.map((addon, index) => (
//                 <Grid container spacing={2} key={index} alignItems="center" mt={1}>
//                     <Grid item xs={6}>
//                         <TextField
//                             fullWidth
//                             label="Add-on Name"
//                             value={addon.name}
//                             onChange={(e) => handleAddonChange(index, "name", e.target.value)}
//                         />
//                     </Grid>
//                     <Grid item xs={4}>
//                         <TextField
//                             fullWidth
//                             type="number"
//                             label="Price"
//                             value={addon.price}
//                             onChange={(e) => handleAddonChange(index, "price", e.target.value)}
//                         />
//                     </Grid>
//                     <Grid item xs={2}>
//                         {formData.addons.length > 1 && (
//                             <IconButton onClick={() => removeAddon(index)} color="error">
//                                 <Delete />
//                             </IconButton>
//                         )}
//                     </Grid>
//                 </Grid>
//             ))}

//             <Box mt={2}>
//                 <Button startIcon={<Add />} onClick={addAddon}>
//                     Add another add-on
//                 </Button>
//             </Box>

//             {message && (
//                 <Typography
//                     color={message.includes("successfully") ? "success.main" : "error"}
//                     align="center"
//                     mt={2}
//                 >
//                     {message}
//                 </Typography>
//             )}

//             <Box display="flex" justifyContent="space-between" mt={4}>
//                 <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => {
//                         setFormData({
//                             category: "",
//                             itemName: "",
//                             description: "",
//                             price: "",
//                             image: null,
//                             addons: [{ name: "", price: "" }],
//                         });
//                         setPreviewUrl(null);
//                     }}
//                     disabled={creating}
//                 >
//                     Cancel
//                 </Button>
//                 <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     disabled={creating}
//                 >
//                     {creating ? "Adding..." : "Confirm & Add Product"}
//                 </Button>
//             </Box>
//         </FormWrapper>
//     );
// }
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import { useCreateProduct } from "../../hooks/admin/useAdminProduct";
import { useAdminCategory } from "../../hooks/admin/useAdminCategory";
import { 
    Plus, 
    Trash2, 
    Upload, 
    Image as ImageIcon, 
    Check, 
    X, 
    Package, 
    Zap,
    ChevronDown,
    Loader2
} from "lucide-react";

export default function AddProductForm() {
    const { user } = useContext(AuthContext);
    const userId = user?._id;
    const { categories, isLoading: loadingCategories } = useAdminCategory();
    const { mutate: createProduct, isPending: creating } = useCreateProduct();

    const [formData, setFormData] = useState({
        category: "",
        itemName: "",
        description: "",
        price: "",
        image: null,
        addons: [{ name: "", price: "" }],
    });
    const [previewUrl, setPreviewUrl] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!formData.image) {
            setPreviewUrl(null);
            return;
        }
        const objectUrl = URL.createObjectURL(formData.image);
        setPreviewUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [formData.image]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleAddonChange = (index, field, value) => {
        const updatedAddons = [...formData.addons];
        updatedAddons[index][field] = value;
        setFormData((prev) => ({ ...prev, addons: updatedAddons }));
    };

    const addAddon = () => {
        setFormData((prev) => ({
            ...prev,
            addons: [...prev.addons, { name: "", price: "" }],
        }));
    };

    const removeAddon = (index) => {
        setFormData((prev) => ({
            ...prev,
            addons: prev.addons.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");

        if (!userId) {
            setMessage("Error: Unauthorized session.");
            return;
        }

        const data = new FormData();
        data.append("name", formData.itemName);
        data.append("price", formData.price);
        data.append("categoryId", formData.category);
        data.append("userId", userId);
        data.append("description", formData.description);

        if (formData.image) {
            data.append("productImage", formData.image);
        }

        formData.addons.forEach((addon, index) => {
            if (addon.name.trim()) {
                data.append(`addons[${index}][name]`, addon.name);
                data.append(`addons[${index}][price]`, addon.price || "0");
            }
        });

        createProduct(data, {
            onSuccess: () => {
                setMessage("Success: Product curated successfully.");
                setFormData({
                    category: "",
                    itemName: "",
                    description: "",
                    price: "",
                    image: null,
                    addons: [{ name: "", price: "" }],
                });
                setPreviewUrl(null);
            },
            onError: (error) => {
                setMessage(`Error: ${error?.message || "Failed to curate piece."}`);
            },
        });
    };

    return (
        <div className="bg-[#fffcfc] text-[#494040] selection:bg-[#f1d1d1]">
            <div className="max-w-4xl mx-auto py-10 px-6">
                
                {/* Editorial Header */}
                <header className="mb-16 border-b border-[#f1d1d1]/30 pb-10">
                    <div className="flex items-center gap-2 text-[#f1d1d1] mb-3">
                        <span className="w-10 h-[1px] bg-[#f1d1d1]"></span>
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Registry Entry</span>
                    </div>
                    <h1 className="text-5xl font-serif italic tracking-tight">
                        Curate <span className="font-sans not-italic font-light">New Piece</span>
                    </h1>
                </header>

                <form onSubmit={handleSubmit} className="space-y-16">
                    
                    {/* Section 1: Identity */}
                    <div className="space-y-10">
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">01. Identity & Classification</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            {/* Category Select */}
                            <div className="space-y-2 relative">
                                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/60">Department</label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light appearance-none"
                                    >
                                        <option value="">Select a Collection</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-0 top-4 w-3 h-3 text-[#f1d1d1] pointer-events-none" />
                                </div>
                            </div>

                            {/* Item Name */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/60">Nomenclature</label>
                                <input
                                    name="itemName"
                                    type="text"
                                    placeholder="e.g. Carbon Fiber Exhaust"
                                    value={formData.itemName}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light placeholder:text-[#494040]/20"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/60">Narrative / Description</label>
                                <textarea
                                    name="description"
                                    rows={2}
                                    placeholder="Describe the masterpiece..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-all font-light resize-none placeholder:text-[#494040]/20"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Financials & Visuals */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="space-y-10">
                            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">02. Investment</span>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/60">Base Price (NPR)</label>
                                <input
                                    name="price"
                                    type="number"
                                    placeholder="0,000"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-serif italic text-2xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">03. Visual Representation</span>
                            <div className="flex gap-6 items-start">
                                <label className="flex-1 cursor-pointer group">
                                    <div className="h-32 border border-dashed border-[#f1d1d1] bg-white flex flex-col items-center justify-center gap-2 group-hover:bg-[#f1d1d1]/5 transition-all duration-500">
                                        <Upload className="w-5 h-5 text-[#f1d1d1] group-hover:-translate-y-1 transition-transform" strokeWidth={1.5} />
                                        <span className="text-[9px] font-bold tracking-widest uppercase text-[#494040]/40">Upload Asset</span>
                                    </div>
                                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                </label>

                                {previewUrl && (
                                    <div className="w-32 h-32 border border-[#f1d1d1] bg-white p-2 animate-in fade-in zoom-in-95">
                                        <img src={previewUrl} alt="preview" className="w-full h-full object-contain" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Enhancements (Add-ons) */}
                    <div className="space-y-8">
                        <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">04. Optional Enhancements</span>
                            <button 
                                type="button" 
                                onClick={addAddon}
                                className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#f1d1d1] hover:text-[#494040] transition-colors"
                            >
                                <Plus size={14} /> Add Enhancement
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.addons.map((addon, index) => (
                                <div key={index} className="grid grid-cols-12 gap-6 items-end group">
                                    <div className="col-span-7">
                                        <input
                                            placeholder="Enhancement Name"
                                            value={addon.name}
                                            onChange={(e) => handleAddonChange(index, "name", e.target.value)}
                                            className="w-full bg-transparent border-b border-[#f1d1d1]/40 py-2 focus:outline-none focus:border-[#494040] text-sm font-light transition-colors"
                                        />
                                    </div>
                                    <div className="col-span-4">
                                        <input
                                            type="number"
                                            placeholder="+ NPR"
                                            value={addon.price}
                                            onChange={(e) => handleAddonChange(index, "price", e.target.value)}
                                            className="w-full bg-transparent border-b border-[#f1d1d1]/40 py-2 focus:outline-none focus:border-[#494040] text-sm font-light transition-colors"
                                        />
                                    </div>
                                    <div className="col-span-1 flex justify-end">
                                        {formData.addons.length > 1 && (
                                            <button type="button" onClick={() => removeAddon(index)} className="text-[#f1d1d1] hover:text-red-400 transition-colors">
                                                <Trash2 size={16} strokeWidth={1.5} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Feedback Message */}
                    {message && (
                        <div className={`p-4 border text-center text-[10px] font-bold tracking-widest uppercase ${message.includes("Success") ? 'bg-green-50 border-green-100 text-green-600' : 'bg-red-50 border-red-100 text-red-600'}`}>
                            {message}
                        </div>
                    )}

                    {/* Submit Actions */}
                    <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#f1d1d1]/30">
                        <button
                            type="button"
                            onClick={() => {
                                setFormData({
                                    category: "", itemName: "", description: "", price: "",
                                    image: null, addons: [{ name: "", price: "" }],
                                });
                                setPreviewUrl(null);
                            }}
                            className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 hover:text-[#494040] transition-colors"
                        >
                            Reset Form
                        </button>
                        
                        <button
                            type="submit"
                            disabled={creating}
                            className="w-full md:w-auto px-12 py-5 bg-[#494040] text-[#fffcfc] rounded-full flex items-center justify-center gap-4 group hover:bg-[#362f2f] transition-all duration-500 shadow-xl disabled:opacity-50"
                        >
                            {creating ? (
                                <Loader2 size={18} className="animate-spin text-[#f1d1d1]" />
                            ) : (
                                <>
                                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Register Masterpiece</span>
                                    <Check size={16} className="text-[#f1d1d1] group-hover:scale-125 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}