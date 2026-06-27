import { Product, FAQItem, Testimonial } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'CyberBoard Mechanical Keyboard Wireless V1',
    category: 'Gadget',
    price: 1850000,
    originalPrice: 2200000,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop',
    description: 'Keyboard mekanikal wireless premium dengan tata letak 75%, hot-swappable switches, dan pencahayaan RGB dinamis yang dapat disesuaikan. Dilengkapi pelat peredam suara ganda untuk menghasilkan suara ketikan yang memuaskan dan koneksi tri-mode (2.4G, Bluetooth, USB-C).',
    features: [
      'Koneksi Tri-Mode (Wireless 2.4G, Bluetooth 5.0, Kabel USB-C)',
      'Hot-swappable 3/5-pin Gateron Yellow Switches pre-lubed',
      'Desain Gasket Mount untuk kenyamanan mengetik maksimal',
      'Baterai 4000mAh tahan hingga 200 jam tanpa RGB',
      'Keycaps PBT Double-shot Cherry Profile premium'
    ],
    stock: 12,
    isPromo: true
  },
  {
    id: 'p2',
    name: 'SaaS Builder Kit - React & Tailwind Template',
    category: 'Software',
    price: 499000,
    originalPrice: 750000,
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&auto=format&fit=crop',
    description: 'Template SaaS siap pakai yang dibangun di atas React, Next.js, dan Tailwind CSS. Sudah termasuk integrasi autentikasi, database schema (Prisma), stripe subscription (simulasi), dashboard admin, serta 15+ komponen UI modern yang siap dideploy.',
    features: [
      'Dibangun dengan Next.js 14 App Router & TypeScript',
      'Desain responsif premium dengan Tailwind CSS',
      'Komponen UI lengkap (Sidebar, Navbar, Tables, Charts, Modals)',
      'Dokumentasi instalasi super lengkap & mudah dipahami',
      'Dukungan update gratis selamanya'
    ],
    stock: 99,
    isPromo: true
  },
  {
    id: 'p3',
    name: 'AeroSound Pro TWS Active Noise Cancelling',
    category: 'Gadget',
    price: 899000,
    originalPrice: 1299000,
    rating: 4.7,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop',
    description: 'Earbuds nirkabel premium dengan fitur Active Noise Cancelling (ANC) hingga 40dB untuk meredam kebisingan luar dengan sempurna. Menggunakan driver dinamis 12mm yang memberikan bass mendalam dan treble sejernih kristal.',
    features: [
      'Active Noise Cancellation (ANC) & Ambient Mode',
      'Dual mic dengan algoritma AI ENC untuk telepon jernih',
      'Sertifikasi IPX5 Tahan Percikan Air & Keringat',
      'Bluetooth 5.3 dengan latensi ultra rendah (45ms)',
      'Total daya tahan baterai hingga 32 jam dengan charging case'
    ],
    stock: 8,
    isPromo: false
  },
  {
    id: 'p4',
    name: 'Mastering UI/UX Design System - Video Course',
    category: 'Course',
    price: 349000,
    originalPrice: 650000,
    rating: 4.9,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=600&auto=format&fit=crop',
    description: 'Kelas online terlengkap untuk mempelajari cara membangun Design System berskala besar di Figma. Anda akan belajar dari dasar variabel figma, auto-layout, komponen dinamis, interaktivitas, hingga serah terima aset ke developer.',
    features: [
      '25+ video materi HD kualitas premium (Akses Selamanya)',
      'File Figma latihan yang siap digunakan (Starter & Final)',
      'Grup diskusi privat khusus alumni via Discord',
      'Sertifikat kelulusan resmi berstandar industri',
      'Tugas langsung yang direview secara personal oleh mentor'
    ],
    stock: 150,
    isPromo: true
  },
  {
    id: 'p5',
    name: 'VeloWatch Smartwatch Active GPS 3',
    category: 'Gadget',
    price: 1350000,
    originalPrice: 1600000,
    rating: 4.6,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop',
    description: 'Smartwatch fitness andalan dengan layar AMOLED 1.43 inci, GPS internal, pelacak detak jantung 24/7, SpO2 sensor, dan 100+ mode olahraga terintegrasi. Desain tangguh, bodi aluminium ringan, dan strap silikon yang sangat nyaman.',
    features: [
      'Layar AMOLED Always-On beresolusi tinggi 466x466 px',
      'Sistem GPS internal independen untuk pelacakan rute lari',
      'Tahan air standar 5 ATM (bisa digunakan untuk berenang)',
      'Fitur pemantauan tidur komprehensif dengan skor harian',
      'Daya tahan baterai hingga 14 hari dalam pemakaian normal'
    ],
    stock: 5,
    isPromo: false
  },
  {
    id: 'p6',
    name: 'CyberGuard Premium VPN - 1 Year Subscription',
    category: 'Software',
    price: 199000,
    originalPrice: 450000,
    rating: 4.8,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop',
    description: 'Lisensi VPN premium selama 1 tahun untuk melindungi aktivitas online Anda dengan enkripsi kelas militer AES-256. Akses 3000+ server ultra cepat di seluruh dunia tanpa batasan bandwidth dan lewati pemblokiran konten geografis dengan mudah.',
    features: [
      'Enkripsi AES-256 bit ganda tingkat militer',
      'Akses server tanpa batas di 65+ negara di dunia',
      'Fitur Kill Switch otomatis & kebijakan No-Logs ketat',
      'Bisa digunakan hingga 5 perangkat secara bersamaan',
      'Dukungan teknis live chat 24/7'
    ],
    stock: 200,
    isPromo: false
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'Bagaimana cara melakukan pembelian di Toko Digital?',
    answer: 'Sangat mudah! Pilih produk yang Anda inginkan, tambahkan ke keranjang, lalu klik "Checkout". Isi formulir pemesanan dengan lengkap, kemudian klik "Lanjutkan ke WhatsApp". Anda akan diarahkan langsung ke WhatsApp admin kami dengan pesan pemesanan yang sudah terformat otomatis.'
  },
  {
    question: 'Berapa lama proses pengiriman produk digital?',
    answer: 'Untuk produk berlabel "Software" atau "Course", detail akses atau lisensi akan dikirimkan langsung ke Email atau WhatsApp Anda oleh admin maksimal dalam waktu 5-15 menit setelah pembayaran Anda terverifikasi.'
  },
  {
    question: 'Apakah produk fisik dikirim secara aman?',
    answer: 'Ya, tentu saja! Semua produk fisik (seperti keyboard, earbuds, smartwatch) dikemas dengan standar ekstra aman menggunakan bubble wrap tebal dan kardus pelindung tambahan secara gratis.'
  },
  {
    question: 'Metode pembayaran apa saja yang didukung?',
    answer: 'Kami menerima berbagai metode pembayaran populer seperti Transfer Bank (BCA, Mandiri, BNI), QRIS (Gopay, OVO, Dana, LinkAja), serta ShopeePay.'
  },
  {
    question: 'Apakah ada garansi untuk produk yang dibeli?',
    answer: 'Tentu. Semua produk fisik memiliki garansi resmi toko selama 1-12 bulan (tergantung produk). Sedangkan untuk produk software, kami menjamin lisensi aktif penuh sesuai periode langganan Anda.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Andi Wijaya',
    role: 'Software Developer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
    comment: 'Sangat puas belanja keyboard mekanikal di sini! Pelayanannya ramah banget, begitu isi form checkout, langsung lanjut WA dan dibalas admin dalam hitungan menit. Keyboard-nya original dan empuk banget.',
    rating: 5,
    productName: 'CyberBoard Mechanical Keyboard Wireless V1'
  },
  {
    id: 't2',
    name: 'Siti Rahmawati',
    role: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    comment: 'Video course tentang Figma Design System-nya luar biasa berkualitas. Penjelasannya runut, materi up-to-date, dan mentornya aktif menjawab pertanyaan di Discord. Terima kasih Toko Digital!',
    rating: 5,
    productName: 'Mastering UI/UX Design System - Video Course'
  },
  {
    id: 't3',
    name: 'Budi Santoso',
    role: 'Tech Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop',
    comment: 'VeloWatch smart watch-nya keren abis! Layar AMOLED-nya cerah banget walaupun di bawah sinar matahari. GPS-nya juga akurat pas dipakai jogging pagi. Rekomendasi beli di sini!',
    rating: 4,
    productName: 'VeloWatch Smartwatch Active GPS 3'
  }
];
