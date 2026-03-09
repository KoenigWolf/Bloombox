import type { EGift, EGiftWithOrder } from './types';

// Mock data for development
const mockEGifts: EGift[] = [
  {
    id: 'egift-1',
    orderId: 'order-1',
    token: 'ABC123XYZ789TOKEN001',
    senderName: '田中太郎',
    recipientName: null,
    message: 'お誕生日おめでとうございます！いつもありがとう。',
    status: 'pending',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    claimedAt: null,
    shippingAddress: null,
  },
  {
    id: 'egift-2',
    orderId: 'order-2',
    token: 'DEF456ABC123TOKEN002',
    senderName: '佐藤花子',
    recipientName: '山田一郎',
    message: 'いつもお世話になっております。',
    status: 'claimed',
    expiresAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    claimedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    shippingAddress: {
      name: '山田一郎',
      postalCode: '100-0001',
      prefecture: '東京都',
      city: '千代田区',
      line1: '1-1-1 千代田',
      phone: '03-1234-5678',
    },
  },
];

export async function getEGiftByToken(token: string): Promise<EGift | null> {
  // In production, fetch from Supabase
  return mockEGifts.find((g) => g.token === token) || null;
}

export async function getEGiftWithOrder(token: string): Promise<EGiftWithOrder | null> {
  const egift = await getEGiftByToken(token);
  if (!egift) return null;

  // In production, fetch the actual order from Supabase
  const mockOrder = {
    id: egift.orderId,
    order_number: `BB-2024-${egift.orderId.split('-')[1]?.padStart(4, '0') || '0001'}`,
    customer_id: 'customer-1',
    florist_id: 'florist-1',
    status: 'pending' as const,
    payment_method: 'card' as const,
    stripe_payment_intent_id: null,
    stripe_checkout_session_id: null,
    subtotal: 5500,
    shipping_cost: 800,
    tax_amount: 630,
    discount_amount: 0,
    total_amount: 6930,
    currency: 'jpy',
    is_gift: true,
    gift_message: egift.message,
    gift_wrapping: 'standard',
    noshi_type: null,
    noshi_name: null,
    is_egift: true,
    egift_url_token: egift.token,
    egift_claimed_at: egift.claimedAt,
    shipping_name: egift.shippingAddress?.name || '',
    shipping_postal_code: egift.shippingAddress?.postalCode || '',
    shipping_prefecture: egift.shippingAddress?.prefecture || '',
    shipping_city: egift.shippingAddress?.city || '',
    shipping_line1: egift.shippingAddress?.line1 || '',
    shipping_line2: egift.shippingAddress?.line2 || null,
    shipping_phone: egift.shippingAddress?.phone || '',
    requested_delivery_date: null,
    actual_delivery_date: null,
    tracking_number: null,
    carrier: null,
    total_rescued_flower_count: 0,
    carbon_offset_kg: 0,
    miles_earned: 0,
    miles_used: 0,
    notes: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return {
    ...egift,
    order: mockOrder,
  };
}

export async function getSentEGifts(_userId: string): Promise<EGift[]> {
  // In production, fetch from Supabase
  return mockEGifts;
}
