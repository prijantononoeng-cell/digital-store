import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, AlertCircle } from 'lucide-react';

interface FloatingWAProps {
  targetWhatsappNumber: string;
}

export default function FloatingWA({ targetWhatsappNumber }: FloatingWAProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const cleanNumber = (num: string) => {
    let clean = num.replace(/[^0-9]/g, '');
    if (clean.startsWith('0')) {
      clean = '62' + clean.slice(1);
    }
    return clean;
  };

  const handleOpenWA = (text: string) => {
    const formattedNumber = cleanNumber(targetWhatsappNumber);
    const url = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const quickTopics = [
    {
      label: 'Tanya Stok & Spesifikasi',
      message: 'Halo Admin Toko Digital, saya ingin bertanya mengenai ketersediaan stok produk terlaris hari ini. Apakah semuanya ready?'
    },
    {
      label: 'Bantuan Cara Belanja',
      message: 'Halo Admin, saya butuh panduan singkat bagaimana cara melakukan checkout dan menyelesaikan pembayaran di Toko Digital.'
    },
    {
      label: 'Konsultasi Gadget/Software',
      message: 'Halo Admin, saya mau konsultasi gratis dong untuk memilih produk digital yang paling cocok dengan kebutuhan produktivitas saya.'
    },
    {
      label: 'Klaim Promo Spesial',
      message: 'Halo Admin Toko Digital, apakah hari ini ada kode kupon diskon atau promo potongan ongkir yang bisa saya gunakan?'
    }
  ];

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    handleOpenWA(customMsg);
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Interactive Chat Bubble popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="wa-chat-bubble"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            className="mb-4 w-[330px] sm:w-[360px] overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100 dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Header */}
            <div className="bg-emerald-600 p-4 text-white dark:bg-emerald-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
                    alt="Customer Service Agent"
                    className="h-10 w-10 rounded-full object-cover border-2 border-emerald-400"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-slate-900 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-tight">Sarah - Toko Digital</h4>
                  <p className="text-[10px] text-emerald-100">Aktif • Membalas dalam 5 menit</p>
                </div>
              </div>
              <button
                id="btn-close-wa-chat"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-emerald-100 hover:bg-emerald-500 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto bg-slate-50 dark:bg-slate-900/40">
              {/* Agent Greeting Bubble */}
              <div className="flex gap-2.5">
                <div className="rounded-2xl rounded-tl-none bg-white p-3 text-xs text-slate-700 shadow-xs dark:bg-slate-800 dark:text-slate-300 leading-relaxed max-w-[85%]">
                  Halo! Selamat datang di <b>Toko Digital</b>. 👋
                  <br /><br />
                  Ada yang bisa kami bantu hari ini? Silakan klik salah satu topik bantuan cepat di bawah ini atau ketik pesan khusus Anda langsung di form chat.
                </div>
              </div>

              {/* Quick Topics */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Pilih Bantuan Cepat:</p>
                <div className="grid grid-cols-1 gap-1.5">
                  {quickTopics.map((topic, idx) => (
                    <button
                      key={idx}
                      id={`btn-wa-topic-${idx}`}
                      onClick={() => {
                        handleOpenWA(topic.message);
                        setIsOpen(false);
                      }}
                      className="flex items-center text-left rounded-lg border border-slate-100 bg-white px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 hover:border-emerald-200 dark:border-slate-800 dark:bg-slate-800 dark:text-emerald-300 dark:hover:bg-emerald-950/20"
                    >
                      {topic.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Input Form footer */}
            <form id="wa-custom-msg-form" onSubmit={handleSendCustom} className="border-t border-slate-100 p-3 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
              <input
                id="input-wa-custom-msg"
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Tulis pesan Anda..."
                className="flex-1 rounded-xl border border-slate-100 px-3.5 py-2 text-xs outline-none focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
              <button
                id="btn-send-wa-custom"
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white transition hover:bg-emerald-500"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <motion.button
        id="btn-floating-wa-widget"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 transition hover:bg-emerald-400 focus:outline-none"
        title="Hubungi Kami"
      >
        <MessageSquare className="h-7 w-7" />
        {/* Subtle Online Dot */}
        <span className="absolute top-0 right-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-md border border-white">
          1
        </span>
      </motion.button>
    </div>
  );
}
