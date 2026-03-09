'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signUpAction } from '../actions';
import type { AuthResult } from '../types';

export function SignupForm() {
  const t = useTranslations('auth');
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    AuthResult | null,
    FormData
  >(signUpAction, null);

  useEffect(() => {
    if (state?.success && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
          {state.error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            {t('name')}
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t('name_placeholder')}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            {t('email')} <span className="text-red-500">*</span>
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
            {t('password')} <span className="text-red-500">*</span>
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            {t('password_requirements')}
          </p>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? t('signing_up') : t('sign_up')}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {t('has_account')}{' '}
        <Link href="/login" className="text-primary hover:underline">
          {t('sign_in')}
        </Link>
      </p>
    </form>
  );
}
