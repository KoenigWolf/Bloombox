import { getResend, EMAIL_FROM } from './client';
import { OrderConfirmationEmail } from './templates/order-confirmation';

interface OrderItem {
  name: string;
  variantName?: string;
  quantity: number;
  price: number;
}

interface SendOrderConfirmationParams {
  to: string;
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    name: string;
    postalCode: string;
    prefecture: string;
    city: string;
    line1: string;
    line2?: string;
  };
  giftMessage?: string;
}

export async function sendOrderConfirmationEmail(
  params: SendOrderConfirmationParams
) {
  try {
    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: params.to,
      subject: `【Bloombox】ご注文ありがとうございます（注文番号: ${params.orderNumber}）`,
      react: OrderConfirmationEmail({
        orderNumber: params.orderNumber,
        customerName: params.customerName,
        items: params.items,
        subtotal: params.subtotal,
        shipping: params.shipping,
        total: params.total,
        shippingAddress: params.shippingAddress,
        giftMessage: params.giftMessage,
      }),
    });

    if (error) {
      console.error('Failed to send order confirmation email:', error);
      return { success: false, error };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return { success: false, error };
  }
}
