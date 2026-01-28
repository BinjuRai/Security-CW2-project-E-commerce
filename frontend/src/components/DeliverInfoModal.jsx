import React, { useState, useEffect } from "react";
import { Truck, User, Mail, Phone, MapPin, X, ArrowRight } from "lucide-react";

export default function DeliveryInfoModal({
  isOpen,
  onClose,
  onSubmit,
  userEmail,
  userName,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        name: userName || "",
        email: userEmail || "",
      }));
    }
  }, [isOpen, userName, userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ""))) {
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
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#fffcfc] w-full max-w-2xl shadow-[0_20px_50px_rgba(73,64,64,0.15)] border border-[#f1d1d1]/30 overflow-hidden relative">
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
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#494040]/60">
                Logistics
              </span>
            </div>
            <h2 className="text-4xl font-serif italic text-[#494040]">
              Shipping{" "}
              <span className="font-sans not-italic font-light">Details</span>
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
                    errors.name
                      ? "border-red-300"
                      : "border-[#f1d1d1] focus:border-[#494040]"
                  }`}
                  placeholder="e.g. Julian Ashford"
                />
                {errors.name && (
                  <p className="text-[9px] text-red-400 font-bold uppercase tracking-tighter">
                    {errors.name}
                  </p>
                )}
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
                    errors.email
                      ? "border-red-300"
                      : "border-[#f1d1d1] focus:border-[#494040]"
                  }`}
                  placeholder="concierge@example.com"
                />
                {errors.email && (
                  <p className="text-[9px] text-red-400 font-bold uppercase tracking-tighter">
                    {errors.email}
                  </p>
                )}
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
                    errors.phone
                      ? "border-red-300"
                      : "border-[#f1d1d1] focus:border-[#494040]"
                  }`}
                  placeholder="98XXXXXXXX"
                />
                {errors.phone && (
                  <p className="text-[9px] text-red-400 font-bold uppercase tracking-tighter">
                    {errors.phone}
                  </p>
                )}
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
                    errors.address
                      ? "border-red-300"
                      : "border-[#f1d1d1] focus:border-[#494040]"
                  }`}
                  placeholder="Street, District, City"
                />
                {errors.address && (
                  <p className="text-[9px] text-red-400 font-bold uppercase tracking-tighter">
                    {errors.address}
                  </p>
                )}
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
                <span className="text-xs font-bold tracking-[0.3em] uppercase">
                  Finalize Order
                </span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-2 transition-transform"
                />
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
