// "use client"
// import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react"

// import { getBackendImageUrl } from '../utils/backend-image'

// export default function UserSidebar({
//     cart,
//     isOpen,
//     onClose,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     onCheckout
// }) {
//     // Calculate subtotal including add-ons for each product
//     const subtotal = cart.reduce((total, product) => {
//         const addonsTotal = (product.addons || []).reduce(
//             (sum, a) => sum + a.price * a.quantity * product.quantity,
//             0
//         );

//         return total + product.price * product.quantity + addonsTotal;
//     }, 0);

//     return (
//         <>
//             {/* Sidebar */}
//             <div
//                 className={`fixed top-0 right-0 h-screen w-96 bg-white shadow-2xl transform transition-transform duration-300 z-50 flex flex-col
//                     ${isOpen ? "translate-x-0" : "translate-x-full"}
//                 `}
//             >
//                 {/* Header */}
//                 <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                     <div className="flex items-center gap-3">
//                         <ShoppingCart className="w-6 h-6 text-blue-400" />
//                         <h3 className="text-2xl font-bold text-gray-900">Your Cart</h3>
//                     </div>
//                     <button
//                         onClick={onClose}
//                         className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                         aria-label="Close cart"
//                     >
//                         <X className="w-6 h-6 text-gray-600" />
//                     </button>
//                 </div>

//                 {/* Content */}
//                 <div className="flex-1 overflow-y-auto p-6">
//                     {cart.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center h-full text-center">
//                             <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
//                             <p className="text-gray-500 text-lg">Your cart is empty</p>
//                             <p className="text-gray-400 text-sm mt-2">Add items to get started</p>
//                         </div>
//                     ) : (
//                         <div className="space-y-4">
//                             {cart.map((product) => (
//                                 <div
//                                     key={product._id}
//                                     className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
//                                 >
//                                     <div className="flex gap-4">
//                                         <img
//                                             src={getBackendImageUrl(product.productImage)}
//                                             alt={product.name}
//                                             className="w-20 h-20 object-cover rounded-lg"
//                                         />
//                                         <div className="flex-1 min-w-0">
//                                             <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>

//                                             {/* Quantity Controls */}
//                                             <div className="flex items-center gap-2 mb-2">
//                                                 <button
//                                                     onClick={() => updateQuantity(product._id, product.quantity - 1)}
//                                                     className="p-1.5 rounded-lg bg-white border border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                                     disabled={product.quantity <= 1}
//                                                 >
//                                                     <Minus className="w-4 h-4" />
//                                                 </button>
//                                                 <span className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 min-w-[3rem] text-center">
//                                                     {product.quantity}
//                                                 </span>
//                                                 <button
//                                                     onClick={() => updateQuantity(product._id, product.quantity + 1)}
//                                                     className="p-1.5 rounded-lg bg-white border border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700 transition-colors"
//                                                 >
//                                                     <Plus className="w-4 h-4" />
//                                                 </button>
//                                             </div>

//                                             {/* Price */}
//                                             <p className="text-blue-400 font-bold text-lg">
//                                                 Rs {(
//                                                     product.price * product.quantity +
//                                                     (product.addons || []).reduce(
//                                                         (sum, a) => sum + a.price * a.quantity * product.quantity,
//                                                         0
//                                                     )
//                                                 ).toLocaleString()}
//                                             </p>

//                                             {/* Add-ons */}
//                                             {product.addons && product.addons.length > 0 && (
//                                                 <ul className="mt-2 space-y-1">
//                                                     {product.addons.map((addon, i) => (
//                                                         <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
//                                                             <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
//                                                             {addon.name} x {addon.quantity}
//                                                             <span className="text-[#E5BA41] font-medium">
//                                                                 (+ Rs {(addon.price * addon.quantity).toLocaleString()})
//                                                             </span>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             )}
//                                         </div>
//                                     </div>

//                                     {/* Remove Button */}
//                                     <button
//                                         onClick={() => removeFromCart(product._id)}
//                                         className="w-full mt-3 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
//                                     >
//                                         <Trash2 className="w-4 h-4" />
//                                         Remove
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 {/* Footer */}
//                 {cart.length > 0 && (
//                     <div className="p-6 border-t border-gray-200 bg-white space-y-4">
//                         <div className="flex justify-between items-center">
//                             <span className="text-gray-600 font-medium">Subtotal</span>
//                             <span className="text-2xl font-bold text-gray-900">
//                                 Rs {subtotal.toLocaleString()}
//                             </span>
//                         </div>

//                         <button
//                             className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm"
//                             onClick={onCheckout}
//                         >
//                             Proceed to Checkout
//                         </button>

//                         <button
//                             className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
//                             onClick={clearCart}
//                         >
//                             <Trash2 className="w-4 h-4" />
//                             Clear Cart
//                         </button>
//                     </div>
//                 )}
//             </div>

