
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