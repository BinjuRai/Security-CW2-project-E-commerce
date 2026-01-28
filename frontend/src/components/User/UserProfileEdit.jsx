// import { useContext, useEffect, useState } from "react"
// import { AuthContext } from "../../auth/AuthProvider"
// import { useCurrentUser, useUpdateUser } from "../../hooks/useLoginUser" // ✅ UPDATED
// import { getBackendImageUrl } from "../../utils/backend-image"
// import { User, Mail, Save, Camera, Loader2, AlertCircle } from "lucide-react"

// export default function UserProfile() {
//   const { user: contextUser, setUser } = useContext(AuthContext)

//   // ✅ FIXED: Use useCurrentUser instead of useUser(userId)
//   const { data: currentUser, isLoading, error } = useCurrentUser()

//   // ✅ FIXED: Get userId from the fetched currentUser data
//   const userId = currentUser?._id || contextUser?._id
//   const { mutateAsync: updateUser, isPending } = useUpdateUser(userId)

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     firstName: "",
//     lastName: "",
//     profileImage: null,
//   })

//   const [previewUrl, setPreviewUrl] = useState(null)

//   useEffect(() => {
//     if (currentUser) {
//       setForm({
//         username: currentUser.username || "",
//         email: currentUser.email || "",
//         firstName: currentUser.firstName || "",
//         lastName: currentUser.lastName || "",
//         profileImage: currentUser.profileImage || null,
//       })
//     }
//   }, [currentUser])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setForm((prev) => ({ ...prev, profileImage: file }))
//       // Create preview URL for new image
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       // Prepare FormData for multipart upload
//       const formData = new FormData()
//       formData.append("username", form.username)
//       formData.append("email", form.email)
//       formData.append("firstName", form.firstName)
//       formData.append("lastName", form.lastName)
//       if (form.profileImage instanceof File) {
//         formData.append("profileImage", form.profileImage)
//       }

//       const response = await updateUser(formData)

//       // ✅ Update context with new data
//       if (response?.data) {
//         setUser(response.data)
//       }

//       setPreviewUrl(null) // Clear preview after successful update
//       alert("Profile updated successfully!")
//     } catch (err) {
//       alert(err.message || "Update failed")
//     }
//   }

//   // Get the image URL to display
//   const displayImageUrl = previewUrl ||
//     (typeof form.profileImage === "string" ? getBackendImageUrl(form.profileImage) : null)

//   // ✅ ADDED: Loading state
//   if (isLoading) {
//     return (
//       <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-sm">
//         <div className="flex flex-col items-center justify-center py-12">
//           <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
//           <p className="text-gray-600">Loading your profile...</p>
//         </div>
//       </div>
//     )
//   }

//   // ✅ ADDED: Error state
//   if (error) {
//     return (
//       <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-sm">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6">
//           <div className="flex items-start gap-3">
//             <AlertCircle className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0" />
//             <div>
//               <h3 className="text-lg font-semibold text-red-800 mb-2">
//                 Failed to load profile
//               </h3>
//               <p className="text-sm text-red-600 mb-4">
//                 {error?.message || "An error occurred while loading your profile"}
//               </p>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // ✅ ADDED: Check if user data exists
//   if (!currentUser) {
//     return (
//       <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-sm">
//         <div className="text-center py-12">
//           <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-600">No profile data available</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-sm">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
//         <p className="text-gray-600 text-sm mt-1">Update your personal information</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Profile Image Upload */}
//         <div className="flex flex-col items-center mb-8">
//           <div className="relative group">
//             {displayImageUrl ? (
//               <img
//                 src={displayImageUrl}
//                 alt="Profile"
//                 className="h-32 w-32 rounded-full object-cover border-4 border-gray-200"
//               />
//             ) : (
//               <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
//                 <User className="h-16 w-16 text-gray-400" />
//               </div>
//             )}
//             <label
//               htmlFor="profileImage"
//               className="absolute bottom-0 right-0 bg-blue-400 hover:bg-blue-500 text-white p-2.5 rounded-full cursor-pointer shadow-lg transition-colors"
//             >
//               <Camera className="h-5 w-5" />
//               <input
//                 id="profileImage"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </label>
//           </div>
//           <p className="text-sm text-gray-500 mt-3">Click the camera icon to upload a new photo</p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-5">
//           {/* Username */}
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
//               Username
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <User className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="username"
//                 name="username"
//                 value={form.username}
//                 onChange={handleChange}
//                 placeholder="Enter username"
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Mail className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="Enter email"
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
//               />
//             </div>
//           </div>

