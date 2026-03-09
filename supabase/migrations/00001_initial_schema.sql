-- =====================================================
-- Bloombox Database Schema
-- Version: 1.0.0
-- Description: Initial schema with RLS policies
-- =====================================================

-- No extension needed - using gen_random_uuid() which is built-in to PostgreSQL 13+

-- =====================================================
-- ENUM TYPES
-- =====================================================

CREATE TYPE customer_rank AS ENUM ('bronze', 'silver', 'gold', 'platinum');
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');
CREATE TYPE payment_method AS ENUM ('card', 'konbini', 'paypay', 'bank_transfer');
CREATE TYPE locale_code AS ENUM ('ja', 'en', 'zh', 'vi');
CREATE TYPE miles_transaction_type AS ENUM ('earned', 'redeemed', 'expired', 'adjusted');

-- =====================================================
-- CUSTOMERS (extends Supabase Auth users)
-- =====================================================

CREATE TABLE customers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  preferred_locale locale_code DEFAULT 'ja',
  flower_miles INTEGER DEFAULT 0 CHECK (flower_miles >= 0),
  lifetime_miles INTEGER DEFAULT 0 CHECK (lifetime_miles >= 0),
  rank customer_rank DEFAULT 'bronze',
  line_user_id TEXT UNIQUE,
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_line_user_id ON customers(line_user_id);
CREATE INDEX idx_customers_stripe_customer_id ON customers(stripe_customer_id);

-- =====================================================
-- SAVED ADDRESSES
-- =====================================================

CREATE TABLE saved_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  label TEXT NOT NULL DEFAULT 'default',
  recipient_name TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  prefecture TEXT NOT NULL,
  city TEXT NOT NULL,
  line1 TEXT NOT NULL,
  line2 TEXT,
  phone TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_saved_addresses_customer ON saved_addresses(customer_id);

-- =====================================================
-- IMPORTANT DATES (birthdays, anniversaries)
-- =====================================================

CREATE TABLE important_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  date DATE NOT NULL,
  recipient_name TEXT,
  reminder_days_before INTEGER DEFAULT 14,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_important_dates_customer ON important_dates(customer_id);
CREATE INDEX idx_important_dates_date ON important_dates(date);

-- =====================================================
-- FARMERS (Flower Producers)
-- =====================================================

CREATE TABLE farmers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_ja TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  name_vi TEXT,
  region TEXT NOT NULL,
  story_ja TEXT,
  story_en TEXT,
  story_zh TEXT,
  story_vi TEXT,
  profile_image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_farmers_slug ON farmers(slug);

-- =====================================================
-- FLORISTS (Flower Arrangers)
-- =====================================================

CREATE TABLE florists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_ja TEXT NOT NULL,
  name_en TEXT,
  name_zh TEXT,
  name_vi TEXT,
  bio_ja TEXT,
  bio_en TEXT,
  bio_zh TEXT,
  bio_vi TEXT,
  profile_image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_florists_slug ON florists(slug);

-- =====================================================
-- FLOWER BATCHES (Traceability)
-- =====================================================

CREATE TABLE flower_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_code TEXT UNIQUE NOT NULL,
  farmer_id UUID REFERENCES farmers(id) ON DELETE SET NULL,
  flower_type TEXT NOT NULL,
  harvest_date DATE NOT NULL,
  origin_region TEXT NOT NULL,
  story_ja TEXT,
  story_en TEXT,
  story_zh TEXT,
  story_vi TEXT,
  is_rescue BOOLEAN DEFAULT FALSE,
  rescue_reason TEXT,
  carbon_footprint_kg DECIMAL(10, 2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_flower_batches_code ON flower_batches(batch_code);
CREATE INDEX idx_flower_batches_farmer ON flower_batches(farmer_id);
CREATE INDEX idx_flower_batches_harvest ON flower_batches(harvest_date);

-- =====================================================
-- FLOWER RESCUE EVENTS
-- =====================================================

CREATE TABLE flower_rescue_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES flower_batches(id) ON DELETE CASCADE,
  original_destination TEXT,
  rescue_reason TEXT NOT NULL,
  quantity_rescued INTEGER NOT NULL CHECK (quantity_rescued > 0),
  rescued_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_flower_rescue_batch ON flower_rescue_events(batch_id);

-- =====================================================
-- PRODUCTS
-- =====================================================

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  base_price INTEGER NOT NULL CHECK (base_price > 0),
  original_price INTEGER CHECK (original_price IS NULL OR original_price > base_price),
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_published ON products(is_published);
CREATE INDEX idx_products_featured ON products(is_featured);

-- =====================================================
-- PRODUCT TRANSLATIONS
-- =====================================================

CREATE TABLE product_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  locale locale_code NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  care_guide TEXT,
  UNIQUE(product_id, locale)
);

CREATE INDEX idx_product_translations_product ON product_translations(product_id);
CREATE INDEX idx_product_translations_locale ON product_translations(locale);

