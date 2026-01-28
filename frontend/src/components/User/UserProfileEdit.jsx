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
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
              Preferences
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight">
            Account{" "}
            <span className="font-sans not-italic font-light">Settings</span>
          </h1>
          <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] font-medium mt-4 max-w-md">
            Curating your personal identity and security protocols within the
            Atelier.
          </p>
        </header>

        {/* Minimalist Navigation Tabs */}
        <div className="flex gap-10 border-b border-[#f1d1d1]/30 mb-16">
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all relative ${
              activeTab === "profile"
                ? "text-[#494040]"
                : "text-[#494040]/40 hover:text-[#494040]"
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
              activeTab === "password"
                ? "text-[#494040]"
                : "text-[#494040]/40 hover:text-[#494040]"
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
          <form
            onSubmit={handleSubmit}
            className="space-y-20 animate-in fade-in duration-700"
          >
            {/* Portrait Section */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="h-44 w-44 rounded-full border border-[#f1d1d1] p-2 bg-white transition-transform duration-500 group-hover:scale-[1.02]">
                  {displayImageUrl ? (
                    <img
                      src={displayImageUrl}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full rounded-full bg-[#fffcfc] flex items-center justify-center">
                      <User
                        className="h-16 w-16 text-[#f1d1d1]"
                        strokeWidth={1}
                      />
                    </div>
                  )}
                </div>
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-2 right-2 bg-[#494040] text-[#fffcfc] p-3 rounded-full cursor-pointer shadow-xl hover:bg-[#362f2f] transition-all duration-300"
                >
                  <Camera size={16} />
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="mt-6 text-[9px] font-bold tracking-[0.3em] uppercase text-[#494040]/30">
                Update Portrait
              </p>
            </div>

            {/* Form Fields: Basic Info */}
            <section className="space-y-10">
              <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#f1d1d1] flex items-center gap-4">
                Basic Identity{" "}
                <span className="h-[1px] flex-1 bg-[#f1d1d1]/20"></span>
              </h3>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">
                    Username
                  </label>
                  <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light"
                  />
                </div>
              </div>
            </section>

            {/* Form Fields: Address */}
            <section className="space-y-10">
              <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#f1d1d1] flex items-center gap-4">
                Logistics & Location{" "}
                <span className="h-[1px] flex-1 bg-[#f1d1d1]/20"></span>
              </h3>

              <div className="space-y-10">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">
                    Street Address
                  </label>
                  <input
                    name="street"
                    value={form.address.street}
                    onChange={handleAddressChange}
                    className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-x-12 gap-y-10">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">
                      City
                    </label>
                    <input
                      name="city"
                      value={form.address.city}
                      onChange={handleAddressChange}
                      className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">
                      Postal Code
                    </label>
                    <input
                      name="postalCode"
                      value={form.address.postalCode}
                      onChange={handleAddressChange}
                      className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">
                      Country
                    </label>
                    <input
                      name="country"
                      value={form.address.country}
                      onChange={handleAddressChange}
                      className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light"
                    />
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
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                      Commit Changes
                    </span>
                    <Save
                      size={16}
                      className="text-[#f1d1d1] group-hover:scale-110 transition-transform"
                    />
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
              <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040] mb-4">
                Security Protocol
              </h4>
              <ul className="text-[11px] space-y-2 text-[#494040]/60 font-light italic font-serif">
                <li>• Minimum 8 characters of complexity</li>
                <li>• Mixing of uppercase and numerical values</li>
                <li>• Inclusion of unique symbolic markers (@, $, !, %)</li>
              </ul>
            </div>

            <form
              onSubmit={handlePasswordSubmit}
              className="space-y-10 max-w-2xl"
            >
              {["currentPassword", "newPassword", "confirmPassword"].map(
                (field) => (
                  <div key={field} className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/50">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <div className="relative">
                      <input
                        type={
                          showPasswords[field.replace("Password", "")]
                            ? "text"
                            : "password"
                        }
                        name={field}
                        value={passwordForm[field]}
                        onChange={handlePasswordChange}
                        className={`w-full bg-transparent border-b py-3 focus:outline-none transition-colors font-light ${
                          passwordErrors[field]
                            ? "border-red-300"
                            : "border-[#f1d1d1] focus:border-[#494040]"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          togglePasswordVisibility(
                            field.replace("Password", ""),
                          )
                        }
                        className="absolute right-0 top-3 text-[#f1d1d1] hover:text-[#494040] transition-colors"
                      >
                        {showPasswords[field.replace("Password", "")] ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    {passwordErrors[field] && (
                      <p className="text-[9px] font-bold text-red-400 uppercase tracking-tighter">
                        {passwordErrors[field]}
                      </p>
                    )}
                  </div>
                ),
              )}

              {/* Password Strength Indicator */}
              {passwordForm.newPassword && (
                <div className="pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[#494040]/30">
                      Strength
                    </span>
                    <span className="text-[9px] font-bold uppercase text-[#494040]">
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-[2px] bg-[#f1d1d1]/20 w-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ${passwordStrength.color}`}
                      style={{
                        width: `${(passwordStrength.strength / 5) * 100}%`,
                      }}
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
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                    Update Credentials
                  </span>
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
