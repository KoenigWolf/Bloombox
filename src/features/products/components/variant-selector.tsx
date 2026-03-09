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
      <span className="text-sm font-medium text-neutral-700">サイズ</span>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            onClick={() => handleSelect(variant)}
            disabled={variant.stockQuantity === 0}
            className={cn(
              'px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
              selectedVariant.id === variant.id
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-neutral-300 bg-white text-neutral-700 hover:border-primary-300',
              variant.stockQuantity === 0 &&
                'opacity-50 cursor-not-allowed line-through'
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
