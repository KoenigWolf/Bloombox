'use server';

import { getStripe } from '@/lib/stripe/client';
import type { CreateCheckoutSessionInput, CheckoutSession } from './types';
import type { Locale } from '@/i18n/config';

const CURRENCY_MAP: Record<Locale, string> = {
  ja: 'jpy',
  en: 'usd',
  zh: 'cny',
  vi: 'vnd',
};

export async function createCheckoutSessionAction(
  input: CreateCheckoutSessionInput
): Promise<{ success: true; session: CheckoutSession } | { success: false; error: string }> {
  try {
    const stripe = getStripe();
    const locale = input.locale as Locale;
    const currency = CURRENCY_MAP[locale] || 'jpy';

    const lineItems = input.items.map((item) => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
          description: item.variantName || undefined,
          images: item.imageUrl ? [item.imageUrl] : [],
        },
        unit_amount: currency === 'jpy' ? item.price : Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      locale: locale === 'ja' ? 'ja' : locale === 'zh' ? 'zh' : locale === 'vi' ? 'vi' : 'en',
      shipping_address_collection: {
        allowed_countries: ['JP'],
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        giftOptions: input.giftOptions ? JSON.stringify(input.giftOptions) : '',
      },
    });

    if (!session.url) {
      return { success: false, error: 'Failed to create checkout session' };
    }

    return {
      success: true,
      session: {
        id: session.id,
        url: session.url,
      },
    };
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
