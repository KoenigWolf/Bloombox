'use client';

import { useTranslations, useLocale } from 'next-intl';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '../hooks/use-cart';
import { formatCurrency } from '@/lib/utils/format';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils/cn';

export function CartSheet() {
  const t = useTranslations('cart');
  const locale = useLocale() as Locale;
  const {
    items,
    isOpen,
    totalItems,
    subtotal,
    isEmpty,
    closeCart,
    removeItem,
    updateQuantity,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        className={cn(
          'fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50',
          'flex flex-col',
          'animate-slide-in-right'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 p-4">
          <h2 className="text-lg font-semibold">
            {t('title')} ({t('item', { count: totalItems })})
          </h2>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-neutral-500 mb-4">{t('empty')}</p>
              <Button asChild onClick={closeCart}>
                <Link href="/products">{t('empty_cta')}</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.variantId}`}
                  className="flex gap-4 border-b border-neutral-100 pb-4"
                >
                  {/* Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="80px"
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
                      className="font-medium text-sm hover:text-primary-600 line-clamp-2"
                      onClick={closeCart}
                    >
                      {item.name}
                    </Link>
                    {item.variantName && (
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {item.variantName}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-primary-600 mt-1">
                      {formatCurrency(item.price, locale)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.variantId,
                            item.quantity - 1
                          )
                        }
                        className="p-1 rounded border border-neutral-300 hover:bg-neutral-50"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm w-8 text-center">
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
                        className="p-1 rounded border border-neutral-300 hover:bg-neutral-50"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="p-1 ml-2 text-neutral-400 hover:text-error"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="border-t border-neutral-200 p-4 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>{t('subtotal')}</span>
              <span>{formatCurrency(subtotal, locale)}</span>
            </div>
            <Button asChild size="lg" className="w-full" onClick={closeCart}>
              <Link href="/checkout">{t('checkout')}</Link>
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={closeCart}
              asChild
            >
              <Link href="/products">{t('continue_shopping')}</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
