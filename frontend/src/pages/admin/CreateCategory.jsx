// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useCreateCategory } from '../../hooks/admin/useAdminCategory';

// export default function CreateCategory() {
//     const { mutate, data, error, isPending } = useCreateCategory();

//     const validationSchema = Yup.object({
//         name: Yup.string().required('Name is required'),
//         image: Yup.mixed()
//             .nullable()
//             .test('fileSize', 'File too large', (value) => !value || (value && value.size <= 5 * 1024 * 1024)),
//     });

//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             image: '',
//         },
//         validationSchema,
//         onSubmit: (values) => {
//             const formData = new FormData();
//             formData.append('name', values.name);
//             if (values.image) formData.append('image', values.image);
//             mutate(formData, {
//                 onSuccess: () => {
//                     formik.resetForm();
//                 },
//             });
//         },
//     });

//     return (
//         <div className="max-w-4xl mx-auto mt-12 p-10 bg-white rounded-3xl shadow-xl">
//             <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Create Category</h2>

//             <form onSubmit={formik.handleSubmit} className="space-y-6">
//                 <div>
//                     <label className="block text-gray-700 font-semibold mb-1">Category Name</label>
//                     <input
//                         name="name"
//                         type="text"
//                         onChange={formik.handleChange}
//                         value={formik.values.name}
//                         className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
//                         placeholder="Enter category name"
//                     />
//                     {formik.touched.name && formik.errors.name && (
//                         <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
//                     )}
//                 </div>

//                 <div>
//                     <label className="block text-gray-700 font-semibold mb-1">Category Image</label>
//                     <input
//                         name="image"
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => {
//                             const file = e.currentTarget.files[0];
//                             if (file) formik.setFieldValue('image', file);
//                         }}
//                         className="w-full border border-gray-300 p-2 rounded-lg"
//                     />
//                     {formik.touched.image && formik.errors.image && (
//                         <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
//                     )}
//                 </div>

//                 {formik.values.image && (
//                     <div className="mt-6 text-center">
//                         <p className="text-gray-700 font-semibold mb-3">Image Preview:</p>
//                         <div className="inline-block border border-gray-300 shadow-md rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105">
//                             <img
//                                 src={URL.createObjectURL(formik.values.image)}
//                                 alt="preview"
//                                 className="w-64 h-64 object-cover"
//                             />
//                         </div>
//                         <p className="text-sm text-gray-500 mt-2">{formik.values.image.name}</p>
//                     </div>
//                 )}
//                 <button
//                     type="submit"
//                     disabled={isPending}
//                     className="w-full bg-gray-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
//                 >
//                     {isPending ? 'Creating...' : 'Create Category'}
//                 </button>

//                 {error && <p className="text-red-500 text-sm text-center mt-2">{error.message}</p>}
//                 {data && <p className="text-green-600 text-sm text-center mt-2">Category created successfully!</p>}
//             </form>
//         </div>
//     );
// }

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateCategory } from '../../hooks/admin/useAdminCategory';
import { Upload, Image as ImageIcon, Plus, X, ChevronRight, Check } from 'lucide-react';

