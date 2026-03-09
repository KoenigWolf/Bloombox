/**
 * Shared TypeScript Types
 *
 * This directory contains types that are used across multiple features.
 * Feature-specific types should remain in their respective feature directories.
 * Database types are in @/lib/supabase/types.
 */

// Re-export commonly used database types
export type {
  CustomerRank,
  OrderStatus,
  PaymentMethod,
  LocaleCode,
  MilesTransactionType,
  Tables,
  InsertTables,
  UpdateTables,
} from '@/lib/supabase/types';

// Common utility types
export type Locale = 'ja' | 'en' | 'zh' | 'vi';

export type WithChildren<T = object> = T & {
  children: React.ReactNode;
};

export type WithClassName<T = object> = T & {
  className?: string;
};

export type AsyncReturnType<T extends (...args: unknown[]) => Promise<unknown>> =
  T extends (...args: unknown[]) => Promise<infer R> ? R : never;

// API response types
export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};
