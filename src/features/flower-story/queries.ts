import type { FlowerStory } from './types';
import type {
  Farmer,
  Florist,
  FlowerBatch,
  ProductWithDetails,
  LocaleCode,
} from '@/lib/supabase/types';

// Mock data for development
const mockFarmers: Farmer[] = [
  {
    id: 'farmer-1',
    slug: 'tanaka-farm',
    name_ja: '田中農園',
    name_en: 'Tanaka Farm',
    name_zh: '田中农园',
    name_vi: 'Nông trại Tanaka',
    region: '千葉県南房総市',
    story_ja:
      '三代続く花農家。温暖な気候を活かし、一年を通じて色とりどりの花を栽培しています。「花は人の心を豊かにする」という信念のもと、丁寧な栽培を心がけています。',
    story_en:
      "A third-generation flower farm. Taking advantage of the warm climate, we cultivate colorful flowers throughout the year. With the belief that 'flowers enrich people's hearts,' we practice careful cultivation.",
    story_zh:
      '三代花农世家。利用温暖的气候，全年培育各种色彩的鲜花。本着"花能丰富人心"的信念，我们用心栽培每一朵花。',
    story_vi:
      'Trang trại hoa ba đời. Tận dụng khí hậu ấm áp, chúng tôi trồng hoa nhiều màu sắc quanh năm. Với niềm tin "hoa làm giàu tâm hồn con người," chúng tôi chăm sóc từng bông hoa.',
    profile_image_url: 'farmers/tanaka-profile',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'farmer-2',
    slug: 'yamamoto-rose-garden',
    name_ja: '山本バラ園',
    name_en: 'Yamamoto Rose Garden',
    name_zh: '山本玫瑰园',
    name_vi: 'Vườn hồng Yamamoto',
    region: '静岡県浜松市',
    story_ja:
      'バラ一筋50年。品種改良にも力を入れ、独自の品種も開発しています。一輪一輪に愛情を込めて育てた薔薇は、香り高く長持ちすると評判です。',
    story_en:
      '50 years dedicated to roses. We also focus on breeding and have developed our own varieties. Our roses, grown with love for each bloom, are renowned for their fragrance and longevity.',
    story_zh:
      '专注玫瑰50年。我们也致力于品种改良，开发了独特品种。每一朵用心培育的玫瑰，以其芬芳和持久而闻名。',
    story_vi:
      '50 năm chuyên về hoa hồng. Chúng tôi cũng tập trung vào lai tạo và đã phát triển các giống riêng. Những bông hồng được nuôi dưỡng với tình yêu nổi tiếng về hương thơm và độ bền.',
    profile_image_url: 'farmers/yamamoto-profile',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

const mockFlorists: Florist[] = [
  {
    id: 'florist-1',
    slug: 'hana-atelier',
    name_ja: '花工房 はな',
    name_en: 'Hana Atelier',
    name_zh: '花工坊 花',
    name_vi: 'Xưởng Hoa Hana',
    bio_ja:
      'フラワーデザイナー歴20年。季節感を大切にしたアレンジメントが得意です。お客様の想いを花で表現することを心がけています。',
    bio_en:
      "20 years as a floral designer. Specializing in seasonal arrangements. I strive to express customers' feelings through flowers.",
    bio_zh:
      '花艺设计师20年。擅长季节感强的花艺设计。致力于用花表达客户的心意。',
    bio_vi:
      '20 năm thiết kế hoa. Chuyên về các kiểu cắm hoa theo mùa. Tôi cố gắng thể hiện cảm xúc của khách hàng qua từng bó hoa.',
    profile_image_url: 'florists/hana-profile',
    is_active: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];

const mockBatches: FlowerBatch[] = [
  {
    id: 'batch-1',
    batch_code: 'BT-2024-0315-001',
    farmer_id: 'farmer-1',
    flower_type: 'バラ',
    harvest_date: '2024-03-15',
    origin_region: '千葉県南房総市',
    story_ja:
      '今年は暖冬の影響で、例年より早く開花しました。特に色づきが良く、香りも豊かな仕上がりです。',
    story_en:
      'Due to the mild winter this year, they bloomed earlier than usual. The coloring is especially good and the fragrance is rich.',
    story_zh: '今年暖冬影响，比往年更早开花。颜色特别好，香气也很浓郁。',
    story_vi:
      'Do mùa đông ấm năm nay, hoa nở sớm hơn bình thường. Màu sắc đặc biệt đẹp và hương thơm phong phú.',
    is_rescue: false,
    rescue_reason: null,
    carbon_footprint_kg: 0.5,
    created_at: '2024-03-15T00:00:00Z',
  },
  {
    id: 'batch-2',
    batch_code: 'BT-2024-0310-001',
    farmer_id: 'farmer-2',
    flower_type: 'カーネーション',
    harvest_date: '2024-03-10',
    origin_region: '静岡県浜松市',
    story_ja:
      '母の日に向けて大切に育てたカーネーション。感謝の気持ちを込めて、一本一本丁寧に摘み取りました。',
    story_en:
      "Carnations carefully grown for Mother's Day. Picked one by one with gratitude.",
    story_zh: '为母亲节精心培育的康乃馨。满怀感激之情，一枝枝精心采摘。',
    story_vi:
      'Hoa cẩm chướng được trồng cẩn thận cho Ngày của Mẹ. Từng bông được hái với lòng biết ơn.',
    is_rescue: true,
    rescue_reason: 'イベント中止',
    carbon_footprint_kg: 0.3,
    created_at: '2024-03-10T00:00:00Z',
  },
];

export async function getFlowerStory(
  productId: string,
  _locale: LocaleCode
): Promise<FlowerStory | null> {
  // In production, this would fetch from Supabase
  // For now, return mock data

  const mockProduct: ProductWithDetails = {
    id: productId,
    slug: 'spring-bouquet',
    sku: 'BB-SP-001',
    base_price: 5500,
    original_price: null,
    category: 'bouquet',
    tags: ['spring', 'gift', 'birthday'],
    is_published: true,
    is_featured: true,
    stock_quantity: 10,
    sort_order: 0,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    translations: [],
    images: [],
    variants: [],
    meanings: [],
  };

  const batch = mockBatches[0];
  const farmer = mockFarmers.find((f) => f.id === batch.farmer_id) || null;
  const florist = mockFlorists[0];

  return {
    product: mockProduct,
    batch: batch ? { ...batch, farmer } : null,
    farmer,
    florist,
  };
}

export async function getFarmers(): Promise<Farmer[]> {
  // In production, fetch from Supabase
  return mockFarmers;
}

export async function getFarmerBySlug(slug: string): Promise<Farmer | null> {
  return mockFarmers.find((f) => f.slug === slug) || null;
}

export async function getFlorists(): Promise<Florist[]> {
  return mockFlorists;
}

export async function getFloristBySlug(slug: string): Promise<Florist | null> {
  return mockFlorists.find((f) => f.slug === slug) || null;
}

export async function getFlowerBatch(batchCode: string): Promise<FlowerBatch | null> {
  return mockBatches.find((b) => b.batch_code === batchCode) || null;
}
