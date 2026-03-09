import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/container';
import { Card, CardContent } from '@/components/ui/card';
import { getEGiftByToken } from '@/features/egift/queries';
import { EGiftClaimForm } from '@/features/egift/components/egift-claim-form';
import { EGiftStatusCard } from '@/features/egift/components/egift-status';
import { isEGiftValid } from '@/features/egift/types';

interface GiftClaimPageProps {
  params: Promise<{ token: string }>;
}

export default async function GiftClaimPage({ params }: GiftClaimPageProps) {
  const { token } = await params;
  const t = await getTranslations('egift');

  const egift = await getEGiftByToken(token);

  if (!egift) {
    notFound();
  }

  const isValid = isEGiftValid(egift);

  return (
    <div className="py-8">
      <Container className="max-w-2xl">
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">🌸</span>
          <h1 className="text-3xl font-bold">{t('gift_for_you')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('from_sender', { name: egift.senderName })}
          </p>
        </div>

        {egift.status === 'expired' && (
          <Card className="mb-6">
            <CardContent className="text-center py-8">
              <span className="text-5xl mb-4 block">⏰</span>
              <h2 className="text-xl font-semibold text-muted-foreground">
                {t('gift_expired')}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                {t('gift_expired_message')}
              </p>
            </CardContent>
          </Card>
        )}

        {egift.status !== 'pending' && egift.status !== 'expired' && (
          <div className="mb-6">
            <EGiftStatusCard egift={egift} />
          </div>
        )}

        {egift.status === 'pending' && isValid && (
          <EGiftClaimForm egift={egift} />
        )}
      </Container>
    </div>
  );
}

export async function generateMetadata({ params }: GiftClaimPageProps) {
  const { token } = await params;
  const t = await getTranslations('egift');

  const egift = await getEGiftByToken(token);

  if (!egift) {
    return { title: 'Gift Not Found' };
  }

  return {
    title: t('meta_title', { sender: egift.senderName }),
    description: t('meta_description'),
  };
}
