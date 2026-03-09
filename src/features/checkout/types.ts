import type { CartItem, GiftOptions } from '@/features/cart/types';

export interface CheckoutSession {
  id: string;
  url: string;
}

export interface CreateCheckoutSessionInput {
  items: CartItem[];
  giftOptions?: GiftOptions;
  locale: string;
  successUrl: string;
  cancelUrl: string;
}

export interface ShippingAddress {
  name: string;
  postalCode: string;
  prefecture: string;
  city: string;
  line1: string;
  line2?: string;
  phone: string;
}

export interface OrderStatus {
  status:
    | 'pending'
    | 'paid'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';
  label: string;
}
