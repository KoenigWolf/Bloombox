import { getTranslations } from 'next-intl/server';
import { SignupForm } from '@/features/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function SignupPage() {
  const t = await getTranslations('auth');

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t('sign_up_title')}</CardTitle>
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
