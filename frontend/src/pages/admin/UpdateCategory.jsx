// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from "yup";
// import { useGetOneCategory, useUpdateOneCategory } from '../../hooks/admin/useAdminCategory';
// import { useParams } from 'react-router-dom';
// import { getBackendImageUrl } from '../../utils/backend-image';

// export default function UpdateCategory() {
//     const { id } = useParams();
//     const updateCategory = useUpdateOneCategory();
//     const categoryOne = useGetOneCategory(id);

//     const validationSchema = Yup.object({
//         name: Yup.string().required("Name is required"),
//         image: Yup.mixed().nullable().test(
//             "fileSize",
//             "File too large (Max 5MB)",
//             (value) => !value || (value && value.size <= 5 * 1024 * 1024)
//         )
//     });

//     const formik = useFormik({
//         enableReinitialize: true,
//         initialValues: {
//             name: categoryOne.category?.name || "",
//             image: ""
//         },
//         validationSchema,
//         onSubmit: (values) => {
//             const formData = new FormData();
//             formData.append("name", values.name);
//             if (values.image) {
//                 formData.append("image", values.image);
//             }

//             updateCategory.mutate(
//                 { id, data: formData },
//                 {
//                     onSuccess: () => formik.resetForm()
//                 }
//             );
//         }
//     });

//     return (
//         <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-md rounded-2xl">
//             <h2 className="text-2xl font-bold mb-6 text-black text-center">Update Category</h2>
//             <form onSubmit={formik.handleSubmit} className="space-y-5">
//                 <div>
//                     <label className="block font-medium text-gray-700 mb-1">Category Name</label>
//                     <input
//                         name="name"
//                         onChange={formik.handleChange}
//                         value={formik.values.name}
//                         className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#A62123]"
//                     />
//                     {formik.touched.name && formik.errors.name && (
//                         <p className="text-sm text-red-600 mt-1">{formik.errors.name}</p>
//                     )}
//                 </div>

//                 <div>
//                     <label className="block font-medium text-gray-700 mb-1">Category Image</label>
//                     <input
//                         name="image"
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => {
//                             const file = e.currentTarget.files[0];
//                             if (file) formik.setFieldValue("image", file);
//                         }}
//                         className="w-full border rounded-lg p-2"
//                     />
//                     {formik.touched.image && formik.errors.image && (
//                         <p className="text-sm text-red-600 mt-1">{formik.errors.image}</p>
//                     )}
//                 </div>

//                 <div className="flex justify-center">
//                     {formik.values.image ? (
//                         <img
//                             className="w-32 h-32 object-cover rounded-lg"
//                             src={URL.createObjectURL(formik.values.image)}
//                             alt="preview"
//                         />
//                     ) : (
//                         <img
//                             className="w-32 h-32 object-cover rounded-lg"
//                             src={getBackendImageUrl(categoryOne.category?.filepath)}
//                             alt={categoryOne.category?.name}
//                         />
//                     )}
//                 </div>

//                 <div className="text-center">
//                     <button
//                         type="submit"
//                         className="bg-[#A62123] text-white font-medium py-2 px-40 rounded-lg border border-[#A62123] transition-all duration-300 hover:bg-white hover:text-[#A62123]"
//                     >
//                         Update
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useGetOneCategory, useUpdateOneCategory } from '../../hooks/admin/useAdminCategory';
import { useParams, useNavigate } from 'react-router-dom';
import { getBackendImageUrl } from '../../utils/backend-image';
import { ChevronLeft, Upload, RefreshCw, Layers, Check } from 'lucide-react';

