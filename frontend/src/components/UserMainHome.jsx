"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

import { useAdminProduct } from "../hooks/admin/useAdminProduct";
import { getBackendImageUrl } from "../utils/backend-image";
import {
  ChevronRight,
  ShoppingBag,
  Star,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Slider from "react-slick";

import BannerSlider from "../components/admin/product/BannerSlider";
import CategoryGrid from "../components/admin/product/CategoryGrid";

export default function UserHomePage() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { products } = useAdminProduct();

  const featured = Array.isArray(products)
    ? [...products.slice(0, 8)].reverse()
    : [];

  const tickerSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const navigateWithAuth = (path) => {
    if (!user) navigate("/login");
    else navigate(path);
  };

  return (
    <div className="bg-[#fffcfc] text-[#494040] min-h-screen selection:bg-[#f1d1d1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        {/* Editorial Hero Quote */}
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 text-[#f1d1d1] mb-6">
            <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
              Est. 2024
            </span>
            <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif italic mb-6 leading-tight max-w-4xl">
            "The journey is better with the{" "}
            <span className="text-[#f1d1d1] not-italic font-sans font-light">
              Right Gear
            </span>
            ."
          </h1>
          <p className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#494040]/40">
            — BAGBELLE TEAM
          </p>
        </div>

        {/* Banner Slider */}
        <div className="mb-24 rounded-sm overflow-hidden border border-[#f1d1d1]/20">
          <BannerSlider />
        </div>

        {/* Minimalist Stats / Benefits */}
        <div className="mb-24 grid grid-cols-1 md:grid-cols-3 border border-[#f1d1d1]/30">
          <div className="p-10 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-[#f1d1d1]/30 hover:bg-[#f1d1d1]/5 transition-colors group">
            <ShieldCheck
              className="w-6 h-6 text-[#f1d1d1] mb-4 group-hover:-translate-y-1 transition-transform"
              strokeWidth={1.5}
            />
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Curated Quality
            </h3>
            <p className="text-[11px] text-[#494040]/60 font-light max-w-[200px]">
              Hand-selected components from the world's finest artisans.
            </p>
          </div>

          <div className="p-10 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-[#f1d1d1]/30 hover:bg-[#f1d1d1]/5 transition-colors group">
            <Zap
              className="w-6 h-6 text-[#f1d1d1] mb-4 group-hover:-translate-y-1 transition-transform"
              strokeWidth={1.5}
            />
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Swift Delivery
            </h3>
            <p className="text-[11px] text-[#494040]/60 font-light max-w-[200px]">
              Prompt and secure transit for your prized modifications.
            </p>
          </div>

          <div className="p-10 flex flex-col items-center text-center hover:bg-[#f1d1d1]/5 transition-colors group">
            <Star
              className="w-6 h-6 text-[#f1d1d1] mb-4 group-hover:-translate-y-1 transition-transform"
              strokeWidth={1.5}
            />
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-2">
              Exquisite Service
            </h3>
            <p className="text-[11px] text-[#494040]/60 font-light max-w-[200px]">
              Dedicated support to ensure your machine reaches perfection.
            </p>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#f1d1d1] pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#f1d1d1] font-medium tracking-widest uppercase text-[10px]">
                <span className="w-8 h-[1px] bg-[#f1d1d1]"></span>
                Limited Edition
              </div>
              <h2 className="text-4xl font-serif italic text-[#494040]">
                Featured{" "}
                <span className="font-sans not-italic font-light">Pieces</span>
              </h2>
            </div>
            <button
              onClick={() => navigateWithAuth("/normal/dash")}
              className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040] hover:text-[#f1d1d1] transition-colors mt-6 md:mt-0"
            >
              Discover All{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>
          </div>

          {/* Product Slider */}
          <div className="-mx-2">
            {featured.length > 0 ? (
              <Slider {...tickerSettings}>
                {featured.map((product) => (
                  <div key={product._id} className="px-3">
                    <div
                      onClick={() =>
                        navigateWithAuth(
                          `/normal/user/category/${product.categoryId}`,
                        )
                      }
                      className="group cursor-pointer flex flex-col"
                    >
                      {/* Premium Product Frame */}
                      <div className="relative aspect-[4/5] bg-white overflow-hidden mb-6 border border-transparent group-hover:border-[#f1d1d1]/30 transition-all">
                        <img
                          src={getBackendImageUrl(product.productImage)}
                          alt={product.name}
                          className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                        />
                        {product.isFeatured && (
                          <div className="absolute top-4 left-4 border border-[#f1d1d1] bg-white/90 backdrop-blur-sm text-[#494040] text-[9px] font-bold tracking-widest px-3 py-1 uppercase">
                            Signature
                          </div>
                        )}
                        <div className="absolute inset-0 bg-[#494040]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Content */}
                      <div className="space-y-1">
                        <p className="text-[9px] font-bold tracking-widest text-[#f1d1d1] uppercase">
                          {product.categoryName || "Premium Part"}
                        </p>
                        <h3 className="text-lg font-medium text-[#494040] truncate">
                          {product.name}
                        </h3>
                        <p className="text-sm font-light text-[#494040]/50">
                          NPR {product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="py-20 text-center border border-dashed border-[#f1d1d1] rounded-sm">
                <p className="text-xs italic font-serif text-[#494040]/40">
                  Awaiting new arrivals...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Shop by Category */}
        <div className="mb-32">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl font-serif italic text-[#494040] mb-4">
              The{" "}
              <span className="font-sans not-italic font-light">
                Departments
              </span>
            </h2>
            <div className="w-12 h-[1px] bg-[#f1d1d1]"></div>
          </div>
          <CategoryGrid navigateWithAuth={navigateWithAuth} />
        </div>

        {/* Classy Call-to-Action */}
        <div className="mb-20 relative overflow-hidden bg-[#494040] text-[#fffcfc] p-12 md:p-24 flex flex-col items-center text-center">
          {/* Subtle decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[80%] border border-[#fffcfc] rounded-full rotate-12"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[80%] border border-[#fffcfc] rounded-full -rotate-12"></div>
          </div>

          <div className="relative z-10 max-w-2xl space-y-8">
            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#f1d1d1]">
                Private Collection
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic">
                Elevate your machine's legacy.
              </h2>
            </div>
            <p className="text-sm font-light text-[#fffcfc]/60 leading-relaxed max-w-lg mx-auto">
              Join our exclusive circle of enthusiasts and discover
              modifications that redefine the boundaries of engineering and
              aesthetics.
            </p>
            <button
              onClick={() => navigateWithAuth("/normal/dash")}
              className="inline-flex items-center gap-4 px-12 py-5 border border-[#f1d1d1] text-[#f1d1d1] hover:bg-[#f1d1d1] hover:text-[#494040] transition-all duration-500 rounded-full group"
            >
              <span className="text-xs font-bold tracking-[0.3em] uppercase">
                Enter the Boutique
              </span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
