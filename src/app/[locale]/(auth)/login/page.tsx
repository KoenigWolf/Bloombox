import { getTranslations } from 'next-intl/server';
import { LoginForm } from '@/features/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const t = await getTranslations('auth');
  const params = await searchParams;
  const redirectTo = params.redirect;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-sm bg-white p-4">
        <CardHeader className="text-center pb-8 border-b border-border mb-8">
          <CardTitle className="text-3xl font-serif font-medium tracking-tight">{t('sign_in_title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm redirectTo={redirectTo} />
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateMetadata() {
  const t = await getTranslations('auth');
  return {
    title: t('sign_in_title'),
  };
}
