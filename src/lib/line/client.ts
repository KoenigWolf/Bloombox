import * as line from '@line/bot-sdk';

let lineClient: line.messagingApi.MessagingApiClient | null = null;

export function getLineClient(): line.messagingApi.MessagingApiClient {
  if (!lineClient) {
    if (!process.env.LINE_CHANNEL_ACCESS_TOKEN) {
      console.warn('LINE_CHANNEL_ACCESS_TOKEN is not set');
    }
    lineClient = new line.messagingApi.MessagingApiClient({
      channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
    });
  }
  return lineClient;
}

export function getLineWebhookConfig(): line.MiddlewareConfig {
  return {
    channelSecret: process.env.LINE_CHANNEL_SECRET || '',
  };
}

export const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET || '';