export default function CreateCategory() {
    const { mutate, data, error, isPending } = useCreateCategory();

    const validationSchema = Yup.object({
        name: Yup.string().required('Collection name is required'),
        image: Yup.mixed()
            .nullable()
            .test('fileSize', 'File too large (Max 5MB)', (value) => !value || (value && value.size <= 5 * 1024 * 1024)),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            image: '',
        },
        validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('name', values.name);
            if (values.image) formData.append('image', values.image);
            mutate(formData, {
                onSuccess: () => {
                    formik.resetForm();
                },
            });
        },
    });

    return (
        <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-12 px-8 selection:bg-[#f1d1d1]">
            <div className="max-w-2xl mx-auto">
                
                {/* Editorial Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-2 text-[#f1d1d1] mb-3">
                        <span className="w-10 h-[1px] bg-[#f1d1d1]"></span>
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#494040]/60">Registry</span>
                    </div>
                    <h2 className="text-4xl font-serif italic text-[#494040]">
                        Create <span className="font-sans not-italic font-light">Collection</span>
                    </h2>
                    <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] mt-2 font-medium">
                        Define a new department for the BagBelle curation.
                    </p>
                </header>

                {/* Form Container */}
                <form onSubmit={formik.handleSubmit} className="space-y-10 bg-white border border-[#f1d1d1]/30 p-10 shadow-[0_10px_40px_rgba(73,64,64,0.02)]">
                    
                    {/* Collection Name */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60 flex items-center gap-2">
                            Collection Name
                        </label>
                        <input
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light placeholder:text-[#494040]/20"
                            placeholder="e.g. Aerodynamics & Body"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-[9px] text-red-400 font-bold uppercase tracking-tight mt-1">{formik.errors.name}</p>
                        )}
                    </div>

                    {/* Image Upload Area */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">
                            Visual Identity
                        </label>
                        
                        <div className="relative group">
                            <input
                                id="image-upload"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.currentTarget.files[0];
                                    if (file) formik.setFieldValue('image', file);
                                }}
                                className="hidden"
                            />
                            <label 
                                htmlFor="image-upload"
                                className="flex flex-col items-center justify-center w-full h-48 border border-dashed border-[#f1d1d1] bg-[#fffcfc] cursor-pointer hover:bg-[#f1d1d1]/5 transition-all duration-500 group-hover:border-[#494040]/30"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-6 h-6 text-[#f1d1d1] mb-3 transition-transform group-hover:-translate-y-1" strokeWidth={1.5} />
                                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/40">Select Visual Asset</p>
                                    <p className="text-[9px] text-[#494040]/20 mt-1 italic font-serif">JPG, PNG up to 5MB</p>
                                </div>
                            </label>
                        </div>

                        {formik.touched.image && formik.errors.image && (
                            <p className="text-[9px] text-red-400 font-bold uppercase tracking-tight">{formik.errors.image}</p>
                        )}
                    </div>

                    {/* Image Preview - Atelier Frame */}
                    {formik.values.image && (
                        <div className="pt-4 flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
                            <div className="relative p-2 border border-[#f1d1d1] bg-white group">
                                <img
                                    src={URL.createObjectURL(formik.values.image)}
                                    alt="preview"
                                    className="w-48 h-48 object-contain"
                                />
                                <button 
                                    type="button"
                                    onClick={() => formik.setFieldValue('image', '')}
                                    className="absolute -top-2 -right-2 bg-[#494040] text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                            <p className="text-[9px] font-bold tracking-widest uppercase text-[#494040]/40 mt-4 italic">
                                Preview: {formik.values.image.name}
                            </p>
                        </div>
                    )}

                    {/* Submit Section */}
                    <div className="pt-6 border-t border-[#f1d1d1]/20">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-[#494040] text-[#fffcfc] py-5 rounded-full flex items-center justify-center gap-3 group hover:bg-[#362f2f] transition-all duration-500 disabled:opacity-50"
                        >
                            {isPending ? (
                                <div className="w-4 h-4 border-2 border-[#fffcfc] border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Plus size={16} className="text-[#f1d1d1] group-hover:rotate-90 transition-transform" />
                                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Register Collection</span>
                                </>
                            )}
                        </button>

                        {/* Success/Error Feedback */}
                        {error && (
                            <div className="mt-6 p-4 border border-red-100 bg-red-50/30 flex items-center justify-center gap-2">
                                <X size={14} className="text-red-400" />
                                <p className="text-[10px] text-red-400 font-bold uppercase tracking-tight">{error.message}</p>
                            </div>
                        )}
                        {data && (
                            <div className="mt-6 p-4 border border-[#f1d1d1]/50 bg-[#f1d1d1]/5 flex items-center justify-center gap-2">
                                <Check size={14} className="text-[#494040]" />
                                <p className="text-[10px] text-[#494040] font-bold uppercase tracking-[0.1em]">Collection Curated Successfully</p>
                            </div>
                        )}
                    </div>
                </form>

                {/* Aesthetic Footer Detail */}
                <footer className="mt-12 text-center">
                    <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#494040]/10">
                        BagBelle — Curator Terminal v1.2
                    </p>
                </footer>
            </div>
        </div>
    );
}