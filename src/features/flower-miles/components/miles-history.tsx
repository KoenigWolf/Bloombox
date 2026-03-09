import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FlowerMilesTransaction } from '@/lib/supabase/types';

interface MilesHistoryProps {
  transactions: FlowerMilesTransaction[];
}

export async function MilesHistory({ transactions }: MilesHistoryProps) {
  const t = await getTranslations('flower_miles');

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('history')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            {t('no_transactions')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('history')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {transactions.map((tx) => {
            const isEarned = tx.transaction_type === 'earned';
            const date = new Date(tx.created_at);

            return (
              <li
                key={tx.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {date.toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      isEarned ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {isEarned ? '+' : ''}
                    {tx.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t('balance')}: {tx.balance_after.toLocaleString()}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
