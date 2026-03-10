import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCart } from './use-cart';
import { useCartStore } from '../store';
import { createMockCartItem } from '@/test/mocks';
import type { CartItem } from '../types';

// Helper to create minimal cart item data for addToCart
function createAddToCartData(overrides: Partial<Omit<CartItem, 'quantity'>> = {}): Omit<CartItem, 'quantity'> {
  return {
    productId: 'prod-001',
    variantId: 'var-s',
    name: 'Test',
    variantName: 'S',
    price: 1000,
    imageUrl: '/test.jpg',
    slug: 'test-product',
    ...overrides,
  };
}

describe('useCart hook', () => {
  beforeEach(() => {
    // Reset store before each test
    useCartStore.setState({
      items: [],
      giftOptions: { isGift: false },
      isOpen: false,
    });
  });

  it('should return empty state initially', () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.items).toHaveLength(0);
    expect(result.current.isEmpty).toBe(true);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.subtotal).toBe(0);
    expect(result.current.isOpen).toBe(false);
  });

  describe('addToCart', () => {
    it('should add item and open cart', () => {
      const { result } = renderHook(() => useCart());
      const item = createMockCartItem();

      act(() => {
        result.current.addToCart({
          productId: item.productId,
          variantId: item.variantId,
          name: item.name,
          variantName: item.variantName,
          price: item.price,
          imageUrl: item.imageUrl,
          slug: item.slug,
        });
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.isOpen).toBe(true);
      expect(result.current.isEmpty).toBe(false);
    });

    it('should add with default quantity of 1', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(createAddToCartData());
      });

      expect(result.current.items[0].quantity).toBe(1);
    });

    it('should add with custom quantity', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(createAddToCartData(), 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
    });
  });

  describe('removeItem', () => {
    it('should remove item from cart', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(createAddToCartData());
      });

      act(() => {
        result.current.removeItem('prod-001', 'var-s');
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.isEmpty).toBe(true);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(createAddToCartData());
      });

      act(() => {
        result.current.updateQuantity('prod-001', 'var-s', 10);
      });

      expect(result.current.items[0].quantity).toBe(10);
      expect(result.current.totalItems).toBe(10);
    });
  });

  describe('clearCart', () => {
    it('should clear all items', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(createAddToCartData({ productId: 'p1', variantId: 'v1', name: 'A', price: 100 }));
        result.current.addToCart(createAddToCartData({ productId: 'p2', variantId: 'v2', name: 'B', price: 200 }));
      });

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.isEmpty).toBe(true);
    });
  });

  describe('giftOptions', () => {
    it('should set gift options', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.setGiftOptions({
          isGift: true,
          message: 'おめでとう！',
        });
      });

      expect(result.current.giftOptions.isGift).toBe(true);
      expect(result.current.giftOptions.message).toBe('おめでとう！');
    });
  });

  describe('cart visibility', () => {
    it('should toggle cart', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.toggleCart();
      });
      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.toggleCart();
      });
      expect(result.current.isOpen).toBe(false);
    });

    it('should open and close cart', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.openCart();
      });
      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.closeCart();
      });
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('computed values', () => {
    it('should calculate totalItems correctly', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(createAddToCartData({ productId: 'p1', variantId: 'v1', name: 'A', price: 100 }), 2);
        result.current.addToCart(createAddToCartData({ productId: 'p2', variantId: 'v2', name: 'B', price: 200 }), 3);
      });

      expect(result.current.totalItems).toBe(5);
    });

    it('should calculate subtotal correctly', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(createAddToCartData({ productId: 'p1', variantId: 'v1', name: 'A', price: 1000 }), 2);
        result.current.addToCart(createAddToCartData({ productId: 'p2', variantId: 'v2', name: 'B', price: 500 }), 4);
      });

      expect(result.current.subtotal).toBe(4000); // 1000*2 + 500*4
    });
  });
});
