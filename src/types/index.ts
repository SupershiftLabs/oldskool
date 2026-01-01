export interface Tour {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  duration: string;
  price: number;
  max_guests: number;
  image_url: string;
  category: 'signature' | 'custom' | 'transfer' | 'party';
  highlights: string[];
  includes: string[];
  is_active: boolean;
  created_at: string;
}

export interface MerchProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: 'tshirt' | 'cap' | 'hoodie' | 'sticker' | 'limited';
  image_url: string;
  sizes: string[] | null;
  colors: string[] | null;
  stock: number;
  stripe_price_id: string | null;
  stripe_payment_link: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone: string;
  created_at: string;
}

export interface Booking {
  id: string;
  customer_id: string;
  tour_id: string;
  booking_date: string;
  booking_time: string;
  guests: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  stripe_session_id: string | null;
  stripe_payment_intent: string | null;
  notes: string | null;
  created_at: string;
  tour?: Tour;
  customer?: Customer;
}

export interface Ticket {
  id: string;
  booking_id: string;
  qr_code: string;
  guest_name: string;
  status: 'valid' | 'used' | 'expired' | 'cancelled';
  scanned_at: string | null;
  created_at: string;
  booking?: Booking;
}

export interface MerchOrder {
  id: string;
  customer_id: string;
  items: CartItem[];
  total_amount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: ShippingAddress | null;
  stripe_session_id: string | null;
  stripe_payment_intent: string | null;
  order_type: 'online' | 'onboard';
  created_at: string;
}

export interface CartItem {
  product: MerchProduct;
  quantity: number;
  size?: string;
  color?: string;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}