//           {/* First Name */}
//           <div>
//             <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//               First Name
//             </label>
//             <input
//               id="firstName"
//               name="firstName"
//               value={form.firstName}
//               onChange={handleChange}
//               placeholder="Enter first name"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
//             />
//           </div>

//           {/* Last Name */}
//           <div>
//             <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//               Last Name
//             </label>
//             <input
//               id="lastName"
//               name="lastName"
//               value={form.lastName}
//               onChange={handleChange}
//               placeholder="Enter last name"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="pt-4">
//           <button
//             type="submit"
//             disabled={isPending}
//             className="w-full py-3 bg-[#0B2146] text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//           >
//             {isPending ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 <span>Saving...</span>
//               </>
//             ) : (
//               <>
//                 <Save className="w-5 h-5" />
//                 <span>Save Changes</span>
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }
// import { useContext, useEffect, useState } from "react"
// import { AuthContext } from "../../auth/AuthProvider"
// import { useCurrentUser, useUpdateUser } from "../../hooks/useLoginUser"
// import { getBackendImageUrl } from "../../utils/backend-image"
// import { User, Mail, Save, Camera, Loader2, AlertCircle, ChevronRight } from "lucide-react"

// export default function UserProfile() {
//   const { user: contextUser, setUser } = useContext(AuthContext)
//   const { data: currentUser, isLoading, error } = useCurrentUser()
//   const userId = currentUser?._id || contextUser?._id
//   const { mutateAsync: updateUser, isPending } = useUpdateUser(userId)

//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     firstName: "",
//     lastName: "",
//     profileImage: null,
//   })

//   const [previewUrl, setPreviewUrl] = useState(null)

//   useEffect(() => {
//     if (currentUser) {
//       setForm({
//         username: currentUser.username || "",
//         email: currentUser.email || "",
//         firstName: currentUser.firstName || "",
//         lastName: currentUser.lastName || "",
//         profileImage: currentUser.profileImage || null,
//       })
//     }
//   }, [currentUser])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setForm((prev) => ({ ...prev, profileImage: file }))
//       const reader = new FileReader()
//       reader.onloadend = () => setPreviewUrl(reader.result)
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const formData = new FormData()
//       formData.append("username", form.username)
//       formData.append("email", form.email)
//       formData.append("firstName", form.firstName)
//       formData.append("lastName", form.lastName)
//       if (form.profileImage instanceof File) {
//         formData.append("profileImage", form.profileImage)
//       }

//       const response = await updateUser(formData)
//       if (response?.data) setUser(response.data)
//       setPreviewUrl(null)
//       alert("Profile updated successfully!")
//     } catch (err) {
//       alert(err.message || "Update failed")
//     }
//   }

//   const displayImageUrl = previewUrl || (typeof form.profileImage === "string" ? getBackendImageUrl(form.profileImage) : null)

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#fffcfc] flex justify-center items-center">
//         <div className="w-10 h-10 border-2 border-[#f1d1d1] border-t-[#494040] rounded-full animate-spin"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-16 px-6">
//       <div className="max-w-4xl mx-auto">

//         {/* Header Section */}
//         <header className="mb-16 border-b border-[#f1d1d1] pb-10 flex flex-col md:flex-row justify-between items-end gap-6">
//           <div className="space-y-3">
//             <div className="flex items-center gap-2 text-[#f1d1d1] font-medium tracking-widest uppercase text-[10px]">
//               <span className="w-8 h-[1px] bg-[#f1d1d1]"></span>
//               Member Account
//             </div>
//             <h1 className="text-5xl font-serif italic tracking-tight">
//               Your <span className="font-sans not-italic">Profile</span>
//             </h1>
//           </div>
//           <p className="text-xs uppercase tracking-[0.2em] text-[#494040]/50 mb-2">
//             Settings / Account Details
//           </p>
//         </header>

//         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16">

//           {/* Left: Avatar Upload Section */}
//           <div className="lg:col-span-4 flex flex-col items-center">
//             <div className="relative group">
//               <div className="h-56 w-56 rounded-full overflow-hidden border border-[#f1d1d1] p-2 bg-white transition-transform duration-500 group-hover:scale-[1.02]">
//                 {displayImageUrl ? (
//                   <img src={displayImageUrl} alt="Profile" className="h-full w-full rounded-full object-cover" />
//                 ) : (
//                   <div className="h-full w-full rounded-full bg-[#fffcfc] flex items-center justify-center">
//                     <User className="h-20 w-20 text-[#f1d1d1]" strokeWidth={1} />
//                   </div>
//                 )}
//               </div>

