import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Receipt, Calendar, User, Package } from "lucide-react";

const statusStyles = {
  pending: "border-[#f1d1d1] text-[#494040] bg-[#f1d1d1]/10",
  processing: "border-[#494040] text-[#494040] bg-[#494040]/5",
  completed: "border-[#494040] text-[#fffcfc] bg-[#494040]",
};

function formatCurrency(amount) {
  return amount.toLocaleString("en-IN");
}

export default function OrderDetailsModal({ order, isOpen, onClose }) {
  if (!order) return null;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[60] overflow-y-auto"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#494040]/40 backdrop-blur-md" />
        </Transition.Child>

        <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-400"
            enterFrom="opacity-0 translate-y-8 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-8 scale-95"
          >
            <Dialog.Panel className="relative w-full max-w-3xl overflow-hidden bg-[#fffcfc] shadow-[0_30px_60px_rgba(73,64,64,0.2)] border border-[#f1d1d1]/30">
              {/* Decorative Accent Line */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#fffcfc] via-[#f1d1d1] to-[#fffcfc]" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-8 right-8 text-[#494040]/40 hover:text-[#494040] transition-colors z-10"
              >
                <X size={24} strokeWidth={1.5} />
              </button>

              <div className="p-8 md:p-12">
                {/* Header Section */}
                <header className="mb-12 border-b border-[#f1d1d1]/30 pb-10">
                  <div className="flex items-center gap-2 text-[#f1d1d1] mb-4">
                    <span className="w-10 h-[1px] bg-[#f1d1d1]"></span>
                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
                      Official Invoice
                    </span>
                  </div>
                  <Dialog.Title className="text-4xl font-serif italic text-[#494040] mb-2">
                    Order{" "}
                    <span className="font-sans not-italic font-light tracking-tighter">
                      #{order._id.slice(-8).toUpperCase()}
                    </span>
                  </Dialog.Title>
                  <div className="flex flex-wrap gap-x-8 gap-y-2 mt-6">
                    <div className="flex items-center gap-2 text-[11px] text-[#494040]/60 uppercase tracking-widest">
                      <Calendar size={14} className="text-[#f1d1d1]" />
                      {new Date(order.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#494040]/60 uppercase tracking-widest">
                      <User size={14} className="text-[#f1d1d1]" />
                      {order.userId?.username || "Guest Client"}
                    </div>
                  </div>
                </header>

                {/* Status & Type */}
                <div className="flex justify-between items-center mb-10">
                  <span
                    className={`px-6 py-2 border text-[10px] font-bold tracking-[0.2em] uppercase rounded-full ${statusStyles[order.status] || statusStyles.pending}`}
                  >
                    {order.status}
                  </span>
                  <div className="text-right">
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#494040]/40">
                      Payment Method
                    </p>
                    <p className="text-sm font-medium text-[#494040] uppercase">
                      {order.paymentMethod || "Credit Card"}
                    </p>
                  </div>
                </div>

                {/* Products List */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Package
                      size={18}
                      className="text-[#f1d1d1]"
                      strokeWidth={1.5}
                    />
                    <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-[#494040]/80">
                      Curation Details
                    </h3>
                  </div>

                  <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                    {order.products.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-6 items-start pb-6 border-b border-[#f1d1d1]/10 last:border-0"
                      >
                        {/* Image Frame */}
                        <div className="w-20 h-24 bg-white border border-[#f1d1d1]/30 p-2 flex-shrink-0">
                          <img
                            src={item.productImage}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Item Info */}
                        <div className="flex-1">
                          <div className="flex justify-between gap-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-[#494040]">
                              {item.name}{" "}
                              <span className="text-[#f1d1d1] lowercase font-serif italic text-lg px-1">
                                x
                              </span>{" "}
                              {item.quantity}
                            </h4>
                            <span className="text-sm font-serif italic text-[#494040]">
                              NPR {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>

                          {/* Add-ons */}
                          {item.addons && item.addons.length > 0 && (
                            <div className="mt-3 space-y-1">
                              {item.addons.map((addon, i) => (
                                <div
                                  key={i}
                                  className="flex justify-between text-[10px] text-[#494040]/50 tracking-wide"
                                >
                                  <span>+ {addon.name}</span>
                                  <span>NPR {formatCurrency(addon.price)}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer / Total */}
                <footer className="mt-12 pt-8 border-t border-[#494040] flex flex-col items-end gap-6">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#494040]/40 mb-1">
                      Total Investment
                    </span>
                    <div className="text-4xl font-serif text-[#494040]">
                      NPR{" "}
                      {formatCurrency(
                        order.products.reduce((total, item) => {
                          const addonsTotal =
                            item.addons?.reduce((sum, a) => sum + a.price, 0) ||
                            0;
                          return (
                            total + (item.price + addonsTotal) * item.quantity
                          );
                        }, 0),
                      )}
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full md:w-auto px-12 py-4 bg-[#494040] text-[#fffcfc] text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#362f2f] transition-all duration-500 rounded-full"
                  >
                    Close Document
                  </button>
                </footer>
              </div>

              {/* Aesthetic Bottom Edge */}
              <div className="h-1 w-full bg-[#f1d1d1]/10" />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
