import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout/container';

interface ConceptPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ConceptPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'concept' });

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}

export default async function ConceptPage({ params }: ConceptPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('concept');

  return (
    <article className="bg-background text-foreground">
      {/* Hero Section - Mission Statement */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700">
        <div className="absolute inset-0 bg-[url('/images/concept-pattern.svg')] opacity-5" />
        <Container className="relative z-10 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary-200 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-8">
              {t('hero.label')}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-8">
              {t('hero.mission')}
            </h1>
            <div className="w-24 h-px bg-primary-300 mx-auto mb-8" />
            <p className="text-xl md:text-2xl text-primary-100 font-serif italic">
              {t('hero.tagline')}
            </p>
          </div>
        </Container>
      </section>

      {/* Problem Statement */}
      <section className="py-24 md:py-32 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-accent-50 text-accent-700 text-sm font-medium mb-6">
                {t('problem.label')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-900 leading-tight">
                {t('problem.headline')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 rounded-2xl bg-neutral-50 border border-neutral-100">
                <p className="text-5xl md:text-6xl font-serif text-primary-600 mb-2">
                  {t('problem.stat1.number')}
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {t('problem.stat1.label')}
                </p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-neutral-50 border border-neutral-100">
                <p className="text-5xl md:text-6xl font-serif text-primary-600 mb-2">
                  {t('problem.stat2.number')}
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {t('problem.stat2.label')}
                </p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-neutral-50 border border-neutral-100">
                <p className="text-5xl md:text-6xl font-serif text-primary-600 mb-2">
                  {t('problem.stat3.number')}
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {t('problem.stat3.label')}
                </p>
              </div>
            </div>

            <div className="prose prose-lg prose-neutral max-w-none">
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed text-center">
                {t('problem.description')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Solution - Paradigm Shift */}
      <section className="py-24 md:py-32 bg-neutral-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
                {t('solution.label')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-900 leading-tight mb-8">
                {t('solution.headline')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Before */}
              <div className="relative p-8 md:p-12 bg-white rounded-2xl border border-neutral-200">
                <div className="absolute -top-4 left-8 px-4 py-1 bg-neutral-200 text-neutral-600 text-sm font-medium rounded-full">
                  {t('solution.before.label')}
                </div>
                <p className="text-xl md:text-2xl font-serif text-neutral-400 leading-relaxed">
                  {t('solution.before.text')}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-3xl">🛒</span>
                  <span className="text-neutral-400">→</span>
                  <span className="text-3xl">📦</span>
                  <span className="text-neutral-400">→</span>
                  <span className="text-3xl">✓</span>
                </div>
              </div>

              {/* After */}
              <div className="relative p-8 md:p-12 bg-primary-600 rounded-2xl shadow-xl">
                <div className="absolute -top-4 left-8 px-4 py-1 bg-primary-400 text-white text-sm font-medium rounded-full">
                  {t('solution.after.label')}
                </div>
                <p className="text-xl md:text-2xl font-serif text-white leading-relaxed">
                  {t('solution.after.text')}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-3xl">🌸</span>
                  <span className="text-primary-200">→</span>
                  <span className="text-3xl">👨‍🌾</span>
                  <span className="text-primary-200">→</span>
                  <span className="text-3xl">💚</span>
                  <span className="text-primary-200">→</span>
                  <span className="text-3xl">💝</span>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <blockquote className="text-2xl md:text-3xl font-serif text-primary-700 italic">
                &ldquo;{t('solution.quote')}&rdquo;
              </blockquote>
            </div>
          </div>
        </Container>
      </section>

      {/* Three Stories */}
      <section className="py-24 md:py-32 bg-white">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <span className="inline-block px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
                {t('stories.label')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-900 leading-tight">
                {t('stories.headline')}
              </h2>
            </div>

            <div className="space-y-16">
              {/* Story 1: The Flower */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-2 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-4xl">🌷</span>
                  </div>
                </div>
                <div className="md:col-span-10">
                  <h3 className="text-2xl md:text-3xl font-serif text-neutral-900 mb-4">
                    {t('stories.flower.title')}
                  </h3>
                  <p className="text-lg text-neutral-600 leading-relaxed mb-4">
                    {t('stories.flower.description')}
                  </p>
                  <div className="p-6 bg-primary-50 rounded-xl border-l-4 border-primary-500">
                    <p className="text-primary-800 italic font-medium">
                      {t('stories.flower.example')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-neutral-200" />

              {/* Story 2: The People */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-2 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-accent-100 flex items-center justify-center">
                    <span className="text-4xl">👨‍🌾</span>
                  </div>
                </div>
                <div className="md:col-span-10">
                  <h3 className="text-2xl md:text-3xl font-serif text-neutral-900 mb-4">
                    {t('stories.people.title')}
                  </h3>
                  <p className="text-lg text-neutral-600 leading-relaxed mb-4">
                    {t('stories.people.description')}
                  </p>
                  <div className="p-6 bg-accent-50 rounded-xl border-l-4 border-accent-500">
                    <p className="text-accent-800 italic font-medium">
                      {t('stories.people.example')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-neutral-200" />

              {/* Story 3: The Journey */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-2 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-4xl">🚚</span>
                  </div>
                </div>
                <div className="md:col-span-10">
                  <h3 className="text-2xl md:text-3xl font-serif text-neutral-900 mb-4">
                    {t('stories.journey.title')}
                  </h3>
                  <p className="text-lg text-neutral-600 leading-relaxed mb-4">
                    {t('stories.journey.description')}
                  </p>
                  <div className="p-6 bg-neutral-100 rounded-xl">
                    <div className="flex flex-wrap items-center gap-2 text-sm md:text-base text-neutral-700">
                      <span className="inline-flex items-center gap-1">
                        <span>🌱</span> {t('stories.journey.step1')}
                      </span>
                      <span className="text-neutral-400">→</span>
                      <span className="inline-flex items-center gap-1">
                        <span>📦</span> {t('stories.journey.step2')}
                      </span>
                      <span className="text-neutral-400">→</span>
                      <span className="inline-flex items-center gap-1">
                        <span>⚠️</span> {t('stories.journey.step3')}
                      </span>
                      <span className="text-neutral-400">→</span>
                      <span className="inline-flex items-center gap-1">
                        <span>💚</span> {t('stories.journey.step4')}
                      </span>
                      <span className="text-neutral-400">→</span>
                      <span className="inline-flex items-center gap-1">
                        <span>🎨</span> {t('stories.journey.step5')}
                      </span>
                      <span className="text-neutral-400">→</span>
                      <span className="inline-flex items-center gap-1">
                        <span>🎁</span> {t('stories.journey.step6')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Psychology Section */}
      <section className="py-24 md:py-32 bg-neutral-900 text-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6">
                {t('psychology.label')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight">
                {t('psychology.headline')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-serif mb-3 text-primary-300">
                  {t('psychology.effect1.title')}
                </h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  {t('psychology.effect1.description')}
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl mb-4">🛠️</div>
                <h3 className="text-xl font-serif mb-3 text-primary-300">
                  {t('psychology.effect2.title')}
                </h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  {t('psychology.effect2.description')}
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl mb-4">💎</div>
                <h3 className="text-xl font-serif mb-3 text-primary-300">
                  {t('psychology.effect3.title')}
                </h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  {t('psychology.effect3.description')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Impact Section */}
      <section className="py-24 md:py-32 bg-primary-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
              {t('impact.label')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-900 leading-tight mb-12">
              {t('impact.headline')}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="text-3xl mb-2">🌷</div>
                <p className="text-2xl font-serif text-primary-600">{t('impact.metric1.value')}</p>
                <p className="text-xs text-neutral-500 mt-1">{t('impact.metric1.label')}</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="text-3xl mb-2">🌿</div>
                <p className="text-2xl font-serif text-primary-600">{t('impact.metric2.value')}</p>
                <p className="text-xs text-neutral-500 mt-1">{t('impact.metric2.label')}</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="text-3xl mb-2">💧</div>
                <p className="text-2xl font-serif text-primary-600">{t('impact.metric3.value')}</p>
                <p className="text-xs text-neutral-500 mt-1">{t('impact.metric3.label')}</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <div className="text-3xl mb-2">👨‍🌾</div>
                <p className="text-2xl font-serif text-primary-600">{t('impact.metric4.value')}</p>
                <p className="text-xs text-neutral-500 mt-1">{t('impact.metric4.label')}</p>
              </div>
            </div>

            <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              {t('impact.description')}
            </p>
          </div>
        </Container>
      </section>

      {/* Vision / CTA Section */}
      <section className="py-24 md:py-32 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-900 leading-tight mb-8">
              {t('vision.headline')}
            </h2>
            <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed mb-12">
              {t('vision.description')}
            </p>
            <div className="inline-block p-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl">
              <p className="text-lg font-medium text-primary-800 mb-2">
                {t('vision.tagline_label')}
              </p>
              <p className="text-2xl md:text-3xl font-serif text-primary-700 italic">
                &ldquo;Flowers saved by you&rdquo;
              </p>
              <p className="text-xl text-primary-600 mt-1">
                — {t('vision.tagline_translation')}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
