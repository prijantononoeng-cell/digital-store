import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, User, Phone, MapPin, CreditCard, MessageSquare, ShieldCheck } from 'lucide-react';
import { Product, CartItem, LeadData } from '../types';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutItems: { product: Product; quantity: number }[];
  targetWhatsappNumber: string; // Dynamic target number from admin settings!
  onSubmitLead: (lead: LeadData) => void;
}

export default function LeadFormModal({
  isOpen,
  onClose,
  checkoutItems,
  targetWhatsappNumber,
  onSubmitLead
}: LeadFormModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS (Gopay/OVO/Dana)');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const totalPrice = checkoutItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!name.trim()) tempErrors.name = 'Nama lengkap wajib diisi';
    if (!phone.trim()) {
      tempErrors.phone = 'Nomor WhatsApp wajib diisi';
    } else if (!/^\+?[0-9]{9,15}$/.test(phone.trim().replace(/[\s-]/g, ''))) {
      tempErrors.phone = 'Format nomor WhatsApp tidak valid (contoh: 08123456789)';
    }
    if (!address.trim()) tempErrors.address = 'Email atau Alamat Pengiriman wajib diisi';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate randomized order ID
    const orderId = `TDG-${Math.floor(10000 + Math.random() * 90000)}`;

    const lead: LeadData = {
      orderId,
      name: name.trim(),
      whatsappNumber: phone.trim(),
      emailOrAddress: address.trim(),
      notes: notes.trim(),
      paymentMethod,
      items: checkoutItems.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      })),
      totalPrice,
      date: new Date().toLocaleString('id-ID')
    };

    // Trigger local state submission (saves in dashboard leads audit)
    onSubmitLead(lead);

    // Build the beautiful Whatsapp Message template
    let messageText = `*📋 PESANAN BARU - TOKO DIGITAL*\n`;
    messageText += `-----------------------------------------------\n`;
    messageText += `*ID Pesanan:* #${lead.orderId}\n`;
    messageText += `*Tanggal:* ${lead.date}\n\n`;

    messageText += `*👤 DATA PELANGGAN:*\n`;
    messageText += `▪️ *Nama:* ${lead.name}\n`;
    messageText += `▪️ *No. WA:* ${lead.whatsappNumber}\n`;
    messageText += `▪️ *Email/Alamat:* ${lead.emailOrAddress}\n\n`;

    messageText += `*🛍️ RINCIAN PRODUK:*\n`;
    checkoutItems.forEach((item, index) => {
      messageText += `${index + 1}. *${item.product.name}*\n`;
      messageText += `   _${item.quantity} x ${formatPrice(item.product.price)}_\n`;
    });
    messageText += `\n💵 *TOTAL HARGA:* *${formatPrice(lead.totalPrice)}*\n`;
    messageText += `💳 *Pembayaran:* ${lead.paymentMethod}\n`;

    if (lead.notes) {
      messageText += `\n*💬 Catatan Tambahan:* "${lead.notes}"\n`;
    }

    messageText += `-----------------------------------------------\n`;
    messageText += `_Terima kasih! Mohon segera konfirmasi rincian pesanan saya serta nomor rekening pembayaran._ 🙏✨`;

    // Format target phone number. Clean up spaces or dashes.
    // Indonesian standard: convert 08 to 62, etc.
    let cleanTarget = targetWhatsappNumber.replace(/[^0-9]/g, '');
    if (cleanTarget.startsWith('0')) {
      cleanTarget = '62' + cleanTarget.slice(1);
    }

    // Generate WhatsApp Web / App url
    const waUrl = `https://wa.me/${cleanTarget}?text=${encodeURIComponent(messageText)}`;

    // Open WhatsApp in a safe manner
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Close Modal
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          id="lead-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Form Container */}
        <motion.div
          id="lead-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 dark:bg-slate-900"
        >
          {/* Close button */}
          <button
            id="close-lead-modal"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-red-500 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-red-500 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="bg-emerald-600 px-6 py-6 text-white dark:bg-emerald-700">
            <h3 className="text-xl font-bold">Checkout Lead WhatsApp</h3>
            <p className="text-emerald-100 text-xs mt-1">
              Mohon isi formulir di bawah ini dengan lengkap untuk diarahkan ke nomor WhatsApp kami dan memproses transaksi.
            </p>
          </div>

          {/* Form */}
          <form id="lead-checkout-form" onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Order Review List */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/20">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Tinjau Pesanan Anda:</span>
              <div className="mt-2 space-y-1">
                {checkoutItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className="line-clamp-1">{item.product.name} (x{item.quantity})</span>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 border-t border-slate-100 pt-3 flex justify-between text-sm font-bold text-slate-900 dark:border-slate-800/80 dark:text-white">
                <span>Total Bayar:</span>
                <span className="text-emerald-600 dark:text-emerald-400">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Input Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                id="input-lead-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Andi Wijaya"
                className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition dark:bg-slate-800 dark:text-white ${
                  errors.name ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500 dark:border-slate-700'
                }`}
              />
              {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
            </div>

            {/* Input WhatsApp Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                No. WhatsApp Aktif <span className="text-red-500">*</span>
              </label>
              <input
                id="input-lead-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: 081234567890"
                className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition dark:bg-slate-800 dark:text-white ${
                  errors.phone ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500 dark:border-slate-700'
                }`}
              />
              {errors.phone && <p className="text-[11px] text-red-500">{errors.phone}</p>}
            </div>

            {/* Input Email / Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Email atau Alamat Pengiriman Lengkap <span className="text-red-500">*</span>
              </label>
              <textarea
                id="input-lead-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Contoh: Jl. Merdeka No. 123, Jakarta SelatanATAU andi@email.com untuk Produk Digital"
                rows={2}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition dark:bg-slate-800 dark:text-white ${
                  errors.address ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-emerald-500 dark:border-slate-700'
                }`}
              />
              {errors.address && <p className="text-[11px] text-red-500">{errors.address}</p>}
            </div>

            {/* Select Payment Method */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <CreditCard className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Metode Pembayaran Pilihan
              </label>
              <select
                id="input-lead-payment"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="QRIS (Gopay/OVO/Dana/LinkAja)">QRIS (Gopay/OVO/Dana/LinkAja)</option>
                <option value="Transfer Bank BCA">Transfer Bank BCA</option>
                <option value="Transfer Bank Mandiri">Transfer Bank Mandiri</option>
                <option value="Transfer Bank BNI">Transfer Bank BNI</option>
                <option value="ShopeePay / SpayLater">ShopeePay / SpayLater</option>
              </select>
            </div>

            {/* Input Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                id="input-lead-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Warna keyboard putih, atau kirim akses course secepatnya."
                rows={2}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Secure notification */}
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 dark:bg-slate-800/40">
              <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-emerald-600" />
              <span>Data Anda aman. Kami hanya menggunakannya untuk memproses order dan berkomunikasi via WhatsApp resmi toko kami.</span>
            </div>

            {/* Submit Button */}
            <button
              id="btn-submit-lead-form"
              type="submit"
              className="flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
            >
              <Send className="h-4.5 w-4.5" />
              Kirim & Lanjutkan ke WhatsApp
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
