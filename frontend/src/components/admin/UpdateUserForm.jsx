// import React, { useState, useEffect } from "react";
// import { useUpdateUser, useGetUserById } from "../../hooks/admin/useAdminUser";
// import { useNavigate, useParams } from "react-router-dom";

// export default function UpdateUserForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data: user, isLoading, isError, error } = useGetUserById(id);

//   const [formData, setFormData] = useState({
//     username: "",
//     firstName: "",
//     lastName: "",
//   });

//   const { mutate: updateUser, isPending } = useUpdateUser({
//     onSuccess: () => navigate("/admin/user"),
//   });

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         username: user.username || "",
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//       });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     updateUser({ id, data: formData });
//   };

//   if (isLoading) return <p>Loading user data...</p>;
//   if (isError) return <p>Error: {error.message}</p>;

//   return (
//     <div className="max-w-md mx-auto mt-10 text-center">
//       <h2 className="text-2xl font-bold mb-4">Update User</h2>

//       <form onSubmit={handleSubmit} className="flex flex-col space-y-4 text-left mt-6">
//              <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//           className="px-3 py-2 border border-gray-300 rounded-md"
//         />
//         <input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           value={formData.firstName}
//           onChange={handleChange}
//           required
//           className="px-3 py-2 border border-gray-300 rounded-md"
//         />
//         <input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           value={formData.lastName}
//           onChange={handleChange}
//           required
//           className="px-3 py-2 border border-gray-300 rounded-md"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//           disabled={isPending}
//         >
//           {isPending ? "Updating..." : "Update User"}
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useUpdateUser, useGetUserById } from "../../hooks/admin/useAdminUser";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, User, ShieldCheck, RefreshCw, Check, Loader2 } from "lucide-react";

export default function UpdateUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, isError, error } = useGetUserById(id);

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
  });

  const { mutate: updateUser, isPending } = useUpdateUser({
    onSuccess: () => navigate("/admin/user"),
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ id, data: formData });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fffcfc] flex flex-col justify-center items-center">
        <Loader2 className="w-10 h-10 text-[#f1d1d1] animate-spin mb-4" strokeWidth={1} />
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40">Accessing Registry</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#fffcfc] flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-serif italic text-red-400">Registry Error</h2>
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/40 mt-2">{error.message}</p>
          <button onClick={() => navigate(-1)} className="mt-8 text-[10px] font-bold tracking-[0.2em] uppercase border-b border-[#494040] pb-1">Return to Directory</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-16 px-6 selection:bg-[#f1d1d1]">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-[#494040]/40 hover:text-[#494040] transition-all mb-8 uppercase text-[10px] font-bold tracking-[0.2em]"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Directory
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#f1d1d1]/30 pb-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#f1d1d1] font-medium tracking-widest uppercase text-[10px]">
                <span className="w-10 h-[1px] bg-[#f1d1d1]"></span>
                Registry Revision
              </div>
              <h2 className="text-5xl font-serif italic tracking-tight">
                Update <span className="font-sans not-italic font-light">Identity</span>
              </h2>
              <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] font-medium">
                Modifying the profile parameters for client: <span className="text-[#494040]">{user?.username}</span>
              </p>
            </div>
            <ShieldCheck className="hidden md:block w-10 h-10 text-[#f1d1d1]/40" strokeWidth={1} />
          </div>
        </header>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="space-y-12 bg-white border border-[#f1d1d1]/30 p-8 md:p-12 shadow-[0_10px_40px_rgba(73,64,64,0.02)]"
        >
          <div className="space-y-10">
            {/* Username - Full width */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60 flex items-center gap-2">
                <User size={12} className="text-[#f1d1d1]" /> Nomenclature (Username)
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light text-lg placeholder:text-[#494040]/20"
              />
            </div>

            {/* Split Grid for Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-8 border-t border-[#f1d1d1]/20">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#494040] text-[#fffcfc] py-5 rounded-full flex items-center justify-center gap-4 group hover:bg-[#362f2f] transition-all duration-500 disabled:opacity-50"
            >
              {isPending ? (
                <RefreshCw size={18} className="animate-spin text-[#f1d1d1]" />
              ) : (
                <>
                  <Check size={16} className="text-[#f1d1d1] group-hover:scale-125 transition-transform" />
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Finalize Revision</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Reference */}
        <footer className="mt-12 text-center">
            <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#494040]/10">
                BagBelle — Registry Revision Mode v1.2
            </p>
        </footer>
      </div>
    </div>
  );
}