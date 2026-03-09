import type { Order } from '@/lib/supabase/types';

export interface EGift {
  id: string;
  orderId: string;
  token: string;
  senderName: string;
  recipientName: string | null;
  message: string | null;
  status: EGiftStatus;
  expiresAt: string;
  claimedAt: string | null;
  shippingAddress: ShippingAddress | null;
}

export type EGiftStatus = 'pending' | 'claimed' | 'shipped' | 'delivered' | 'expired';

export interface ShippingAddress {
  name: string;
  postalCode: string;
  prefecture: string;
  city: string;
  line1: string;
  line2?: string;
  phone: string;
}

export interface EGiftWithOrder extends EGift {
  order: Order;
}

export interface ClaimEGiftInput {
  token: string;
  recipientName: string;
  shippingAddress: ShippingAddress;
}

export interface CreateEGiftInput {
  orderId: string;
  senderName: string;
  recipientName?: string;
  message?: string;
}

export interface EGiftResult {
  success: boolean;
  error?: string;
  egift?: EGift;
}

// Generate a unique token for the eGift URL
export function generateEGiftToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 24; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Check if the eGift is still valid (not expired)
export function isEGiftValid(egift: EGift): boolean {
  if (egift.status === 'expired') return false;
  if (egift.status === 'claimed' || egift.status === 'shipped' || egift.status === 'delivered') {
    return true; // Already claimed, so it's "valid" in terms of process
  }
  return new Date(egift.expiresAt) > new Date();
}

// Get the eGift claim URL
export function getEGiftClaimUrl(token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bloombox.jp';
  return `${baseUrl}/gift/${token}`;
}
