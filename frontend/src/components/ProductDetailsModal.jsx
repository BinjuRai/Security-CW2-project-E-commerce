// import { useState, useEffect } from "react"
// import { X, Plus, Minus, ShoppingCart, Package } from "lucide-react"
// import { getBackendImageUrl } from '../utils/backend-image'

// export default function ProductDetailsModal({ product, onClose, onAddToCart }) {
//     const [quantity, setQuantity] = useState(1)
//     const [addons, setAddons] = useState([])
//     const imageUrl = getBackendImageUrl(product.productImage);

//     useEffect(() => {
//         setAddons(
//             (product.addons || []).map((addon) => ({
//                 addonId: addon._id,
//                 name: addon.name,
//                 price: addon.price,
//                 selected: false,
//                 quantity: 1,
//             }))
//         );
//         setQuantity(1);
//     }, [product])

//     const toggleAddon = (index) => {
//         setAddons((prev) =>
//             prev.map((addon, i) => {
//                 if (i !== index) return addon
//                 const selected = !addon.selected
//                 return {
//                     ...addon,
//                     selected,
//                     quantity: selected ? addon.quantity : 1,
//                 }
//             })
//         )
//     }

//     const changeAddonQty = (index, val) => {
//         const v = Math.max(1, Number(val) || 1)
//         setAddons((prev) =>
//             prev.map((addon, i) =>
//                 i === index ? { ...addon, quantity: v } : addon
//             )
//         )
//     }

//     const baseTotal = product.price * quantity
//     const addonsTotal = addons.reduce(
//         (sum, a) => (a.selected ? sum + a.price * a.quantity : sum),
//         0
//     )
//     const total = baseTotal + addonsTotal

//     const handleAdd = () => {
//         const selectedAddons = addons
//             .filter((a) => a.selected)
//             .map(({ addonId, name, price, quantity }) => ({
//                 addonId,
//                 name,
//                 price,
//                 quantity
//             }));

//         const { addons: _, ...cleanProduct } = product;

//         const productToAdd = {
//             ...cleanProduct,
//             quantity,
//             ...(selectedAddons.length > 0 && { addons: selectedAddons })
//         };

//         onAddToCart(productToAdd);
//         onClose();
//     };

//     return (
//         <div
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
//             role="dialog"
//             aria-modal="true"
//             onClick={onClose}
//         >
//             <div
//                 className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden border border-gray-200 dark:border-gray-700 animate-in zoom-in-95 duration-200"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 {/* Close button */}
//                 <button
//                     className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
//                     onClick={onClose}
//                     aria-label="Close product details"
//                 >
//                     <X size={20} />
//                 </button>

//                 {/* Left side - Image container */}
//                 <div className="flex-shrink-0 w-full md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center p-8">
//                     <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg">
//                         <img
//                             src={imageUrl}
//                             alt={product.name}
//                             className="w-full h-full object-contain p-4"
//                             loading="lazy"
//                         />
//                         {/* Category badge if available */}
//                         {product.categoryName && (
//                             <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
//                                 {product.categoryName}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Right side - Content & controls */}
//                 <div className="flex-1 p-6 md:p-8 overflow-y-auto">
//                     {/* Product Header */}
//                     <div className="mb-6">
//                         <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
//                             {product.name}
//                         </h2>
//                         <div className="flex items-center gap-2 mb-4">
//                             <div className="px-3 py-1 bg-gradient-to-r from-[#E5BA41] to-amber-500 text-white text-sm font-bold rounded-full">
//                                 Rs {product.price.toLocaleString()}
//                             </div>
//                         </div>
//                         <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
//                             {product.description || "No description available."}
//                         </p>
//                     </div>

