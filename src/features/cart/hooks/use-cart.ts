'use client';

import { useCartStore } from '../store';
import type { CartItem } from '../types';

export function useCart() {
  const {
    items,
    giftOptions,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setGiftOptions,
    toggleCart,
    openCart,
    closeCart,
    getTotalItems,
    getSubtotal,
  } = useCartStore();

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    addItem({ ...item, quantity });
    openCart();
  };

  return {
    items,
    giftOptions,
    isOpen,
    totalItems,
    subtotal,
    isEmpty: items.length === 0,
    addToCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setGiftOptions,
    toggleCart,
    openCart,
    closeCart,
  };
}
