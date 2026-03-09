import { getLineClient } from './client';
import {
  createOrderConfirmationMessage,
  createShippingNotificationMessage,
  createReminderMessage,
} from './messages';

interface SendResult {
  success: boolean;
  error?: string;
}

export async function sendOrderConfirmation(
  lineUserId: string,
  orderNumber: string,
  customerName: string,
  totalAmount: number,
  itemCount: number
): Promise<SendResult> {
  try {
    const client = getLineClient();
    const message = createOrderConfirmationMessage({
      orderNumber,
      customerName,
      totalAmount,
      itemCount,
    });

    await client.pushMessage({
      to: lineUserId,
      messages: [message],
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send LINE order confirmation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function sendShippingNotification(
  lineUserId: string,
  orderNumber: string,
  trackingNumber: string,
  carrier: string,
  estimatedDelivery?: string
): Promise<SendResult> {
  try {
    const client = getLineClient();
    const message = createShippingNotificationMessage({
      orderNumber,
      trackingNumber,
      carrier,
      estimatedDelivery,
    });

    await client.pushMessage({
      to: lineUserId,
      messages: [message],
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send LINE shipping notification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function sendReminder(
  lineUserId: string,
  recipientName: string,
  eventName: string,
  daysUntil: number
): Promise<SendResult> {
  try {
    const client = getLineClient();
    const message = createReminderMessage({
      recipientName,
      eventName,
      daysUntil,
    });

    await client.pushMessage({
      to: lineUserId,
      messages: [message],
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send LINE reminder:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function sendTextMessage(
  lineUserId: string,
  text: string
): Promise<SendResult> {
  try {
    const client = getLineClient();

    await client.pushMessage({
      to: lineUserId,
      messages: [
        {
          type: 'text',
          text,
        },
      ],
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to send LINE text message:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
