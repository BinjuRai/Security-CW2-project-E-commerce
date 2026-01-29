// "use client";

// import { useEffect, useState } from "react";
// import Slider from "react-slick";
// import { ChevronLeft, ChevronRight, Loader2, ImageIcon } from "lucide-react";

// // Custom premium arrow components
// function NextArrow({ onClick }) {
//     return (
//         <button
//             onClick={onClick}
//             className="absolute right-6 top-1/2 -translate-y-1/2 z-10 text-[#494040]/40 hover:text-[#494040] p-2 transition-all duration-500 group-hover:translate-x-2"
//         >
//             <ChevronRight className="w-8 h-8" strokeWidth={1} />
//         </button>
//     );
// }

// function PrevArrow({ onClick }) {
//     return (
//         <button
//             onClick={onClick}
//             className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-[#494040]/40 hover:text-[#494040] p-2 transition-all duration-500 group-hover:-translate-x-2"
//         >
//             <ChevronLeft className="w-8 h-8" strokeWidth={1} />
//         </button>
//     );
// }

// const bannerSettings = {
//     dots: true,
//     infinite: true,
//     speed: 1200,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 6000,
//     arrows: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     pauseOnHover: false,
//     fade: true,
//     cssEase: "cubic-bezier(0.25, 0.1, 0.25, 1)",
//     appendDots: (dots) => (
//         <div className="absolute bottom-8 w-full">
//             <ul className="flex gap-4 justify-center items-center m-0 p-0">{dots}</ul>
//         </div>
//     ),
//     customPaging: (i) => (
//         <button className="group relative w-8 h-1 transition-all">
//             <div className="absolute inset-0 bg-[#f1d1d1]/30 group-hover:bg-[#f1d1d1] transition-all" />
//             <div className="slick-active-bar absolute inset-0 bg-[#494040] opacity-0 transition-all duration-500" />
//         </button>
//     ),
// };

// export default function BannerSlider() {
//     const [banners, setBanners] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const API_URL = "http://localhost:5050";

//     useEffect(() => {
//         async function fetchBanners() {
//             try {
//                 const res = await fetch(`${API_URL}/api/admin/banner`);
//                 if (!res.ok) throw new Error(`Status: ${res.status}`);
//                 const json = await res.json();
//                 setBanners(json.data || []);
//             } catch (err) {
//                 setError(err.message || "Archive sync failed");
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchBanners();
//     }, [API_URL]);

//     if (loading) {
//         return (
//             <div className="mb-16 bg-[#fffcfc] border border-[#f1d1d1]/30 overflow-hidden">
//                 <div className="h-96 sm:h-[500px] md:h-[650px] flex flex-col items-center justify-center">
//                     <Loader2 className="w-8 h-8 text-[#f1d1d1] animate-spin mb-4" strokeWidth={1} />
//                     <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#494040]/30">Synchronizing Visuals</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error || !banners.length) {
//         return (
//             <div className="mb-16 bg-[#fffcfc] border border-dashed border-[#f1d1d1] overflow-hidden">
//                 <div className="h-96 sm:h-[500px] md:h-[650px] flex flex-col items-center justify-center">
//                     <ImageIcon className="w-12 h-12 text-[#f1d1d1]/20 mb-4" strokeWidth={1} />
//                     <p className="font-serif italic text-lg text-[#494040]/40">
//                         {error ? "Registry temporarily offline" : "Visual collection coming soon"}
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="mb-16 group relative overflow-hidden bg-white border border-[#f1d1d1]/20">
//             <Slider {...bannerSettings}>
//                 {banners.map((banner) => (
//                     <div key={banner._id} className="relative outline-none">
//                         <div className="relative h-96 sm:h-[500px] md:h-[650px] bg-white overflow-hidden">
//                             {/* Signature Background Overlay (Very subtle pink tint) */}
//                             <div className="absolute inset-0 bg-[#f1d1d1]/5 z-10 pointer-events-none" />

//                             {/* Banner Image */}
//                             <img
//                                 src={`${API_URL}/${banner.imageUrl.replace(/\\/g, "/")}`}
//                                 alt={banner.name}
//                                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
//                             />

//                             {/* Editorial Text Overlay */}
//                             <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 md:px-24">
//                                 <div className="max-w-2xl space-y-6">
//                                     <div className="flex items-center gap-3 text-[#f1d1d1] animate-in fade-in slide-in-from-left-8 duration-700">
//                                         <span className="w-12 h-[1px] bg-[#f1d1d1]"></span>
//                                         <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Limited Release</span>
//                                     </div>

