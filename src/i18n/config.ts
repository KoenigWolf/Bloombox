export const locales = ['ja', 'en', 'zh', 'vi'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ja';

export const localeNames: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
  zh: '中文',
  vi: 'Tiếng Việt',
};

export const localeCurrencies: Record<Locale, string> = {
  ja: 'JPY',
  en: 'USD',
  zh: 'CNY',
  vi: 'VND',
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
