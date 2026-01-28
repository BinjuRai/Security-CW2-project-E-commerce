"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Plus,
  ChevronLeft,
  Loader2,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateBannerPage() {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [bannerError, setBannerError] = useState("");

  const API_URL = "http://localhost:5050";

  const fetchBanners = async () => {
    setLoadingBanners(true);
    setBannerError("");
    try {
      const res = await fetch(`${API_URL}/api/admin/banner`);
      if (!res.ok) throw new Error(`Failed to load banners: ${res.status}`);
      const json = await res.json();
      setBanners(json.data || []);
    } catch (err) {
      setBannerError(err.message || "Failed to load banners");
    } finally {
      setLoadingBanners(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !imageFile) {
      setError("Nomenclature and visual asset are both required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", imageFile);

      const res = await fetch(`${API_URL}/api/admin/banner`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to curate banner");
      }

      toast.success("Banner curated successfully");
      setName("");
      setImageFile(null);
      e.target.reset();
      fetchBanners();
    } catch (err) {
      setError(err.message);
      toast.error(`Protocol Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you certain you wish to remove this visual asset?"))
      return;

    try {
      const res = await fetch(`${API_URL}/api/admin/banner/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Deletion protocol failed");

      toast.success("Asset removed from registry");
      fetchBanners();
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffcfc] text-[#494040] py-16 px-6 lg:px-12 selection:bg-[#f1d1d1]">
      <Toaster
        toastOptions={{
          style: {
            background: "#494040",
            color: "#fffcfc",
            borderRadius: "0px",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          },
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-16">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-[#494040]/40 hover:text-[#494040] transition-all mb-8 uppercase text-[10px] font-bold tracking-[0.2em]"
          >
            <ChevronLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Return to Registry
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#f1d1d1]/30 pb-12">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#f1d1d1]">
                <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
                  Visual Assets
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight">
                Banner{" "}
                <span className="font-sans not-italic font-light">
                  Curation
                </span>
              </h1>
              <p className="text-[11px] text-[#494040]/40 uppercase tracking-[0.1em] font-medium max-w-md">
                Managing the aesthetic storefront visuals of the BagBelle
                Private Atelier.
              </p>
            </div>
            <ShieldCheck
              className="hidden md:block w-12 h-12 text-[#f1d1d1]/30"
              strokeWidth={1}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Creation Form */}
          <div className="lg:col-span-4">
            <section className="bg-white border border-[#f1d1d1]/30 p-8 shadow-[0_10px_40px_rgba(73,64,64,0.02)]">
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase mb-8 border-b border-[#f1d1d1]/20 pb-4">
                New Entry
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/40">
                    Nomenclature
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Winter Collection 2024"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-[#f1d1d1] py-3 focus:outline-none focus:border-[#494040] transition-colors font-light text-sm"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-[#494040]/40">
                    Visual Asset
                  </label>
                  <div className="relative group">
                    <input
                      id="banner-image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="hidden"
                    />
                    <label
                      htmlFor="banner-image"
                      className="flex flex-col items-center justify-center w-full h-40 border border-dashed border-[#f1d1d1] bg-[#fffcfc] cursor-pointer hover:bg-[#f1d1d1]/5 transition-all group-hover:border-[#494040]/30"
                    >
                      <Upload className="w-5 h-5 text-[#f1d1d1] mb-2 group-hover:-translate-y-1 transition-transform" />
                      <span className="text-[9px] font-bold tracking-widest uppercase text-[#494040]/40">
                        {imageFile ? "Asset Ready" : "Select Imagery"}
                      </span>
                    </label>
                  </div>
                  {imageFile && (
                    <p className="text-[9px] text-[#494040]/60 italic text-center truncate">
                      {imageFile.name}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#494040] text-[#fffcfc] py-4 rounded-full flex items-center justify-center gap-3 group hover:bg-[#362f2f] transition-all duration-500 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2
                      size={16}
                      className="animate-spin text-[#f1d1d1]"
                    />
                  ) : (
                    <>
                      <Plus
                        size={16}
                        className="text-[#f1d1d1] group-hover:rotate-90 transition-transform"
                      />
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                        Register Asset
                      </span>
                    </>
                  )}
                </button>
                {error && (
                  <p className="text-[9px] text-red-400 font-bold uppercase text-center mt-4">
                    {error}
                  </p>
                )}
              </form>
            </section>
          </div>

          {/* Right: Existing Banners Grid */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-[#494040]/60">
                Active Display Registry
              </h2>
              <span className="text-[10px] font-serif italic text-[#f1d1d1]">
                {banners.length} Assets Logged
              </span>
            </div>

            {loadingBanners ? (
              <div className="flex flex-col items-center justify-center py-20 bg-[#f1d1d1]/5 border border-dashed border-[#f1d1d1]">
                <Loader2 className="animate-spin text-[#f1d1d1] mb-4" />
                <span className="text-[10px] uppercase tracking-widest opacity-40">
                  Accessing Display Registry
                </span>
              </div>
            ) : banners.length === 0 ? (
              <div className="py-32 text-center border border-dashed border-[#f1d1d1]">
                <ImageIcon
                  className="w-10 h-10 text-[#f1d1d1]/30 mx-auto mb-4"
                  strokeWidth={1}
                />
                <p className="font-serif italic text-[#494040]/40">
                  No display assets found in the registry.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {banners.map((banner) => (
                  <div key={banner._id} className="group relative">
                    {/* Editorial Asset Frame */}
                    <div className="relative aspect-video bg-white border border-[#f1d1d1]/30 overflow-hidden shadow-sm transition-all duration-700 hover:shadow-xl hover:border-[#494040]/20">
                      <img
                        src={`${API_URL}/${banner.imageUrl.replace(/\\/g, "/")}`}
                        alt={banner.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />

                      {/* Action Overlay */}
                      <div className="absolute inset-0 bg-[#494040]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                        <button
                          onClick={() => handleDelete(banner._id)}
                          className="w-10 h-10 rounded-full bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all transform scale-90 group-hover:scale-100 duration-500"
                        >
                          <Trash2 size={16} />
                        </button>
                        <div className="w-10 h-10 rounded-full bg-white text-[#494040] flex items-center justify-center transform scale-90 group-hover:scale-100 duration-500 delay-75">
                          <Eye size={16} />
                        </div>
                      </div>

                      {/* Name Tag */}
                      <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <div className="bg-[#fffcfc] p-3 border-l-2 border-[#f1d1d1] shadow-lg">
                          <p className="text-[10px] font-bold tracking-widest uppercase truncate">
                            {banner.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Reference */}
        <footer className="mt-32 pt-10 border-t border-[#f1d1d1]/20 text-center">
          <p className="text-[9px] font-bold tracking-[0.5em] uppercase text-[#494040]/10">
            BagBelle — Display Governance v2.0
          </p>
        </footer>
      </div>
    </div>
  );
}
