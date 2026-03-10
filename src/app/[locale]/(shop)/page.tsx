import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout/container';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-background border-b border-border py-20 md:py-32 overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
            <h1 className="text-5xl md:text-7xl font-serif text-foreground mb-8 tracking-tight leading-[1.1] selection:bg-primary-200">
              {t('hero.title')}
            </h1>

            <div className="bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-border/50 mb-10 w-fit shadow-sm">
              <p className="text-lg md:text-xl text-foreground font-medium tracking-wide">
                {t('hero.subtitle')}
              </p>
            </div>

            <Button asChild size="lg" className="text-lg h-14 px-10 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
              <Link href="/products">{t('hero.cta')}</Link>
            </Button>
          </div>
        </Container>

        {/* Decorative Grid Background - Optional */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white border-b border-border">
        <Container>
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-border pb-6">
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-foreground">
              {t('features.title')}
            </h2>
            <p className="font-medium tracking-wide text-primary-600 mt-4 md:mt-0 text-lg hidden md:block">
              Not just another flower shop.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <FeatureCard
              title={t('features.story.title')}
              description={t('features.story.description')}
              icon="📖"
              rotation="-rotate-2"
            />
            <FeatureCard
              title={t('features.miles.title')}
              description={t('features.miles.description')}
              icon="✈️"
              rotation="rotate-1"
            />
            <FeatureCard
              title={t('features.impact.title')}
              description={t('features.impact.description')}
              icon="🌱"
              rotation="-rotate-1"
            />
          </div>
        </Container>
      </section>
    </>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
  rotation?: string;
}) {
  return (
    <div className={`bg-neutral-50/50 border border-border p-8 sm:p-10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full rounded-2xl`}>
      <div className="text-4xl mb-8 bg-white w-16 h-16 flex items-center justify-center border border-border rounded-full shadow-sm text-primary-600">
        {icon}
      </div>
      <h3 className="text-2xl font-serif mb-4 tracking-tight text-foreground">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </div>
  );
}
