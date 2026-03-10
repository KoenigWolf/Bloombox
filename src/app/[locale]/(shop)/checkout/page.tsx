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
          <Card className="p-12 text-center border-4 border-foreground shadow-[8px_8px_0px_var(--color-foreground)]">
            <h2 className="text-3xl font-serif font-bold mb-4">カートが空です 🛒</h2>
            <p className="text-foreground/70 mb-6 font-medium">お探しの商品を見つけましょう。</p>
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
        <h1 className="text-5xl font-serif font-bold mb-8 text-foreground uppercase tracking-tight">{t('title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 注文内容 */}
          <div className="lg:col-span-2">
            <Card className="p-6 border-2 border-foreground">
              <h2 className="text-2xl font-serif font-bold mb-4 uppercase">{t('order_summary')}</h2>
              <div className="divide-y-2 divide-foreground">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="py-3 flex justify-between"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      {item.variantName && (
                        <p className="text-sm font-bold uppercase tracking-wider text-foreground/70">
                          {item.variantName}
                        </p>
                      )}
                      <p className="text-sm font-bold tracking-wider text-foreground/70">
                        数量: {item.quantity}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      {formatCurrency(item.price * item.quantity, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* ギフトオプション */}
            {giftOptions.isGift && (
              <Card className="p-6 mt-6 border-2 border-foreground shadow-[4px_4px_0px_var(--color-foreground)]">
                <h2 className="text-2xl font-serif font-bold mb-4 uppercase">
                  {t('gift_options.title')} 🎁
                </h2>
                {giftOptions.message && (
                  <div className="mb-4">
                    <p className="text-sm font-bold uppercase tracking-wider text-foreground/70">
                      {t('gift_options.message')}
                    </p>
                    <p className="mt-2 text-foreground p-3 border-2 border-foreground bg-white italic">{giftOptions.message}</p>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* 支払い */}
          <div>
            <Card className="p-6 sticky top-32 border-2 border-foreground shadow-[4px_4px_0px_var(--color-foreground)] bg-white">
              <h2 className="text-2xl font-serif font-bold mb-4 uppercase">{t('payment')}</h2>
              <div className="space-y-3 border-b-2 border-foreground pb-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="font-bold uppercase tracking-wider">小計</span>
                  <span className="font-bold">{formatCurrency(subtotal, locale)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-bold uppercase tracking-wider">送料</span>
                  <span className="font-bold">無料</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold mb-6 uppercase">
                <span>合計</span>
                <span>{formatCurrency(subtotal, locale)}</span>
              </div>

              {error && (
                <div className="bg-[#EA5B3B]/10 border-2 border-[#EA5B3B] p-3 mb-4 text-[#EA5B3B] font-bold text-sm">
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
