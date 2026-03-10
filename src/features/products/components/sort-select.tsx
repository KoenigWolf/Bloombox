'use client';

import type { ProductSortOption } from '@/features/products/types';

export function SortSelect({ currentSort }: { currentSort: ProductSortOption }) {
   return (
      <form>
         <select
            name="sort"
            defaultValue={currentSort}
            className="rounded-md border border-border bg-white px-4 py-2 text-sm font-medium focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20 shadow-sm transition-all"
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
