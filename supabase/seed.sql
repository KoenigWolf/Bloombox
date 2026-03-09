-- =====================================================
-- Bloombox Seed Data
-- Description: Initial data for development and testing
-- =====================================================

-- =====================================================
-- FARMERS
-- =====================================================

INSERT INTO farmers (id, slug, name_ja, name_en, region, story_ja, story_en, profile_image_url, is_active)
VALUES
  (
    'f1000000-0000-0000-0000-000000000001',
    'tanaka-farm',
    '田中農園',
    'Tanaka Farm',
    '千葉県南房総市',
    '三代続く花農家。温暖な気候を活かし、一年を通じて高品質なお花を栽培しています。「花は人の心を豊かにする」という信念のもと、一本一本丁寧に育てています。',
    'A third-generation flower farm. Taking advantage of the warm climate, we grow high-quality flowers year-round. With the belief that "flowers enrich people''s hearts," we carefully nurture each stem.',
    'farmers/tanaka-farm',
    true
  ),
  (
    'f2000000-0000-0000-0000-000000000002',
    'yamamoto-orchid',
    '山本蘭園',
    'Yamamoto Orchid Garden',
    '愛知県田原市',
    '胡蝶蘭専門の農園。40年以上の経験を持つ職人が、一鉢一鉢に愛情を込めて栽培。贈り物に最適な最高品質の胡蝶蘭をお届けします。',
    'A farm specializing in orchids. Craftsmen with over 40 years of experience cultivate each pot with love. We deliver the finest quality orchids perfect for gifts.',
    'farmers/yamamoto-orchid',
    true
  ),
  (
    'f3000000-0000-0000-0000-000000000003',
    'suzuki-rose',
    '鈴木バラ園',
    'Suzuki Rose Garden',
    '山形県',
    '寒暖差を活かした香り高いバラを栽培。農薬を最小限に抑えた栽培方法で、人にも環境にも優しいバラ作りを心がけています。',
    'Growing fragrant roses that benefit from temperature differences. With minimal pesticide use, we focus on creating roses that are gentle to both people and the environment.',
    'farmers/suzuki-rose',
    true
  );

-- =====================================================
-- FLORISTS
-- =====================================================

INSERT INTO florists (id, slug, name_ja, name_en, bio_ja, bio_en, profile_image_url, is_active)
VALUES
  (
    'f1100000-0000-0000-0000-000000000001',
    'sakura-design',
    '佐倉 美咲',
    'Misaki Sakura',
    'パリで花の修行を積んだ後、東京でフローリストとして独立。日本の四季を大切にしながら、モダンなエッセンスを加えたアレンジメントが得意。',
    'After training in Paris, became an independent florist in Tokyo. Specializes in arrangements that value Japanese seasons while adding modern essence.',
    'florists/sakura-design',
    true
  ),
  (
    'f2200000-0000-0000-0000-000000000002',
    'green-style',
    '緑川 健太',
    'Kenta Midorikawa',
    'サステナブルな花のある暮らしを提案。ロスフラワーを活用したアレンジメントや、長く楽しめるドライフラワーのブーケが人気。',
    'Proposes sustainable living with flowers. Popular for arrangements using rescued flowers and dry flower bouquets that last long.',
    'florists/green-style',
    true
  );

-- =====================================================
-- FLOWER BATCHES
-- =====================================================

