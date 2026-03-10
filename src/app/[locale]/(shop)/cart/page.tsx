'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/features/cart/hooks/use-cart';
import { formatCurrency } from '@/lib/utils/format';
import type { Locale } from '@/i18n/config';

export default function CartPage() {
  const t = useTranslations('cart');
  const locale = useLocale() as Locale;
  const { items, subtotal, isEmpty, removeItem, updateQuantity } = useCart();

  return (
    <section className="py-12">
      <Container>
        <h1 className="text-4xl md:text-5xl font-serif font-medium mb-8 text-foreground tracking-tight">{t('title')}</h1>

        {isEmpty ? (
          <Card className="p-12 text-center">
            <p className="text-neutral-500 mb-6">{t('empty')}</p>
            <Button asChild>
              <Link href="/products">{t('empty_cta')}</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="divide-y divide-border">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="flex gap-4 p-4"
                  >
                    {/* Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-white shadow-sm">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-neutral-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.slug}`}
                        className="text-xl font-serif font-medium hover:text-primary-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      {item.variantName && (
                        <p className="text-sm font-medium text-neutral-600 mt-0.5">
                          {item.variantName}
                        </p>
                      )}
                      <p className="text-xl font-serif font-medium text-foreground mt-2">
                        {formatCurrency(item.price * item.quantity, locale)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() =>
                          removeItem(item.productId, item.variantId)
                        }
                        className="text-neutral-400 hover:text-error transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="flex items-center gap-1 mt-auto">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.variantId,
                              item.quantity - 1
                            )
                          }
                          className="p-1.5 rounded-md border border-border bg-white hover:border-primary-600 hover:text-primary-600 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.variantId,
                              item.quantity + 1
                            )
                          }
                          className="p-1.5 rounded-md border border-border bg-white hover:border-primary-600 hover:text-primary-600 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 sticky top-32">
                <h2 className="text-2xl font-serif font-medium mb-4">ご注文内容</h2>
                <div className="space-y-3 border-b border-border pb-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-neutral-600">{t('subtotal')}</span>
                    <span className="font-medium">{formatCurrency(subtotal, locale)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-neutral-600">{t('shipping')}</span>
                    <span className="font-medium text-primary-600">計算中...</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-serif font-medium mb-6">
                  <span>{t('total')}</span>
                  <span>{formatCurrency(subtotal, locale)}</span>
                </div>
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">{t('checkout')}</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full mt-3"
                  asChild
                >
                  <Link href="/products">{t('continue_shopping')}</Link>
                </Button>
              </Card>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
