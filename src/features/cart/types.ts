export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  name: string;
  variantName: string;
  price: number;
  imageUrl: string;
  slug: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

export interface GiftOptions {
  isGift: boolean;
  message?: string;
  wrapping?: string;
  noshi?: string;
}
