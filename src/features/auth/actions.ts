'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { AuthResult } from './types';

// Validation schemas
const SignUpSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .regex(/[A-Za-z]/, 'パスワードには英字を含めてください')
    .regex(/[0-9]/, 'パスワードには数字を含めてください'),
  name: z.string().optional(),
});

const SignInSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
  password: z.string().min(1, 'パスワードを入力してください'),
});

const ResetPasswordSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
});

const UpdatePasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .regex(/[A-Za-z]/, 'パスワードには英字を含めてください')
    .regex(/[0-9]/, 'パスワードには数字を含めてください'),
});

export async function signUpAction(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const supabase = await createClient();

  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
  };

  const parsed = SignUpSchema.safeParse(rawData);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    return { success: false, error: firstError || '入力内容を確認してください' };
  }

  const { email, password, name } = parsed.data;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    if (error.message.includes('already registered')) {
      return { success: false, error: 'このメールアドレスは既に登録されています' };
    }
    return { success: false, error: '登録に失敗しました。もう一度お試しください' };
  }

  // Note: Customer name will be set via user metadata (name)
  // The handle_new_user trigger creates the customer record automatically
  // Name can be updated later in profile settings

  revalidatePath('/', 'layout');
  return {
    success: true,
    redirectTo: '/mypage',
  };
}

export async function signInAction(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const supabase = await createClient();

  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const parsed = SignInSchema.safeParse(rawData);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    return { success: false, error: firstError || '入力内容を確認してください' };
  }

  const { email, password } = parsed.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return { success: false, error: 'メールアドレスまたはパスワードが正しくありません' };
    }
    return { success: false, error: 'ログインに失敗しました。もう一度お試しください' };
  }

  revalidatePath('/', 'layout');

  const redirectTo = formData.get('redirect') as string | null;
  return {
    success: true,
    redirectTo: redirectTo || '/mypage',
  };
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function resetPasswordAction(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const supabase = await createClient();

  const rawData = {
    email: formData.get('email'),
  };

  const parsed = ResetPasswordSchema.safeParse(rawData);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    return { success: false, error: firstError || '入力内容を確認してください' };
  }

  const { email } = parsed.data;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/settings/password`,
  });

  if (error) {
    return { success: false, error: 'リセットメールの送信に失敗しました' };
  }

  return {
    success: true,
  };
}

export async function updatePasswordAction(
  _prevState: AuthResult | null,
  formData: FormData
): Promise<AuthResult> {
  const supabase = await createClient();

  const rawData = {
    password: formData.get('password'),
  };

  const parsed = UpdatePasswordSchema.safeParse(rawData);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    return { success: false, error: firstError || '入力内容を確認してください' };
  }

  const { password } = parsed.data;

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { success: false, error: 'パスワードの更新に失敗しました' };
  }

  return {
    success: true,
  };
}
