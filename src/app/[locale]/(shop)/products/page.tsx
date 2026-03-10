import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout/container';
import { ProductList } from '@/features/products/components';
import { SortSelect } from '@/features/products/components/sort-select';
import type { ProductSortOption } from '@/features/products/types';

interface ProductsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    category?: string;
    sort?: ProductSortOption;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export async function generateMetadata({ params }: ProductsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });

  return {
    title: t('title'),
  };
}

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('products');
  const resolvedSearchParams = await searchParams;

  const filters = {
    category: resolvedSearchParams.category,
    search: resolvedSearchParams.search,
    minPrice: resolvedSearchParams.minPrice
      ? Number(resolvedSearchParams.minPrice)
      : undefined,
    maxPrice: resolvedSearchParams.maxPrice
      ? Number(resolvedSearchParams.maxPrice)
      : undefined,
  };

  const sort = resolvedSearchParams.sort || 'newest';

  return (
    <section className="py-16 bg-background min-h-screen">
      <Container>
        <div className="mb-12 border-b border-border pb-6">
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-foreground">{t('title')}</h1>
        </div>

        {/* フィルター・ソート UI */}
        <div className="mb-10 flex flex-wrap gap-4 items-center justify-between bg-white border border-border p-4 shadow-sm rounded-xl">
          <div className="flex gap-2">
            <span className="font-medium tracking-wide text-primary-600">Filters</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-sm font-medium tracking-wide text-neutral-600">{t('sort.title')}:</span>
            <SortSelect currentSort={sort} />
          </div>
        </div>

        <div className="mt-8">
          <ProductList filters={filters} sort={sort} />
        </div>
      </Container>
    </section>
  );
}