//             {/* Overlay */}
//             {isOpen && (
//                 <div
//                     onClick={onClose}
//                     className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
//                 />
//             )}
//         </>
//     )
// }
"use client"
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { getBackendImageUrl } from '../utils/backend-image'

export default function UserSidebar({
    cart,
    isOpen,
    onClose,
    removeFromCart,
    updateQuantity,
    clearCart,
    onCheckout
}) {
    const subtotal = cart.reduce((total, product) => {
        const addonsTotal = (product.addons || []).reduce(
            (sum, a) => sum + a.price * a.quantity * product.quantity,
            0
        );
        return total + product.price * product.quantity + addonsTotal;
    }, 0);

    return (
        <>
            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-screen w-full sm:w-[450px] bg-[#fffcfc] shadow-[-20px_0_50px_rgba(73,64,64,0.05)] transform transition-transform duration-500 ease-in-out z-50 flex flex-col border-l border-[#f1d1d1]/30
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                `}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-8 border-b border-[#f1d1d1]/20">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[#f1d1d1] mb-1">
                            <span className="w-6 h-[1px] bg-[#f1d1d1]"></span>
                            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#494040]/60">Your Selection</span>
                        </div>
                        <h3 className="text-3xl font-serif italic text-[#494040]">The Bag</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-[#494040] hover:rotate-90 transition-transform duration-300"
                        aria-label="Close cart"
                    >
                        <X className="w-6 h-6" strokeWidth={1.5} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-[#f1d1d1]/10 flex items-center justify-center">
                                <ShoppingBag className="w-8 h-8 text-[#f1d1d1]" strokeWidth={1} />
                            </div>
                            <p className="font-serif italic text-[#494040]/40 text-lg">Your bag is currently empty.</p>
                            <button 
                                onClick={onClose}
                                className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040] border-b border-[#494040] pb-1"
                            >
                                Continue Browsing
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-10">
                            {cart.map((product) => (
                                <div key={product._id} className="group flex gap-6 relative">
                                    {/* Image */}
                                    <div className="w-24 h-32 bg-white border border-[#f1d1d1]/20 overflow-hidden flex-shrink-0">
                                        <img
                                            src={getBackendImageUrl(product.productImage)}
                                            alt={product.name}
                                            className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-[#494040] line-clamp-1 pr-4">
                                                {product.name}
                                            </h4>
                                            <button 
                                                onClick={() => removeFromCart(product._id)}
                                                className="text-[#494040]/30 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <p className="text-sm font-serif italic text-[#494040]/60 mb-4">
                                            NPR {(
                                                product.price * product.quantity +
                                                (product.addons || []).reduce(
                                                    (sum, a) => sum + a.price * a.quantity * product.quantity,
                                                    0
                                                )
                                            ).toLocaleString()}
                                        </p>

                                        {/* Quantity & Controls */}
                                        <div className="flex items-center mt-auto">
                                            <div className="flex items-center border border-[#f1d1d1] rounded-full px-3 py-1">
                                                <button
                                                    onClick={() => updateQuantity(product._id, product.quantity - 1)}
                                                    className="p-1 text-[#494040] disabled:opacity-20"
                                                    disabled={product.quantity <= 1}
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="px-4 text-xs font-bold text-[#494040]">
                                                    {product.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(product._id, product.quantity + 1)}
                                                    className="p-1 text-[#494040]"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Add-ons List */}
                                        {product.addons && product.addons.length > 0 && (
                                            <div className="mt-4 space-y-1">
                                                <p className="text-[9px] font-bold tracking-widest uppercase text-[#f1d1d1]">Add-ons</p>
                                                {product.addons.map((addon, i) => (
                                                    <div key={i} className="flex justify-between text-[10px] text-[#494040]/50 font-light">
                                                        <span>{addon.name} (x{addon.quantity})</span>
                                                        <span>+ NPR {addon.price.toLocaleString()}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-8 border-t border-[#f1d1d1]/30 bg-[#fffcfc] space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">Subtotal</span>
                                <span className="text-2xl font-serif text-[#494040]">
                                    NPR {subtotal.toLocaleString()}
                                </span>
                            </div>
                            <p className="text-[10px] text-[#494040]/40 italic">Shipping and taxes calculated at checkout.</p>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={onCheckout}
                                className="w-full bg-[#494040] text-[#fffcfc] font-bold py-5 rounded-full flex items-center justify-center gap-3 group hover:bg-[#362f2f] transition-all duration-500 shadow-xl"
                            >
                                <span className="text-xs tracking-[0.2em] uppercase">Proceed to Checkout</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </button>

                            <button
                                onClick={clearCart}
                                className="w-full py-2 text-[10px] font-bold tracking-[0.1em] uppercase text-[#494040]/40 hover:text-red-400 transition-colors"
                            >
                                Empty Bag
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-[#494040]/40 backdrop-blur-sm z-40 transition-opacity duration-500"
                />
            )}
        </>
    )
}