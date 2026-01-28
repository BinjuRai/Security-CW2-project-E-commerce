// import React, { useState, useEffect } from "react";
// import { FaTruck, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

// export default function DeliveryInfoModal({ isOpen, onClose, onSubmit, userEmail, userName }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: ""
//   });

//   const [errors, setErrors] = useState({});

//   // Auto-fill name and email from user context
//   useEffect(() => {
//     if (isOpen) {
//       setFormData(prev => ({
//         ...prev,
//         name: userName || "",
//         email: userEmail || ""
//       }));
//     }
//   }, [isOpen, userName, userEmail]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ""
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }
    
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }
    
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
//       newErrors.phone = "Phone number must be 10 digits";
//     }
    
//     if (!formData.address.trim()) {
//       newErrors.address = "Delivery address is required";
//     } else if (formData.address.trim().length < 10) {
//       newErrors.address = "Please provide a complete address";
//     }
    
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const newErrors = validateForm();
    
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
    
//     onSubmit(formData);
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 flex items-center justify-center z-50 p-4"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="delivery-info-title"
//       onClick={(e) => {
//         if (e.target === e.currentTarget) onClose();
//       }}
//     >
//       <div
//         className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl shadow-3xl animate-fade-in overflow-hidden"
//         tabIndex={-1}
//       >
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
//           <div className="flex items-center gap-3">
//             <FaTruck className="text-4xl text-white" />
//             <div>
//               <h2
//                 id="delivery-info-title"
//                 className="text-2xl font-extrabold text-white"
//               >
//                 Delivery Information
//               </h2>
//               <p className="text-blue-100 text-sm mt-1">
//                 Please provide your delivery details
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-5">
//           {/* Name Field */}
//           <div>
//             <label
//               htmlFor="name"
//               className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
//             >
//               <FaUser className="text-blue-600" />
//               Full Name *
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
//                 errors.name
//                   ? "border-red-500 focus:ring-red-500"
//                   : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
//               } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
//               placeholder="Enter your full name"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                 <span>⚠</span> {errors.name}
//               </p>
//             )}
//           </div>

//           {/* Email Field */}
//           <div>
//             <label
//               htmlFor="email"
//               className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
//             >
//               <FaEnvelope className="text-blue-600" />
//               Email Address *
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
//                 errors.email
//                   ? "border-red-500 focus:ring-red-500"
//                   : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
//               } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
//               placeholder="your.email@example.com"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                 <span>⚠</span> {errors.email}
//               </p>
//             )}
//           </div>

//           {/* Phone Field */}
//           <div>
//             <label
//               htmlFor="phone"
//               className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
//             >
//               <FaPhone className="text-blue-600" />
//               Phone Number *
//             </label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
//                 errors.phone
//                   ? "border-red-500 focus:ring-red-500"
//                   : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
//               } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
//               placeholder="9812345678"
//             />
//             {errors.phone && (
//               <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                 <span>⚠</span> {errors.phone}
//               </p>
//             )}
//           </div>

//           {/* Address Field - Simple Text Input */}
//           <div>
//             <label
//               htmlFor="address"
//               className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
//             >
//               <FaMapMarkerAlt className="text-blue-600" />
//               Delivery Address *
//             </label>
//             <input
//               type="text"
//               id="address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
//                 errors.address
//                   ? "border-red-500 focus:ring-red-500"
//                   : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
//               } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
//               placeholder="e.g., Baneshwor, Kathmandu"
//             />
//             {errors.address && (
//               <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                 <span>⚠</span> {errors.address}
//               </p>
//             )}
//             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//               Please provide your complete delivery address
//             </p>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4 pt-4">
//             <button
//               type="submit"
//               className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//             >
//               Continue to Place Order
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-all"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Truck, User, Mail, Phone, MapPin, X, ArrowRight } from "lucide-react";

export default function DeliveryInfoModal({ isOpen, onClose, onSubmit, userEmail, userName }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        name: userName || "",
        email: userEmail || ""
      }));
    }
  }, [isOpen, userName, userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = "Must be a 10-digit number";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please provide a more detailed address";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#494040]/40 backdrop-blur-md flex items-center justify-center z-[60] p-4 animate-in fade-in duration-300"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-[#fffcfc] w-full max-w-2xl shadow-[0_20px_50px_rgba(73,64,64,0.15)] border border-[#f1d1d1]/30 overflow-hidden relative"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-[#494040]/40 hover:text-[#494040] transition-colors z-10"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <div className="p-8 md:p-12">
          {/* Header Section */}
          <header className="mb-10">
            <div className="flex items-center gap-2 text-[#f1d1d1] mb-2">
              <span className="w-8 h-[1px] bg-[#f1d1d1]"></span>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#494040]/60">Logistics</span>
            </div>
            <h2 className="text-4xl font-serif italic text-[#494040]">
              Shipping <span className="font-sans not-italic font-light">Details</span>
            </h2>
            <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] mt-2 font-medium">
              Specify the destination for your curated selection
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/40 flex items-center gap-2">
                  <User size={12} className="text-[#f1d1d1]" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors font-light ${
                    errors.name ? "border-red-300" : "border-[#f1d1d1] focus:border-[#494040]"
                  }`}
                  placeholder="e.g. Julian Ashford"
                />
                {errors.name && <p className="text-[9px] text-red-400 font-bold uppercase tracking-tighter">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/40 flex items-center gap-2">
                  <Mail size={12} className="text-[#f1d1d1]" />
                  Contact Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors font-light ${
                    errors.email ? "border-red-300" : "border-[#f1d1d1] focus:border-[#494040]"
                  }`}
                  placeholder="concierge@example.com"
                />
                {errors.email && <p className="text-[9px] text-red-400 font-bold uppercase tracking-tighter">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/40 flex items-center gap-2">
                  <Phone size={12} className="text-[#f1d1d1]" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors font-light ${
                    errors.phone ? "border-red-300" : "border-[#f1d1d1] focus:border-[#494040]"
                  }`}
                  placeholder="98XXXXXXXX"
                />
                {errors.phone && <p className="text-[9px] text-red-400 font-bold uppercase tracking-tighter">{errors.phone}</p>}
              </div>

              {/* Address */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/40 flex items-center gap-2">
                  <MapPin size={12} className="text-[#f1d1d1]" />
                  Destination
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors font-light ${
                    errors.address ? "border-red-300" : "border-[#f1d1d1] focus:border-[#494040]"
                  }`}
                  placeholder="Street, District, City"
                />
                {errors.address && <p className="text-[9px] text-red-400 font-bold uppercase tracking-tighter">{errors.address}</p>}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#f1d1d1]/20">
              <button
                type="button"
                onClick={onClose}
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 hover:text-[#494040] transition-colors"
              >
                Go Back
              </button>

              <button
                type="submit"
                className="w-full md:w-auto px-12 py-5 bg-[#494040] text-[#fffcfc] rounded-full flex items-center justify-center gap-4 group hover:bg-[#362f2f] transition-all duration-500 shadow-xl"
              >
                <span className="text-xs font-bold tracking-[0.3em] uppercase">Finalize Order</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Aesthetic Accent */}
        <div className="h-1 w-full bg-[#f1d1d1]/10"></div>
      </div>
    </div>
  );
}