import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getCurrentUser } from '@/features/auth';
import { SignoutButton } from '@/features/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/layout/container';

export default async function MyPage() {
  const t = await getTranslations('mypage');
  const user = await getCurrentUser();

  return (
    <Container className="py-8">
      <h1 className="text-4xl md:text-5xl font-serif font-medium mb-8 text-foreground tracking-tight">{t('title')}</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-serif font-medium">{t('profile')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="text-muted-foreground">{t('email')}:</span>{' '}
                {user?.email}
              </p>
              <p>
                <span className="text-muted-foreground">{t('name')}:</span>{' '}
                {user?.customer?.name || t('not_set')}
              </p>
            </div>
            <Link
              href="/settings"
              className="text-sm text-primary hover:underline mt-4 inline-block"
            >
              {t('edit_profile')}
            </Link>
          </CardContent>
        </Card>

        {/* Flower Miles Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-serif font-medium">{t('flower_miles')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">
              {user?.customer?.flower_miles || 0}
              <span className="text-base font-normal ml-1">{t('miles')}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {t('rank')}: {user?.customer?.rank || 'bronze'}
            </p>
          </CardContent>
        </Card>

        {/* Order History Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-serif font-medium">{t('order_history')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              href="/orders"
              className="text-primary hover:underline"
            >
              {t('view_orders')}
            </Link>
          </CardContent>
        </Card>

        {/* Saved Addresses Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-serif font-medium">{t('saved_addresses')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              href="/settings/addresses"
              className="text-primary hover:underline"
            >
              {t('manage_addresses')}
            </Link>
          </CardContent>
        </Card>

        {/* Important Dates Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-serif font-medium">{t('important_dates')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              href="/settings/dates"
              className="text-primary hover:underline"
            >
              {t('manage_dates')}
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <SignoutButton variant="outline" />
      </div>
    </Container>
  );
}

export async function generateMetadata() {
  const t = await getTranslations('mypage');
  return {
    title: t('title'),
  };
}
