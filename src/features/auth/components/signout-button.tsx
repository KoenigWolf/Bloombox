'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { signOutAction } from '../actions';

interface SignoutButtonProps {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

export function SignoutButton({
  variant = 'ghost',
  size = 'default',
}: SignoutButtonProps) {
  const t = useTranslations('auth');

  return (
    <form action={signOutAction}>
      <Button type="submit" variant={variant} size={size}>
        {t('sign_out')}
      </Button>
    </form>
  );
}