-- =====================================================
-- PRODUCT IMAGES
-- =====================================================

CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  cloudinary_public_id TEXT NOT NULL,
  alt_text_ja TEXT,
  alt_text_en TEXT,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_images_product ON product_images(product_id);

-- =====================================================
-- PRODUCT VARIANTS (Size options)
-- =====================================================

CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku_suffix TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price > 0),
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  is_default BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  UNIQUE(product_id, sku_suffix)
);

CREATE INDEX idx_product_variants_product ON product_variants(product_id);

-- =====================================================
-- FLOWER MEANINGS
-- =====================================================

CREATE TABLE flower_meanings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  locale locale_code NOT NULL,
  meaning TEXT NOT NULL,
  UNIQUE(product_id, locale)
);

CREATE INDEX idx_flower_meanings_product ON flower_meanings(product_id);

-- =====================================================
-- ORDERS
-- =====================================================

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  florist_id UUID REFERENCES florists(id) ON DELETE SET NULL,

  -- Status & Payment
  status order_status DEFAULT 'pending',
  payment_method payment_method,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_checkout_session_id TEXT UNIQUE,

  -- Amounts (stored in smallest currency unit)
  subtotal INTEGER NOT NULL CHECK (subtotal >= 0),
  shipping_cost INTEGER DEFAULT 0 CHECK (shipping_cost >= 0),
  tax_amount INTEGER DEFAULT 0 CHECK (tax_amount >= 0),
  discount_amount INTEGER DEFAULT 0 CHECK (discount_amount >= 0),
  total_amount INTEGER NOT NULL CHECK (total_amount >= 0),
  currency TEXT DEFAULT 'jpy',

  -- Gift Options
  is_gift BOOLEAN DEFAULT FALSE,
  gift_message TEXT,
  gift_wrapping TEXT,
  noshi_type TEXT,
  noshi_name TEXT,

  -- eGift
  is_egift BOOLEAN DEFAULT FALSE,
  egift_url_token TEXT UNIQUE,
  egift_claimed_at TIMESTAMPTZ,

  -- Shipping Address (denormalized for historical accuracy)
  shipping_name TEXT NOT NULL,
  shipping_postal_code TEXT NOT NULL,
  shipping_prefecture TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_line1 TEXT NOT NULL,
  shipping_line2 TEXT,
  shipping_phone TEXT NOT NULL,

  -- Delivery
  requested_delivery_date DATE,
  actual_delivery_date DATE,
  tracking_number TEXT,
  carrier TEXT,

  -- Sustainability
  total_rescued_flower_count INTEGER DEFAULT 0,
  carbon_offset_kg DECIMAL(10, 2) DEFAULT 0,

  -- Flower Miles
  miles_earned INTEGER DEFAULT 0,
  miles_used INTEGER DEFAULT 0,

  -- Metadata
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);
CREATE INDEX idx_orders_egift_token ON orders(egift_url_token);

-- =====================================================
-- ORDER ITEMS
-- =====================================================

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
  batch_id UUID REFERENCES flower_batches(id) ON DELETE SET NULL,

  -- Denormalized for historical accuracy
  product_name TEXT NOT NULL,
  variant_name TEXT,
  unit_price INTEGER NOT NULL CHECK (unit_price > 0),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  subtotal INTEGER NOT NULL CHECK (subtotal > 0),

  -- Per-item gift options
  is_rescue_flower BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_order_items_batch ON order_items(batch_id);

-- =====================================================
-- FLOWER MILES TRANSACTIONS
-- =====================================================

CREATE TABLE flower_miles_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  transaction_type miles_transaction_type NOT NULL,
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  description TEXT,
  expires_at DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_miles_transactions_customer ON flower_miles_transactions(customer_id);
CREATE INDEX idx_miles_transactions_order ON flower_miles_transactions(order_id);
CREATE INDEX idx_miles_transactions_created ON flower_miles_transactions(created_at);

-- =====================================================
-- USER FLOWER IMPACT (Sustainability Dashboard)
-- =====================================================

CREATE TABLE user_flower_impact (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  total_orders INTEGER DEFAULT 0,
  total_flowers_purchased INTEGER DEFAULT 0,
  rescued_flowers_count INTEGER DEFAULT 0,
  carbon_offset_total_kg DECIMAL(10, 2) DEFAULT 0,
  farmers_supported INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(customer_id)
);

CREATE INDEX idx_user_impact_customer ON user_flower_impact(customer_id);

-- =====================================================
-- REVIEWS
-- =====================================================

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  is_verified_purchase BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_customer ON reviews(customer_id);
CREATE INDEX idx_reviews_published ON reviews(is_published);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE important_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE florists ENABLE ROW LEVEL SECURITY;
ALTER TABLE flower_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE flower_rescue_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE flower_meanings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE flower_miles_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_flower_impact ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PUBLIC READ POLICIES (Products, Farmers, etc.)
-- =====================================================

