import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Product } from '../types';
import type { Locale } from '@/i18n/config';
import { formatCurrency } from '@/lib/utils/format';
import { Card } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export async function ProductCard({ product }: ProductCardProps) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('products.detail');

  const translation = product.translations.find((t) => t.locale === locale) ||
    product.translations[0];

  const primaryImage = product.images.find((img) => img.isPrimary) ||
    product.images[0];

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-400">
              No Image
            </div>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="absolute top-2 left-2 bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded">
              SALE
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-neutral-900 line-clamp-2 group-hover:text-primary-600">
            {translation.name}
          </h3>
          {translation.shortDescription && (
            <p className="mt-1 text-xs text-neutral-500 line-clamp-2">
              {translation.shortDescription}
            </p>
          )}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-semibold text-primary-600">
              {formatCurrency(product.price, locale)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-neutral-400 line-through">
                {formatCurrency(product.originalPrice, locale)}
              </span>
            )}
          </div>
          {product.rating && (
            <div className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
              <span className="text-yellow-500">★</span>
              <span>{product.rating}</span>
              <span>({product.reviewCount})</span>
            </div>
          )}
          {product.variants.every((v) => v.stockQuantity === 0) && (
            <div className="mt-2 text-xs text-error">{t('out_of_stock')}</div>
          )}
        </div>
      </Card>
    </Link>
  );
}