export default function UpdateCategory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const updateCategory = useUpdateOneCategory();
    const categoryOne = useGetOneCategory(id);

    const validationSchema = Yup.object({
        name: Yup.string().required("Collection name is required"),
        image: Yup.mixed().nullable().test(
            "fileSize",
            "File too large (Max 5MB)",
            (value) => !value || (value && value.size <= 5 * 1024 * 1024)
        )
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: categoryOne.category?.name || "",
            image: ""
        },
        validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            if (values.image) {
                formData.append("image", values.image);
            }

            updateCategory.mutate(
                { id, data: formData },
                {
                    onSuccess: () => navigate('/admin/category')
                }
            );
        }
    });

    return (
        <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-12 px-8 selection:bg-[#f1d1d1]">
            <div className="max-w-2xl mx-auto">
                
                {/* Editorial Header */}
                <header className="mb-12">
                    <button 
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 text-[#494040]/40 hover:text-[#494040] transition-all mb-8 uppercase text-[10px] font-bold tracking-[0.2em]"
                    >
                        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Registry
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#f1d1d1]/30 pb-10">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[#f1d1d1] font-medium tracking-widest uppercase text-[10px]">
                                <span className="w-10 h-[1px] bg-[#f1d1d1]"></span>
                                Registry Revision
                            </div>
                            <h2 className="text-4xl font-serif italic text-[#494040]">
                                Update <span className="font-sans not-italic font-light">Collection</span>
                            </h2>
                            <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] font-medium">
                                Modifying the visual identity and nomenclature of the {categoryOne.category?.name} department.
                            </p>
                        </div>
                        <Layers className="hidden md:block w-10 h-10 text-[#f1d1d1]/40" strokeWidth={1} />
                    </div>
                </header>

                {/* Main Form Container */}
                <form 
                    onSubmit={formik.handleSubmit} 
                    className="space-y-12 bg-white border border-[#f1d1d1]/30 p-10 shadow-[0_10px_40px_rgba(73,64,64,0.02)]"
                >
                    {/* Input Field: Collection Name */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60 flex items-center gap-2">
                            Collection Nomenclature
                        </label>
                        <input
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light text-lg placeholder:text-[#494040]/20"
                            placeholder="e.g. Engine Components"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-[9px] text-red-400 font-bold uppercase tracking-tight mt-1">{formik.errors.name}</p>
                        )}
                    </div>

                    {/* Image Revision Section */}
                    <div className="space-y-6">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">
                            Visual Identity
                        </label>
                        
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            {/* Current / Preview Frame */}
                            <div className="relative group">
                                <div className="w-40 h-48 bg-white border border-[#f1d1d1] p-2 shadow-sm transition-transform duration-500 group-hover:scale-[1.02]">
                                    {formik.values.image ? (
                                        <img
                                            className="w-full h-full object-contain"
                                            src={URL.createObjectURL(formik.values.image)}
                                            alt="preview"
                                        />
                                    ) : (
                                        <img
                                            className="w-full h-full object-contain"
                                            src={getBackendImageUrl(categoryOne.category?.filepath)}
                                            alt={categoryOne.category?.name}
                                        />
                                    )}
                                </div>
                                <div className="absolute -top-2 -right-2 bg-[#494040] text-[#fffcfc] text-[8px] font-bold px-2 py-1 uppercase tracking-widest">
                                    {formik.values.image ? "New" : "Current"}
                                </div>
                            </div>

                            {/* Upload Button */}
                            <div className="flex-1 w-full">
                                <label className="relative flex flex-col items-center justify-center w-full h-32 border border-dashed border-[#f1d1d1] bg-[#fffcfc] cursor-pointer hover:bg-[#f1d1d1]/10 transition-all group">
                                    <input
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.currentTarget.files[0];
                                            if (file) formik.setFieldValue("image", file);
                                        }}
                                        className="hidden"
                                    />
                                    <Upload size={18} className="text-[#f1d1d1] mb-2 group-hover:-translate-y-1 transition-transform" />
                                    <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#494040]/50">Replace Asset</span>
                                </label>
                            </div>
                        </div>
                        {formik.touched.image && formik.errors.image && (
                            <p className="text-[9px] text-red-400 font-bold uppercase tracking-tight">{formik.errors.image}</p>
                        )}
                    </div>

                    {/* Submit Action */}
                    <div className="pt-8 border-t border-[#f1d1d1]/20">
                        <button
                            type="submit"
                            disabled={updateCategory.isPending}
                            className="w-full bg-[#494040] text-[#fffcfc] py-5 rounded-full flex items-center justify-center gap-4 group hover:bg-[#362f2f] transition-all duration-500 disabled:opacity-50"
                        >
                            {updateCategory.isPending ? (
                                <RefreshCw size={16} className="animate-spin text-[#f1d1d1]" />
                            ) : (
                                <>
                                    <Check size={16} className="text-[#f1d1d1] group-hover:scale-125 transition-transform" />
                                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Finalize Revision</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer Detail */}
                <footer className="mt-12 text-center">
                    <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#494040]/10">
                       BagBelle  — Curator Registry Edit Mode
                    </p>
                </footer>
            </div>
        </div>
    );
}