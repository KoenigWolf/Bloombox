import type { Locale } from '@/i18n/config';

const currencyMap: Record<Locale, string> = {
  ja: 'JPY',
  en: 'USD',
  zh: 'CNY',
  vi: 'VND',
};

export function formatCurrency(
  amount: number,
  locale: Locale = 'ja'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyMap[locale],
    minimumFractionDigits: locale === 'ja' || locale === 'vi' ? 0 : 2,
    maximumFractionDigits: locale === 'ja' || locale === 'vi' ? 0 : 2,
  }).format(amount);
}

export function formatDate(
  date: Date | string,
  locale: Locale = 'ja',
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(d);
}

export function formatRelativeTime(
  date: Date | string,
  locale: Locale = 'ja'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, 'minute');
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return rtf.format(-diffInHours, 'hour');
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return rtf.format(-diffInDays, 'day');
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return rtf.format(-diffInMonths, 'month');
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return rtf.format(-diffInYears, 'year');
}