INSERT INTO flower_batches (id, batch_code, farmer_id, flower_type, harvest_date, origin_region, story_ja, story_en, is_rescue, carbon_footprint_kg)
VALUES
  (
    'b1000000-0000-0000-0000-000000000001',
    'BB-2024-001',
    'f1000000-0000-0000-0000-000000000001',
    'tulip',
    '2024-03-01',
    '千葉県南房総市',
    '早春の陽光をたっぷり浴びて育った、色鮮やかなチューリップです。',
    'Vibrant tulips grown in the early spring sunshine.',
    false,
    0.5
  ),
  (
    'b2000000-0000-0000-0000-000000000002',
    'BB-2024-002',
    'f3000000-0000-0000-0000-000000000003',
    'rose',
    '2024-03-05',
    '山形県',
    '山形の寒暖差で育まれた、香り豊かな赤いバラです。',
    'Fragrant red roses nurtured by Yamagata''s temperature differences.',
    false,
    0.8
  ),
  (
    'b3000000-0000-0000-0000-000000000003',
    'BB-2024-003',
    'f1000000-0000-0000-0000-000000000001',
    'sunflower',
    '2024-03-08',
    '千葉県南房総市',
    '規格外サイズのため通常流通に乗らなかった元気いっぱいのひまわり。品質は正規品と変わりません。',
    'Cheerful sunflowers that couldn''t go through regular distribution due to non-standard size. Quality is the same as regular products.',
    true,
    0.3
  );

-- =====================================================
-- PRODUCTS
-- =====================================================

INSERT INTO products (id, slug, sku, base_price, original_price, category, tags, is_published, is_featured, stock_quantity, sort_order)
VALUES
  (
    '01000000-0000-0000-0000-000000000001',
    'spring-bouquet',
    'SB-001',
    5500,
    6000,
    'bouquet',
    ARRAY['spring', 'pastel', 'gift', 'popular'],
    true,
    true,
    50,
    1
  ),
  (
    '02000000-0000-0000-0000-000000000002',
    'rose-arrangement',
    'RA-001',
    8000,
    NULL,
    'arrangement',
    ARRAY['rose', 'elegant', 'anniversary', 'premium'],
    true,
    true,
    30,
    2
  ),
  (
    '03000000-0000-0000-0000-000000000003',
    'sunflower-joy',
    'SF-001',
    4500,
    NULL,
    'bouquet',
    ARRAY['sunflower', 'cheerful', 'summer', 'rescue'],
    true,
    false,
    100,
    3
  ),
  (
    '04000000-0000-0000-0000-000000000004',
    'orchid-elegance',
    'OR-001',
    15000,
    NULL,
    'plant',
    ARRAY['orchid', 'luxury', 'business', 'congratulations'],
    true,
    true,
    20,
    4
  );

-- =====================================================
-- PRODUCT TRANSLATIONS
-- =====================================================

