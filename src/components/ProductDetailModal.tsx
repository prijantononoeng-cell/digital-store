import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, CheckCircle, ShieldCheck, Truck, ShoppingCart, Send, Minus, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onDirectCheckout: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onDirectCheckout
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          id="detail-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          id="detail-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 dark:bg-slate-900"
        >
          {/* Close Button */}
          <button
            id="close-detail-modal"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-red-500 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-red-500 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Image Container */}
            <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] w-full bg-slate-50 dark:bg-slate-800/50">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.isPromo && discountPercent > 0 && (
                <span className="absolute top-4 left-4 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                  DISKON {discountPercent}%
                </span>
              )}
            </div>

            {/* Right: Content details */}
            <div className="flex flex-col p-6 md:p-8 max-h-[85vh] overflow-y-auto">
              <span className="text-xs font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                {product.category}
              </span>

              <h2 id="modal-product-title" className="mt-2 text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                {product.name}
              </h2>

              {/* Rating and Review counts */}
              <div className="mt-3 flex items-center gap-1.5">
                <div className="flex items-center text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {product.rating}
                </span>
                <span className="text-sm text-slate-400">
                  ({product.reviewsCount} ulasan pembeli)
                </span>
                <span className="mx-2 text-slate-300">|</span>
                <span className={`text-xs font-semibold ${product.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {product.stock > 0 ? `Stok: ${product.stock} unit` : 'Stok Habis'}
                </span>
              </div>

              {/* Pricing */}
              <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/40">
                <div className="flex items-center gap-2">
                  {product.originalPrice && (
                    <span className="text-sm text-slate-400 line-through dark:text-slate-500">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.isPromo && (
                    <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-600 dark:bg-red-950/40 dark:text-red-400">
                      PROMO SPESIAL
                    </span>
                  )}
                </div>
                <div className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
                  {formatPrice(product.price)}
                </div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Deskripsi Produk:</h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features List */}
              <div className="mt-6">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Keunggulan & Fitur Utama:</h4>
                <ul className="mt-2.5 space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery and Guarantee Info badges */}
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-b border-slate-100 py-4 dark:border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-300">Pengiriman Cepat</div>
                    <div className="text-[11px] text-slate-400">Ke seluruh Indonesia</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-300">Garansi Toko</div>
                    <div className="text-[11px] text-slate-400">100% Produk Original</div>
                  </div>
                </div>
              </div>

              {/* Action Area */}
              {product.stock > 0 ? (
                <div className="mt-6 space-y-4">
                  {/* Quantity selector */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Jumlah Pembelian:</span>
                    <div className="flex items-center rounded-lg border border-slate-200 p-1 dark:border-slate-800">
                      <button
                        id="btn-decrement-qty"
                        onClick={handleDecrement}
                        disabled={quantity <= 1}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center text-sm font-bold text-slate-800 dark:text-slate-200">
                        {quantity}
                      </span>
                      <button
                        id="btn-increment-qty"
                        onClick={handleIncrement}
                        disabled={quantity >= product.stock}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      id="btn-modal-add-to-cart"
                      onClick={() => onAddToCart(product, quantity)}
                      className="flex h-12 items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-white px-6 font-semibold text-emerald-700 transition duration-200 hover:bg-emerald-50 dark:border-emerald-500 dark:bg-transparent dark:text-emerald-300 dark:hover:bg-emerald-950/20"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Masukkan Keranjang
                    </button>
                    <button
                      id="btn-modal-direct-buy"
                      onClick={() => onDirectCheckout(product, quantity)}
                      className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 font-semibold text-white shadow-lg shadow-emerald-600/20 transition duration-200 hover:bg-emerald-500 hover:shadow-none"
                    >
                      <Send className="h-4.5 w-4.5" />
                      Beli Sekarang (WA)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-8 rounded-xl bg-red-50 p-4 text-center text-sm font-semibold text-red-600 dark:bg-red-950/20 dark:text-red-400">
                  Mohon maaf, stok produk ini sedang kosong. Silakan hubungi kami via WA Melayang untuk menanyakan ketersediaan kembali.
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
