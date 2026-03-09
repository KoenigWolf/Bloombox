'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingBag, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../hooks/use-cart';

interface AddToCartButtonProps {
  productId: string;
  variantId: string;
  productName?: string;
  variantName?: string;
  price?: number;
  imageUrl?: string;
  slug?: string;
  disabled?: boolean;
}

export function AddToCartButton({
  productId,
  variantId,
  productName = '',
  variantName = '',
  price = 0,
  imageUrl = '',
  slug = '',
  disabled = false,
}: AddToCartButtonProps) {
  const t = useTranslations('common');
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    addToCart({
      productId,
      variantId,
      name: productName,
      variantName,
      price,
      imageUrl,
      slug,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || isAdded}
      size="lg"
      className="flex-1 gap-2"
    >
      {isAdded ? (
        <>
          <Check className="h-5 w-5" />
          追加しました
        </>
      ) : (
        <>
          <ShoppingBag className="h-5 w-5" />
          {t('add_to_cart')}
        </>
      )}
    </Button>
  );
}
