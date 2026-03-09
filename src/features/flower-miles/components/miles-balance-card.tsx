import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { MilesBalance } from '../types';
import { getRankProgress } from '../queries';

interface MilesBalanceCardProps {
  balance: MilesBalance;
}

const rankColors = {
  bronze: 'bg-amber-600',
  silver: 'bg-gray-400',
  gold: 'bg-yellow-500',
  platinum: 'bg-purple-600',
} as const;

const rankEmojis = {
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
  platinum: '💎',
} as const;

export async function MilesBalanceCard({ balance }: MilesBalanceCardProps) {
  const t = await getTranslations('flower_miles');
  const { progress } = getRankProgress(balance.lifetimeMiles);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t('your_miles')}</span>
          <span className="text-sm font-normal">
            {rankEmojis[balance.rank]} {t(`rank_${balance.rank}`)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Miles */}
        <div className="text-center">
          <p className="text-4xl font-bold text-primary">
            {balance.currentMiles.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">{t('current_miles')}</p>
        </div>

        {/* Rank Progress */}
        {balance.nextRank && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="capitalize">{balance.rank}</span>
              <span className="capitalize">{balance.nextRank}</span>
            </div>
            <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${rankColors[balance.rank]} transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-center text-muted-foreground">
              {t('miles_until_next_rank', { miles: balance.milesUntilNextRank })}
            </p>
          </div>
        )}

        {/* Lifetime Miles */}
        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t('lifetime_miles')}</span>
            <span className="font-medium">
              {balance.lifetimeMiles.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
