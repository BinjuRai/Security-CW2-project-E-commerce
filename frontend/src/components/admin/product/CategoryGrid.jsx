// // src/components/CategoryGrid.jsx
// import { useState, useEffect } from "react";
// import { ChevronRight, ChevronLeft, Package } from "lucide-react";
// import Slider from "react-slick";
// import { getBackendImageUrl } from "../../../utils/backend-image";

// // Custom arrow components for category slider
// function NextArrow({ onClick }) {
//     return (
//         <button
//             onClick={onClick}
//             className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
//         >
//             <ChevronRight className="w-5 h-5" />
//         </button>
//     );
// }

// function PrevArrow({ onClick }) {
//     return (
//         <button
//             onClick={onClick}
//             className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
//         >
//             <ChevronLeft className="w-5 h-5" />
//         </button>
//     );
// }

// export default function CategoryGrid({ navigateWithAuth }) {
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const API_URL = "http://localhost:5050";

//     useEffect(() => {
//         async function fetchCategories() {
//             try {
//                 const res = await fetch(`${API_URL}/api/admin/category`);
//                 if (!res.ok) {
//                     throw new Error(`HTTP error! status: ${res.status}`);
//                 }
//                 const json = await res.json();
//                 const fetchedCategories = json.data || [];
//                 setCategories(fetchedCategories);
//             } catch (err) {
//                 console.error("Error fetching categories:", err);
//                 setError(err.message || "Failed to load categories");
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchCategories();
//     }, [API_URL]);

//     const sliderSettings = {
//         dots: true,
//         infinite: categories.length > 4,
//         speed: 600,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         pauseOnHover: true,
//         arrows: true,
//         nextArrow: <NextArrow />,
//         prevArrow: <PrevArrow />,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 },
//             },
//         ],
//         appendDots: (dots) => (
//             <div className="mt-6">
//                 <ul className="flex gap-2 justify-center">{dots}</ul>
//             </div>
//         ),
//         customPaging: () => (
//             <button className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-blue-600 dark:hover:bg-blue-400 transition-all duration-300" />
//         ),
//     };

//     if (loading) {
//         return (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {[...Array(4)].map((_, i) => (
//                     <div
//                         key={i}
//                         className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl h-48 animate-pulse"
//                     />
//                 ))}
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
//                 <p className="text-red-500">Failed to load categories</p>
//             </div>
//         );
//     }

//     if (categories.length === 0) {
//         return (
//             <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
//                 <p className="text-gray-500 dark:text-gray-400">No categories available</p>
//             </div>
//         );
//     }

//     return (
//         <div className="category-slider-wrapper">
//             <Slider {...sliderSettings}>
//                 {categories.map((category) => {
//                     const imagePath = category.filepath || category.categoryImage || category.image;
//                     const imageUrl = imagePath ? `${API_URL}/${imagePath.replace(/\\/g, "/")}` : null;

//                     return (
//                         <div key={category._id} className="px-3">
//                             <div
//                                 onClick={() => navigateWithAuth(`/normal/user/category/${category._id}`)}
//                                 className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
//                             >
//                                 {/* Category Image */}
//                                 <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
//                                     {imageUrl ? (
//                                         <img
//                                             src={imageUrl}
//                                             alt={category.name}
//                                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                                             onError={(e) => {
//                                                 e.target.style.display = 'none';
//                                                 e.target.parentElement.innerHTML =
//                                                     '<div class="w-full h-full flex items-center justify-center"><svg class="w-16 h-16 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg></div>';
//                                             }}
//                                         />
//                                     ) : (
//                                         <div className="w-full h-full flex items-center justify-center">
//                                             <Package className="w-16 h-16 text-gray-300 dark:text-gray-600" />
//                                         </div>
//                                     )}

//                                     {/* Hover overlay */}
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                                     {/* Hover arrow */}
//                                     <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
//                                         <ChevronRight className="w-5 h-5 text-gray-800" />
//                                     </div>
//                                 </div>