//                     {/* Quantity control */}
//                     <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
//                         <label className="block font-semibold text-gray-900 dark:text-white text-sm mb-3">
//                             Quantity
//                         </label>
//                         <div className="flex items-center gap-3">
//                             <button
//                                 className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105"
//                                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                                 disabled={quantity <= 1}
//                             >
//                                 <Minus size={16} className="text-gray-700 dark:text-gray-300" />
//                             </button>
//                             <input
//                                 type="number"
//                                 min="1"
//                                 value={quantity}
//                                 onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
//                                 className="w-20 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold py-2"
//                             />
//                             <button
//                                 className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-200 hover:scale-105"
//                                 onClick={() => setQuantity(quantity + 1)}
//                             >
//                                 <Plus size={16} className="text-gray-700 dark:text-gray-300" />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Add-ons */}
//                     {addons.length > 0 && (
//                         <div className="mb-6">
//                             <div className="flex items-center gap-2 mb-4">
//                                 <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                                 <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
//                                     Available Add-ons
//                                 </h3>
//                             </div>
//                             <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
//                                 {addons.map((addon, idx) => (
//                                     <div
//                                         key={idx}
//                                         className={`
//                                             p-4 rounded-xl border transition-all duration-300
//                                             ${addon.selected
//                                                 ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20'
//                                                 : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 hover:border-gray-300 dark:hover:border-gray-600'
//                                             }
//                                         `}
//                                     >
//                                         <div className="flex items-start gap-3">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={addon.selected}
//                                                 id={`addon-${idx}`}
//                                                 onChange={() => toggleAddon(idx)}
//                                                 className="mt-1 w-5 h-5 rounded cursor-pointer accent-blue-600"
//                                             />
//                                             <div className="flex-1">
//                                                 <label
//                                                     htmlFor={`addon-${idx}`}
//                                                     className="cursor-pointer text-gray-900 dark:text-white font-medium block mb-1"
//                                                 >
//                                                     {addon.name}
//                                                 </label>
//                                                 <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
//                                                     + Rs {addon.price.toLocaleString()}
//                                                 </span>
//                                             </div>
//                                             {addon.selected && (
//                                                 <div className="flex items-center gap-2">
//                                                     <button
//                                                         onClick={() => changeAddonQty(idx, addon.quantity - 1)}
//                                                         disabled={addon.quantity <= 1}
//                                                         className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 flex items-center justify-center transition-colors"
//                                                     >
//                                                         <Minus size={12} />
//                                                     </button>
//                                                     <span className="w-8 text-center font-semibold text-sm">
//                                                         {addon.quantity}
//                                                     </span>
//                                                     <button
//                                                         onClick={() => changeAddonQty(idx, addon.quantity + 1)}
//                                                         className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
//                                                     >
//                                                         <Plus size={12} />
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Total & Add to cart */}
//                     <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
//                         <div className="flex items-center justify-between mb-6">
//                             <div>
//                                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Amount</p>
//                                 <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                                     Rs {total.toLocaleString()}
//                                 </p>
//                             </div>
//                         </div>

//                         <button
//                             onClick={handleAdd}
//                             className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#E5BA41] to-amber-500 hover:from-amber-500 hover:to-[#E5BA41] text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//                         >
//                             <ShoppingCart className="w-5 h-5" />
//                             Add to Cart
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

import { useState, useEffect } from "react"
import { X, Plus, Minus, ShoppingBag, Check } from "lucide-react"
import { getBackendImageUrl } from '../utils/backend-image'