//                                     <h3 className="text-5xl md:text-7xl font-serif italic text-[#494040] leading-tight animate-in fade-in slide-in-from-left-12 duration-1000">
//                                         {banner.name}
//                                     </h3>

//                                     <div className="pt-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
//                                         <button className="group/btn flex items-center gap-6 px-10 py-4 bg-[#494040] text-[#fffcfc] rounded-full transition-all duration-500 hover:bg-[#362f2f] hover:px-12 shadow-2xl">
//                                             <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Enter the Collection</span>
//                                             <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Vignette for depth */}
//                             <div className="absolute inset-0 bg-gradient-to-r from-[#fffcfc]/40 via-transparent to-transparent pointer-events-none" />
//                         </div>
//                     </div>
//                 ))}
//             </Slider>

//             {/* Custom Global Styles for Dots (Required because Slick active class is hard to target in pure Tailwind) */}
//             <style jsx global>{`
//                 .slick-active .slick-active-bar {
//                     opacity: 1 !important;
//                 }
//             `}</style>
//         </div>
//     );
// }
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow Components
function NextArrow({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white p-3 transition-all duration-300 bg-black/20 hover:bg-black/40 rounded-full"
            aria-label="Next slide"
        >
            <ChevronRight className="w-6 h-6" strokeWidth={2} />
        </button>
    );
}

function PrevArrow({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-white/60 hover:text-white p-3 transition-all duration-300 bg-black/20 hover:bg-black/40 rounded-full"
            aria-label="Previous slide"
        >
            <ChevronLeft className="w-6 h-6" strokeWidth={2} />
        </button>
    );
}

export default function BannerSlider() {
    // Banner data - Replace with your actual image paths
    const banners = [
        {
            id: 1,
            title: "Spring Collection 2024",
            subtitle: "Discover Elegance",
            image: "/assets/images/banner1.png",
            buttonText: "Shop Now",
            bgColor: "from-pink-900/80 to-purple-900/80"
        },
        {
            id: 2,
            title: "Summer Essentials",
            subtitle: "Limited Edition",
            image: "/assets/images/banner2.png",
            buttonText: "Explore",
            bgColor: "from-blue-900/80 to-teal-900/80"
        },
        {
            id: 3,
            title: "Autumn Classics",
            subtitle: "Timeless Style",
            image: "/assets/images/banner3.png",
            buttonText: "View Collection",
            bgColor: "from-orange-900/80 to-red-900/80"
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        pauseOnHover: true,
        fade: true,
        cssEase: "ease-in-out",
        dotsClass: "slick-dots custom-dots",
    };

    return (
        <div className="banner-slider-container mb-12">
            <style>{`
                .custom-dots {
                    bottom: 24px;
                    display: flex !important;
                    justify-content: center;
                    gap: 8px;
                    padding: 0;
                    margin: 0;
                }
                
                .custom-dots li {
                    margin: 0;
                    width: 12px;
                    height: 12px;
                }
                
                .custom-dots li button {
                    width: 12px;
                    height: 12px;
                    padding: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.4);
                    transition: all 0.3s ease;
                }
                
                .custom-dots li button:before {
                    display: none;
                }
                
                .custom-dots li.slick-active button {
                    background: white;
                    width: 32px;
                    border-radius: 6px;
                }
                
                .custom-dots li:hover button {
                    background: rgba(255, 255, 255, 0.7);
                }
            `}</style>

            <div className="relative overflow-hidden rounded-lg shadow-xl">
                <Slider {...settings}>
                    {banners.map((banner) => (
                        <div key={banner.id} className="relative">
                            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
                                {/* Colored Background (fallback if image doesn't load) */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${banner.bgColor}`} />

                                {/* Background Image */}
                                <img
                                    src={banner.image}
                                    alt={banner.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

                                {/* Content */}
                                <div className="absolute inset-0 flex items-center">
                                    <div className="container mx-auto px-6 md:px-12 lg:px-20">
                                        <div className="max-w-2xl text-white">
                                            {/* Subtitle */}
                                            <p className="text-sm md:text-base font-semibold tracking-widest uppercase mb-4 text-white/90">
                                                {banner.subtitle}
                                            </p>

                                            {/* Title */}
                                            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                                                {banner.title}
                                            </h2>

                                            {/* Button */}
                                            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                                <span>{banner.buttonText}</span>
                                                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}