// import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, ChevronRight } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Footer() {
//     const currentYear = new Date().getFullYear();

//     const quickLinks = [
//         { name: "Home", path: "/normal/home" },
//         { name: "All Products", path: "/normal/dash" },
//         { name: "My Orders", path: "/normal/myorders" },
//         { name: "Profile", path: "/normal/profile" },
//     ];

//     const categories = [
//         { name: "Engine Parts", path: "/normal/user/category/1" },
//         { name: "Suspension", path: "/normal/user/category/2" },
//         { name: "Exhaust Systems", path: "/normal/user/category/3" },
//         { name: "Accessories", path: "/normal/user/category/4" },
//     ];

//     return (
//         <footer className="relative bg-[#0B2146] text-white mt-auto">
//             <div className="max-w-screen-xl mx-auto px-6 py-12">

//                 {/* Main Footer Content */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

//                     {/* Brand Section */}
//                     <div className="space-y-4">
//                         <div className="flex items-center gap-3">
//                             <div className="relative h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
//                                 <span className="text-[#0B2146] font-bold text-2xl select-none">R</span>
//                                 <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-400/20 to-transparent"></div>
//                             </div>
//                             <div>
//                                 <h3 className="text-2xl font-bold">RevModz</h3>
//                                 <p className="text-xs text-blue-200">Bike Parts Store</p>
//                             </div>
//                         </div>
//                         <p className="text-sm text-gray-300 leading-relaxed">
//                             Your trusted source for premium bike parts and modifications. Quality products, exceptional service.
//                         </p>

//                         {/* Social Media */}
//                         <div className="flex gap-3 pt-2">
//                             <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
//                                 <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
//                             </a>
//                             <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
//                                 <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
//                             </a>
//                             <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
//                                 <Twitter className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
//                             </a>
//                             <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
//                                 <Youtube className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
//                             </a>
//                         </div>
//                     </div>

//                     {/* Quick Links */}
//                     <div>
//                         <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                             <div className="w-1 h-6 bg-blue-400 rounded-full"></div>
//                             Quick Links
//                         </h4>
//                         <ul className="space-y-2">
//                             {quickLinks.map((link) => (
//                                 <li key={link.name}>
//                                     <Link
//                                         to={link.path}
//                                         className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
//                                     >
//                                         <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
//                                         {link.name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Categories */}
//                     {/* <div>
//                         <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                             <div className="w-1 h-6 bg-blue-400 rounded-full"></div>
//                             Categories
//                         </h4>
//                         <ul className="space-y-2">
//                             {categories.map((category) => (
//                                 <li key={category.name}>
//                                     <Link
//                                         to={category.path}
//                                         className="text-sm text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2 group"
//                                     >
//                                         <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
//                                         {category.name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div> */}

//                     {/* Contact Info */}
//                     <div>
//                         <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
//                             <div className="w-1 h-6 bg-blue-400 rounded-full"></div>
//                             Contact Us
//                         </h4>
//                         <ul className="space-y-3">
//                             <li className="flex items-start gap-3 text-sm text-gray-300">
//                                 <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
//                                 <span>123 Bike Street, Patan<br />Bagmati Province, Nepal</span>
//                             </li>
//                             <li className="flex items-center gap-3 text-sm text-gray-300">
//                                 <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
//                                 <a href="tel:+977-1234567890" className="hover:text-white transition-colors">
//                                     +977 123-456-7890
//                                 </a>
//                             </li>
//                             <li className="flex items-center gap-3 text-sm text-gray-300">
//                                 <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
//                                 <a href="mailto:info@revmodz.com" className="hover:text-white transition-colors">
//                                     info@revmodz.com
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>

//                 {/* Divider */}
//                 <div className="border-t border-white/10 my-8"></div>

