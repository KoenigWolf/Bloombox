import type { Product, ProductFilters, ProductSortOption } from './types';

// 仮のモックデータ（後でSupabaseに置き換え）
const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'spring-bouquet',
    price: 5500,
    originalPrice: 6000,
    images: [
      {
        id: 'img1',
        url: 'products/spring-bouquet',
        alt: '春のブーケ',
        isPrimary: true,
      },
    ],
    translations: [
      {
        locale: 'ja',
        name: '春のブーケ',
        description:
          '春の訪れを感じさせる、パステルカラーのお花を集めたブーケです。チューリップ、ラナンキュラス、スイートピーなど、春を代表するお花をふんだんに使用しています。',
        shortDescription: '春の訪れを感じるパステルカラーのブーケ',
        flowerMeaning: '新しい始まり、希望、愛',
        careGuide:
          '直射日光を避け、涼しい場所に置いてください。水は毎日取り替えてください。',
      },
      {
        locale: 'en',
        name: 'Spring Bouquet',
        description:
          'A bouquet featuring pastel-colored flowers that evoke the arrival of spring. Includes tulips, ranunculus, and sweet peas.',
        shortDescription: 'A pastel bouquet celebrating spring',
        flowerMeaning: 'New beginnings, hope, love',
        careGuide:
          'Keep away from direct sunlight and in a cool place. Change water daily.',
      },
      {
        locale: 'zh',
        name: '春日花束',
        description:
          '以粉彩色调的鲜花打造的花束，让人感受到春天的气息。使用了郁金香、毛茛花、香豌豆等代表春天的花材。',
        shortDescription: '感受春日气息的粉彩花束',
        flowerMeaning: '新的开始、希望、爱',
        careGuide: '请避免阳光直射，放置在阴凉处。每天更换水。',
      },
      {
        locale: 'vi',
        name: 'Bó hoa Xuân',
        description:
          'Bó hoa với những bông hoa màu pastel gợi lên sự xuất hiện của mùa xuân. Bao gồm hoa tulip, hoa mao lương và hoa đậu ngọt.',
        shortDescription: 'Bó hoa pastel chào đón mùa xuân',
        flowerMeaning: 'Khởi đầu mới, hy vọng, tình yêu',
        careGuide:
          'Tránh ánh nắng trực tiếp và giữ ở nơi mát mẻ. Thay nước mỗi ngày.',
      },
    ],
    variants: [
      {
        id: 'v1',
        name: 'S',
        price: 5500,
        sku: 'SB-001-S',
        stockQuantity: 10,
        isDefault: true,
      },
      {
        id: 'v2',
        name: 'M',
        price: 7500,
        sku: 'SB-001-M',
        stockQuantity: 8,
        isDefault: false,
      },
      {
        id: 'v3',
        name: 'L',
        price: 10000,
        sku: 'SB-001-L',
        stockQuantity: 5,
        isDefault: false,
      },
    ],
    categoryId: 'bouquet',
    tags: ['spring', 'pastel', 'gift'],
    isPublished: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 24,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: '2',
    slug: 'rose-arrangement',
    price: 8000,
    images: [
      {
        id: 'img2',
        url: 'products/rose-arrangement',
        alt: 'ローズアレンジメント',
        isPrimary: true,
      },
    ],
    translations: [
      {
        locale: 'ja',
        name: 'ローズアレンジメント',
        description:
          '上品な赤いバラを中心に、グリーンをあしらった豪華なアレンジメント。特別な日のギフトにぴったりです。',
        shortDescription: '上品な赤いバラのアレンジメント',
        flowerMeaning: '愛、情熱、尊敬',
        careGuide:
          '水を切らさないようにし、直射日光を避けてください。',
      },
      {
        locale: 'en',
        name: 'Rose Arrangement',
        description:
          'A luxurious arrangement featuring elegant red roses with greenery. Perfect for special occasions.',
        shortDescription: 'Elegant red rose arrangement',
        flowerMeaning: 'Love, passion, respect',
        careGuide: 'Keep water fresh and avoid direct sunlight.',
      },
      {
        locale: 'zh',
        name: '玫瑰花艺',
        description: '以优雅的红玫瑰为主，搭配绿叶的豪华花艺。适合特别的日子送礼。',
        shortDescription: '优雅的红玫瑰花艺',
        flowerMeaning: '爱、热情、尊重',
        careGuide: '保持水的新鲜，避免阳光直射。',
      },
      {
        locale: 'vi',
        name: 'Cắm hoa Hồng',
        description:
          'Một sự sắp xếp sang trọng với những bông hồng đỏ thanh lịch cùng cây xanh. Hoàn hảo cho những dịp đặc biệt.',
        shortDescription: 'Cắm hoa hồng đỏ thanh lịch',
        flowerMeaning: 'Tình yêu, đam mê, sự tôn trọng',
        careGuide: 'Giữ nước tươi và tránh ánh nắng trực tiếp.',
      },
    ],
    variants: [
      {
        id: 'v4',
        name: 'Standard',
        price: 8000,
        sku: 'RA-001',
        stockQuantity: 15,
        isDefault: true,
      },
    ],
    categoryId: 'arrangement',
    tags: ['rose', 'elegant', 'anniversary'],
    isPublished: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 42,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-03-05T00:00:00Z',
  },
  {
    id: '3',
    slug: 'sunflower-joy',
    price: 4500,
    images: [
      {
        id: 'img3',
        url: 'products/sunflower-joy',
        alt: 'ひまわりの喜び',
        isPrimary: true,
      },
    ],
    translations: [
      {
        locale: 'ja',
        name: 'ひまわりの喜び',
        description:
          '元気いっぱいのひまわりを主役にした、明るいブーケ。見る人を笑顔にする力があります。',
        shortDescription: '元気いっぱいのひまわりブーケ',
        flowerMeaning: 'あなただけを見つめる、崇拝、憧れ',
        careGuide:
          '茎を斜めにカットし、たっぷりの水に入れてください。',
      },
      {
        locale: 'en',
        name: 'Sunflower Joy',
        description:
          'A bright bouquet featuring cheerful sunflowers. Has the power to bring smiles to everyone.',
        shortDescription: 'Cheerful sunflower bouquet',
        flowerMeaning: 'Adoration, loyalty, longevity',
        careGuide: 'Cut stems at an angle and place in plenty of water.',
      },
      {
        locale: 'zh',
        name: '向日葵之喜',
        description: '以充满活力的向日葵为主角的明亮花束。能让看到的人露出笑容。',
        shortDescription: '充满活力的向日葵花束',
        flowerMeaning: '崇拜、忠诚、长寿',
        careGuide: '将茎斜切，放入充足的水中。',
      },
      {
        locale: 'vi',
        name: 'Niềm vui Hướng dương',
        description:
          'Bó hoa tươi sáng với những bông hướng dương vui vẻ. Có sức mạnh mang lại nụ cười cho mọi người.',
        shortDescription: 'Bó hoa hướng dương vui vẻ',
        flowerMeaning: 'Sự ngưỡng mộ, lòng trung thành, tuổi thọ',
        careGuide: 'Cắt cuống xiên và đặt vào nhiều nước.',
      },
    ],
    variants: [
      {
        id: 'v5',
        name: 'Standard',
        price: 4500,
        sku: 'SF-001',
        stockQuantity: 20,
        isDefault: true,
      },
    ],
    categoryId: 'bouquet',
    tags: ['sunflower', 'cheerful', 'summer'],
    isPublished: true,
    isFeatured: false,
    rating: 4.7,
    reviewCount: 18,
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
];

export async function getProducts(
  filters?: ProductFilters,
  sort?: ProductSortOption
): Promise<Product[]> {
  // モックデータを返す（後でSupabaseクエリに置き換え）
  let products = [...mockProducts];

  // フィルタリング
  if (filters?.category) {
    products = products.filter((p) => p.categoryId === filters.category);
  }
  if (filters?.minPrice) {
    products = products.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters?.maxPrice) {
    products = products.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    products = products.filter((p) =>
      p.translations.some(
        (t) =>
          t.name.toLowerCase().includes(searchLower) ||
          t.description.toLowerCase().includes(searchLower)
      )
    );
  }

  // ソート
  switch (sort) {
    case 'price_asc':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'popular':
      products.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case 'newest':
    default:
      products.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  return products;
}

export async function getProduct(slug: string): Promise<Product | null> {
  const product = mockProducts.find((p) => p.slug === slug);
  return product || null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return mockProducts.filter((p) => p.isFeatured);
}
