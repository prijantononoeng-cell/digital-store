import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string;
  product: Product;
  onOpenDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetail, onAddToCart }: ProductCardProps) {
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

  return (
    <motion.div
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900/40"
    >
      {/* Badge Promo */}
      {product.isPromo && discountPercent > 0 && (
        <span id={`promo-badge-${product.id}`} className="absolute top-4 left-4 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          Hemat {discountPercent}%
        </span>
      )}

      {/* Stock Warning Badge */}
      {product.stock <= 5 && (
        <span id={`stock-badge-${product.id}`} className="absolute top-4 right-4 z-10 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          Sisa {product.stock}!
        </span>
      )}

      {/* Product Image and Overlay Actions */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Dark overlay with hover buttons */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              id={`btn-view-${product.id}`}
              onClick={() => onOpenDetail(product)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-800 transition hover:bg-emerald-500 hover:text-white"
              title="Lihat Detail"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              id={`btn-quick-add-${product.id}`}
              onClick={() => onAddToCart(product)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-800 transition hover:bg-emerald-500 hover:text-white"
              title="Tambah ke Keranjang"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Body */}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-medium tracking-wide text-emerald-600 dark:text-emerald-400">
          {product.category}
        </span>
        <h3
          id={`product-title-${product.id}`}
          onClick={() => onOpenDetail(product)}
          className="mt-2 line-clamp-1 cursor-pointer text-base font-semibold text-slate-800 transition hover:text-emerald-600 dark:text-slate-100 dark:hover:text-emerald-400"
        >
          {product.name}
        </h3>

        {/* Ratings */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center text-amber-400">
            <Star className="h-4 w-4 fill-current" />
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {product.rating}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            ({product.reviewsCount} ulasan)
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
          {product.description}
        </p>

        {/* Pricing & CTA */}
        <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800/60">
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <div className="flex flex-col">
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through dark:text-slate-500">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span id={`price-${product.id}`} className="text-lg font-bold text-slate-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
            </div>

            <button
              id={`btn-buy-${product.id}`}
              onClick={() => onOpenDetail(product)}
              className="rounded-xl bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 transition duration-200 hover:bg-emerald-600 hover:text-white dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-600 dark:hover:text-white"
            >
              Pilih Produk
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
