import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout/container';
import { ProductList } from '@/features/products/components';
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
    <section className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
        </div>

        {/* フィルター・ソート UI（後で拡張） */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {/* カテゴリフィルターボタン（後で実装） */}
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-neutral-500">{t('sort.title')}:</span>
            <SortSelect currentSort={sort} />
          </div>
        </div>

        <ProductList filters={filters} sort={sort} />
      </Container>
    </section>
  );
}

function SortSelect({ currentSort }: { currentSort: ProductSortOption }) {
  // シンプルなソート選択（後でより良いUIに置き換え可能）
  return (
    <form>
      <select
        name="sort"
        defaultValue={currentSort}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        onChange={(e) => {
          const form = e.target.form;
          if (form) form.submit();
        }}
      >
        <option value="newest">新着順</option>
        <option value="price_asc">価格が安い順</option>
        <option value="price_desc">価格が高い順</option>
        <option value="popular">人気順</option>
      </select>
    </form>
  );
}