export default function ProductDetailsModal({ product, onClose, onAddToCart }) {
    const imageUrl = getBackendImageUrl(product.imagepath);
    const [quantity, setQuantity] = useState(1)
    const [addons, setAddons] = useState([])
    // const imageUrl = getBackendImageUrl(product.productImage);

    useEffect(() => {
        setAddons(
            (product.addons || []).map((addon) => ({
                addonId: addon._id,
                name: addon.name,
                price: addon.price,
                selected: false,
                quantity: 1,
            }))
        );
        setQuantity(1);
    }, [product])

    const toggleAddon = (index) => {
        setAddons((prev) =>
            prev.map((addon, i) => {
                if (i !== index) return addon
                const selected = !addon.selected
                return {
                    ...addon,
                    selected,
                    quantity: selected ? addon.quantity : 1,
                }
            })
        )
    }

    const changeAddonQty = (index, val) => {
        const v = Math.max(1, Number(val) || 1)
        setAddons((prev) =>
            prev.map((addon, i) =>
                i === index ? { ...addon, quantity: v } : addon
            )
        )
    }

    const baseTotal = product.price * quantity
    const addonsTotal = addons.reduce(
        (sum, a) => (a.selected ? sum + a.price * a.quantity : sum),
        0
    )
    const total = baseTotal + addonsTotal

    const handleAdd = () => {
        const selectedAddons = addons
            .filter((a) => a.selected)
            .map(({ addonId, name, price, quantity }) => ({
                addonId,
                name,
                price,
                quantity
            }));

        const { addons: _, ...cleanProduct } = product;

        const productToAdd = {
            ...cleanProduct,
            quantity,
            ...(selectedAddons.length > 0 && { selectedAddons })
        };

        onAddToCart(productToAdd);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-[#494040]/40 backdrop-blur-md flex items-center justify-center z-50 p-4 md:p-8 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-[#fffcfc] w-full max-w-5xl max-h-[95vh] flex flex-col md:flex-row overflow-hidden shadow-[0_20px_50px_rgba(73,64,64,0.15)] relative border border-[#f1d1d1]/30"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    className="absolute top-6 right-6 z-20 p-2 text-[#494040] hover:rotate-90 transition-transform duration-300"
                    onClick={onClose}
                >
                    <X size={24} strokeWidth={1.5} />
                </button>

                {/* Left side - Editorial Image Section */}
                <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-10 relative group">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                    {product.categoryName && (
                        <div className="absolute top-8 left-8 border-b border-[#f1d1d1] pb-1 text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/60">
                            {product.categoryName}
                        </div>
                    )}
                </div>

                {/* Right side - Information & Controls */}
                <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12 overflow-y-auto bg-[#fffcfc]">
                    <div className="mb-10">
                        <div className="flex items-center gap-2 text-[#f1d1d1] mb-2">
                             <span className="w-10 h-[1px] bg-[#f1d1d1]"></span>
                             <span className="text-[11px] font-bold tracking-widest uppercase">Premium Quality</span>
                        </div>
                        <h2 className="text-4xl font-serif italic text-[#494040] mb-4">
                            {product.name}
                        </h2>
                        <p className="text-[#494040]/70 leading-relaxed font-light text-sm mb-6">
                            {product.description || "Indulge in our masterfully crafted selection, designed for those who appreciate the finer things in life."}
                        </p>
                        <div className="text-2xl font-light text-[#494040] tracking-tight">
                            NPR {product.price.toLocaleString()}
                        </div>
                    </div>

                    {/* Quantity Selection */}
                    <div className="mb-10">
                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/50 block mb-4">
                            Select Quantity
                        </label>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center border border-[#f1d1d1] rounded-full px-4 py-2">
                                <button
                                    className="p-1 text-[#494040] hover:text-[#f1d1d1] transition-colors"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-12 text-center font-medium text-[#494040]">
                                    {quantity}
                                </span>
                                <button
                                    className="p-1 text-[#494040] hover:text-[#f1d1d1] transition-colors"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Add-ons Section */}
                    {addons.length > 0 && (
                        <div className="mb-10">
                            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/50 block mb-4">
                                Enhancements
                            </label>
                            <div className="space-y-4">
                                {addons.map((addon, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => toggleAddon(idx)}
                                        className={`group cursor-pointer flex items-center justify-between p-4 border transition-all duration-300 ${
                                            addon.selected ? 'border-[#494040] bg-[#f1d1d1]/10' : 'border-[#f1d1d1]/40 hover:border-[#f1d1d1]'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-5 h-5 border flex items-center justify-center transition-all ${
                                                addon.selected ? 'bg-[#494040] border-[#494040]' : 'border-[#f1d1d1]'
                                            }`}>
                                                {addon.selected && <Check size={12} className="text-white" />}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-[#494040]">{addon.name}</div>
                                                <div className="text-[10px] text-[#494040]/50">+ NPR {addon.price.toLocaleString()}</div>
                                            </div>
                                        </div>

                                        {addon.selected && (
                                            <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-full border border-[#f1d1d1]" onClick={(e) => e.stopPropagation()}>
                                                <button onClick={() => changeAddonQty(idx, addon.quantity - 1)} className="text-[#494040]"><Minus size={10}/></button>
                                                <span className="text-xs font-bold">{addon.quantity}</span>
                                                <button onClick={() => changeAddonQty(idx, addon.quantity + 1)} className="text-[#494040]"><Plus size={10}/></button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer - Total & Action */}
                    <div className="mt-auto pt-8 border-t border-[#f1d1d1]/40">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/50 block mb-1">Total Investment</span>
                                <div className="text-3xl font-serif text-[#494040]">NPR {total.toLocaleString()}</div>
                            </div>
                        </div>

                        <button
                            onClick={handleAdd}
                            className="w-full bg-[#494040] text-[#fffcfc] py-5 rounded-full flex items-center justify-center gap-3 group hover:bg-[#362f2f] transition-all duration-500"
                        >
                            <ShoppingBag className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Add to Bag</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}