//               <label htmlFor="profileImage" className="absolute bottom-4 right-4 bg-[#494040] text-[#fffcfc] p-4 rounded-full cursor-pointer shadow-xl hover:bg-[#362f2f] transition-all duration-300">
//                 <Camera size={18} />
//                 <input id="profileImage" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
//               </label>
//             </div>
//             <p className="mt-8 text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40 text-center">
//               Upload Portrait <br/> (Max 2MB)
//             </p>
//           </div>

//           {/* Right: Form Fields */}
//           <div className="lg:col-span-8 space-y-10">
//             <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">

//               {/* Field Wrapper Component would go here, styling them directly for simplicity */}
//               <div className="space-y-2">
//                 <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">First Name</label>
//                 <input
//                   name="firstName"
//                   value={form.firstName}
//                   onChange={handleChange}
//                   placeholder="e.g. Julian"
//                   className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors placeholder:text-[#494040]/20 font-light"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">Last Name</label>
//                 <input
//                   name="lastName"
//                   value={form.lastName}
//                   onChange={handleChange}
//                   placeholder="e.g. Ashford"
//                   className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors placeholder:text-[#494040]/20 font-light"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">Username</label>
//                 <div className="relative">
//                   <input
//                     name="username"
//                     value={form.username}
//                     onChange={handleChange}
//                     className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light"
//                   />
//                   <User className="absolute right-0 top-3 h-4 w-4 text-[#f1d1d1]" />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/60">Email Address</label>
//                 <div className="relative">
//                   <input
//                     name="email"
//                     type="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light text-[#494040]/50"
//                   />
//                   <Mail className="absolute right-0 top-3 h-4 w-4 text-[#f1d1d1]" />
//                 </div>
//               </div>
//             </div>

//             {/* Submit Action */}
//             <div className="pt-10">
//               <button
//                 type="submit"
//                 disabled={isPending}
//                 className="w-full md:w-auto px-12 py-5 bg-[#494040] text-[#fffcfc] flex items-center justify-center gap-4 rounded-full group hover:bg-[#362f2f] transition-all duration-500 disabled:opacity-50"
//               >
//                 {isPending ? (
//                   <div className="w-5 h-5 border-2 border-[#fffcfc] border-t-transparent rounded-full animate-spin"></div>
//                 ) : (
//                   <>
//                     <span className="text-xs font-bold tracking-[0.3em] uppercase">Save Changes</span>
//                     <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>

//         {/* Error State */}
//         {error && (
//           <div className="mt-12 p-6 border border-[#f1d1d1] flex items-center gap-4 bg-[#f1d1d1]/5">
//             <AlertCircle className="text-[#494040]/40" size={20} />
//             <p className="text-xs tracking-wide font-light">{error?.message || "An error occurred."}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import {
  useCurrentUser,
  useUpdateUser,
  useChangePassword,
} from "../../hooks/useLoginUser";
import { getBackendImageUrl } from "../../utils/backend-image";
import {
  User,
  Mail,
  Save,
  Camera,
  Loader2,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Shield,
  Phone,
  MapPin,
  Building2,
  Globe,
} from "lucide-react";

