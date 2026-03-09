import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from './container';

export async function Footer() {
  const t = await getTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-2xl font-bold text-primary-600 hover:text-primary-700"
            >
              Bloombox
            </Link>
            <p className="mt-4 text-sm text-neutral-600">
              花で届ける、特別な想い。
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-neutral-600 hover:text-primary-600"
                >
                  商品一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/story"
                  className="text-sm text-neutral-600 hover:text-primary-600"
                >
                  Flower Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-neutral-600 hover:text-primary-600"
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="text-sm text-neutral-600 hover:text-primary-600"
                >
                  サステナビリティ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-neutral-600 hover:text-primary-600"
                >
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-neutral-600 hover:text-primary-600"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-neutral-600 hover:text-primary-600"
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 text-center">
          <p className="text-sm text-neutral-500">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </Container>
    </footer>
  );
}
