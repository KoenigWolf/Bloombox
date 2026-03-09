import type * as line from '@line/bot-sdk';

interface OrderNotificationParams {
  orderNumber: string;
  customerName: string;
  totalAmount: number;
  itemCount: number;
}

interface ShippingNotificationParams {
  orderNumber: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery?: string;
}

interface ReminderParams {
  recipientName: string;
  eventName: string;
  daysUntil: number;
}

export function createOrderConfirmationMessage(
  params: OrderNotificationParams
): line.messagingApi.FlexMessage {
  return {
    type: 'flex',
    altText: `ご注文ありがとうございます（注文番号: ${params.orderNumber}）`,
    contents: {
      type: 'bubble',
      hero: {
        type: 'image',
        url: 'https://res.cloudinary.com/bloombox/image/upload/v1/brand/order-confirmation-header.jpg',
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'ご注文ありがとうございます',
            weight: 'bold',
            size: 'lg',
            color: '#1a1a1a',
          },
          {
            type: 'text',
            text: `${params.customerName}様`,
            size: 'sm',
            color: '#666666',
            margin: 'md',
          },
          {
            type: 'separator',
            margin: 'lg',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '注文番号',
                    size: 'sm',
                    color: '#666666',
                    flex: 1,
                  },
                  {
                    type: 'text',
                    text: params.orderNumber,
                    size: 'sm',
                    color: '#1a1a1a',
                    flex: 2,
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                margin: 'md',
                contents: [
                  {
                    type: 'text',
                    text: '商品点数',
                    size: 'sm',
                    color: '#666666',
                    flex: 1,
                  },
                  {
                    type: 'text',
                    text: `${params.itemCount}点`,
                    size: 'sm',
                    color: '#1a1a1a',
                    flex: 2,
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                margin: 'md',
                contents: [
                  {
                    type: 'text',
                    text: '合計',
                    size: 'sm',
                    color: '#666666',
                    flex: 1,
                  },
                  {
                    type: 'text',
                    text: `¥${params.totalAmount.toLocaleString()}`,
                    size: 'lg',
                    color: '#1a1a1a',
                    weight: 'bold',
                    flex: 2,
                    align: 'end',
                  },
                ],
              },
            ],
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'uri',
              label: '注文詳細を見る',
              uri: `https://bloombox.jp/orders/${params.orderNumber}`,
            },
            style: 'primary',
            color: '#10b981',
          },
        ],
      },
    },
  };
}

export function createShippingNotificationMessage(
  params: ShippingNotificationParams
): line.messagingApi.FlexMessage {
  return {
    type: 'flex',
    altText: `商品が発送されました（注文番号: ${params.orderNumber}）`,
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '🚚 商品が発送されました',
            weight: 'bold',
            size: 'lg',
            color: '#1a1a1a',
          },
          {
            type: 'separator',
            margin: 'lg',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '注文番号',
                    size: 'sm',
                    color: '#666666',
                    flex: 1,
                  },
                  {
                    type: 'text',
                    text: params.orderNumber,
                    size: 'sm',
                    color: '#1a1a1a',
                    flex: 2,
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                margin: 'md',
                contents: [
                  {
                    type: 'text',
                    text: '配送業者',
                    size: 'sm',
                    color: '#666666',
                    flex: 1,
                  },
                  {
                    type: 'text',
                    text: params.carrier,
                    size: 'sm',
                    color: '#1a1a1a',
                    flex: 2,
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                margin: 'md',
                contents: [
                  {
                    type: 'text',
                    text: '追跡番号',
                    size: 'sm',
                    color: '#666666',
                    flex: 1,
                  },
                  {
                    type: 'text',
                    text: params.trackingNumber,
                    size: 'sm',
                    color: '#1a1a1a',
                    flex: 2,
                    align: 'end',
                  },
                ],
              },
              ...(params.estimatedDelivery
                ? [
                    {
                      type: 'box' as const,
                      layout: 'horizontal' as const,
                      margin: 'md' as const,
                      contents: [
                        {
                          type: 'text' as const,
                          text: 'お届け予定',
                          size: 'sm' as const,
                          color: '#666666',
                          flex: 1,
                        },
                        {
                          type: 'text' as const,
                          text: params.estimatedDelivery,
                          size: 'sm' as const,
                          color: '#1a1a1a',
                          flex: 2,
                          align: 'end' as const,
                        },
                      ],
                    },
                  ]
                : []),
            ],
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'uri',
              label: '配送状況を確認',
              uri: `https://bloombox.jp/tracking/${params.trackingNumber}`,
            },
            style: 'primary',
            color: '#10b981',
          },
        ],
      },
    },
  };
}

export function createReminderMessage(
  params: ReminderParams
): line.messagingApi.FlexMessage {
  return {
    type: 'flex',
    altText: `${params.eventName}まであと${params.daysUntil}日です`,
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '🌸 大切な日のお知らせ',
            weight: 'bold',
            size: 'lg',
            color: '#1a1a1a',
          },
          {
            type: 'text',
            text: `${params.recipientName}様の${params.eventName}まで`,
            size: 'md',
            color: '#666666',
            margin: 'lg',
            wrap: true,
          },
          {
            type: 'text',
            text: `あと${params.daysUntil}日`,
            size: 'xxl',
            weight: 'bold',
            color: '#10b981',
            margin: 'md',
            align: 'center',
          },
          {
            type: 'text',
            text: '素敵なお花で気持ちを届けませんか？',
            size: 'sm',
            color: '#666666',
            margin: 'lg',
            wrap: true,
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'uri',
              label: '商品を見る',
              uri: 'https://bloombox.jp/products',
            },
            style: 'primary',
            color: '#10b981',
          },
        ],
      },
    },
  };
}
