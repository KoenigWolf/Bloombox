import { NextRequest, NextResponse } from 'next/server';
import * as line from '@line/bot-sdk';
import { LINE_CHANNEL_SECRET, getLineClient } from '@/lib/line';

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature
    const signature = request.headers.get('x-line-signature');
    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 401 }
      );
    }

    const body = await request.text();

    // Verify signature
    const isValid = line.validateSignature(body, LINE_CHANNEL_SECRET, signature);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    const events: line.WebhookEvent[] = JSON.parse(body).events;

    // Process each event
    await Promise.all(events.map(handleEvent));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('LINE webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleEvent(event: line.WebhookEvent): Promise<void> {
  const client = getLineClient();

  switch (event.type) {
    case 'message':
      await handleMessageEvent(event, client);
      break;
    case 'follow':
      await handleFollowEvent(event, client);
      break;
    case 'unfollow':
      await handleUnfollowEvent(event);
      break;
    case 'postback':
      await handlePostbackEvent(event, client);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}

async function handleMessageEvent(
  event: line.MessageEvent,
  client: line.messagingApi.MessagingApiClient
): Promise<void> {
  if (event.message.type !== 'text') {
    return;
  }

  const userId = event.source.userId;
  if (!userId) return;

  const text = event.message.text.toLowerCase();

  // Simple response handlers
  if (text.includes('注文') || text.includes('order')) {
    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: 'text',
          text: 'ご注文の確認は、マイページからご確認いただけます。\nhttps://bloombox.jp/mypage',
        },
      ],
    });
  } else if (text.includes('配送') || text.includes('shipping')) {
    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: 'text',
          text: '配送状況は、注文履歴ページからご確認いただけます。\nhttps://bloombox.jp/orders',
        },
      ],
    });
  } else if (text.includes('help') || text.includes('ヘルプ')) {
    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: 'text',
          text: `Bloomboxへようこそ！🌸\n\n以下のキーワードでお問い合わせいただけます：\n・「注文」- 注文の確認\n・「配送」- 配送状況の確認\n・「商品」- 商品を見る\n\nその他のお問い合わせは、ウェブサイトのお問い合わせフォームをご利用ください。`,
        },
      ],
    });
  } else {
    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: 'text',
          text: 'お問い合わせありがとうございます。\n「ヘルプ」と入力すると、ご利用方法をご案内します。',
        },
      ],
    });
  }
}

async function handleFollowEvent(
  event: line.FollowEvent,
  client: line.messagingApi.MessagingApiClient
): Promise<void> {
  const userId = event.source.userId;
  if (!userId) return;

  // Send welcome message
  await client.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: 'text',
        text: `Bloomboxの公式LINEをお友だち追加いただきありがとうございます！🌸\n\n注文確認、発送通知、大切な日のリマインダーなどをLINEでお届けします。\n\nアカウント連携はこちらから：\nhttps://bloombox.jp/settings/line`,
      },
    ],
  });

  // TODO: Store LINE user ID for future notifications
  // In production, save to database
  console.log(`New follower: ${userId}`);
}

async function handleUnfollowEvent(event: line.UnfollowEvent): Promise<void> {
  const userId = event.source.userId;
  if (!userId) return;

  // TODO: Mark LINE user as unfollowed in database
  console.log(`Unfollowed: ${userId}`);
}

async function handlePostbackEvent(
  event: line.PostbackEvent,
  client: line.messagingApi.MessagingApiClient
): Promise<void> {
  const data = event.postback.data;
  const userId = event.source.userId;
  if (!userId) return;

  // Parse postback data
  const params = new URLSearchParams(data);
  const action = params.get('action');

  switch (action) {
    case 'view_order':
      const orderId = params.get('order_id');
      await client.replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: 'text',
            text: `注文詳細はこちらからご確認ください：\nhttps://bloombox.jp/orders/${orderId}`,
          },
        ],
      });
      break;
    default:
      console.log(`Unknown postback action: ${action}`);
  }
}
