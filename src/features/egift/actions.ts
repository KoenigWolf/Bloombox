'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { EGiftResult, ClaimEGiftInput } from './types';

const ClaimEGiftSchema = z.object({
  token: z.string().min(1),
  recipientName: z.string().min(1, 'お名前を入力してください'),
  shippingAddress: z.object({
    name: z.string().min(1, '宛名を入力してください'),
    postalCode: z.string().regex(/^\d{3}-?\d{4}$/, '正しい郵便番号を入力してください'),
    prefecture: z.string().min(1, '都道府県を選択してください'),
    city: z.string().min(1, '市区町村を入力してください'),
    line1: z.string().min(1, '番地を入力してください'),
    line2: z.string().optional(),
    phone: z.string().regex(/^0\d{9,10}$/, '正しい電話番号を入力してください'),
  }),
});

export async function claimEGiftAction(
  _prevState: EGiftResult | null,
  formData: FormData
): Promise<EGiftResult> {
  const rawData = {
    token: formData.get('token'),
    recipientName: formData.get('recipientName'),
    shippingAddress: {
      name: formData.get('shippingName'),
      postalCode: formData.get('postalCode'),
      prefecture: formData.get('prefecture'),
      city: formData.get('city'),
      line1: formData.get('line1'),
      line2: formData.get('line2') || undefined,
      phone: formData.get('phone'),
    },
  };

  const parsed = ClaimEGiftSchema.safeParse(rawData);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    return { success: false, error: firstError || '入力内容を確認してください' };
  }

  const input: ClaimEGiftInput = parsed.data;

  // In production, update the eGift in Supabase
  // - Update egift_claimed_at
  // - Update shipping address on the order
  // - Send notification to sender

  // Mock success response
  const claimedEGift = {
    id: 'egift-claimed',
    orderId: 'order-1',
    token: input.token,
    senderName: '田中太郎',
    recipientName: input.recipientName,
    message: 'お誕生日おめでとうございます！',
    status: 'claimed' as const,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    claimedAt: new Date().toISOString(),
    shippingAddress: input.shippingAddress,
  };

  revalidatePath('/gift');

  return {
    success: true,
    egift: claimedEGift,
  };
}
