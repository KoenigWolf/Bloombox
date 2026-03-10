import { getTranslations } from 'next-intl/server';
import { SignupForm } from '@/features/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function SignupPage() {
  const t = await getTranslations('auth');

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-sm bg-white p-4">
        <CardHeader className="text-center pb-8 border-b border-border mb-8">
          <CardTitle className="text-3xl font-serif font-medium tracking-tight">{t('sign_up_title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateMetadata() {
  const t = await getTranslations('auth');
  return {
    title: t('sign_up_title'),
  };
}
