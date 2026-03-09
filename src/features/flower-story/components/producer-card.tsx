import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Farmer, LocaleCode } from '@/lib/supabase/types';
import { getFarmerName, getFarmerStory } from '../types';

interface ProducerCardProps {
  farmer: Farmer;
  locale: LocaleCode;
}

export async function ProducerCard({ farmer, locale }: ProducerCardProps) {
  const t = await getTranslations('flower_story');
  const name = getFarmerName(farmer, locale);
  const story = getFarmerStory(farmer, locale);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          {t('producer_story')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          {farmer.profile_image_url && (
            <div className="shrink-0">
              <Image
                src={farmer.profile_image_url}
                alt={name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div>
          )}
          <div className="space-y-2">
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{farmer.region}</p>
            {story && (
              <p className="text-sm leading-relaxed">{story}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
