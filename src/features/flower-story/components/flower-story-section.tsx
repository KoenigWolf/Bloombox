import { getTranslations } from 'next-intl/server';
import type { LocaleCode } from '@/lib/supabase/types';
import type { FlowerStory } from '../types';
import { ProducerCard } from './producer-card';
import { FlowerTimeline } from './flower-timeline';
import { FlowerMeaningCard } from './flower-meaning-card';

interface FlowerStorySectionProps {
  story: FlowerStory;
  locale: LocaleCode;
}

export async function FlowerStorySection({
  story,
  locale,
}: FlowerStorySectionProps) {
  const t = await getTranslations('flower_story');

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t('title')}</h2>
        <p className="text-muted-foreground mt-2">{t('subtitle')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Flower Meaning */}
        {story.product.meanings && story.product.meanings.length > 0 && (
          <FlowerMeaningCard meanings={story.product.meanings} locale={locale} />
        )}

        {/* Producer Story */}
        {story.farmer && (
          <ProducerCard farmer={story.farmer} locale={locale} />
        )}

        {/* Time Story (Batch Timeline) */}
        {story.batch && (
          <FlowerTimeline batch={story.batch} locale={locale} />
        )}
      </div>
    </section>
  );
}