//                 {/* Bottom Footer */}
//                 <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
//                     <p>
//                         © {currentYear} RevModz. All rights reserved.
//                     </p>
//                     <div className="flex gap-6">
//                         <Link to="/privacy" className="hover:text-white transition-colors">
//                             Privacy Policy
//                         </Link>
//                         <Link to="/terms" className="hover:text-white transition-colors">
//                             Terms of Service
//                         </Link>
//                         <Link to="/contact" className="hover:text-white transition-colors">
//                             Contact
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             {/* Decorative gradient overlay */}
//             <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
//         </footer>
//     );
// }
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "Home", path: "/normal/home" },
        { name: "Collection", path: "/normal/dash" },
        { name: "Orders", path: "/normal/myorders" },
        { name: "Profile", path: "/normal/profile" },
    ];

    return (
        <footer className="bg-[#494040] text-[#fffcfc] pt-20 pb-10 mt-auto border-t border-[#f1d1d1]/20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

                    {/* Brand Section - Takes 5 columns on large screens */}
                    <div className="md:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-serif italic tracking-tight">
                                Bag<span className="font-sans not-italic font-light">Belle</span>
                            </h3>
                            <div className="w-12 h-[1px] bg-[#f1d1d1]"></div>
                            <p className="text-sm text-[#fffcfc]/60 leading-relaxed max-w-sm font-light">
                                Curating premium modifications and exquisite parts for the discerning rider. Elevating your journey through masterfully crafted engineering.
                            </p>
                        </div>

                        {/* Social Media - Minimalist Style */}
                        <div className="flex gap-6 pt-4">
                            <a href="#" className="text-[#f1d1d1] hover:text-[#fffcfc] transition-colors duration-300">
                                <Facebook size={18} strokeWidth={1.5} />
                            </a>
                            <a href="#" className="text-[#f1d1d1] hover:text-[#fffcfc] transition-colors duration-300">
                                <Instagram size={18} strokeWidth={1.5} />
                            </a>
                            <a href="#" className="text-[#f1d1d1] hover:text-[#fffcfc] transition-colors duration-300">
                                <Twitter size={18} strokeWidth={1.5} />
                            </a>
                            <a href="#" className="text-[#f1d1d1] hover:text-[#fffcfc] transition-colors duration-300">
                                <Youtube size={18} strokeWidth={1.5} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links - Takes 3 columns */}
                    <div className="md:col-span-3">
                        <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#f1d1d1] mb-8">
                            Navigation
                        </h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm font-light text-[#fffcfc]/80 hover:text-[#f1d1d1] transition-all duration-300 flex items-center group"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info - Takes 4 columns */}
                    <div className="md:col-span-4">
                        <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#f1d1d1] mb-8">
                            The Studio
                        </h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 group">
                                <MapPin className="w-5 h-5 text-[#f1d1d1] mt-0.5 flex-shrink-0" strokeWidth={1} />
                                <span className="text-sm font-light text-[#fffcfc]/80 leading-relaxed">
                                    123 fulbari Street, Patan<br />
                                    Lalitpur, Nepal
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-[#f1d1d1] flex-shrink-0" strokeWidth={1} />
                                <a href="tel:+977-1234567890" className="text-sm font-light text-[#fffcfc]/80 hover:text-[#f1d1d1] transition-colors">
                                    +977 123 456 7890
                                </a>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-[#f1d1d1] flex-shrink-0" strokeWidth={1} />
                                <a href="mailto:bagbelleofficial@gmail.com" className="text-sm font-light text-[#fffcfc]/80 hover:text-[#f1d1d1] transition-colors uppercase tracking-wider text-[11px]">
                                   bagbelleofficial@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer - Editorial Style */}
                <div className="border-t border-[#f1d1d1]/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-8 order-2 md:order-1">
                        <p className="text-[10px] tracking-widest uppercase text-[#fffcfc]/40">
                            © {currentYear} BagBelle.
                        </p>
                        <div className="flex gap-8">
                            <Link to="/privacy" className="text-[10px] tracking-widest uppercase text-[#fffcfc]/40 hover:text-[#f1d1d1] transition-colors">
                                Privacy
                            </Link>
                            <Link to="/terms" className="text-[10px] tracking-widest uppercase text-[#fffcfc]/40 hover:text-[#f1d1d1] transition-colors">
                                Terms
                            </Link>
                        </div>
                    </div>
                    
                    {/* A subtle premium touch: "Made in" or "Since" label */}
                    <div className="order-1 md:order-2">
                         <span className="text-[10px] italic font-serif text-[#f1d1d1]">Est. 2025</span>
                    </div>
                </div>
            </div>

            {/* Aesthetic bottom bar */}
            <div className="mt-10 h-[2px] w-full bg-gradient-to-r from-transparent via-[#f1d1d1]/30 to-transparent"></div>
        </footer>
    );
}