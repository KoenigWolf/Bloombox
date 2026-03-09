'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  // Simple dropdown using native select for now
  return (
    <div className="relative">
      <Button variant="ghost" size="sm" className="gap-2" asChild>
        <label>
          <Globe className="h-4 w-4" />
          <select
            value={locale}
            onChange={(e) => handleLocaleChange(e.target.value as Locale)}
            className="absolute inset-0 w-full cursor-pointer opacity-0"
          >
            {locales.map((loc) => (
              <option key={loc} value={loc}>
                {localeNames[loc]}
              </option>
            ))}
          </select>
          <span className="text-sm">{localeNames[locale]}</span>
        </label>
      </Button>
    </div>
  );
}
