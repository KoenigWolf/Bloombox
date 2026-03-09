import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FlowerBatch, LocaleCode } from '@/lib/supabase/types';
import { getBatchStory } from '../types';

interface FlowerTimelineProps {
  batch: FlowerBatch;
  locale: LocaleCode;
}

export async function FlowerTimeline({ batch, locale }: FlowerTimelineProps) {
  const t = await getTranslations('flower_story');
  const story = getBatchStory(batch, locale);

  const harvestDate = new Date(batch.harvest_date);
  const formattedDate = harvestDate.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-2xl">⏰</span>
          {t('time_story')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Timeline */}
          <div className="relative pl-6 border-l-2 border-primary-200">
            {/* Harvest Event */}
            <div className="relative mb-6">
              <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-primary-500 border-2 border-white" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-primary-600">
                  {t('harvested')}
                </p>
                <p className="text-sm text-muted-foreground">{formattedDate}</p>
                <p className="text-sm">{batch.origin_region}</p>
              </div>
            </div>

            {/* Batch Code */}
            <div className="relative mb-6">
              <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-primary-300 border-2 border-white" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-primary-600">
                  {t('batch_code')}
                </p>
                <p className="text-xs font-mono bg-neutral-100 inline-block px-2 py-1 rounded">
                  {batch.batch_code}
                </p>
              </div>
            </div>

            {/* Carbon Footprint */}
            {batch.carbon_footprint_kg && (
              <div className="relative">
                <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-green-600">
                    {t('carbon_footprint')}
                  </p>
                  <p className="text-sm">
                    {batch.carbon_footprint_kg} kg CO₂
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Batch Story */}
          {story && (
            <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
              <p className="text-sm leading-relaxed">{story}</p>
            </div>
          )}

          {/* Rescue Badge */}
          {batch.is_rescue && (
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-lg">🌱</span>
              <div>
                <p className="text-sm font-medium text-green-700">
                  {t('rescue_flower')}
                </p>
                {batch.rescue_reason && (
                  <p className="text-xs text-green-600">
                    {t('rescue_reason')}: {batch.rescue_reason}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
