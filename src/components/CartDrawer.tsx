import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartDrawerProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Background Overlay */}
          <motion.div
            id="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
          />

          {/* Drawer Container */}
          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              id="cart-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white shadow-2xl dark:bg-slate-900 border-l border-slate-100 dark:border-slate-800"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Keranjang Belanja</h2>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
                      {totalItemsCount}
                    </span>
                  </div>
                  <button
                    id="close-cart-drawer"
                    onClick={onClose}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 dark:hover:bg-slate-800"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Body: Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                  {cartItems.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center text-center py-12">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-slate-800 dark:text-emerald-400">
                        <ShoppingCart className="h-10 w-10" />
                      </div>
                      <h3 className="mt-6 text-base font-bold text-slate-800 dark:text-white">Keranjang Kosong</h3>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                        Anda belum menambahkan produk ke dalam keranjang belanja. Silakan pilih dari katalog kami.
                      </p>
                      <button
                        id="btn-start-shopping"
                        onClick={onClose}
                        className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
                      >
                        Mulai Belanja
                      </button>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        id={`cart-item-${item.product.id}`}
                        className="flex gap-4 border-b border-slate-50 pb-5 last:border-0 last:pb-0 dark:border-slate-800/40"
                      >
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 dark:border-slate-800">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              id={`remove-cart-item-${item.product.id}`}
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-slate-400 hover:text-red-500 transition"
                              title="Hapus"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="text-xs text-slate-400 mt-0.5">{item.product.category}</span>
                          <span className="text-sm font-semibold text-slate-900 dark:text-white mt-1.5">
                            {formatPrice(item.product.price)}
                          </span>

                          <div className="mt-3 flex items-center justify-between">
                            {/* Counter */}
                            <div className="flex items-center rounded-lg border border-slate-100 p-0.5 dark:border-slate-800">
                              <button
                                id={`dec-qty-${item.product.id}`}
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 text-slate-500 hover:bg-slate-100 rounded dark:hover:bg-slate-800"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-slate-800 dark:text-slate-200">
                                {item.quantity}
                              </span>
                              <button
                                id={`inc-qty-${item.product.id}`}
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stock}
                                className="p-1 text-slate-500 hover:bg-slate-100 rounded disabled:opacity-30 dark:hover:bg-slate-800"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                              Sub: {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer: Checkout Summary */}
                {cartItems.length > 0 && (
                  <div className="border-t border-slate-100 bg-slate-50 px-6 py-6 dark:border-slate-800 dark:bg-slate-900/60">
                    <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white mb-2">
                      <span>Total Pesanan</span>
                      <span id="cart-total-price" className="text-lg text-emerald-600 dark:text-emerald-400">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-5">
                      Harga di atas belum termasuk diskon kupon atau pengiriman khusus. Isi detail Anda di halaman selanjutnya untuk checkout cepat via WhatsApp.
                    </p>
                    <button
                      id="btn-cart-checkout"
                      onClick={onCheckout}
                      className="flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
                    >
                      <CreditCard className="h-5 w-5" />
                      Lanjut ke WA Checkout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
