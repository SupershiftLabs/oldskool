import { supabase } from './supabase';
import { CartItem } from '@/types';

interface BookingCheckoutParams {
  tourId: string;
  tourName: string;
  pricePerPerson: number;
  guests: number;
  date: string;
  time: string;
  name: string;
  email: string;
  phone?: string;
}

interface MerchCheckoutParams {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
    imageUrl?: string;
  }[];
}

export async function createBookingCheckout(params: BookingCheckoutParams) {
  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: {
      type: 'booking',
      booking: params,
      successUrl: `${window.location.origin}/?booking=success`,
      cancelUrl: `${window.location.origin}/?booking=cancelled`,
    },
  });

  if (error) throw error;
  return data;
}

export async function createMerchCheckout(params: MerchCheckoutParams) {
  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: {
      type: 'merch',
      items: params.items,
      successUrl: `${window.location.origin}/?order=success`,
      cancelUrl: `${window.location.origin}/?order=cancelled`,
    },
  });

  if (error) throw error;
  return data;
}

export function cartToCheckoutItems(cart: CartItem[]) {
  return cart.map(item => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
    imageUrl: item.product.image_url,
  }));
}
