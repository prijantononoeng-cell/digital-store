import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, Plus, Database, Phone, Check, RefreshCw, Trash2, FolderPlus, Eye } from 'lucide-react';
import { Product, LeadData } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  targetWhatsapp: string;
  onUpdateTargetWhatsapp: (num: string) => void;
  leads: LeadData[];
  onClearLeads: () => void;
  onAddProduct: (product: Product) => void;
}

export default function AdminPanel({
  isOpen,
  onClose,
  targetWhatsapp,
  onUpdateTargetWhatsapp,
  leads,
  onClearLeads,
  onAddProduct
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'leads' | 'settings' | 'add-product'>('leads');
  const [tempWa, setTempWa] = useState(targetWhatsapp);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Add Product Form States
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState<Product['category']>('Gadget');
  const [prodPrice, setProdPrice] = useState('');
  const [prodOriginalPrice, setProdOriginalPrice] = useState('');
  const [prodStock, setProdStock] = useState('10');
  const [prodImage, setProdImage] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodFeatures, setProdFeatures] = useState('');
  const [addProdSuccess, setAddProdSuccess] = useState(false);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTargetWhatsapp(tempWa);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice || !prodDesc) return;

    const featuresArray = prodFeatures
      ? prodFeatures.split('\n').filter(f => f.trim() !== '')
      : ['Kualitas Premium Terjamin', 'Pelayanan Fast Response'];

    const imageToUse = prodImage.trim() || 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=600&auto=format&fit=crop';

    const newProduct: Product = {
      id: `custom-${Date.now()}`,
      name: prodName,
      category: prodCategory,
      price: parseFloat(prodPrice),
      originalPrice: prodOriginalPrice ? parseFloat(prodOriginalPrice) : undefined,
      rating: 4.8,
      reviewsCount: 1,
      image: imageToUse,
      description: prodDesc,
      features: featuresArray,
      stock: parseInt(prodStock) || 10,
      isPromo: !!prodOriginalPrice
    };

    onAddProduct(newProduct);
    setAddProdSuccess(true);

    // Reset Form
    handleClearForm();

    setTimeout(() => setAddProdSuccess(false), 2500);
  };

  const handleClearForm = () => {
    setProdName('');
    setProdCategory('Gadget');
    setProdPrice('');
    setProdOriginalPrice('');
    setProdStock('10');
    setProdImage('');
    setProdDesc('');
    setProdFeatures('');
  };

  const handleSelectPreset = (presetType: string) => {
    switch (presetType) {
      case 'keyboard':
        setProdName('CyberKeyboard RGB Special Edition');
        setProdCategory('Gadget');
        setProdPrice('1450000');
        setProdOriginalPrice('1950000');
        setProdStock('15');
        setProdImage('https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop');
        setProdDesc('Keyboard mekanikal kustom premium dengan switch linear red yang super senyap, struktur aluminium CNC padat, dan pencahayaan RGB sisi ganda.');
        setProdFeatures('Desain Gasket Mount Premium\nSwitch Gateron Red Pre-Lubed\nKeycaps PBT Dye-Sub Premium\nKonektivitas Wireless + Kabel');
        break;
      case 'chatbot':
        setProdName('AI Chatbot SaaS Developer License');
        setProdCategory('Software');
        setProdPrice('299000');
        setProdOriginalPrice('499000');
        setProdStock('99');
        setProdImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop');
        setProdDesc('Akses kode sumber dan lisensi pengembang SaaS AI Chatbot yang terintegrasi dengan Gemini API dan GPT-4. Siap dideploy ke Vercel hanya dengan satu klik.');
        setProdFeatures('Terintegrasi SDK Gemini Teranyar\nKoneksi Database Supabase\nUI Elegan Tailwind CSS\nDokumentasi Lengkap');
        break;
      case 'course':
        setProdName('Mastering React & TypeScript - Zero to Hero');
        setProdCategory('Course');
        setProdPrice('199000');
        setProdOriginalPrice('350000');
        setProdStock('150');
        setProdImage('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop');
        setProdDesc('Belajar React 19, TypeScript, dan Next.js dari awal hingga membangun aplikasi saas komersial siap pakai. Dipandu langsung oleh mentor berpengalaman.');
        setProdFeatures('40+ Jam Video HD Kualitas Tinggi\nAkses Discord Privat Alumni\nSertifikat Digital Resmi\nTugas Review Personal');
        break;
      case 'aksesoris':
        setProdName('Aluminium Ergonomic Laptop Stand X');
        setProdCategory('Aksesoris');
        setProdPrice('150000');
        setProdOriginalPrice('250000');
        setProdStock('20');
        setProdImage('https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop');
        setProdDesc('Stand laptop lipat ergonomis berbahan paduan aluminium tebal dengan bantalan silikon anti slip untuk meredakan nyeri leher Anda selama bekerja.');
        setProdFeatures('Bahan Aluminium Tebal Kokoh\nBantalan Silikon Anti-Slip\n6 Tingkat Ketinggian Adjustable\nDesain Portable Mudah Dilipat');
        break;
      default:
        break;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            id="admin-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
          />

          {/* Panel */}
          <div className="absolute inset-y-0 left-0 flex max-w-full pr-10">
            <motion.div
              id="admin-drawer-panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-lg bg-slate-900 shadow-2xl border-r border-slate-800 text-slate-100 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-emerald-500 animate-spin-slow" />
                  <div>
                    <h2 className="text-lg font-bold text-white leading-tight">Seller Admin Dashboard</h2>
                    <p className="text-[10px] text-slate-400">Kelola Toko & Audit Lead WA</p>
                  </div>
                </div>
                <button
                  id="close-admin-drawer"
                  onClick={onClose}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-800 bg-slate-950 px-2 py-1">
                <button
                  id="tab-admin-leads"
                  onClick={() => setActiveTab('leads')}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition ${
                    activeTab === 'leads' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Lead WA ({leads.length})
                </button>
                <button
                  id="tab-admin-settings"
                  onClick={() => setActiveTab('settings')}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition ${
                    activeTab === 'settings' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Pengaturan WA
                </button>
                <button
                  id="tab-admin-add"
                  onClick={() => setActiveTab('add-product')}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition ${
                    activeTab === 'add-product' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  + Tambah Produk
                </button>
              </div>

              {/* Content Panel */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'leads' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                        <Database className="h-4 w-4 text-emerald-500" />
                        Log Lead WhatsApp Masuk
                      </h3>
                      {leads.length > 0 && (
                        <button
                          id="btn-clear-leads"
                          onClick={onClearLeads}
                          className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition"
                        >
                          <Trash2 className="h-3 w-3" />
                          Hapus Semua
                        </button>
                      )}
                    </div>

                    {leads.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center bg-slate-950/40">
                        <Database className="h-8 w-8 text-slate-600 mx-auto" />
                        <p className="mt-3 text-xs text-slate-400">Belum ada lead transaksi masuk.</p>
                        <p className="mt-1 text-[11px] text-slate-500 leading-relaxed max-w-xs mx-auto">
                          Setiap pesanan yang diajukan oleh pembeli melalui checkout WhatsApp akan tercatat secara otomatis di panel ini untuk kemudahan audit toko Anda.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {leads.map((lead, idx) => (
                          <div
                            key={lead.orderId}
                            id={`lead-record-${lead.orderId}`}
                            className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2.5 relative overflow-hidden"
                          >
                            {/* Accent badge */}
                            <span className="absolute top-0 right-0 rounded-bl-lg bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400">
                              #{lead.orderId}
                            </span>

                            <div className="space-y-0.5">
                              <h4 className="text-xs font-bold text-white">{lead.name}</h4>
                              <p className="text-[10px] text-slate-400">WA: {lead.whatsappNumber}</p>
                              <p className="text-[10px] text-slate-500">{lead.date}</p>
                            </div>

                            <div className="border-t border-slate-800/80 pt-2 text-[11px]">
                              <p className="font-bold text-slate-400 mb-1">Item Pesanan:</p>
                              <ul className="space-y-0.5 list-disc pl-3 text-slate-300">
                                {lead.items.map((item, i) => (
                                  <li key={i}>
                                    {item.productName} ({item.quantity}x)
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="flex justify-between items-center border-t border-slate-800/80 pt-2 text-xs">
                              <span className="text-[11px] text-slate-400">Bayar: {lead.paymentMethod}</span>
                              <span className="font-bold text-emerald-400">{formatPrice(lead.totalPrice)}</span>
                            </div>

                            {lead.notes && (
                              <p className="text-[10px] rounded bg-slate-900 p-1.5 text-slate-400 italic">
                                "{lead.notes}"
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'settings' && (
                  <form id="settings-wa-form" onSubmit={handleSaveSettings} className="space-y-5">
                    <div className="rounded-xl bg-slate-950 p-4 space-y-3 border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <Phone className="h-4 w-4 text-emerald-500" />
                        Target WhatsApp Toko
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Ubah nomor tujuan ini ke nomor WhatsApp pribadi Anda untuk menguji rincian redirect link secara langsung.
                      </p>
                      <input
                        id="config-wa-number"
                        type="text"
                        value={tempWa}
                        onChange={(e) => setTempWa(e.target.value)}
                        placeholder="Contoh: 628123456789"
                        className="w-full rounded-xl bg-slate-900 border border-slate-800 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 text-white"
                      />
                    </div>

                    <button
                      id="btn-save-wa-config"
                      type="submit"
                      className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 font-bold text-white hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/10"
                    >
                      {saveSuccess ? (
                        <>
                          <Check className="h-4.5 w-4.5" />
                          Berhasil Disimpan
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4.5 w-4.5 animate-spin-slow" />
                          Simpan Perubahan
                        </>
                      )}
                    </button>
                  </form>
                )}

                {activeTab === 'add-product' && (
                  <div className="space-y-4">
                    {/* Header & Mode Explanation */}
                    <div className="rounded-xl bg-slate-950 p-4 border border-slate-800/85 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-white">
                          <FolderPlus className="h-4 w-4 text-emerald-500 animate-pulse" />
                          Tambah Produk Baru
                        </span>
                        <button
                          type="button"
                          onClick={handleClearForm}
                          className="text-[10px] font-bold text-red-400 hover:text-red-300 flex items-center gap-1 transition"
                        >
                          <Trash2 className="h-3 w-3" />
                          Bersihkan Form
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Anda bisa <strong className="text-emerald-400">mengisi sendiri</strong> data produk secara custom pada form di bawah, atau klik salah satu <strong className="text-emerald-400">preset cepat</strong> ini untuk pengisian otomatis instan:
                      </p>

                      {/* Presets Grid */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleSelectPreset('keyboard')}
                          className="flex flex-col items-start rounded-lg bg-slate-900 p-2 border border-slate-800 text-left hover:border-emerald-500 hover:bg-slate-900/60 transition-all active:scale-95"
                        >
                          <span className="text-[10px] font-bold text-emerald-400">⌨️ Keyboard RGB</span>
                          <span className="text-[9px] text-slate-500 mt-0.5">Gadget • Rp 1,45 Jt</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectPreset('chatbot')}
                          className="flex flex-col items-start rounded-lg bg-slate-900 p-2 border border-slate-800 text-left hover:border-emerald-500 hover:bg-slate-900/60 transition-all active:scale-95"
                        >
                          <span className="text-[10px] font-bold text-emerald-400">🤖 AI Chatbot SDK</span>
                          <span className="text-[9px] text-slate-500 mt-0.5">Software • Rp 299 Rb</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectPreset('course')}
                          className="flex flex-col items-start rounded-lg bg-slate-900 p-2 border border-slate-800 text-left hover:border-emerald-500 hover:bg-slate-900/60 transition-all active:scale-95"
                        >
                          <span className="text-[10px] font-bold text-emerald-400">🎓 Course React + TS</span>
                          <span className="text-[9px] text-slate-500 mt-0.5">Course • Rp 199 Rb</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectPreset('aksesoris')}
                          className="flex flex-col items-start rounded-lg bg-slate-900 p-2 border border-slate-800 text-left hover:border-emerald-500 hover:bg-slate-900/60 transition-all active:scale-95"
                        >
                          <span className="text-[10px] font-bold text-emerald-400">💻 Stand Laptop Alum</span>
                          <span className="text-[9px] text-slate-500 mt-0.5">Aksesoris • Rp 150 Rb</span>
                        </button>
                      </div>
                    </div>

                    <form id="simulation-add-product-form" onSubmit={handleAddProductSubmit} className="space-y-4 bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                      <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Formulir Pengisian Data</p>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400">Nama Produk *</label>
                          <input
                            id="add-prod-name"
                            type="text"
                            required
                            value={prodName}
                            onChange={(e) => setProdName(e.target.value)}
                            placeholder="e.g. Keyboard LED"
                            className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400">Kategori</label>
                          <select
                            id="add-prod-category"
                            value={prodCategory}
                            onChange={(e) => setProdCategory(e.target.value as any)}
                            className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                          >
                            <option value="Gadget">Gadget</option>
                            <option value="Software">Software</option>
                            <option value="Course">Course</option>
                            <option value="Aksesoris">Aksesoris</option>
                            <option value="Aplikasi">Aplikasi</option>
                            <option value="Undangan Digital">Undangan Digital</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400">Harga Jual (Rp) *</label>
                          <input
                            id="add-prod-price"
                            type="number"
                            required
                            value={prodPrice}
                            onChange={(e) => setProdPrice(e.target.value)}
                            placeholder="450000"
                            className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400">Harga Coret (Opsional)</label>
                          <input
                            id="add-prod-original"
                            type="number"
                            value={prodOriginalPrice}
                            onChange={(e) => setProdOriginalPrice(e.target.value)}
                            placeholder="600000"
                            className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400">Jumlah Stok</label>
                          <input
                            id="add-prod-stock"
                            type="number"
                            value={prodStock}
                            onChange={(e) => setProdStock(e.target.value)}
                            placeholder="10"
                            className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400">URL Gambar Unsplash (Opsional)</label>
                        <input
                          id="add-prod-image"
                          type="url"
                          value={prodImage}
                          onChange={(e) => setProdImage(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400">Deskripsi Singkat *</label>
                        <textarea
                          id="add-prod-desc"
                          required
                          value={prodDesc}
                          onChange={(e) => setProdDesc(e.target.value)}
                          placeholder="Tuliskan spesifikasi umum produk digital di sini..."
                          rows={2}
                          className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400">Fitur Utama (Satu per Baris)</label>
                        <textarea
                          id="add-prod-features"
                          value={prodFeatures}
                          onChange={(e) => setProdFeatures(e.target.value)}
                          placeholder="Garansi Resmi 1 Tahun&#10;Koneksi Bluetooth Lancar&#10;Bonus Case Keren"
                          rows={3}
                          className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                        />
                      </div>

                      {addProdSuccess && (
                        <p className="text-xs text-emerald-400 font-bold">✓ Produk berhasil diinjeksikan ke etalase toko!</p>
                      )}

                      <button
                        id="btn-submit-add-product"
                        type="submit"
                        className="flex w-full h-10 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 font-semibold text-xs text-white hover:bg-emerald-500 transition"
                      >
                        <Plus className="h-4.5 w-4.5" />
                        Injeksi Produk ke Etalase
                      </button>
                    </form>
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
