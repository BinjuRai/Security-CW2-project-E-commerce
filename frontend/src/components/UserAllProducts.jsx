// "use client";
// import axios from "axios";
// import { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ShoppingBag,
//   Plus,
//   LayoutGrid,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { getBackendImageUrl } from "../utils/backend-image";
// import { useAdminProduct } from "../hooks/admin/useAdminProduct";
// import { useCreateOrder } from "../hooks/useCreateOrder";
// import UserSidebar from "./UserCartCheckout";
// import { AuthContext } from "../auth/AuthProvider";
// import { generateOrderId } from "../utils/order-utils";
// import { toast } from "react-toastify";
// import PaymentMethodModal from "./payment/PaymentMethodModal";
// import ProductDetailsModal from "./ProductDetailsModal";
// import DeliveryInfoModal from "./DeliverInfoModal";

// export default function UserDashboard() {
//   const { user } = useContext(AuthContext);
//   const {
//     products,
//     isLoading,
//     isError,
//     pageNumber,
//     setPageNumber,
//     canPreviousPage,
//     canNextPage,
//     pagination,
//   } = useAdminProduct();
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] =
//     useState(false);
//   const [isDeliveryInfoModalOpen, setIsDeliveryInfoModalOpen] = useState(false);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

//   useEffect(() => {
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) setCart(JSON.parse(storedCart));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (productWithAddons) => {
//     setCart((prev) => {
//       const existingIndex = prev.findIndex((item) => {
//         if (item._id !== productWithAddons._id) return false;
//         const a1 = item.selectedAddons || [];
//         const a2 = productWithAddons.selectedAddons || [];
//         if (a1.length !== a2.length) return false;
//         for (let i = 0; i < a1.length; i++) {
//           if (
//             a1[i].name !== a2[i].name ||
//             Number(a1[i].price) !== Number(a2[i].price) ||
//             Number(a1[i].quantity) !== Number(a2[i].quantity)
//           )
//             return false;
//         }
//         return true;
//       });
//       if (existingIndex >= 0) {
//         const updated = [...prev];
//         updated[existingIndex].quantity += productWithAddons.quantity;
//         return updated;
//       }
//       return [...prev, productWithAddons];
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCart((prev) => prev.filter((p) => p._id !== productId));
//   };

//   const updateQuantity = (id, newQty) => {
//     if (newQty < 1) return;
//     setCart((prev) =>
//       prev.map((item) =>
//         item._id === id ? { ...item, quantity: newQty } : item,
//       ),
//     );
//   };

//   const clearCart = () => setCart([]);

//   const createOrderMutation = useCreateOrder(() => {
//     localStorage.removeItem("cart");
//     setCart([]);
//     setIsCartOpen(false);
//     navigate("/normal/myorders");
//   });

//   const handleCheckout = () => {
//     if (cart.length === 0) return;
//     setIsPaymentMethodModalOpen(true);
//   };

//   const handlePaymentMethodSelect = (method) => {
//     setSelectedPaymentMethod(method);
//     setIsPaymentMethodModalOpen(false);
//     setIsDeliveryInfoModalOpen(true);
//   };

//   const handleDeliveryInfoSubmit = (deliveryInfo) => {
//     setIsDeliveryInfoModalOpen(false);
//     const total = cart.reduce((sum, p) => {
//       const addonsTotal = (p.selectedAddons || []).reduce(
//         (aSum, a) => aSum + a.price * a.quantity,
//         0,
//       );
//       return sum + (p.price * p.quantity + addonsTotal);
//     }, 0);

//     const orderId = generateOrderId();
//     const transformedProducts = cart.map((item) => ({
//       _id: item._id,
//       name: item.name,
//       price: item.price,
//       quantity: item.quantity,
//       productImage: item.productImage,
//       addons: (item.selectedAddons || []).map((addon) => ({
//         addonId: addon._id || addon.addonId || `addon_${Date.now()}`,
//         name: addon.name,
//         price: addon.price,
//         quantity: addon.quantity,
//       })),
//     }));

//     const order = {
//       _id: orderId,
//       userId: user._id,
//       products: transformedProducts,
//       total,
//       paymentMethod: selectedPaymentMethod,
//       deliveryInfo: deliveryInfo,
//     };

//     if (selectedPaymentMethod === "cash") {
//       createOrderMutation.mutate(order);
//     } else if (selectedPaymentMethod === "online") {
//       triggerEsewaPayment(order);
//     }
//   };

//   const triggerEsewaPayment = (order) => {
//     axios
//       .post("http://localhost:5050/api/esewa/create-payment", {
//         amount: order.total,
//         pid: order._id,
//       })
//       .then(({ data }) => {
//         if (data.url) window.location.href = data.url;
//         else toast.error("Failed to get payment URL");
//       })
//       .catch(() => toast.error("Error initiating eSewa payment"));
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#fffcfc] flex justify-center items-center">
//         <div className="w-10 h-10 border-2 border-[#f1d1d1] border-t-[#494040] rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#fffcfc] text-[#494040] selection:bg-[#f1d1d1]">
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {/* Premium Header */}
//         <header className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#f1d1d1] pb-8">
//           <div className="space-y-2">
//             <div className="flex items-center gap-2 text-[#f1d1d1] font-medium tracking-widest uppercase text-xs">
//               <span className="w-8 h-[1px] bg-[#f1d1d1]"></span>
//               Exquisite Collection
//             </div>
//             <h1 className="text-5xl font-light tracking-tight text-[#494040]">
//               Our <span className="italic font-serif">Catalogue</span>
//             </h1>
//           </div>

//           <button
//             onClick={() => setIsCartOpen(true)}
//             className="group relative flex items-center gap-4 bg-[#494040] text-[#fffcfc] px-8 py-4 rounded-full transition-all duration-500 hover:bg-[#362f2f] hover:px-10 mt-6 md:mt-0"
//           >
//             <ShoppingBag className="w-5 h-5 transition-transform group-hover:-rotate-12" />
//             <span className="text-sm font-medium tracking-wide">MY BAG</span>
//             {cart.length > 0 && (
//               <span className="absolute -top-1 -right-1 bg-[#f1d1d1] text-[#494040] text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#fffcfc]">
//                 {cart.length}
//               </span>
//             )}
//           </button>
//         </header>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
//           {products.map((product) => (
//             <div key={product._id} className="group flex flex-col">
//               {/* Premium Image Container */}
//               <div
//                 onClick={() => setSelectedProduct(product)}
//                 className="relative aspect-[4/5] bg-white overflow-hidden cursor-pointer mb-6"
//               >
//                 <img
//                   src={getBackendImageUrl(product.productImage)}
//                   alt={product.name}
//                   className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
//                 />
//                 <div className="absolute top-4 left-4 bg-[#fffcfc]/90 backdrop-blur-sm text-[#494040] text-[11px] font-bold tracking-tighter px-3 py-1 uppercase border border-[#f1d1d1]">
//                   NPR {product.price.toLocaleString()}
//                 </div>
//                 {/* Quick Add Overlay */}
//                 <div className="absolute inset-0 bg-[#494040]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </div>

//               {/* Content Section */}
//               <div className="flex flex-col flex-1">
//                 <h3 className="text-xl font-medium text-[#494040] mb-2 group-hover:text-[#f1d1d1] transition-colors duration-300">
//                   {product.name}
//                 </h3>
//                 <p className="text-sm text-[#494040]/60 line-clamp-2 leading-relaxed mb-6 font-light">
//                   {product.description}
//                 </p>

//                 <button
//                   onClick={() => setSelectedProduct(product)}
//                   className="mt-auto flex items-center justify-between border-b border-[#494040]/20 pb-2 group-hover:border-[#f1d1d1] transition-all"
//                 >
//                   <span className="text-xs font-bold tracking-[0.2em] uppercase">
//                     Add to Bag
//                   </span>
//                   <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Refined Pagination */}
//         <div className="mt-24 flex justify-between items-center border-t border-[#f1d1d1] pt-10">
//           <button
//             onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
//             disabled={!canPreviousPage}
//             className={`flex items-center gap-2 text-sm tracking-widest uppercase transition-all ${canPreviousPage ? "text-[#494040] hover:translate-x-[-4px]" : "text-gray-300 pointer-events-none"}`}
//           >
//             <ChevronLeft className="w-4 h-4" /> Previous
//           </button>

//           <div className="flex items-center gap-4">
//             <span className="h-[1px] w-12 bg-[#f1d1d1]"></span>
//             <span className="text-sm font-medium italic">
//               {pagination.page} / {pagination.totalPages}
//             </span>
//             <span className="h-[1px] w-12 bg-[#f1d1d1]"></span>
//           </div>

//           <button
//             onClick={() => setPageNumber((prev) => prev + 1)}
//             disabled={!canNextPage}
//             className={`flex items-center gap-2 text-sm tracking-widest uppercase transition-all ${canNextPage ? "text-[#494040] hover:translate-x-[4px]" : "text-gray-300 pointer-events-none"}`}
//           >
//             Next <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* Modals & Sidebar */}
//       <UserSidebar
//         cart={cart}
//         isOpen={isCartOpen}
//         onClose={() => setIsCartOpen(false)}
//         removeFromCart={removeFromCart}
//         updateQuantity={updateQuantity}
//         clearCart={clearCart}
//         onCheckout={handleCheckout}
//         // Suggestion: Inside UserSidebar, use #fffcfc background and #494040 buttons
//       />

//       {selectedProduct && (
//         <ProductDetailsModal
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//           onAddToCart={addToCart}
//         />
//       )}

//       <PaymentMethodModal
//         isOpen={isPaymentMethodModalOpen}
//         onClose={() => setIsPaymentMethodModalOpen(false)}
//         onSelect={handlePaymentMethodSelect}
//       />

//       <DeliveryInfoModal
//         isOpen={isDeliveryInfoModalOpen}
//         onClose={() => setIsDeliveryInfoModalOpen(false)}
//         onSubmit={handleDeliveryInfoSubmit}
//         userEmail={user?.email}
//         userName={user?.username}
//       />
//     </div>
//   )
// }

"use client";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Plus,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getBackendImageUrl } from "../utils/backend-image";
import { useAdminProduct } from "../hooks/admin/useAdminProduct";
import { useCreateOrder } from "../hooks/useCreateOrder";
import UserSidebar from "./UserCartCheckout";
import { AuthContext } from "../auth/AuthProvider";
import { generateOrderId } from "../utils/order-utils";
import { toast } from "react-toastify";
import PaymentMethodModal from "./payment/PaymentMethodModal";
import ProductDetailsModal from "./ProductDetailsModal";
import DeliveryInfoModal from "./DeliverInfoModal";

