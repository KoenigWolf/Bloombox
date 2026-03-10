import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('brand');

  return (
    <div className="bg-white text-black">
      {/* Hero Section - Opening Statement */}
      <section className="min-h-[90vh] flex items-center justify-center px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.4em] uppercase text-neutral-500 mb-8">
            {t('hero.label')}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.15] tracking-tight mb-10">
            {t('hero.headline')}
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            {t('hero.subheadline')}
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-16 h-px bg-neutral-300 mx-auto" />

      {/* Origin Section */}
      <section className="px-6 py-32 md:py-40">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-6">
            {t('origin.label')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight tracking-tight mb-12">
            {t('origin.headline')}
          </h2>
          <div className="space-y-8 text-lg md:text-xl text-neutral-700 leading-[1.8]">
            <p>{t('origin.p1')}</p>
            <p>{t('origin.p2')}</p>
            <p className="text-black font-medium">{t('origin.quote')}</p>
            <p>{t('origin.p3')}</p>
          </div>
        </div>
      </section>

      {/* Opportunity Section - Market Data */}
      <section className="px-6 py-32 md:py-40 bg-neutral-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-6">
            {t('opportunity.label')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight tracking-tight mb-16 max-w-3xl">
            {t('opportunity.headline')}
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16">
            <div className="border-l-2 border-black pl-8">
              <p className="text-5xl md:text-6xl font-serif tracking-tight mb-4">
                {t('opportunity.stat1.number')}
              </p>
              <p className="text-neutral-600 leading-relaxed">
                {t('opportunity.stat1.label')}
              </p>
            </div>
            <div className="border-l-2 border-neutral-300 pl-8">
              <p className="text-5xl md:text-6xl font-serif tracking-tight mb-4 text-neutral-400">
                {t('opportunity.stat2.number')}
              </p>
              <p className="text-neutral-600 leading-relaxed">
                {t('opportunity.stat2.label')}
              </p>
            </div>
          </div>

          <div className="max-w-3xl">
            <p className="text-lg md:text-xl text-neutral-700 leading-[1.8] mb-8">
              {t('opportunity.insight')}
            </p>
            <p className="text-lg md:text-xl text-black leading-[1.8] font-medium">
              {t('opportunity.conclusion')}
            </p>
          </div>
        </div>
      </section>

      {/* Power of Flowers Section */}
      <section className="px-6 py-32 md:py-40">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-6">
            {t('power.label')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight tracking-tight mb-12">
            {t('power.headline')}
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-xl md:text-2xl font-serif mb-6">
                {t('power.nonintrusive.title')}
              </h3>
              <p className="text-lg md:text-xl text-neutral-700 leading-[1.8]">
                {t('power.nonintrusive.description')}
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-12">
              <h3 className="text-xl md:text-2xl font-serif mb-6">
                {t('power.emotion.title')}
              </h3>
              <p className="text-lg md:text-xl text-neutral-700 leading-[1.8] mb-8">
                {t('power.emotion.description')}
              </p>
              {/* Keywords */}
              <div className="flex flex-wrap gap-4">
                <span className="px-6 py-3 border border-black text-sm tracking-wider">
                  Happiness
                </span>
                <span className="px-6 py-3 border border-black text-sm tracking-wider">
                  Love
                </span>
                <span className="px-6 py-3 border border-black text-sm tracking-wider">
                  Attention
                </span>
              </div>
            </div>

            {/* Quote */}
            <div className="border-t border-neutral-200 pt-12">
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif leading-tight tracking-tight italic">
                &ldquo;{t('power.quote')}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="px-6 py-32 md:py-40 bg-black text-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-neutral-500 mb-6">
            {t('value.label')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight tracking-tight mb-12">
            {t('value.headline')}
          </h2>

          <div className="space-y-8 text-lg md:text-xl text-neutral-300 leading-[1.8]">
            <p>{t('value.p1')}</p>
            <p className="text-white font-medium">{t('value.highlight')}</p>
            <p>{t('value.p2')}</p>
          </div>

          <div className="mt-16 pt-12 border-t border-neutral-800">
            <h3 className="text-xl md:text-2xl font-serif mb-6">
              {t('value.global.title')}
            </h3>
            <p className="text-lg md:text-xl text-neutral-300 leading-[1.8]">
              {t('value.global.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Sustainability Section - Happy Flower */}
      <section className="px-6 py-32 md:py-40">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-neutral-400 mb-6">
            {t('sustainability.label')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight tracking-tight mb-6">
            {t('sustainability.headline')}
          </h2>
          <p className="text-xl md:text-2xl text-neutral-600 mb-16">
            {t('sustainability.subheadline')}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-serif tracking-tight mb-2">
                {t('sustainability.stat1.number')}
              </p>
              <p className="text-sm text-neutral-500">
                {t('sustainability.stat1.label')}
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-serif tracking-tight mb-2">
                {t('sustainability.stat2.number')}
              </p>
              <p className="text-sm text-neutral-500">
                {t('sustainability.stat2.label')}
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-serif tracking-tight mb-2">
                {t('sustainability.stat3.number')}
              </p>
              <p className="text-sm text-neutral-500">
                {t('sustainability.stat3.label')}
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-serif tracking-tight mb-2">
                {t('sustainability.stat4.number')}
              </p>
              <p className="text-sm text-neutral-500">
                {t('sustainability.stat4.label')}
              </p>
            </div>
          </div>

          <div className="max-w-3xl space-y-8 text-lg md:text-xl text-neutral-700 leading-[1.8]">
            <p>{t('sustainability.p1')}</p>

            <div className="bg-neutral-50 p-8 md:p-12 border-l-4 border-black">
              <h3 className="text-xl md:text-2xl font-serif mb-4">
                {t('sustainability.happyflower.title')}
              </h3>
              <p className="text-neutral-700 leading-[1.8]">
                {t('sustainability.happyflower.description')}
              </p>
            </div>

            <div className="bg-neutral-50 p-8 md:p-12 border-l-4 border-neutral-300">
              <h3 className="text-xl md:text-2xl font-serif mb-4">
                {t('sustainability.seedpaper.title')}
              </h3>
              <p className="text-neutral-700 leading-[1.8]">
                {t('sustainability.seedpaper.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section - Final */}
      <section className="px-6 py-32 md:py-48 bg-neutral-950 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-neutral-500 mb-8">
            {t('vision.label')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif leading-tight tracking-tight mb-12">
            {t('vision.headline')}
          </h2>
          <p className="text-lg md:text-xl text-neutral-400 leading-[1.8] mb-8">
            {t('vision.description')}
          </p>
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
            {t('vision.closing')}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24 md:py-32 bg-white border-t border-neutral-200">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-serif mb-10">
            {t('cta.headline')}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-black text-white hover:bg-neutral-800 rounded-none px-12 py-6 h-auto text-base tracking-wider"
          >
            <Link href="/products">{t('cta.button')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
