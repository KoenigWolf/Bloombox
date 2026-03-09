import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe/client';
import { sendOrderConfirmationEmail } from '@/lib/resend';

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header or webhook secret' },
      { status: 400 }
    );
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSucceeded(paymentIntent);
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailed(paymentIntent);
        break;
      }
      default:
        // Unhandled event types are ignored
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const stripe = getStripe();
  // Checkout session completed - retrieve full session with shipping details
  const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ['shipping_details'],
  });

  // ギフトオプションを取得
  const giftOptions = fullSession.metadata?.giftOptions
    ? JSON.parse(fullSession.metadata.giftOptions)
    : null;

  // 顧客情報
  const customerEmail = fullSession.customer_details?.email;
  const customerName = fullSession.customer_details?.name || 'お客様';
  const collectedShipping = fullSession.collected_information?.shipping_details;

  // 注文番号を生成
  const orderNumber = `BB-${Date.now().toString(36).toUpperCase()}`;

  // line_items を取得
  const lineItems = await getStripe().checkout.sessions.listLineItems(session.id);
  const items = lineItems.data.map((item) => ({
    name: item.description || 'Product',
    quantity: item.quantity || 1,
    price: (item.amount_total || 0) / (item.quantity || 1),
  }));

  // 注文確認メールを送信
  if (customerEmail && collectedShipping?.address) {
    const address = collectedShipping.address;
    await sendOrderConfirmationEmail({
      to: customerEmail,
      orderNumber,
      customerName,
      items,
      subtotal: fullSession.amount_subtotal || 0,
      shipping: fullSession.shipping_cost?.amount_total || 0,
      total: fullSession.amount_total || 0,
      shippingAddress: {
        name: collectedShipping.name || customerName,
        postalCode: address.postal_code || '',
        prefecture: address.state || '',
        city: address.city || '',
        line1: address.line1 || '',
        line2: address.line2 || undefined,
      },
      giftMessage: giftOptions?.message,
    });
  }

  // TODO: Supabaseに注文を保存
}

async function handlePaymentSucceeded(_paymentIntent: Stripe.PaymentIntent) {
  // 支払い成功時の処理
}

async function handlePaymentFailed(_paymentIntent: Stripe.PaymentIntent) {
  // 支払い失敗時の処理（メール通知など）
}