//                                 {/* Category Info */}
//                                 <div className="p-4">
//                                     <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
//                                         {category.name}
//                                     </h3>
//                                     {category.description && (
//                                         <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
//                                             {category.description}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </Slider>
//         </div>
//     );
// }
// src/components/CategoryGrid.jsx
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Package, Loader2, ArrowRight } from "lucide-react";
import Slider from "react-slick";

// Custom premium arrow components
function NextArrow({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-[#494040]/40 hover:text-[#494040] p-2 transition-all duration-500"
        >
            <ChevronRight className="w-8 h-8" strokeWidth={1} />
        </button>
    );
}

function PrevArrow({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 text-[#494040]/40 hover:text-[#494040] p-2 transition-all duration-500"
        >
            <ChevronLeft className="w-8 h-8" strokeWidth={1} />
        </button>
    );
}

export default function CategoryGrid({ navigateWithAuth }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = "http://localhost:5050";

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch(`${API_URL}/api/admin/category`);
                if (!res.ok) throw new Error(`Status: ${res.status}`);
                const json = await res.json();
                setCategories(json.data || []);
            } catch (err) {
                setError(err.message || "Failed to load registry");
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, [API_URL]);

    const sliderSettings = {
        dots: true,
        infinite: categories.length > 4,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
        appendDots: (dots) => (
            <div className="mt-12">
                <ul className="flex gap-3 justify-center items-center m-0 p-0">{dots}</ul>
            </div>
        ),
        customPaging: () => (
            <button className="group relative w-6 h-[2px] transition-all">
                <div className="absolute inset-0 bg-[#f1d1d1]/30 group-hover:bg-[#f1d1d1] transition-all" />
                <div className="slick-active-bar absolute inset-0 bg-[#494040] opacity-0 transition-all duration-500" />
            </button>
        ),
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-[#f1d1d1] animate-spin mb-4" strokeWidth={1} />
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/30">Curating Departments</p>
            </div>
        );
    }

    if (error || categories.length === 0) {
        return (
            <div className="text-center py-20 border border-dashed border-[#f1d1d1]">
                <Package className="w-10 h-10 text-[#f1d1d1]/30 mx-auto mb-4" strokeWidth={1} />
                <p className="font-serif italic text-[#494040]/40">
                    {error ? "Archive temporarily unavailable" : "No departments currently listed"}
                </p>
            </div>
        );
    }

    return (
        <div className="category-slider-wrapper px-4">
            <Slider {...sliderSettings}>
                {categories.map((category) => {
                    const imagePath = category.filepath || category.categoryImage || category.image;
                    const imageUrl = imagePath ? `${API_URL}/${imagePath.replace(/\\/g, "/")}` : null;

                    return (
                        <div key={category._id} className="px-3 outline-none">
                            <div
                                onClick={() => navigateWithAuth(`/normal/user/category/${category._id}`)}
                                className="group cursor-pointer flex flex-col items-center text-center"
                            >
                                {/* Atelier Frame */}
                                <div className="relative w-full aspect-square bg-white border border-[#f1d1d1]/30 overflow-hidden mb-6 group-hover:border-[#494040]/40 transition-colors duration-500">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={category.name}
                                            className="w-full h-full object-contain p-6 transition-transform duration-1000 ease-out group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Package className="w-12 h-12 text-[#f1d1d1]/20" strokeWidth={1} />
                                        </div>
                                    )}

                                    {/* Subtle Overlay */}
                                    <div className="absolute inset-0 bg-[#494040]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    {/* Direction Indicator */}
                                    <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <ArrowRight className="w-4 h-4 text-[#f1d1d1]" />
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="space-y-1">
                                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#f1d1d1]">Department</span>
                                    <h3 className="text-xl font-serif italic text-[#494040] group-hover:text-[#f1d1d1] transition-colors duration-300">
                                        {category.name}
                                    </h3>
                                    <div className="w-6 h-[1px] bg-[#f1d1d1] mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>

            <style jsx global>{`
                .slick-active .slick-active-bar {
                    opacity: 1 !important;
                }
            `}</style>
        </div>
    );
}