INSERT INTO product_translations (product_id, locale, name, description, short_description, care_guide)
VALUES
  -- Spring Bouquet
  ('01000000-0000-0000-0000-000000000001', 'ja', '春のブーケ', '春の訪れを感じさせる、パステルカラーのお花を集めたブーケです。チューリップ、ラナンキュラス、スイートピーなど、春を代表するお花をふんだんに使用しています。', '春の訪れを感じるパステルカラーのブーケ', '直射日光を避け、涼しい場所に置いてください。水は毎日取り替えてください。'),
  ('01000000-0000-0000-0000-000000000001', 'en', 'Spring Bouquet', 'A bouquet featuring pastel-colored flowers that evoke the arrival of spring. Includes tulips, ranunculus, and sweet peas.', 'A pastel bouquet celebrating spring', 'Keep away from direct sunlight and in a cool place. Change water daily.'),
  ('01000000-0000-0000-0000-000000000001', 'zh', '春日花束', '以粉彩色调的鲜花打造的花束，让人感受到春天的气息。使用了郁金香、毛茛花、香豌豆等代表春天的花材。', '感受春日气息的粉彩花束', '请避免阳光直射，放置在阴凉处。每天更换水。'),
  ('01000000-0000-0000-0000-000000000001', 'vi', 'Bó hoa Xuân', 'Bó hoa với những bông hoa màu pastel gợi lên sự xuất hiện của mùa xuân. Bao gồm hoa tulip, hoa mao lương và hoa đậu ngọt.', 'Bó hoa pastel chào đón mùa xuân', 'Tránh ánh nắng trực tiếp và giữ ở nơi mát mẻ. Thay nước mỗi ngày.'),

  -- Rose Arrangement
  ('02000000-0000-0000-0000-000000000002', 'ja', 'ローズアレンジメント', '上品な赤いバラを中心に、グリーンをあしらった豪華なアレンジメント。特別な日のギフトにぴったりです。', '上品な赤いバラのアレンジメント', '水を切らさないようにし、直射日光を避けてください。'),
  ('02000000-0000-0000-0000-000000000002', 'en', 'Rose Arrangement', 'A luxurious arrangement featuring elegant red roses with greenery. Perfect for special occasions.', 'Elegant red rose arrangement', 'Keep water fresh and avoid direct sunlight.'),
  ('02000000-0000-0000-0000-000000000002', 'zh', '玫瑰花艺', '以优雅的红玫瑰为主，搭配绿叶的豪华花艺。适合特别的日子送礼。', '优雅的红玫瑰花艺', '保持水的新鲜，避免阳光直射。'),
  ('02000000-0000-0000-0000-000000000002', 'vi', 'Cắm hoa Hồng', 'Một sự sắp xếp sang trọng với những bông hồng đỏ thanh lịch cùng cây xanh. Hoàn hảo cho những dịp đặc biệt.', 'Cắm hoa hồng đỏ thanh lịch', 'Giữ nước tươi và tránh ánh nắng trực tiếp.'),

  -- Sunflower Joy
  ('03000000-0000-0000-0000-000000000003', 'ja', 'ひまわりの喜び', '元気いっぱいのひまわりを主役にした、明るいブーケ。見る人を笑顔にする力があります。【ロスフラワー活用】規格外サイズのひまわりを使用し、フードロスならぬ「フラワーロス」削減に貢献。', '元気いっぱいのひまわりブーケ', '茎を斜めにカットし、たっぷりの水に入れてください。'),
  ('03000000-0000-0000-0000-000000000003', 'en', 'Sunflower Joy', 'A bright bouquet featuring cheerful sunflowers. Has the power to bring smiles to everyone. [Rescued Flowers] Uses non-standard size sunflowers, contributing to reducing "flower loss".', 'Cheerful sunflower bouquet', 'Cut stems at an angle and place in plenty of water.'),
  ('03000000-0000-0000-0000-000000000003', 'zh', '向日葵之喜', '以充满活力的向日葵为主角的明亮花束。能让看到的人露出笑容。【减少花卉浪费】使用规格外尺寸的向日葵，为减少"花卉浪费"做出贡献。', '充满活力的向日葵花束', '将茎斜切，放入充足的水中。'),
  ('03000000-0000-0000-0000-000000000003', 'vi', 'Niềm vui Hướng dương', 'Bó hoa tươi sáng với những bông hướng dương vui vẻ. Có sức mạnh mang lại nụ cười cho mọi người. [Hoa cứu hộ] Sử dụng hoa hướng dương kích thước không tiêu chuẩn.', 'Bó hoa hướng dương vui vẻ', 'Cắt cuống xiên và đặt vào nhiều nước.'),

  -- Orchid Elegance
  ('04000000-0000-0000-0000-000000000004', 'ja', '胡蝶蘭 エレガンス', '最高級の胡蝶蘭を厳選。開店祝い、就任祝いなどビジネスシーンでの贈り物に最適です。', '最高級の胡蝶蘭', '直射日光を避け、週に1回程度の水やりで長くお楽しみいただけます。'),
  ('04000000-0000-0000-0000-000000000004', 'en', 'Orchid Elegance', 'Carefully selected premium orchids. Perfect for business occasions like store openings and promotions.', 'Premium orchid', 'Avoid direct sunlight and water about once a week for long-lasting enjoyment.'),
  ('04000000-0000-0000-0000-000000000004', 'zh', '蝴蝶兰典雅', '精选最高级蝴蝶兰。适合开业庆典、就职庆祝等商务场合的礼品。', '最高级蝴蝶兰', '避免阳光直射，每周浇水一次左右可长时间观赏。'),
  ('04000000-0000-0000-0000-000000000004', 'vi', 'Lan Hồ Điệp Sang Trọng', 'Lan hồ điệp cao cấp được chọn lọc kỹ càng. Hoàn hảo cho các dịp kinh doanh như khai trương cửa hàng.', 'Lan hồ điệp cao cấp', 'Tránh ánh nắng trực tiếp và tưới nước khoảng một lần một tuần.');

