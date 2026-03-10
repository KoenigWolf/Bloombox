import type { CartItem } from '@/features/cart/types';
import type { Product } from '@/features/products/types';

// Product factory
export function createMockProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 'prod-001',
    slug: 'test-product',
    price: 5000,
    originalPrice: undefined,
    images: [
      { id: 'img-001', url: '/images/test.jpg', alt: 'テスト商品', isPrimary: true },
    ],
    translations: [
      {
        locale: 'ja',
        name: 'テスト商品',
        description: 'テスト用の商品です',
        shortDescription: 'テスト商品',
      },
    ],
    variants: [
      { id: 'var-s', name: 'S', price: 5000, sku: 'SKU-S', stockQuantity: 10, isDefault: true },
      { id: 'var-m', name: 'M', price: 7000, sku: 'SKU-M', stockQuantity: 10, isDefault: false },
      { id: 'var-l', name: 'L', price: 10000, sku: 'SKU-L', stockQuantity: 10, isDefault: false },
    ],
    categoryId: 'cat-001',
    tags: ['test', 'bouquet'],
    isPublished: true,
    isFeatured: false,
    reviewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

// Cart item factory
export function createMockCartItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    productId: 'prod-001',
    variantId: 'var-s',
    name: 'テスト商品',
    variantName: 'S',
    price: 5000,
    quantity: 1,
    imageUrl: '/images/test.jpg',
    slug: 'test-product',
    ...overrides,
  };
}

// Multiple cart items
export function createMockCart(count: number = 3): CartItem[] {
  return Array.from({ length: count }, (_, i) =>
    createMockCartItem({
      productId: `prod-00${i + 1}`,
      variantId: `var-${i + 1}`,
      name: `テスト商品 ${i + 1}`,
      price: 5000 + i * 1000,
      quantity: i + 1,
    })
  );
}

// User factory
export function createMockUser(overrides: Partial<{
  id: string;
  email: string;
  name: string;
}> = {}) {
  return {
    id: 'user-001',
    email: 'test@example.com',
    name: 'テストユーザー',
    ...overrides,
  };
}

// Order factory
export function createMockOrder(overrides: Partial<{
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: number;
}> = {}) {
  return {
    id: 'order-001',
    orderNumber: 'BB-2024-0001',
    status: 'paid',
    totalAmount: 15000,
    ...overrides,
  };
}
