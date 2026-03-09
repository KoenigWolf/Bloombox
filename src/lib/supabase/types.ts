// =====================================================
// Bloombox Database Types
// Generated from: supabase/migrations/00001_initial_schema.sql
// =====================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// =====================================================
// ENUM TYPES
// =====================================================

export type CustomerRank = 'bronze' | 'silver' | 'gold' | 'platinum';
export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentMethod = 'card' | 'konbini' | 'paypay' | 'bank_transfer';
export type LocaleCode = 'ja' | 'en' | 'zh' | 'vi';
export type MilesTransactionType = 'earned' | 'redeemed' | 'expired' | 'adjusted';

// =====================================================
// DATABASE INTERFACE
// =====================================================

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          phone: string | null;
          preferred_locale: LocaleCode;
          flower_miles: number;
          lifetime_miles: number;
          rank: CustomerRank;
          line_user_id: string | null;
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          phone?: string | null;
          preferred_locale?: LocaleCode;
          flower_miles?: number;
          lifetime_miles?: number;
          rank?: CustomerRank;
          line_user_id?: string | null;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          phone?: string | null;
          preferred_locale?: LocaleCode;
          flower_miles?: number;
          lifetime_miles?: number;
          rank?: CustomerRank;
          line_user_id?: string | null;
          stripe_customer_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      saved_addresses: {
        Row: {
          id: string;
          customer_id: string;
          label: string;
          recipient_name: string;
          postal_code: string;
          prefecture: string;
          city: string;
          line1: string;
          line2: string | null;
          phone: string;
          is_default: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          label?: string;
          recipient_name: string;
          postal_code: string;
          prefecture: string;
          city: string;
          line1: string;
          line2?: string | null;
          phone: string;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          label?: string;
          recipient_name?: string;
          postal_code?: string;
          prefecture?: string;
          city?: string;
          line1?: string;
          line2?: string | null;
          phone?: string;
          is_default?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'saved_addresses_customer_id_fkey';
            columns: ['customer_id'];
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          }
        ];
      };

      important_dates: {
        Row: {
          id: string;
          customer_id: string;
          label: string;
          date: string;
          recipient_name: string | null;
          reminder_days_before: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          label: string;
          date: string;
          recipient_name?: string | null;
          reminder_days_before?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          label?: string;
          date?: string;
          recipient_name?: string | null;
          reminder_days_before?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'important_dates_customer_id_fkey';
            columns: ['customer_id'];
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          }
        ];
      };

      farmers: {
        Row: {
          id: string;
          slug: string;
          name_ja: string;
          name_en: string | null;
          name_zh: string | null;
          name_vi: string | null;
          region: string;
          story_ja: string | null;
          story_en: string | null;
          story_zh: string | null;
          story_vi: string | null;
          profile_image_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_ja: string;
          name_en?: string | null;
          name_zh?: string | null;
          name_vi?: string | null;
          region: string;
          story_ja?: string | null;
          story_en?: string | null;
          story_zh?: string | null;
          story_vi?: string | null;
          profile_image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_ja?: string;
          name_en?: string | null;
          name_zh?: string | null;
          name_vi?: string | null;
          region?: string;
          story_ja?: string | null;
          story_en?: string | null;
          story_zh?: string | null;
          story_vi?: string | null;
          profile_image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      florists: {
        Row: {
          id: string;
          slug: string;
          name_ja: string;
          name_en: string | null;
          name_zh: string | null;
          name_vi: string | null;
          bio_ja: string | null;
          bio_en: string | null;
          bio_zh: string | null;
          bio_vi: string | null;
          profile_image_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_ja: string;
          name_en?: string | null;
          name_zh?: string | null;
          name_vi?: string | null;
          bio_ja?: string | null;
          bio_en?: string | null;
          bio_zh?: string | null;
          bio_vi?: string | null;
          profile_image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_ja?: string;
          name_en?: string | null;
          name_zh?: string | null;
          name_vi?: string | null;
          bio_ja?: string | null;
          bio_en?: string | null;
          bio_zh?: string | null;
          bio_vi?: string | null;
          profile_image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      flower_batches: {
        Row: {
          id: string;
          batch_code: string;
          farmer_id: string | null;
          flower_type: string;
          harvest_date: string;
          origin_region: string;
          story_ja: string | null;
          story_en: string | null;
          story_zh: string | null;
          story_vi: string | null;
          is_rescue: boolean;
          rescue_reason: string | null;
          carbon_footprint_kg: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          batch_code: string;
          farmer_id?: string | null;
          flower_type: string;
          harvest_date: string;
          origin_region: string;
          story_ja?: string | null;
          story_en?: string | null;
          story_zh?: string | null;
          story_vi?: string | null;
          is_rescue?: boolean;
          rescue_reason?: string | null;
          carbon_footprint_kg?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          batch_code?: string;
          farmer_id?: string | null;
          flower_type?: string;
          harvest_date?: string;
          origin_region?: string;
          story_ja?: string | null;
          story_en?: string | null;
          story_zh?: string | null;
          story_vi?: string | null;
          is_rescue?: boolean;
          rescue_reason?: string | null;
          carbon_footprint_kg?: number | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'flower_batches_farmer_id_fkey';
            columns: ['farmer_id'];
            referencedRelation: 'farmers';
            referencedColumns: ['id'];
          }
        ];
      };

      flower_rescue_events: {
        Row: {
          id: string;
          batch_id: string;
          original_destination: string | null;
          rescue_reason: string;
          quantity_rescued: number;
          rescued_at: string;
        };
        Insert: {
          id?: string;
          batch_id: string;
          original_destination?: string | null;
          rescue_reason: string;
          quantity_rescued: number;
          rescued_at?: string;
        };
        Update: {
          id?: string;
          batch_id?: string;
          original_destination?: string | null;
          rescue_reason?: string;
          quantity_rescued?: number;
          rescued_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'flower_rescue_events_batch_id_fkey';
            columns: ['batch_id'];
            referencedRelation: 'flower_batches';
            referencedColumns: ['id'];
          }
        ];
      };

      products: {
        Row: {
          id: string;
          slug: string;
          sku: string;
          base_price: number;
          original_price: number | null;
          category: string;
          tags: string[];
          is_published: boolean;
          is_featured: boolean;
          stock_quantity: number;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          sku: string;
          base_price: number;
          original_price?: number | null;
          category: string;
          tags?: string[];
          is_published?: boolean;
          is_featured?: boolean;
          stock_quantity?: number;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          sku?: string;
          base_price?: number;
          original_price?: number | null;
          category?: string;
          tags?: string[];
          is_published?: boolean;
          is_featured?: boolean;
          stock_quantity?: number;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      product_translations: {
        Row: {
          id: string;
          product_id: string;
          locale: LocaleCode;
          name: string;
          description: string | null;
          short_description: string | null;
          care_guide: string | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          locale: LocaleCode;
          name: string;
          description?: string | null;
          short_description?: string | null;
          care_guide?: string | null;
        };
        Update: {
          id?: string;
          product_id?: string;
          locale?: LocaleCode;
          name?: string;
          description?: string | null;
          short_description?: string | null;
          care_guide?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'product_translations_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };

      product_images: {
        Row: {
          id: string;
          product_id: string;
          cloudinary_public_id: string;
          alt_text_ja: string | null;
          alt_text_en: string | null;
          is_primary: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          cloudinary_public_id: string;
          alt_text_ja?: string | null;
          alt_text_en?: string | null;
          is_primary?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          cloudinary_public_id?: string;
          alt_text_ja?: string | null;
          alt_text_en?: string | null;
          is_primary?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'product_images_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };

      product_variants: {
        Row: {
          id: string;
          product_id: string;
          name: string;
          sku_suffix: string;
          price: number;
          stock_quantity: number;
          is_default: boolean;
          sort_order: number;
        };
        Insert: {
          id?: string;
          product_id: string;
          name: string;
          sku_suffix: string;
          price: number;
          stock_quantity?: number;
          is_default?: boolean;
          sort_order?: number;
        };
        Update: {
          id?: string;
          product_id?: string;
          name?: string;
          sku_suffix?: string;
          price?: number;
          stock_quantity?: number;
          is_default?: boolean;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'product_variants_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };

      flower_meanings: {
        Row: {
          id: string;
          product_id: string;
          locale: LocaleCode;
          meaning: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          locale: LocaleCode;
          meaning: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          locale?: LocaleCode;
          meaning?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'flower_meanings_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['id'];
          }
        ];
      };

      orders: {
        Row: {
          id: string;
          order_number: string;
          customer_id: string | null;
          florist_id: string | null;
          status: OrderStatus;
          payment_method: PaymentMethod | null;
          stripe_payment_intent_id: string | null;
          stripe_checkout_session_id: string | null;
          subtotal: number;
          shipping_cost: number;
          tax_amount: number;
          discount_amount: number;
          total_amount: number;
          currency: string;
          is_gift: boolean;
          gift_message: string | null;
          gift_wrapping: string | null;
          noshi_type: string | null;
          noshi_name: string | null;
          is_egift: boolean;
          egift_url_token: string | null;
          egift_claimed_at: string | null;
          shipping_name: string;
          shipping_postal_code: string;
          shipping_prefecture: string;
          shipping_city: string;
          shipping_line1: string;
          shipping_line2: string | null;
          shipping_phone: string;
          requested_delivery_date: string | null;
          actual_delivery_date: string | null;
          tracking_number: string | null;
          carrier: string | null;
          total_rescued_flower_count: number;
          carbon_offset_kg: number;
          miles_earned: number;
          miles_used: number;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          customer_id?: string | null;
          florist_id?: string | null;
          status?: OrderStatus;
          payment_method?: PaymentMethod | null;
          stripe_payment_intent_id?: string | null;
          stripe_checkout_session_id?: string | null;
          subtotal: number;
          shipping_cost?: number;
          tax_amount?: number;
          discount_amount?: number;
          total_amount: number;
          currency?: string;
          is_gift?: boolean;
          gift_message?: string | null;
          gift_wrapping?: string | null;
          noshi_type?: string | null;
          noshi_name?: string | null;
          is_egift?: boolean;
          egift_url_token?: string | null;
          egift_claimed_at?: string | null;
          shipping_name: string;
          shipping_postal_code: string;
          shipping_prefecture: string;
          shipping_city: string;
          shipping_line1: string;
          shipping_line2?: string | null;
          shipping_phone: string;
          requested_delivery_date?: string | null;
          actual_delivery_date?: string | null;
          tracking_number?: string | null;
          carrier?: string | null;
          total_rescued_flower_count?: number;
          carbon_offset_kg?: number;
          miles_earned?: number;
          miles_used?: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          customer_id?: string | null;
          florist_id?: string | null;
          status?: OrderStatus;
          payment_method?: PaymentMethod | null;
          stripe_payment_intent_id?: string | null;
          stripe_checkout_session_id?: string | null;
          subtotal?: number;
          shipping_cost?: number;
          tax_amount?: number;
          discount_amount?: number;
          total_amount?: number;
          currency?: string;
          is_gift?: boolean;
          gift_message?: string | null;
          gift_wrapping?: string | null;
          noshi_type?: string | null;
          noshi_name?: string | null;
          is_egift?: boolean;
          egift_url_token?: string | null;
          egift_claimed_at?: string | null;
          shipping_name?: string;
          shipping_postal_code?: string;
          shipping_prefecture?: string;
          shipping_city?: string;
          shipping_line1?: string;
          shipping_line2?: string | null;
          shipping_phone?: string;
          requested_delivery_date?: string | null;
          actual_delivery_date?: string | null;
          tracking_number?: string | null;
          carrier?: string | null;
          total_rescued_flower_count?: number;
          carbon_offset_kg?: number;
          miles_earned?: number;
          miles_used?: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_customer_id_fkey';
            columns: ['customer_id'];
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'orders_florist_id_fkey';
            columns: ['florist_id'];
            referencedRelation: 'florists';
            referencedColumns: ['id'];
          }
        ];
      };

      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          variant_id: string | null;
          batch_id: string | null;
          product_name: string;
          variant_name: string | null;
          unit_price: number;
          quantity: number;
          subtotal: number;
          is_rescue_flower: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          variant_id?: string | null;
          batch_id?: string | null;
          product_name: string;
          variant_name?: string | null;
          unit_price: number;
          quantity: number;
          subtotal: number;
          is_rescue_flower?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          variant_id?: string | null;
          batch_id?: string | null;
          product_name?: string;
          variant_name?: string | null;
          unit_price?: number;
          quantity?: number;
          subtotal?: number;
          is_rescue_flower?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'order_items_order_id_fkey';
            columns: ['order_id'];
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_variant_id_fkey';
            columns: ['variant_id'];
            referencedRelation: 'product_variants';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_batch_id_fkey';
            columns: ['batch_id'];
            referencedRelation: 'flower_batches';
            referencedColumns: ['id'];
          }
        ];
      };

      flower_miles_transactions: {
        Row: {
          id: string;
          customer_id: string;
          order_id: string | null;
          transaction_type: MilesTransactionType;
          amount: number;
          balance_after: number;
          description: string | null;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          order_id?: string | null;
          transaction_type: MilesTransactionType;
          amount: number;
          balance_after: number;
          description?: string | null;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          order_id?: string | null;
          transaction_type?: MilesTransactionType;
          amount?: number;
          balance_after?: number;
          description?: string | null;
          expires_at?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'flower_miles_transactions_customer_id_fkey';
            columns: ['customer_id'];
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'flower_miles_transactions_order_id_fkey';
            columns: ['order_id'];
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          }
        ];
      };

      user_flower_impact: {
        Row: {
          id: string;
          customer_id: string;
          total_orders: number;
          total_flowers_purchased: number;
          rescued_flowers_count: number;
          carbon_offset_total_kg: number;
          farmers_supported: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          total_orders?: number;
          total_flowers_purchased?: number;
          rescued_flowers_count?: number;
          carbon_offset_total_kg?: number;
          farmers_supported?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          total_orders?: number;
          total_flowers_purchased?: number;
          rescued_flowers_count?: number;
          carbon_offset_total_kg?: number;
          farmers_supported?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_flower_impact_customer_id_fkey';
            columns: ['customer_id'];
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          }
        ];
      };

      reviews: {
        Row: {
          id: string;
          product_id: string;
          customer_id: string | null;
          order_id: string | null;
          rating: number;
          title: string | null;
          content: string | null;
          is_verified_purchase: boolean;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          customer_id?: string | null;
          order_id?: string | null;
          rating: number;
          title?: string | null;
          content?: string | null;
          is_verified_purchase?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          customer_id?: string | null;
          order_id?: string | null;
          rating?: number;
          title?: string | null;
          content?: string | null;
          is_verified_purchase?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_product_id_fkey';
            columns: ['product_id'];
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_customer_id_fkey';
            columns: ['customer_id'];
            referencedRelation: 'customers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_order_id_fkey';
            columns: ['order_id'];
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          }
        ];
      };
    };

    Views: Record<string, never>;

    Functions: {
      update_updated_at: {
        Args: Record<string, never>;
        Returns: unknown;
      };
      handle_new_user: {
        Args: Record<string, never>;
        Returns: unknown;
      };
      update_customer_rank: {
        Args: Record<string, never>;
        Returns: unknown;
      };
    };

    Enums: {
      customer_rank: CustomerRank;
      order_status: OrderStatus;
      payment_method: PaymentMethod;
      locale_code: LocaleCode;
      miles_transaction_type: MilesTransactionType;
    };

    CompositeTypes: Record<string, never>;
  };
}