export default function UserDashboard() {
  const { user } = useContext(AuthContext);
  const {
    products,
    isLoading,
    isError,
    pageNumber,
    setPageNumber,
    canPreviousPage,
    canNextPage,
    pagination,
  } = useAdminProduct();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] =
    useState(false);
  const [isDeliveryInfoModalOpen, setIsDeliveryInfoModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productWithAddons) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => {
        if (item._id !== productWithAddons._id) return false;
        const a1 = item.selectedAddons || [];
        const a2 = productWithAddons.selectedAddons || [];
        if (a1.length !== a2.length) return false;
        for (let i = 0; i < a1.length; i++) {
          if (
            a1[i].name !== a2[i].name ||
            Number(a1[i].price) !== Number(a2[i].price) ||
            Number(a1[i].quantity) !== Number(a2[i].quantity)
          )
            return false;
        }
        return true;
      });
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += productWithAddons.quantity;
        return updated;
      }
      return [...prev, productWithAddons];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p._id !== productId));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const createOrderMutation = useCreateOrder(() => {
    localStorage.removeItem("cart");
    setCart([]);
    setIsCartOpen(false);
    navigate("/normal/myorders");
  });

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsPaymentMethodModalOpen(true);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setIsPaymentMethodModalOpen(false);
    setIsDeliveryInfoModalOpen(true);
  };

  const handleDeliveryInfoSubmit = (deliveryInfo) => {
    setIsDeliveryInfoModalOpen(false);
    const total = cart.reduce((sum, p) => {
      const addonsTotal = (p.selectedAddons || []).reduce(
        (aSum, a) => aSum + a.price * a.quantity,
        0,
      );
      return sum + (p.price * p.quantity + addonsTotal);
    }, 0);

    const orderId = generateOrderId();
    const transformedProducts = cart.map((item) => ({
      _id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      productImage: item.productImage,
      addons: (item.selectedAddons || []).map((addon) => ({
        addonId: addon._id || addon.addonId || `addon_${Date.now()}`,
        name: addon.name,
        price: addon.price,
        quantity: addon.quantity,
      })),
    }));

    const order = {
      _id: orderId,
      userId: user._id,
      products: transformedProducts,
      total,
      paymentMethod: selectedPaymentMethod,
      deliveryInfo: deliveryInfo,
    };

    if (selectedPaymentMethod === "cash") {
      createOrderMutation.mutate(order);
    } else if (selectedPaymentMethod === "online") {
      triggerEsewaPayment(order);
    }
  };

  const triggerEsewaPayment = (order) => {
    axios
      .post("http://localhost:5050/api/esewa/create-payment", {
        amount: order.total,
        pid: order._id,
      })
      .then(({ data }) => {
        if (data.url) window.location.href = data.url;
        else toast.error("Failed to get payment URL");
      })
      .catch(() => toast.error("Error initiating eSewa payment"));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fffcfc] flex justify-center items-center">
        <div className="w-10 h-10 border-2 border-[#f1d1d1] border-t-[#494040] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcfc] text-[#494040] selection:bg-[#f1d1d1]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Premium Header */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#f1d1d1] pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#f1d1d1] font-medium tracking-widest uppercase text-xs">
              <span className="w-8 h-[1px] bg-[#f1d1d1]"></span>
              Exquisite Collection
            </div>
            <h1 className="text-5xl font-light tracking-tight text-[#494040]">
              Our <span className="italic font-serif">Catalogue</span>
            </h1>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="group relative flex items-center gap-4 bg-[#494040] text-[#fffcfc] px-8 py-4 rounded-full transition-all duration-500 hover:bg-[#362f2f] hover:px-10 mt-6 md:mt-0"
          >
            <ShoppingBag className="w-5 h-5 transition-transform group-hover:-rotate-12" />
            <span className="text-sm font-medium tracking-wide">MY BAG</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#f1d1d1] text-[#494040] text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#fffcfc]">
                {cart.length}
              </span>
            )}
          </button>
        </header>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => {
            // DEBUG CONSOLE LOGS - CHECK YOUR BROWSER CONSOLE
            console.log("🔍 Product Name:", product.name);
            console.log("📁 productImage field:", product.productImage);
            console.log(
              "🌐 Generated URL:",
              getBackendImageUrl(product.productImage),
            );

            return (
              <div key={product._id} className="group flex flex-col">
                {/* Premium Image Container */}
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="relative aspect-[4/5] bg-white overflow-hidden cursor-pointer mb-6"
                >
                  <img
                    src={getBackendImageUrl(product.productImage)}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#fffcfc]/90 backdrop-blur-sm text-[#494040] text-[11px] font-bold tracking-tighter px-3 py-1 uppercase border border-[#f1d1d1]">
                    NPR {product.price.toLocaleString()}
                  </div>
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-[#494040]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1">
                  <h3 className="text-xl font-medium text-[#494040] mb-2 group-hover:text-[#f1d1d1] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#494040]/60 line-clamp-2 leading-relaxed mb-6 font-light">
                    {product.description}
                  </p>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="mt-auto flex items-center justify-between border-b border-[#494040]/20 pb-2 group-hover:border-[#f1d1d1] transition-all"
                  >
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">
                      Add to Bag
                    </span>
                    <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Refined Pagination */}
        <div className="mt-24 flex justify-between items-center border-t border-[#f1d1d1] pt-10">
          <button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={!canPreviousPage}
            className={`flex items-center gap-2 text-sm tracking-widest uppercase transition-all ${canPreviousPage ? "text-[#494040] hover:translate-x-[-4px]" : "text-gray-300 pointer-events-none"}`}
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <div className="flex items-center gap-4">
            <span className="h-[1px] w-12 bg-[#f1d1d1]"></span>
            <span className="text-sm font-medium italic">
              {pagination.page} / {pagination.totalPages}
            </span>
            <span className="h-[1px] w-12 bg-[#f1d1d1]"></span>
          </div>

          <button
            onClick={() => setPageNumber((prev) => prev + 1)}
            disabled={!canNextPage}
            className={`flex items-center gap-2 text-sm tracking-widest uppercase transition-all ${canNextPage ? "text-[#494040] hover:translate-x-[4px]" : "text-gray-300 pointer-events-none"}`}
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modals & Sidebar */}
      <UserSidebar
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
        onCheckout={handleCheckout}
      />

      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      <PaymentMethodModal
        isOpen={isPaymentMethodModalOpen}
        onClose={() => setIsPaymentMethodModalOpen(false)}
        onSelect={handlePaymentMethodSelect}
      />

      <DeliveryInfoModal
        isOpen={isDeliveryInfoModalOpen}
        onClose={() => setIsDeliveryInfoModalOpen(false)}
        onSubmit={handleDeliveryInfoSubmit}
        userEmail={user?.email}
        userName={user?.username}
      />
    </div>
  );
}
