import * as React from 'react';

interface OrderItem {
  name: string;
  variantName?: string;
  quantity: number;
  price: number;
}

interface OrderConfirmationEmailProps {
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

export function OrderConfirmationEmail({
  orderNumber,
  customerName,
  items,
  subtotal,
  shipping,
  total,
  shippingAddress,
  giftMessage,
}: OrderConfirmationEmailProps) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount);

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          borderBottom: '1px solid #e5e5e5',
          paddingBottom: '20px',
          marginBottom: '20px',
        }}
      >
        <h1
          style={{
            color: '#4a9c6d',
            fontSize: '28px',
            margin: '0 0 10px 0',
          }}
        >
          Bloombox
        </h1>
        <p style={{ color: '#666', margin: 0 }}>ご注文ありがとうございます</p>
      </div>

      {/* Greeting */}
      <div style={{ marginBottom: '30px' }}>
        <p style={{ fontSize: '16px', color: '#333' }}>
          {customerName} 様
        </p>
        <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
          この度はBloomboxをご利用いただきありがとうございます。
          <br />
          ご注文を承りましたのでお知らせいたします。
        </p>
      </div>

      {/* Order Number */}
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '30px',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: '#666',
          }}
        >
          注文番号
        </p>
        <p
          style={{
            margin: '5px 0 0 0',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          {orderNumber}
        </p>
      </div>

      {/* Order Items */}
      <div style={{ marginBottom: '30px' }}>
        <h2
          style={{
            fontSize: '16px',
            color: '#333',
            borderBottom: '1px solid #e5e5e5',
            paddingBottom: '10px',
          }}
        >
          ご注文内容
        </h2>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
                {item.name}
              </p>
              {item.variantName && (
                <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
                  {item.variantName}
                </p>
              )}
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
                数量: {item.quantity}
              </p>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}

        {/* Totals */}
        <div style={{ marginTop: '15px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '5px 0',
            }}
          >
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>小計</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
              {formatCurrency(subtotal)}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '5px 0',
            }}
          >
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>送料</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>
              {shipping === 0 ? '無料' : formatCurrency(shipping)}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '15px 0 0 0',
              borderTop: '1px solid #e5e5e5',
              marginTop: '10px',
            }}
          >
            <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
              合計
            </p>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#4a9c6d' }}>
              {formatCurrency(total)}
            </p>
          </div>
        </div>
      </div>

      {/* Gift Message */}
      {giftMessage && (
        <div
          style={{
            backgroundColor: '#fff5f5',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '30px',
          }}
        >
          <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>
            メッセージカード
          </p>
          <p style={{ margin: 0, fontSize: '14px', color: '#333', fontStyle: 'italic' }}>
            &ldquo;{giftMessage}&rdquo;
          </p>
        </div>
      )}

      {/* Shipping Address */}
      <div style={{ marginBottom: '30px' }}>
        <h2
          style={{
            fontSize: '16px',
            color: '#333',
            borderBottom: '1px solid #e5e5e5',
            paddingBottom: '10px',
          }}
        >
          お届け先
        </h2>
        <p style={{ fontSize: '14px', color: '#333', lineHeight: '1.8' }}>
          {shippingAddress.name}
          <br />
          〒{shippingAddress.postalCode}
          <br />
          {shippingAddress.prefecture}
          {shippingAddress.city}
          {shippingAddress.line1}
          {shippingAddress.line2 && (
            <>
              <br />
              {shippingAddress.line2}
            </>
          )}
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: '1px solid #e5e5e5',
          paddingTop: '20px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '12px', color: '#999', margin: '0 0 10px 0' }}>
          ご不明な点がございましたら、お気軽にお問い合わせください。
        </p>
        <p style={{ fontSize: '12px', color: '#999', margin: 0 }}>
          © {new Date().getFullYear()} Bloombox. All rights reserved.
        </p>
      </div>
    </div>
  );
}
