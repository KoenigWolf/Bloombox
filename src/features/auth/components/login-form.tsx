'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signInAction } from '../actions';
import type { AuthResult } from '../types';

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const t = useTranslations('auth');
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    AuthResult | null,
    FormData
  >(signInAction, null);

  useEffect(() => {
    if (state?.success && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-6">
      {redirectTo && <input type="hidden" name="redirect" value={redirectTo} />}

      {state?.error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
          {state.error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            {t('email')}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            {t('password')}
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          {t('forgot_password')}
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? t('signing_in') : t('sign_in')}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {t('no_account')}{' '}
        <Link href="/signup" className="text-primary hover:underline">
          {t('sign_up')}
        </Link>
      </p>
    </form>
  );
}
