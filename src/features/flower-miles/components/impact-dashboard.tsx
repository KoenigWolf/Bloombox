import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ImpactSummary } from '../types';

interface ImpactDashboardProps {
  impact: ImpactSummary;
}

export async function ImpactDashboard({ impact }: ImpactDashboardProps) {
  const t = await getTranslations('flower_impact');

  const stats = [
    {
      icon: '🌸',
      value: impact.total_flowers_purchased,
      label: t('flowers_purchased'),
    },
    {
      icon: '🌱',
      value: impact.rescued_flowers_count,
      label: t('flowers_rescued'),
    },
    {
      icon: '🌍',
      value: `${impact.carbon_offset_total_kg} kg`,
      label: t('carbon_saved'),
    },
    {
      icon: '👨‍🌾',
      value: impact.farmers_supported,
      label: t('farmers_supported'),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          {t('your_impact')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 bg-green-50 rounded-lg"
            >
              <span className="text-3xl">{stat.icon}</span>
              <p className="text-2xl font-bold text-green-700 mt-2">
                {stat.value}
              </p>
              <p className="text-sm text-green-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Comparison Text */}
        {impact.comparisonText && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 leading-relaxed">
              {impact.comparisonText}
            </p>
          </div>
        )}

        {/* Total Orders */}
        <div className="text-center pt-4 border-t">
          <p className="text-muted-foreground">
            {t('total_orders', { count: impact.total_orders })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
