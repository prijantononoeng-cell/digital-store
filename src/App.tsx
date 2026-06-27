import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  ShoppingBag,
  Filter,
  CheckCircle,
  Truck,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Settings,
  Database,
  Star,
  Sparkles,
  RefreshCw,
  Clock,
  ExternalLink,
  Smartphone,
  BookOpen,
  Code2,
  Wrench
} from 'lucide-react';

import { Product, CartItem, LeadData } from './types';
import { INITIAL_PRODUCTS, FAQ_DATA, TESTIMONIALS } from './data/products';

import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import LeadFormModal from './components/LeadFormModal';
import FloatingWA from './components/FloatingWA';
import AdminPanel from './components/AdminPanel';

export default function App() {
  // --- Persistent States ---
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('tokodigital_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('tokodigital_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [leads, setLeads] = useState<LeadData[]>(() => {
    const saved = localStorage.getItem('tokodigital_leads');
    return saved ? JSON.parse(saved) : [];
  });

  const [targetWhatsappNumber, setTargetWhatsappNumber] = useState<string>(() => {
    const saved = localStorage.getItem('tokodigital_wa_number');
    if (!saved || saved === '6281234567890') {
      return '6281333651685';
    }
    return saved;
  });

  // --- Filtering & Search ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // --- UI Control States ---
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutItems, setCheckoutItems] = useState<{ product: Product; quantity: number }[]>([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // FAQ Expanded index list
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  // --- Effects for LocalStorage Sync ---
  useEffect(() => {
    localStorage.setItem('tokodigital_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('tokodigital_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('tokodigital_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('tokodigital_wa_number', targetWhatsappNumber);
  }, [targetWhatsappNumber]);

  // --- Cart Helpers ---
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        // Guard stock limit
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    
    // Smooth user feedback
    setIsCartOpen(true);
    setSelectedProduct(null); // Close detail modal if open
  };

  const handleUpdateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  // --- Checkout Flows ---
  const handleDirectCheckout = (product: Product, quantity: number) => {
    setCheckoutItems([{ product, quantity }]);
    setIsLeadOpen(true);
  };

  const handleCartCheckout = () => {
    setCheckoutItems(cartItems.map(item => ({ product: item.product, quantity: item.quantity })));
    setIsCartOpen(false);
    setIsLeadOpen(true);
  };

  const handleNewLeadSubmitted = (newLead: LeadData) => {
    setLeads(prev => [newLead, ...prev]);
    
    // Clear cart if we checked out from the cart
    const isCartCheckout = checkoutItems.length > 1 || 
      (checkoutItems.length === 1 && cartItems.some(item => item.product.id === checkoutItems[0].product.id));
    
    if (isCartCheckout) {
      setCartItems([]);
    }
  };

  // --- Admin Panel Helpers ---
  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleClearLeads = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua catatan pesanan masuk di dashboard admin ini?')) {
      setLeads([]);
    }
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset katalog kembali ke produk default pabrikan?')) {
      setProducts(INITIAL_PRODUCTS);
    }
  };

  // --- Dynamic Filters ---
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalCartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans antialiased selection:bg-emerald-500 selection:text-white dark:bg-slate-950 dark:text-slate-200">
      
      {/* --- TOP BANNER (Aesthetic Notice about Simulation) --- */}
      <div className="bg-slate-900 px-4 py-2 text-center text-xs font-semibold text-slate-300 dark:bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
            <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span>Toko Digital - Sistem Checkout Lead WA & Floating Chat Active</span>
          </div>
          <div className="flex items-center gap-3 mx-auto sm:mx-0">
            <button
              id="header-btn-admin-panel"
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition duration-150 text-[11px]"
            >
              <Database className="h-3.5 w-3.5" />
              Panel Admin Seller ({leads.length})
            </button>
          </div>
        </div>
      </div>

      {/* --- HEADER NAVBAR --- */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 dark:bg-slate-900/80 dark:border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
              <ShoppingBag className="h-5.5 w-5.5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-950 dark:text-white font-display">
                Toko<span className="text-emerald-600">Digital</span>
              </span>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 -mt-1 font-semibold tracking-wider uppercase">Premium Store</p>
            </div>
          </div>

          {/* Search Bar in Header for wide screen */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4.5 w-4.5 text-slate-400" />
            </div>
            <input
              id="header-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari gadget, software, atau course idaman..."
              className="w-full rounded-xl bg-slate-50 border border-slate-200/80 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:bg-white transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:bg-slate-900"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Simulation settings shortcut */}
            <button
              id="nav-btn-admin-toggle"
              onClick={() => setIsAdminOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-600 shadow-xs hover:border-emerald-100 hover:text-emerald-600 transition dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
              title="Panel Admin Seller"
            >
              <Settings className="h-5 w-5" />
            </button>

            {/* Shopping Cart Trigger */}
            <button
              id="nav-btn-cart-toggle"
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-11 px-4 items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/15 hover:bg-emerald-500 transition duration-150"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-sm font-bold hidden sm:inline">Keranjang</span>
              <span className="rounded-md bg-white/25 px-1.5 py-0.5 text-xs font-bold min-w-5 text-center">
                {totalCartItemsCount}
              </span>
            </button>
          </div>
        </div>

        {/* Search bar specifically for mobile */}
        <div className="md:hidden px-4 pb-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/60">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4.5 w-4.5 text-slate-400" />
            </div>
            <input
              id="mobile-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk terlaris..."
              className="w-full rounded-xl bg-slate-50 border border-slate-200/80 py-2.5 pl-10 pr-4 text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white"
            />
          </div>
        </div>
      </header>

      {/* --- HERO BANNER HERO SECTION --- */}
      <section className="relative overflow-hidden bg-slate-900 py-16 sm:py-24 text-white dark:bg-slate-950 border-b border-slate-800">
        {/* Dynamic decorative shapes */}
        <div className="absolute top-1/2 left-1/4 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-4 py-1.5 text-xs font-bold text-emerald-400"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Katalog Gadget & Lisensi Software Original
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.1] max-w-4xl mx-auto"
          >
            Destinasi Produk Digital & Gadget <span className="text-emerald-400">Premium</span> Terbaik
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Temukan koleksi keyboard mekanikal, smartwatch, template developer, hingga materi course eksklusif. Transaksi super instan terintegrasi WhatsApp Lead checkout.
          </motion.p>

          {/* Quick Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400 font-display">100%</p>
              <p className="text-xs text-slate-400 mt-1">Garansi Original</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400 font-display">5 Menit</p>
              <p className="text-xs text-slate-400 mt-1">Proses Akses WA</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400 font-display">300+</p>
              <p className="text-xs text-slate-400 mt-1">Ulasan Bintang 5</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400 font-display">24/7</p>
              <p className="text-xs text-slate-400 mt-1">Bantuan Live Chat</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FILTER & PRODUCT SECTION --- */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Category Selector Navbar and Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Filter className="h-5.5 w-5.5 text-emerald-600 dark:text-emerald-400" />
              Etalase Produk Kami
            </h2>
            <p className="text-xs text-slate-500 mt-1">Pilih kategori untuk mempermudah pencarian Anda</p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-2">
            {['Semua', 'Gadget', 'Software', 'Course', 'Aksesoris', 'Aplikasi', 'Undangan Digital'].map((category) => (
              <button
                key={category}
                id={`btn-filter-${category}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-200 ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/10'
                    : 'bg-white border border-slate-200/60 text-slate-600 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Products Catalog Grid */}
        <div className="mt-10">
          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-16 text-center max-w-lg mx-auto dark:border-slate-800">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500 mx-auto dark:bg-slate-800">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-base font-bold text-slate-800 dark:text-white">Produk Tidak Ditemukan</h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                Kami tidak menemukan produk "{searchQuery}" pada kategori {selectedCategory}. Coba cari kata kunci lain atau reset filter pencarian.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  id="btn-reset-search"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Semua');
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  Reset Pencarian
                </button>
                <button
                  id="btn-reset-catalog-sim"
                  onClick={handleResetCatalog}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition"
                >
                  Reset ke Default
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetail={setSelectedProduct}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* --- BENEFITS & PROMISES SECTION --- */}
      <section className="bg-white py-16 dark:bg-slate-900 border-t border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Mengapa Belanja di Toko Digital?</h2>
            <p className="text-xs text-slate-500 mt-2">Komitmen kami memberikan kenyamanan dan keamanan transaksi online maksimal</p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-slate-100 p-6 shadow-xs dark:border-slate-800/60 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Instan Delivery & Setup</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Akses langsung lisensi software dan materi kursus dikirim via Email & WhatsApp dalam hitungan menit pasca order disetujui.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 p-6 shadow-xs dark:border-slate-800/60 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Garansi Keaslian 100%</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Semua produk fisik bergaransi resmi toko dan produk digital memiliki lisensi premium orisinal untuk keamanan jangka panjang Anda.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 p-6 shadow-xs dark:border-slate-800/60 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">WhatsApp Lead Checkout</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  Tidak perlu mendaftar akun rumit. Cukup isi form checkout ringkas, rincian pesanan langsung terkirim ke WhatsApp untuk dipandu admin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Ulasan Pelanggan Kami</h2>
          <p className="text-xs text-slate-500 mt-2">Kepuasan pembeli adalah prioritas utama Toko Digital</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              id={`testi-${t.id}`}
              className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800/60 dark:bg-slate-900"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 border-t border-slate-50 pt-4 flex items-center gap-3 dark:border-slate-800/40">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">{t.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{t.role}</p>
                  <p className="text-[9px] font-semibold text-emerald-600 mt-1 dark:text-emerald-400">Membeli: {t.productName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="bg-white py-16 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">Tanya Jawab Umum (FAQ)</h2>
            <p className="text-xs text-slate-500 mt-2">Pertanyaan yang sering ditanyakan mengenai layanan toko kami</p>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, index) => {
              const isExpanded = expandedFaqIndex === index;
              return (
                <div
                  key={index}
                  id={`faq-${index}`}
                  className="rounded-xl border border-slate-100 dark:border-slate-800/60 overflow-hidden bg-slate-50/50 dark:bg-slate-900/60"
                >
                  <button
                    id={`faq-btn-${index}`}
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-sm text-slate-800 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition"
                  >
                    <span>{faq.question}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-4.5 w-4.5 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="h-4.5 w-4.5 text-slate-500 shrink-0" />
                    )}
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-800/40">
                      {faq.answer}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-12 dark:bg-slate-950 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Store Bio */}
            <div>
              <span className="text-lg font-bold text-white font-display">Toko<span className="text-emerald-400">Digital</span></span>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Toko online representatif yang menyajikan produk fisik gadget canggih dan kebutuhan lisensi/course digital secara instan, aman, dan bergaransi resmi.
              </p>
            </div>

            {/* Quick Navigation links */}
            <div>
              <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-3">Tautan Navigasi</h4>
              <ul className="space-y-2 text-xs">
                <li><button id="footer-link-home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-emerald-400 transition">Beranda</button></li>
                <li><button id="footer-link-catalog" onClick={() => setSelectedCategory('Semua')} className="hover:text-emerald-400 transition">Katalog Produk</button></li>
                <li><button id="footer-link-faq" className="hover:text-emerald-400 transition">Panduan FAQ</button></li>
              </ul>
            </div>

            {/* Dynamic settings contact */}
            <div>
              <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-3">Kontak Admin</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Butuh bantuan khusus, kustom order berskala besar, atau ingin klaim diskon? Hubungi admin kami via:
              </p>
              <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-400 border border-emerald-500/10">
                <Smartphone className="h-4 w-4" />
                <span>WA: +{targetWhatsappNumber}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© 2026 Toko Digital. All Rights Reserved. Crafted with React & Tailwind.</p>
            <p className="text-slate-500">Integrasi Lead Form WhatsApp & Widget Melayang Dinamis</p>
          </div>
        </div>
      </footer>

      {/* --- FLOATING WA CHAT WIDGET --- */}
      <FloatingWA targetWhatsappNumber={targetWhatsappNumber} />

      {/* --- CART DRAWER PANEL --- */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCartCheckout}
      />

      {/* --- PRODUCT DETAIL MODAL --- */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, q) => handleAddToCart(p, q)}
        onDirectCheckout={handleDirectCheckout}
      />

      {/* --- LEAD FORM WA CHECKOUT MODAL --- */}
      <LeadFormModal
        isOpen={isLeadOpen}
        onClose={() => setIsLeadOpen(false)}
        checkoutItems={checkoutItems}
        targetWhatsappNumber={targetWhatsappNumber}
        onSubmitLead={handleNewLeadSubmitted}
      />

      {/* --- ADMIN / MERCHANT SIMULATION DRAWER PANEL --- */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        targetWhatsapp={targetWhatsappNumber}
        onUpdateTargetWhatsapp={setTargetWhatsappNumber}
        leads={leads}
        onClearLeads={handleClearLeads}
        onAddProduct={handleAddProduct}
      />

    </div>
  );
}