// =====================================================
// UTILITY TYPES
// =====================================================

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

// =====================================================
// CONVENIENCE TYPE ALIASES
// =====================================================

export type Customer = Tables<'customers'>;
export type SavedAddress = Tables<'saved_addresses'>;
export type ImportantDate = Tables<'important_dates'>;
export type Farmer = Tables<'farmers'>;
export type Florist = Tables<'florists'>;
export type FlowerBatch = Tables<'flower_batches'>;
export type FlowerRescueEvent = Tables<'flower_rescue_events'>;
export type Product = Tables<'products'>;
export type ProductTranslation = Tables<'product_translations'>;
export type ProductImage = Tables<'product_images'>;
export type ProductVariant = Tables<'product_variants'>;
export type FlowerMeaning = Tables<'flower_meanings'>;
export type Order = Tables<'orders'>;
export type OrderItem = Tables<'order_items'>;
export type FlowerMilesTransaction = Tables<'flower_miles_transactions'>;
export type UserFlowerImpact = Tables<'user_flower_impact'>;
export type Review = Tables<'reviews'>;

// =====================================================
// EXTENDED TYPES (with relations)
// =====================================================

export interface ProductWithTranslations extends Product {
  translations: ProductTranslation[];
}

export interface ProductWithDetails extends Product {
  translations: ProductTranslation[];
  images: ProductImage[];
  variants: ProductVariant[];
  meanings: FlowerMeaning[];
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export interface FlowerBatchWithFarmer extends FlowerBatch {
  farmer: Farmer | null;
}

export interface CustomerWithImpact extends Customer {
  impact: UserFlowerImpact | null;
}
