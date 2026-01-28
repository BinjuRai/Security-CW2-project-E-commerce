
import React, { useState } from "react";
import { useCreateUser } from "../../hooks/admin/useAdminUser";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ChevronLeft,
  ShieldCheck,
  Loader2,
} from "lucide-react";

export default function CreateUserForm() {
  const navigate = useNavigate();
  const {
    mutate: createUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateUser({
    onSuccess: () => {
      navigate("/admin/user");
    },
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(formData);
  };

  return (
    <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-16 px-6 selection:bg-[#f1d1d1]">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <header className="mb-12">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-[#494040]/40 hover:text-[#494040] transition-all mb-8 uppercase text-[10px] font-bold tracking-[0.2em]"
          >
            <ChevronLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Directory
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#f1d1d1]/30 pb-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#f1d1d1] font-medium tracking-widest uppercase text-[10px]">
                <span className="w-10 h-[1px] bg-[#f1d1d1]"></span>
                Administration
              </div>
              <h2 className="text-5xl font-serif italic tracking-tight">
                Client{" "}
                <span className="font-sans not-italic font-light">
                  Enrollment
                </span>
              </h2>
              <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] font-medium">
                Registering a new member into the BagBelle Private Registry.
              </p>
            </div>
            <ShieldCheck
              className="hidden md:block w-10 h-10 text-[#f1d1d1]/40"
              strokeWidth={1}
            />
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-10 bg-white border border-[#f1d1d1]/30 p-8 md:p-12 shadow-[0_10px_40px_rgba(73,64,64,0.02)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60 flex items-center gap-2">
                <User size={12} className="text-[#f1d1d1]" /> Unique Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="e.g. j_ashford"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light placeholder:text-[#494040]/20"
              />
            </div>

            {/* First Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Julian"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light placeholder:text-[#494040]/20"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Ashford"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light placeholder:text-[#494040]/20"
              />
            </div>

            {/* Email */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60 flex items-center gap-2">
                <Mail size={12} className="text-[#f1d1d1]" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="concierge@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light placeholder:text-[#494040]/20"
              />
            </div>

            {/* Password */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60 flex items-center gap-2">
                <Lock size={12} className="text-[#f1d1d1]" /> Secure Access Code
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light placeholder:text-[#494040]/20"
              />
            </div>
          </div>

          {/* Submit Section */}
          <div className="pt-6 border-t border-[#f1d1d1]/20">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#494040] text-[#fffcfc] py-5 rounded-full flex items-center justify-center gap-3 group hover:bg-[#362f2f] transition-all duration-500 disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 size={18} className="animate-spin text-[#f1d1d1]" />
              ) : (
                <>
                  <UserPlus size={16} className="text-[#f1d1d1]" />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                    Complete Enrollment
                  </span>
                </>
              )}
            </button>

            {/* Feedback States */}
            {isError && (
              <p className="mt-4 text-[10px] font-bold tracking-widest text-red-400 uppercase text-center italic">
                Enrollment Failed: {error.message}
              </p>
            )}
            {isSuccess && (
              <p className="mt-4 text-[10px] font-bold tracking-widest text-[#494040] uppercase text-center">
                Member Profile Created Successfully
              </p>
            )}
          </div>
        </form>

        <footer className="mt-12 text-center">
          <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#494040]/10">
            BagBelle — Registry Protocol v1.4
          </p>
        </footer>
      </div>
    </div>
  );
}
