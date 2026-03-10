import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from './store';
import { createMockCartItem } from '@/test/mocks';

describe('CartStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useCartStore.setState({
      items: [],
      giftOptions: { isGift: false },
      isOpen: false,
    });
  });

  describe('addItem', () => {
    it('should add a new item to empty cart', () => {
      const item = createMockCartItem();
      useCartStore.getState().addItem(item);

      expect(useCartStore.getState().items).toHaveLength(1);
      expect(useCartStore.getState().items[0]).toEqual(item);
    });

    it('should add multiple different items', () => {
      const item1 = createMockCartItem({ productId: 'prod-001' });
      const item2 = createMockCartItem({ productId: 'prod-002' });

      useCartStore.getState().addItem(item1);
      useCartStore.getState().addItem(item2);

      expect(useCartStore.getState().items).toHaveLength(2);
    });

    it('should increase quantity when adding same item', () => {
      const item = createMockCartItem({ quantity: 1 });

      useCartStore.getState().addItem(item);
      useCartStore.getState().addItem(item);

      expect(useCartStore.getState().items).toHaveLength(1);
      expect(useCartStore.getState().items[0].quantity).toBe(2);
    });

    it('should treat same product with different variant as separate items', () => {
      const item1 = createMockCartItem({ productId: 'prod-001', variantId: 'var-s' });
      const item2 = createMockCartItem({ productId: 'prod-001', variantId: 'var-m' });

      useCartStore.getState().addItem(item1);
      useCartStore.getState().addItem(item2);

      expect(useCartStore.getState().items).toHaveLength(2);
    });
  });

  describe('removeItem', () => {
    it('should remove item from cart', () => {
      const item = createMockCartItem();
      useCartStore.getState().addItem(item);

      useCartStore.getState().removeItem(item.productId, item.variantId);

      expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('should only remove matching item', () => {
      const item1 = createMockCartItem({ productId: 'prod-001' });
      const item2 = createMockCartItem({ productId: 'prod-002' });

      useCartStore.getState().addItem(item1);
      useCartStore.getState().addItem(item2);
      useCartStore.getState().removeItem('prod-001', item1.variantId);

      expect(useCartStore.getState().items).toHaveLength(1);
      expect(useCartStore.getState().items[0].productId).toBe('prod-002');
    });

    it('should do nothing when removing non-existent item', () => {
      const item = createMockCartItem();
      useCartStore.getState().addItem(item);

      useCartStore.getState().removeItem('non-existent', 'var-x');

      expect(useCartStore.getState().items).toHaveLength(1);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const item = createMockCartItem({ quantity: 1 });
      useCartStore.getState().addItem(item);

      useCartStore.getState().updateQuantity(item.productId, item.variantId, 5);

      expect(useCartStore.getState().items[0].quantity).toBe(5);
    });

    it('should remove item when quantity is 0', () => {
      const item = createMockCartItem({ quantity: 1 });
      useCartStore.getState().addItem(item);

      useCartStore.getState().updateQuantity(item.productId, item.variantId, 0);

      expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('should remove item when quantity is negative', () => {
      const item = createMockCartItem({ quantity: 1 });
      useCartStore.getState().addItem(item);

      useCartStore.getState().updateQuantity(item.productId, item.variantId, -1);

      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('should remove all items', () => {
      useCartStore.getState().addItem(createMockCartItem({ productId: 'prod-001' }));
      useCartStore.getState().addItem(createMockCartItem({ productId: 'prod-002' }));

      useCartStore.getState().clearCart();

      expect(useCartStore.getState().items).toHaveLength(0);
    });

    it('should reset gift options', () => {
      useCartStore.getState().setGiftOptions({
        isGift: true,
        message: 'Happy Birthday!'
      });

      useCartStore.getState().clearCart();

      expect(useCartStore.getState().giftOptions).toEqual({ isGift: false });
    });
  });

  describe('giftOptions', () => {
    it('should set gift options', () => {
      useCartStore.getState().setGiftOptions({
        isGift: true,
        message: 'おめでとう！',
        wrapping: 'standard',
      });

      expect(useCartStore.getState().giftOptions).toEqual({
        isGift: true,
        message: 'おめでとう！',
        wrapping: 'standard',
      });
    });

    it('should merge with existing options', () => {
      useCartStore.getState().setGiftOptions({ isGift: true });
      useCartStore.getState().setGiftOptions({ message: 'Hello' });

      expect(useCartStore.getState().giftOptions).toEqual({
        isGift: true,
        message: 'Hello',
      });
    });
  });

  describe('cart visibility', () => {
    it('should toggle cart open/close', () => {
      expect(useCartStore.getState().isOpen).toBe(false);

      useCartStore.getState().toggleCart();
      expect(useCartStore.getState().isOpen).toBe(true);

      useCartStore.getState().toggleCart();
      expect(useCartStore.getState().isOpen).toBe(false);
    });

    it('should open cart', () => {
      useCartStore.getState().openCart();
      expect(useCartStore.getState().isOpen).toBe(true);
    });

    it('should close cart', () => {
      useCartStore.getState().openCart();
      useCartStore.getState().closeCart();
      expect(useCartStore.getState().isOpen).toBe(false);
    });
  });

  describe('computed values', () => {
    it('should calculate total items', () => {
      useCartStore.getState().addItem(createMockCartItem({ quantity: 2 }));
      useCartStore.getState().addItem(createMockCartItem({
        productId: 'prod-002',
        quantity: 3
      }));

      expect(useCartStore.getState().getTotalItems()).toBe(5);
    });

    it('should return 0 for empty cart', () => {
      expect(useCartStore.getState().getTotalItems()).toBe(0);
    });

    it('should calculate subtotal', () => {
      useCartStore.getState().addItem(createMockCartItem({
        price: 1000,
        quantity: 2
      }));
      useCartStore.getState().addItem(createMockCartItem({
        productId: 'prod-002',
        price: 2000,
        quantity: 1
      }));

      expect(useCartStore.getState().getSubtotal()).toBe(4000);
    });

    it('should return 0 subtotal for empty cart', () => {
      expect(useCartStore.getState().getSubtotal()).toBe(0);
    });
  });
});