-- =====================================================
-- PRODUCT IMAGES
-- =====================================================

INSERT INTO product_images (product_id, cloudinary_public_id, alt_text_ja, alt_text_en, is_primary, sort_order)
VALUES
  ('01000000-0000-0000-0000-000000000001', 'products/spring-bouquet-1', '春のブーケ メイン画像', 'Spring Bouquet Main', true, 1),
  ('01000000-0000-0000-0000-000000000001', 'products/spring-bouquet-2', '春のブーケ 詳細', 'Spring Bouquet Detail', false, 2),
  ('02000000-0000-0000-0000-000000000002', 'products/rose-arrangement-1', 'ローズアレンジメント メイン画像', 'Rose Arrangement Main', true, 1),
  ('03000000-0000-0000-0000-000000000003', 'products/sunflower-joy-1', 'ひまわりの喜び メイン画像', 'Sunflower Joy Main', true, 1),
  ('04000000-0000-0000-0000-000000000004', 'products/orchid-elegance-1', '胡蝶蘭 エレガンス メイン画像', 'Orchid Elegance Main', true, 1);

-- =====================================================
-- PRODUCT VARIANTS
-- =====================================================

INSERT INTO product_variants (product_id, name, sku_suffix, price, stock_quantity, is_default, sort_order)
VALUES
  -- Spring Bouquet variants
  ('01000000-0000-0000-0000-000000000001', 'S', 'S', 5500, 20, true, 1),
  ('01000000-0000-0000-0000-000000000001', 'M', 'M', 7500, 15, false, 2),
  ('01000000-0000-0000-0000-000000000001', 'L', 'L', 10000, 10, false, 3),

  -- Rose Arrangement (single variant)
  ('02000000-0000-0000-0000-000000000002', 'Standard', 'STD', 8000, 30, true, 1),

  -- Sunflower Joy (single variant)
  ('03000000-0000-0000-0000-000000000003', 'Standard', 'STD', 4500, 100, true, 1),

  -- Orchid variants
  ('04000000-0000-0000-0000-000000000004', '3本立ち', '3', 15000, 10, true, 1),
  ('04000000-0000-0000-0000-000000000004', '5本立ち', '5', 25000, 5, false, 2);

-- =====================================================
-- FLOWER MEANINGS
-- =====================================================

INSERT INTO flower_meanings (product_id, locale, meaning)
VALUES
  ('01000000-0000-0000-0000-000000000001', 'ja', '新しい始まり、希望、愛'),
  ('01000000-0000-0000-0000-000000000001', 'en', 'New beginnings, hope, love'),
  ('02000000-0000-0000-0000-000000000002', 'ja', '愛、情熱、尊敬'),
  ('02000000-0000-0000-0000-000000000002', 'en', 'Love, passion, respect'),
  ('03000000-0000-0000-0000-000000000003', 'ja', 'あなただけを見つめる、崇拝、憧れ'),
  ('03000000-0000-0000-0000-000000000003', 'en', 'Adoration, loyalty, longevity'),
  ('04000000-0000-0000-0000-000000000004', 'ja', '幸福が飛んでくる、純粋な愛'),
  ('04000000-0000-0000-0000-000000000004', 'en', 'Happiness is coming, pure love');
