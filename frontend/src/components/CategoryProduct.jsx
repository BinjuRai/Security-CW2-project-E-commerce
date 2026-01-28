"use client";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Plus,
  ChevronLeft,
  Package,
  ArrowRight,
} from "lucide-react";
import { getBackendImageUrl } from "../utils/backend-image";
import { useProductsByCategory } from "../hooks/admin/useAdminProduct";
import { useGetOneCategory } from "../hooks/admin/useAdminCategory";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { AuthContext } from "../auth/AuthProvider";
import UserSidebar from "./UserCartCheckout";
import ProductDetailsModal from "./ProductDetailsModal";
import OrderTypeModal from "./OrderType";

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useProductsByCategory(categoryId);
  const {
    category,
    isLoading: categoryLoading,
    isError: categoryError,
  } = useGetOneCategory(categoryId);

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderTypeModalOpen, setIsOrderTypeModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (productWithAddons) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => {
        if (item._id !== productWithAddons._id) return false;
        const a1 = item.addons || [];
        const a2 = productWithAddons.addons || [];
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

  const removeFromCart = (productId) =>
    setCart((prev) => prev.filter((p) => p._id !== productId));
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
    setIsOrderTypeModalOpen(true);
  };

  const handleOrderTypeSelect = (type) => {
    setIsOrderTypeModalOpen(false);
    const order = {
      userId: user._id,
      products: cart,
      total: cart.reduce((sum, p) => sum + p.price * p.quantity, 0),
      orderType: type,
    };
    createOrderMutation.mutate(order);
  };

  if (productsLoading || categoryLoading) {
    return (
      <div className="min-h-screen bg-[#fffcfc] flex justify-center items-center">
        <div className="w-10 h-10 border-2 border-[#f1d1d1] border-t-[#494040] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcfc] text-[#494040] selection:bg-[#f1d1d1]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Navigation & Header */}
        <div className="mb-16">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-[#494040]/40 hover:text-[#494040] transition-all mb-8 uppercase text-[10px] font-bold tracking-[0.2em]"
          >
            <ChevronLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Discovery
          </button>

          <header className="flex flex-col md:flex-row justify-between items-end border-b border-[#f1d1d1]/30 pb-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#f1d1d1] font-medium tracking-widest uppercase text-[10px]">
                <span className="w-8 h-[1px] bg-[#f1d1d1]"></span>
                Curated Category
              </div>
              <h1 className="text-5xl font-serif italic tracking-tight">
                {category?.name || "Department"}
              </h1>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">
                {products.length} Exquisite{" "}
                {products.length === 1 ? "Piece" : "Pieces"} Found
              </p>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="group relative flex items-center gap-4 bg-[#494040] text-[#fffcfc] px-8 py-4 rounded-full transition-all duration-500 hover:bg-[#362f2f] hover:px-10 mt-8 md:mt-0"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:-rotate-12" />
              <span className="text-[10px] font-bold tracking-widest uppercase">
                My Bag
              </span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#f1d1d1] text-[#494040] text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#fffcfc]">
                  {cart.length}
                </span>
              )}
            </button>
          </header>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="py-32 text-center border border-dashed border-[#f1d1d1] flex flex-col items-center">
            <Package
              className="w-12 h-12 text-[#f1d1d1] mb-4"
              strokeWidth={1}
            />
            <p className="font-serif italic text-xl text-[#494040]/40">
              This collection is currently empty.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {products.map((product) => (
              <div key={product._id} className="group flex flex-col">
                {/* Editorial Image Frame */}
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="relative aspect-[4/5] bg-white overflow-hidden cursor-pointer mb-6 border border-transparent group-hover:border-[#f1d1d1]/30 transition-all duration-500"
                >
                  {/* <img
                    src={getBackendImageUrl(product.productImage)}
                    alt={product.name}
                    className="w-full h-full object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-105"
                  /> */}

                  {product.imagepath && ( // ✅ Changed from productImage to imagepath
                    <img
                      src={getBackendImageUrl(product.imagepath)} // ✅ Changed here too
                      alt={product.name}
                      className="w-full h-60 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-[#fffcfc]/90 backdrop-blur-sm text-[#494040] text-[10px] font-bold tracking-tighter px-3 py-1 uppercase border border-[#f1d1d1]">
                    NPR {product.price.toLocaleString()}
                  </div>
                  <div className="absolute inset-0 bg-[#494040]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1">
                  <h2 className="text-xl font-medium text-[#494040] mb-2 group-hover:text-[#f1d1d1] transition-colors duration-300">
                    {product.name}
                  </h2>
                  <p className="text-sm text-[#494040]/60 line-clamp-2 leading-relaxed mb-6 font-light">
                    {product.description}
                  </p>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="mt-auto flex items-center justify-between border-b border-[#494040]/20 pb-2 group-hover:border-[#f1d1d1] transition-all"
                  >
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                      Add to Bag
                    </span>
                    <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 text-[#f1d1d1]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar & Modals (Components keep the same theme) */}
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
          onAddToCart={(productWithAddons) => {
            handleAddToCart(productWithAddons);
            setSelectedProduct(null);
          }}
        />
      )}

      <OrderTypeModal
        isOpen={isOrderTypeModalOpen}
        onClose={() => setIsOrderTypeModalOpen(false)}
        onSelect={handleOrderTypeSelect}
      />
    </div>
  );
}
