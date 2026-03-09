'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { formatCurrency } from '@/lib/utils/format';
import type { ProductVariant } from '../types';
import type { Locale } from '@/i18n/config';

interface VariantSelectorProps {
  variants: ProductVariant[];
  locale: Locale;
  onChange?: (variant: ProductVariant) => void;
}

export function VariantSelector({
  variants,
  locale,
  onChange,
}: VariantSelectorProps) {
  const defaultVariant = variants.find((v) => v.isDefault) || variants[0];
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant>(defaultVariant);

  const handleSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    onChange?.(variant);
  };

  return (
    <div className="space-y-3">
      <span className="text-sm font-bold uppercase tracking-wider text-foreground">サイズ</span>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            onClick={() => handleSelect(variant)}
            disabled={variant.stockQuantity === 0}
            className={cn(
              'px-4 py-2 border-2 text-sm font-bold uppercase tracking-wider transition-all',
              selectedVariant.id === variant.id
                ? 'border-foreground bg-primary-DEFAULT text-white shadow-[4px_4px_0px_var(--color-foreground)] -translate-y-1'
                : 'border-foreground bg-white text-foreground hover:-translate-y-1 hover:shadow-[4px_4px_0px_var(--color-foreground)]',
              variant.stockQuantity === 0 &&
              'opacity-50 cursor-not-allowed line-through hover:translate-y-0 hover:shadow-none'
            )}
          >
            {variant.name}
            {variant.price !== selectedVariant.price && (
              <span className="ml-2 text-xs text-neutral-500">
                {formatCurrency(variant.price, locale)}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
