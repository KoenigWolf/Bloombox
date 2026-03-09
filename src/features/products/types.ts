import type { Locale } from '@/i18n/config';

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductTranslation {
  locale: Locale;
  name: string;
  description: string;
  shortDescription?: string;
  flowerMeaning?: string;
  careGuide?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  sku: string;
  stockQuantity: number;
  isDefault: boolean;
}

export interface Product {
  id: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: ProductImage[];
  translations: ProductTranslation[];
  variants: ProductVariant[];
  categoryId: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  rating?: number;
  reviewCount: number;
  flowerBatchId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  slug: string;
  translations: {
    locale: Locale;
    name: string;
    description?: string;
  }[];
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  occasion?: string;
  search?: string;
}

export type ProductSortOption =
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'popular';
