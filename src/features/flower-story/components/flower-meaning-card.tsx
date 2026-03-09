import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FlowerMeaning, LocaleCode } from '@/lib/supabase/types';

interface FlowerMeaningCardProps {
  meanings: FlowerMeaning[];
  locale: LocaleCode;
}

export async function FlowerMeaningCard({
  meanings,
  locale,
}: FlowerMeaningCardProps) {
  const t = await getTranslations('flower_story');

  // Find meaning for current locale, fallback to Japanese
  const meaning =
    meanings.find((m) => m.locale === locale) ||
    meanings.find((m) => m.locale === 'ja');

  if (!meaning) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          {t('flower_meaning')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg italic text-primary-700 leading-relaxed">
          &ldquo;{meaning.meaning}&rdquo;
        </p>
      </CardContent>
    </Card>
  );
}
