
"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight, Loader2, ImageIcon } from "lucide-react";

// Custom premium arrow components
function NextArrow({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 text-[#494040]/40 hover:text-[#494040] p-2 transition-all duration-500 group-hover:translate-x-2"
        >
            <ChevronRight className="w-8 h-8" strokeWidth={1} />
        </button>
    );
}

function PrevArrow({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-[#494040]/40 hover:text-[#494040] p-2 transition-all duration-500 group-hover:-translate-x-2"
        >
            <ChevronLeft className="w-8 h-8" strokeWidth={1} />
        </button>
    );
}

const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: false,
    fade: true,
    cssEase: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    appendDots: (dots) => (
        <div className="absolute bottom-8 w-full">
            <ul className="flex gap-4 justify-center items-center m-0 p-0">{dots}</ul>
        </div>
    ),
    customPaging: (i) => (
        <button className="group relative w-8 h-1 transition-all">
            <div className="absolute inset-0 bg-[#f1d1d1]/30 group-hover:bg-[#f1d1d1] transition-all" />
            <div className="slick-active-bar absolute inset-0 bg-[#494040] opacity-0 transition-all duration-500" />
        </button>
    ),
};

export default function BannerSlider() {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = "http://localhost:5050";

    useEffect(() => {
        async function fetchBanners() {
            try {
                const res = await fetch(`${API_URL}/api/admin/banner`);
                if (!res.ok) throw new Error(`Status: ${res.status}`);
                const json = await res.json();
                setBanners(json.data || []);
            } catch (err) {
                setError(err.message || "Archive sync failed");
            } finally {
                setLoading(false);
            }
        }
        fetchBanners();
    }, [API_URL]);

    if (loading) {
        return (
            <div className="mb-16 bg-[#fffcfc] border border-[#f1d1d1]/30 overflow-hidden">
                <div className="h-96 sm:h-[500px] md:h-[650px] flex flex-col items-center justify-center">
                    <Loader2 className="w-8 h-8 text-[#f1d1d1] animate-spin mb-4" strokeWidth={1} />
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#494040]/30">Synchronizing Visuals</p>
                </div>
            </div>
        );
    }

    if (error || !banners.length) {
        return (
            <div className="mb-16 bg-[#fffcfc] border border-dashed border-[#f1d1d1] overflow-hidden">
                <div className="h-96 sm:h-[500px] md:h-[650px] flex flex-col items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-[#f1d1d1]/20 mb-4" strokeWidth={1} />
                    <p className="font-serif italic text-lg text-[#494040]/40">
                        {error ? "Registry temporarily offline" : "Visual collection coming soon"}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-16 group relative overflow-hidden bg-white border border-[#f1d1d1]/20">
            <Slider {...bannerSettings}>
                {banners.map((banner) => (
                    <div key={banner._id} className="relative outline-none">
                        <div className="relative h-96 sm:h-[500px] md:h-[650px] bg-white overflow-hidden">
                            {/* Signature Background Overlay (Very subtle pink tint) */}
                            <div className="absolute inset-0 bg-[#f1d1d1]/5 z-10 pointer-events-none" />

                            {/* Banner Image */}
                            <img
                                src={`${API_URL}/${banner.imageUrl.replace(/\\/g, "/")}`}
                                alt={banner.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                            />

                            {/* Editorial Text Overlay */}
                            <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 md:px-24">
                                <div className="max-w-2xl space-y-6">
                                    <div className="flex items-center gap-3 text-[#f1d1d1] animate-in fade-in slide-in-from-left-8 duration-700">
                                        <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
                                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Limited Release</span>
                                    </div>
                                    
                                    <h3 className="text-5xl md:text-7xl font-serif italic text-[#494040] leading-tight animate-in fade-in slide-in-from-left-12 duration-1000">
                                        {banner.name}
                                    </h3>
                                    
                                    <div className="pt-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                                        <button className="group/btn flex items-center gap-6 px-10 py-4 bg-[#494040] text-[#fffcfc] rounded-full transition-all duration-500 hover:bg-[#362f2f] hover:px-12 shadow-2xl">
                                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Enter the Collection</span>
                                            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Vignette for depth */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#fffcfc]/40 via-transparent to-transparent pointer-events-none" />
                        </div>
                    </div>
                ))}
            </Slider>

            {/* Custom Global Styles for Dots (Required because Slick active class is hard to target in pure Tailwind) */}
            <style jsx global>{`
                .slick-active .slick-active-bar {
                    opacity: 1 !important;
                }
            `}</style>
        </div>
    );
}