-- Products: Anyone can view published products
CREATE POLICY "Anyone can view published products"
  ON products FOR SELECT
  USING (is_published = true);

CREATE POLICY "Anyone can view product translations"
  ON product_translations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM products WHERE products.id = product_translations.product_id AND products.is_published = true
  ));

CREATE POLICY "Anyone can view product images"
  ON product_images FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM products WHERE products.id = product_images.product_id AND products.is_published = true
  ));

CREATE POLICY "Anyone can view product variants"
  ON product_variants FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM products WHERE products.id = product_variants.product_id AND products.is_published = true
  ));

CREATE POLICY "Anyone can view flower meanings"
  ON flower_meanings FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM products WHERE products.id = flower_meanings.product_id AND products.is_published = true
  ));

-- Farmers: Anyone can view active farmers
CREATE POLICY "Anyone can view active farmers"
  ON farmers FOR SELECT
  USING (is_active = true);

-- Florists: Anyone can view active florists
CREATE POLICY "Anyone can view active florists"
  ON florists FOR SELECT
  USING (is_active = true);

-- Flower Batches: Anyone can view
CREATE POLICY "Anyone can view flower batches"
  ON flower_batches FOR SELECT
  USING (true);

-- Flower Rescue Events: Anyone can view
CREATE POLICY "Anyone can view flower rescue events"
  ON flower_rescue_events FOR SELECT
  USING (true);

-- Reviews: Anyone can view published reviews
CREATE POLICY "Anyone can view published reviews"
  ON reviews FOR SELECT
  USING (is_published = true);

-- =====================================================
-- USER-SPECIFIC POLICIES
-- =====================================================

-- Customers: Users can view and update their own profile
CREATE POLICY "Users can view own profile"
  ON customers FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON customers FOR UPDATE
  USING (auth.uid() = id);

-- Saved Addresses: Users can manage their own addresses
CREATE POLICY "Users can view own addresses"
  ON saved_addresses FOR SELECT
  USING (auth.uid() = customer_id);

CREATE POLICY "Users can insert own addresses"
  ON saved_addresses FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can update own addresses"
  ON saved_addresses FOR UPDATE
  USING (auth.uid() = customer_id);

CREATE POLICY "Users can delete own addresses"
  ON saved_addresses FOR DELETE
  USING (auth.uid() = customer_id);

-- Important Dates: Users can manage their own dates
CREATE POLICY "Users can view own important dates"
  ON important_dates FOR SELECT
  USING (auth.uid() = customer_id);

CREATE POLICY "Users can insert own important dates"
  ON important_dates FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can update own important dates"
  ON important_dates FOR UPDATE
  USING (auth.uid() = customer_id);

CREATE POLICY "Users can delete own important dates"
  ON important_dates FOR DELETE
  USING (auth.uid() = customer_id);

-- Orders: Users can view their own orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = customer_id);

-- Order Items: Users can view items of their own orders
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.customer_id = auth.uid()
  ));

-- Flower Miles: Users can view their own transactions
CREATE POLICY "Users can view own miles transactions"
  ON flower_miles_transactions FOR SELECT
  USING (auth.uid() = customer_id);

-- User Flower Impact: Users can view their own impact
CREATE POLICY "Users can view own impact"
  ON user_flower_impact FOR SELECT
  USING (auth.uid() = customer_id);

-- Reviews: Users can manage their own reviews
CREATE POLICY "Users can view own reviews"
  ON reviews FOR SELECT
  USING (auth.uid() = customer_id);

CREATE POLICY "Users can insert own reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = customer_id);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_saved_addresses_updated_at
  BEFORE UPDATE ON saved_addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_important_dates_updated_at
  BEFORE UPDATE ON important_dates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_farmers_updated_at
  BEFORE UPDATE ON farmers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_florists_updated_at
  BEFORE UPDATE ON florists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to create customer profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO customers (id, email)
  VALUES (NEW.id, NEW.email);

  INSERT INTO user_flower_impact (customer_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create customer on auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update customer rank based on lifetime miles
CREATE OR REPLACE FUNCTION update_customer_rank()
RETURNS TRIGGER AS $$
BEGIN
  NEW.rank = CASE
    WHEN NEW.lifetime_miles >= 10000 THEN 'platinum'
    WHEN NEW.lifetime_miles >= 5000 THEN 'gold'
    WHEN NEW.lifetime_miles >= 1000 THEN 'silver'
    ELSE 'bronze'
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rank_on_miles_change
  BEFORE UPDATE OF lifetime_miles ON customers
  FOR EACH ROW EXECUTE FUNCTION update_customer_rank();

-- =====================================================
-- INDEXES FOR COMMON QUERIES
-- =====================================================

-- Composite indexes for common query patterns
CREATE INDEX idx_products_published_featured ON products(is_published, is_featured);
CREATE INDEX idx_orders_customer_status ON orders(customer_id, status);
CREATE INDEX idx_order_items_order_product ON order_items(order_id, product_id);
