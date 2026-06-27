export interface Product {
  id: string;
  name: string;
  category: 'Gadget' | 'Software' | 'Course' | 'Aksesoris' | 'Aplikasi' | 'Undangan Digital';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  features: string[];
  stock: number;
  isPromo?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface LeadData {
  orderId: string;
  name: string;
  whatsappNumber: string;
  emailOrAddress: string;
  notes: string;
  paymentMethod: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  productName: string;
}
