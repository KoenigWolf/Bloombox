import type { Customer } from '@/lib/supabase/types';

export interface AuthUser {
  id: string;
  email: string;
  customer: Customer | null;
}

export interface SignUpInput {
  email: string;
  password: string;
  name?: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  redirectTo?: string;
}

export interface ResetPasswordInput {
  email: string;
}

export interface UpdatePasswordInput {
  password: string;
}
