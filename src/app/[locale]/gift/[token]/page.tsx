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
        <div className="text-center mb-12 border border-border bg-white shadow-sm p-12 rounded-2xl">
          <span className="text-5xl mb-6 block">🌸</span>
          <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-foreground">{t('gift_for_you')}</h1>
          <p className="text-lg font-medium mt-4 text-neutral-600 tracking-wide">
            {t('from_sender', { name: egift.senderName })}
          </p>
        </div>

        {egift.status === 'expired' && (
          <Card className="mb-6 border-border bg-neutral-50 shadow-sm">
            <CardContent className="text-center py-12">
              <span className="text-5xl mb-6 block opacity-50">⏰</span>
              <h2 className="text-2xl font-serif font-medium text-foreground">
                {t('gift_expired')}
              </h2>
              <p className="text-neutral-600 mt-4 leading-relaxed">
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
