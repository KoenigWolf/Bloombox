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
      <section className="relative bg-background border-b-2 border-foreground py-20 md:py-32 overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
            <h1 className="text-6xl md:text-[5.5rem] font-black font-serif text-foreground mb-8 tracking-tighter leading-[1] uppercase selection:bg-primary-300">
              {t('hero.title')} <span className="inline-block hover:animate-bounce transition-transform cursor-default">💐</span>
            </h1>

            <div className="border-2 border-foreground bg-white p-4 shadow-[4px_4px_0px_var(--color-foreground)] -rotate-2 mb-10 w-fit">
              <p className="text-lg md:text-xl text-neutral-900 font-bold uppercase tracking-widest leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

            <Button asChild size="lg" className="text-lg h-14 px-10 shadow-[4px_4px_0px_var(--color-foreground)] rotate-1 hover:rotate-0 hover:-translate-y-1">
              <Link href="/products">{t('hero.cta')} 📦</Link>
            </Button>
          </div>
        </Container>

        {/* Decorative Grid Background - Optional */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-primary-50 border-b-2 border-foreground">
        <Container>
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b-4 border-foreground pb-6">
            <h2 className="text-5xl md:text-7xl font-black font-serif uppercase tracking-tighter">
              {t('features.title')}
            </h2>
            <p className="font-bold uppercase tracking-widest text-primary-600 mt-4 md:mt-0 text-lg hidden md:block">
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
  rotation,
}: {
  title: string;
  description: string;
  icon: string;
  rotation: string;
}) {
  return (
    <div className={`bg-white border-2 border-foreground p-8 sm:p-10 shadow-[8px_8px_0px_var(--color-foreground)] hover:shadow-[12px_12px_0px_var(--color-foreground)] hover:-translate-y-2 transition-all flex flex-col h-full rounded-sm ${rotation}`}>
      <div className="text-5xl mb-8 bg-accent-100 w-20 h-20 flex items-center justify-center border-2 border-foreground rounded-full shadow-[2px_2px_0px_var(--color-foreground)] -rotate-12">
        {icon}
      </div>
      <h3 className="text-3xl font-black font-serif mb-4 uppercase tracking-tight">{title}</h3>
      <p className="text-neutral-900 font-medium leading-relaxed text-lg">{description}</p>
    </div>
  );
}