export default function UserProfile() {
  const { user: contextUser, setUser } = useContext(AuthContext);
  const { data: currentUser, isLoading, error } = useCurrentUser();
  const userId = currentUser?._id || contextUser?._id;
  const { mutateAsync: updateUser, isPending } = useUpdateUser(userId);
  const { mutateAsync: changePassword, isPending: isChangingPassword } =
    useChangePassword(userId);

  // Tab state
  const [activeTab, setActiveTab] = useState("profile"); // "profile" or "password"

  // Profile form state
  const [form, setForm] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    profileImage: null,
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordErrors, setPasswordErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setForm({
        username: currentUser.username || "",
        email: currentUser.email || "",
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        profileImage: currentUser.profileImage || null,
        phoneNumber: currentUser.phoneNumber || "",
        address: {
          street: currentUser.address?.street || "",
          city: currentUser.address?.city || "",
          state: currentUser.address?.state || "",
          postalCode: currentUser.address?.postalCode || "",
          country: currentUser.address?.country || "",
        },
      });
    }
  }, [currentUser]);

  // Profile handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, profileImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);

      // Optional fields
      if (form.phoneNumber) {
        formData.append("phoneNumber", form.phoneNumber);
      }

      // Address fields (only add if at least one field is filled)
      const hasAddress = Object.values(form.address).some(
        (val) => val.trim() !== "",
      );
      if (hasAddress) {
        formData.append("address[street]", form.address.street);
        formData.append("address[city]", form.address.city);
        formData.append("address[state]", form.address.state);
        formData.append("address[postalCode]", form.address.postalCode);
        formData.append("address[country]", form.address.country);
      }

      if (form.profileImage instanceof File) {
        formData.append("profileImage", form.profileImage);
      }

      const response = await updateUser(formData);

      if (response?.data) {
        setUser(response.data);
      }

      setPreviewUrl(null);
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.message || "Update failed");
    }
  };

  // Password handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    const strengthMap = {
      0: { label: "Very Weak", color: "bg-red-500" },
      1: { label: "Weak", color: "bg-orange-500" },
      2: { label: "Fair", color: "bg-yellow-500" },
      3: { label: "Good", color: "bg-blue-500" },
      4: { label: "Strong", color: "bg-green-500" },
      5: { label: "Very Strong", color: "bg-green-600" },
    };

    return { strength, ...strengthMap[strength] };
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required";
    } else {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(passwordForm.newPassword)) {
        newErrors.newPassword =
          "Password must be at least 8 characters with uppercase, lowercase, number, and special character (@$!%*?&)";
      }
    }

    if (!passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (
      passwordForm.currentPassword &&
      passwordForm.newPassword &&
      passwordForm.currentPassword === passwordForm.newPassword
    ) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) return;

    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      alert("Password changed successfully!");
    } catch (err) {
      console.error("Password change error:", err);
    }
  };

  const displayImageUrl =
    previewUrl ||
    (typeof form.profileImage === "string"
      ? getBackendImageUrl(form.profileImage)
      : null);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-sm">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-sm">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Failed to load profile
              </h3>
              <p className="text-sm text-red-600 mb-4">
                {error?.message ||
                  "An error occurred while loading your profile"}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-xl shadow-sm">
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No profile data available</p>
        </div>
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-16 px-6 lg:px-12 selection:bg-[#f1d1d1]">
    <div className="max-w-4xl mx-auto">
      
      {/* Editorial Header */}
      <header className="mb-12">
        <div className="flex items-center gap-2 text-[#f1d1d1] mb-3">
          <span className="w-10 h-[1px] bg-[#f1d1d1]"></span>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Preferences</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight">
          Account <span className="font-sans not-italic font-light">Settings</span>
        </h1>
        <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] font-medium mt-4 max-w-md">
          Curating your personal identity and security protocols within the Atelier.
        </p>
      </header>

      {/* Minimalist Navigation Tabs */}
      <div className="flex gap-10 border-b border-[#f1d1d1]/30 mb-16">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all relative ${
            activeTab === "profile" ? "text-[#494040]" : "text-[#494040]/40 hover:text-[#494040]"
          }`}
        >
          Profile Information
          {activeTab === "profile" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#494040] animate-in fade-in slide-in-from-left-full duration-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`pb-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all relative ${
            activeTab === "password" ? "text-[#494040]" : "text-[#494040]/40 hover:text-[#494040]"
          }`}
        >
          Security & Password
          {activeTab === "password" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#494040] animate-in fade-in slide-in-from-left-full duration-500" />
          )}
        </button>
      </div>

      {/* Profile Tab Content */}
      {activeTab === "profile" && (
        <form onSubmit={handleSubmit} className="space-y-20 animate-in fade-in duration-700">
          
          {/* Portrait Section */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="h-44 w-44 rounded-full border border-[#f1d1d1] p-2 bg-white transition-transform duration-500 group-hover:scale-[1.02]">
                {displayImageUrl ? (
                  <img src={displayImageUrl} alt="Profile" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <div className="h-full w-full rounded-full bg-[#fffcfc] flex items-center justify-center">
                    <User className="h-16 w-16 text-[#f1d1d1]" strokeWidth={1} />
                  </div>
                )}
              </div>
              <label htmlFor="profileImage" className="absolute bottom-2 right-2 bg-[#494040] text-[#fffcfc] p-3 rounded-full cursor-pointer shadow-xl hover:bg-[#362f2f] transition-all duration-300">
                <Camera size={16} />
                <input id="profileImage" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
            <p className="mt-6 text-[9px] font-bold tracking-[0.3em] uppercase text-[#494040]/30">Update Portrait</p>
          </div>

          {/* Form Fields: Basic Info */}
          <section className="space-y-10">
            <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#f1d1d1] flex items-center gap-4">
              Basic Identity <span className="h-[1px] flex-1 bg-[#f1d1d1]/20"></span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">Username</label>
                <input name="username" value={form.username} onChange={handleChange} required className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">First Name</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">Last Name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light" />
              </div>
            </div>
          </section>

          {/* Form Fields: Address */}
          <section className="space-y-10">
            <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#f1d1d1] flex items-center gap-4">
              Logistics & Location <span className="h-[1px] flex-1 bg-[#f1d1d1]/20"></span>
            </h3>
            
            <div className="space-y-10">
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">Street Address</label>
                <input name="street" value={form.address.street} onChange={handleAddressChange} className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light" />
              </div>
              <div className="grid md:grid-cols-3 gap-x-12 gap-y-10">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">City</label>
                  <input name="city" value={form.address.city} onChange={handleAddressChange} className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">Postal Code</label>
                  <input name="postalCode" value={form.address.postalCode} onChange={handleAddressChange} className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">Country</label>
                  <input name="country" value={form.address.country} onChange={handleAddressChange} className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light" />
                </div>
              </div>
            </div>
          </section>

          {/* Submit Action */}
          <div className="pt-10 border-t border-[#f1d1d1]/30">
            <button
              type="submit"
              disabled={isPending}
              className="w-full md:w-auto px-16 py-5 bg-[#494040] text-[#fffcfc] rounded-full flex items-center justify-center gap-4 group hover:bg-[#362f2f] transition-all duration-500 shadow-xl disabled:opacity-50"
            >
              {isPending ? (
                <div className="w-5 h-5 border-2 border-[#fffcfc] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Commit Changes</span>
                  <Save size={16} className="text-[#f1d1d1] group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Password Tab Content */}
      {activeTab === "password" && (
        <div className="animate-in fade-in duration-700">
          <div className="mb-12 p-8 bg-[#f1d1d1]/10 border-l-2 border-[#f1d1d1]">
             <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040] mb-4">Security Protocol</h4>
             <ul className="text-[11px] space-y-2 text-[#494040]/60 font-light italic font-serif">
                <li>• Minimum 8 characters of complexity</li>
                <li>• Mixing of uppercase and numerical values</li>
                <li>• Inclusion of unique symbolic markers (@, $, !, %)</li>
             </ul>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-10 max-w-2xl">
            {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
              <div key={field} className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">
                  {field.replace(/([A-Z])/g, ' $1')}
                </label>
                <div className="relative">
                  <input
                    type={showPasswords[field.replace("Password", "")] ? "text" : "password"}
                    name={field}
                    value={passwordForm[field]}
                    onChange={handlePasswordChange}
                    className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors font-light ${
                      passwordErrors[field] ? "border-red-300" : "border-[#f1d1d1] focus:border-[#494040]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility(field.replace("Password", ""))}
                    className="absolute right-0 top-3 text-[#f1d1d1] hover:text-[#494040] transition-colors"
                  >
                    {showPasswords[field.replace("Password", "")] ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {passwordErrors[field] && (
                  <p className="text-[9px] font-bold text-red-400 uppercase tracking-tighter">{passwordErrors[field]}</p>
                )}
              </div>
            ))}

            {/* Password Strength Indicator */}
            {passwordForm.newPassword && (
              <div className="pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[#494040]/30">Strength</span>
                  <span className="text-[9px] font-bold uppercase text-[#494040]">{passwordStrength.label}</span>
                </div>
                <div className="h-[2px] bg-[#f1d1d1]/20 w-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-700 ${passwordStrength.color}`} 
                    style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <div className="pt-10">
              <button
                type="submit"
                disabled={isChangingPassword}
                className="w-full md:w-auto px-16 py-5 bg-[#494040] text-[#fffcfc] rounded-full flex items-center justify-center gap-4 group hover:bg-[#362f2f] transition-all duration-500 shadow-xl disabled:opacity-50"
              >
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Update Credentials</span>
                <Shield size={16} className="text-[#f1d1d1]" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  </div>
);
}
