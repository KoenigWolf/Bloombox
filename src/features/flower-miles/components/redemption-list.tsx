'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { MilesRedemption } from '../types';

interface RedemptionListProps {
  redemptions: MilesRedemption[];
  currentMiles: number;
}

const categoryIcons = {
  discount: '🏷️',
  gift: '🎁',
  upgrade: '⬆️',
  donation: '💚',
} as const;

export function RedemptionList({
  redemptions,
  currentMiles,
}: RedemptionListProps) {
  const t = useTranslations('flower_miles');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('redeem_miles')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {redemptions.map((item) => {
            const canRedeem = currentMiles >= item.requiredMiles;

            return (
              <li
                key={item.id}
                className={`p-4 border rounded-lg ${
                  canRedeem ? 'bg-white' : 'bg-neutral-50 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <span className="text-2xl">{categoryIcons[item.category]}</span>
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-primary">
                      {item.requiredMiles.toLocaleString()} {t('miles_unit')}
                    </p>
                    <Button
                      size="sm"
                      variant={canRedeem ? 'default' : 'outline'}
                      disabled={!canRedeem}
                      className="mt-2"
                    >
                      {canRedeem ? t('redeem') : t('not_enough_miles')}
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
