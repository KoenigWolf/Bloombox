'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Loader2 } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/features/cart/hooks/use-cart';
import { createCheckoutSessionAction } from '@/features/checkout/actions';
import { formatCurrency } from '@/lib/utils/format';
import type { Locale } from '@/i18n/config';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const { items, subtotal, isEmpty, giftOptions } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (isEmpty) {
      router.push('/cart');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = window.location.origin;
      const result = await createCheckoutSessionAction({
        items,
        giftOptions,
        locale,
        successUrl: `${baseUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${baseUrl}/${locale}/checkout/cancel`,
      });

      if (result.success) {
        // Stripe Checkoutにリダイレクト
        window.location.href = result.session.url;
      } else {
        setError(result.error);
      }
    } catch {
      setError('チェックアウトに失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmpty) {
    return (
      <section className="py-12">
        <Container>
          <Card className="p-12 text-center max-w-2xl mx-auto shadow-md">
            <h2 className="text-3xl font-serif font-medium mb-4">カートが空です 🛒</h2>
            <p className="text-neutral-600 mb-8">お探しの商品を見つけましょう。</p>
            <Button size="lg" onClick={() => router.push('/products')}>
              商品を探す
            </Button>
          </Card>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12">
      <Container>
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-8 text-foreground tracking-tight">{t('title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 注文内容 */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-serif font-medium mb-4">{t('order_summary')}</h2>
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="py-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-serif font-medium text-lg">{item.name}</p>
                      {item.variantName && (
                        <p className="text-sm font-medium text-neutral-600 mt-0.5">
                          {item.variantName}
                        </p>
                      )}
                      <p className="text-sm font-medium text-neutral-500 mt-1">
                        数量: {item.quantity}
                      </p>
                    </div>
                    <p className="text-xl font-serif font-medium text-foreground">
                      {formatCurrency(item.price * item.quantity, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* ギフトオプション */}
            {giftOptions.isGift && (
              <Card className="p-6 mt-6 bg-primary-50/50 border-primary-100">
                <h2 className="text-2xl font-serif font-medium mb-4">
                  {t('gift_options.title')} 🎁
                </h2>
                {giftOptions.message && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-neutral-600">
                      {t('gift_options.message')}
                    </p>
                    <p className="mt-2 text-foreground p-4 bg-white rounded-lg border border-border italic text-sm leading-relaxed">{giftOptions.message}</p>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* 支払い */}
          <div>
            <Card className="p-6 sticky top-32 shadow-md">
              <h2 className="text-2xl font-serif font-medium mb-4">{t('payment')}</h2>
              <div className="space-y-3 border-b border-border pb-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-neutral-600">小計</span>
                  <span className="font-medium">{formatCurrency(subtotal, locale)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-neutral-600">送料</span>
                  <span className="font-medium text-primary-600">無料</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-serif font-medium mb-8">
                <span>合計</span>
                <span>{formatCurrency(subtotal, locale)}</span>
              </div>

              {error && (
                <div className="bg-error/10 border border-error/20 rounded-md p-3 mb-6 text-error font-medium text-sm">
                  {error}
                </div>
              )}

              <Button
                size="lg"
                className="w-full"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    処理中...
                  </>
                ) : (
                  t('place_order')
                )}
              </Button>
              <p className="text-xs font-bold text-foreground/50 mt-4 text-center">
                {t('terms')}
              </p>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
