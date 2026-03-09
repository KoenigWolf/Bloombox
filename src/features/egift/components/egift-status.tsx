import { getTranslations } from 'next-intl/server';
import { Card, CardContent } from '@/components/ui/card';
import type { EGift } from '../types';

interface EGiftStatusProps {
  egift: EGift;
}

const statusConfig = {
  pending: {
    emoji: '📬',
    color: 'bg-yellow-100 text-yellow-800',
  },
  claimed: {
    emoji: '✅',
    color: 'bg-green-100 text-green-800',
  },
  shipped: {
    emoji: '🚚',
    color: 'bg-blue-100 text-blue-800',
  },
  delivered: {
    emoji: '🎁',
    color: 'bg-purple-100 text-purple-800',
  },
  expired: {
    emoji: '⏰',
    color: 'bg-gray-100 text-gray-800',
  },
};

export async function EGiftStatusCard({ egift }: EGiftStatusProps) {
  const t = await getTranslations('egift');
  const config = statusConfig[egift.status];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{config.emoji}</span>
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
              {t(`status_${egift.status}`)}
            </span>
            {egift.claimedAt && (
              <p className="text-sm text-muted-foreground mt-1">
                {t('claimed_at', {
                  date: new Date(egift.claimedAt).toLocaleDateString('ja-JP'),
                })}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
