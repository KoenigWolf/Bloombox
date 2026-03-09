import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';

export default async function NotFound() {
  const t = await getTranslations('error.404');

  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">{t('title')}</h2>
      <p className="text-neutral-600 mb-8 max-w-md">{t('description')}</p>
      <Button asChild>
        <Link href="/">{t('back_home')}</Link>
      </Button>
    </Container>
  );
}
