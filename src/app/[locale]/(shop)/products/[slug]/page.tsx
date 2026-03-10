import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout/container';
import { getProduct } from '@/features/products/queries';
import { formatCurrency } from '@/lib/utils/format';
import type { Locale } from '@/i18n/config';
import { AddToCartButton } from '@/features/cart/components/add-to-cart-button';
import { VariantSelector } from '@/features/products/components/variant-selector';

interface ProductDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { locale, slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const translation =
    product.translations.find((t) => t.locale === locale) ||
    product.translations[0];

  return {
    title: translation.name,
    description: translation.shortDescription || translation.description,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const t = await getTranslations('products.detail');
  const currentLocale = (await getLocale()) as Locale;

  const translation =
    product.translations.find((t) => t.locale === currentLocale) ||
    product.translations[0];

  const primaryImage =
    product.images.find((img) => img.isPrimary) || product.images[0];

  const defaultVariant =
    product.variants.find((v) => v.isDefault) || product.variants[0];

  const hasStock = product.variants.some((v) => v.stockQuantity > 0);

  return (
    <section className="py-12">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 画像セクション */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              {primaryImage ? (
                <Image
                  src={primaryImage.url}
                  alt={primaryImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-neutral-400">
                  No Image
                </div>
              )}
            </div>
            {/* サムネイル（複数画像がある場合） */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image) => (
                  <div
                    key={image.id}
                    className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-white hover:border-primary-600 transition-colors cursor-pointer"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 商品情報セクション */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground tracking-tight">
                {translation.name}
              </h1>
              {product.rating && (
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-neutral-600">
                  <span className="text-primary-500">★</span>
                  <span>{product.rating}</span>
                  <span>({product.reviewCount} レビュー)</span>
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-serif font-medium text-foreground">
                {formatCurrency(defaultVariant.price, currentLocale)}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-lg text-neutral-400 line-through">
                    {formatCurrency(product.originalPrice, currentLocale)}
                  </span>
                )}
            </div>

            {/* バリアント選択 */}
            {product.variants.length > 1 && (
              <VariantSelector
                variants={product.variants}
                locale={currentLocale}
              />
            )}

            {/* 在庫状況 */}
            <div className="flex items-center gap-2">
              {hasStock ? (
                <span className="text-sm text-success">{t('in_stock')}</span>
              ) : (
                <span className="text-sm text-error">{t('out_of_stock')}</span>
              )}
            </div>

            {/* カートに追加 */}
            <div className="flex gap-4">
              <AddToCartButton
                productId={product.id}
                variantId={defaultVariant.id}
                disabled={!hasStock}
              />
            </div>

            {/* 商品説明 */}
            <div className="border-t border-border pt-6">
              <h2 className="text-2xl font-serif font-medium mb-3">{t('description')}</h2>
              <p className="text-neutral-600 whitespace-pre-line leading-relaxed">
                {translation.description}
              </p>
            </div>

            {/* 花言葉 */}
            {translation.flowerMeaning && (
              <div className="border-t border-border pt-6">
                <h2 className="text-2xl font-serif font-medium mb-3">
                  {t('flower_meaning')}
                </h2>
                <p className="text-neutral-600 leading-relaxed">{translation.flowerMeaning}</p>
              </div>
            )}

            {/* お手入れ方法 */}
            {translation.careGuide && (
              <div className="border-t border-border pt-6">
                <h2 className="text-2xl font-serif font-medium mb-3">
                  {t('care_guide')}
                </h2>
                <p className="text-neutral-600 leading-relaxed">{translation.careGuide}</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
