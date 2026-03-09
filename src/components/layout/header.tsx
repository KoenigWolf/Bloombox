'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { Container } from './container';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/products', label: t('products') },
    { href: '/story', label: t('story') },
    { href: '/about', label: t('about') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-primary-600 hover:text-primary-700"
          >
            Bloombox
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary-600',
                  pathname === item.href
                    ? 'text-primary-600'
                    : 'text-neutral-600'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">{t('cart')}</span>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild className="hidden md:flex">
              <Link href="/mypage">
                <User className="h-5 w-5" />
                <span className="sr-only">{t('mypage')}</span>
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">
                {isMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-neutral-200 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block py-2 text-sm font-medium transition-colors hover:text-primary-600',
                      pathname === item.href
                        ? 'text-primary-600'
                        : 'text-neutral-600'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/mypage"
                  className="block py-2 text-sm font-medium text-neutral-600 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('mypage')}
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
}
