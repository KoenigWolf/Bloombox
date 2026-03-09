import type {
  Farmer,
  Florist,
  FlowerBatch,
  ProductWithDetails,
} from '@/lib/supabase/types';
import type { LocaleCode } from '@/lib/supabase/types';

export interface FlowerStory {
  product: ProductWithDetails;
  batch: FlowerBatchWithDetails | null;
  farmer: Farmer | null;
  florist: Florist | null;
}

export interface FlowerBatchWithDetails extends FlowerBatch {
  farmer: Farmer | null;
}

export interface StoryTimelineEvent {
  date: string;
  type: 'harvest' | 'arranged' | 'shipped' | 'delivered';
  title: string;
  description?: string;
  location?: string;
}

export interface LocalizedContent {
  ja: string;
  en: string | null;
  zh: string | null;
  vi: string | null;
}

export function getLocalizedText(
  content: LocalizedContent,
  locale: LocaleCode
): string {
  return content[locale] || content.ja;
}

export function getFarmerName(farmer: Farmer, locale: LocaleCode): string {
  const names = {
    ja: farmer.name_ja,
    en: farmer.name_en,
    zh: farmer.name_zh,
    vi: farmer.name_vi,
  };
  return names[locale] || farmer.name_ja;
}

export function getFarmerStory(farmer: Farmer, locale: LocaleCode): string | null {
  const stories = {
    ja: farmer.story_ja,
    en: farmer.story_en,
    zh: farmer.story_zh,
    vi: farmer.story_vi,
  };
  return stories[locale] || farmer.story_ja;
}

export function getFloristName(florist: Florist, locale: LocaleCode): string {
  const names = {
    ja: florist.name_ja,
    en: florist.name_en,
    zh: florist.name_zh,
    vi: florist.name_vi,
  };
  return names[locale] || florist.name_ja;
}

export function getFloristBio(florist: Florist, locale: LocaleCode): string | null {
  const bios = {
    ja: florist.bio_ja,
    en: florist.bio_en,
    zh: florist.bio_zh,
    vi: florist.bio_vi,
  };
  return bios[locale] || florist.bio_ja;
}

export function getBatchStory(batch: FlowerBatch, locale: LocaleCode): string | null {
  const stories = {
    ja: batch.story_ja,
    en: batch.story_en,
    zh: batch.story_zh,
    vi: batch.story_vi,
  };
  return stories[locale] || batch.story_ja;
}
