import { getProducts } from '../queries';
import { ProductCard } from './product-card';
import type { ProductFilters, ProductSortOption } from '../types';

interface ProductListProps {
  filters?: ProductFilters;
  sort?: ProductSortOption;
}

export async function ProductList({ filters, sort }: ProductListProps) {
  const products = await getProducts(filters, sort);

  if (products.length === 0) {
    return (
      <div className="py-12 text-center text-neutral-500">
        商品が見つかりませんでした。
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
