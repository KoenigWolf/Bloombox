'use client';

import type { ProductSortOption } from '@/features/products/types';

export function SortSelect({ currentSort }: { currentSort: ProductSortOption }) {
   return (
      <form>
         <select
            name="sort"
            defaultValue={currentSort}
            className="rounded-none border-2 border-foreground bg-white px-4 py-3 text-sm font-bold uppercase tracking-wider focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20 shadow-[4px_4px_0px_var(--color-foreground)] transition-all hover:shadow-[2px_2px_0px_var(--color-foreground)] hover:translate-y-1"
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
