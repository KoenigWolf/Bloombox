import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout/container';

interface AboutPageProps {
   params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps) {
   const { locale } = await params;
   const t = await getTranslations({ locale, namespace: 'about' });

   return {
      title: t('title'),
      description: t('subtitle'),
   };
}

export default async function AboutPage({ params }: AboutPageProps) {
   const { locale } = await params;
   setRequestLocale(locale);

   const t = await getTranslations('about');

   return (
      <div className="bg-background text-foreground pb-24">
         {/* Hero Section */}
         <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
            <Image
               src="/images/about-hero.jpg"
               alt="Toyama Tulip Fields at Sunrise"
               fill
               priority
               sizes="100vw"
               className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/30" />
            <Container className="relative z-10 text-center">
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 drop-shadow-md tracking-tight">
                  {t('title')}
               </h1>
               <p className="text-lg md:text-2xl text-white/90 drop-shadow-sm font-medium tracking-wide">
                  {t('subtitle')}
               </p>
            </Container>
         </section>

         {/* The Mission Section */}
         <section className="py-20 md:py-32">
            <Container>
               <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-sm font-bold tracking-widest text-primary-700 uppercase mb-4">
                     {t('mission.title')}
                  </h2>
                  <h3 className="text-3xl md:text-4xl font-serif mb-8 text-neutral-900 leading-tight">
                     {t('mission.heading')}
                  </h3>
                  <div className="space-y-6 text-lg text-neutral-600 leading-relaxed text-justify md:text-left">
                     <p>{t('mission.text1')}</p>
                     <p>{t('mission.text2')}</p>
                  </div>
               </div>
            </Container>
         </section>

         {/* The Founder's Story Section */}
         <section className="py-20 bg-white">
            <Container>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className="order-2 md:order-1 relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-border">
                     <Image
                        src="/images/about-founder.jpg"
                        alt="Founder of Bloombox"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center"
                     />
                  </div>
                  <div className="order-1 md:order-2">
                     <h2 className="text-sm font-bold tracking-widest text-primary-700 uppercase mb-4">
                        {t('founder.title')}
                     </h2>
                     <h3 className="text-3xl md:text-4xl font-serif mb-8 text-neutral-900 leading-tight">
                        {t('founder.heading')}
                     </h3>
                     <div className="space-y-6 text-lg text-neutral-600 leading-relaxed">
                        <p>{t('founder.text1')}</p>
                        <p>{t('founder.text2')}</p>
                        <p className="font-medium text-neutral-900 italic border-l-4 border-primary-500 pl-4">
                           {t('founder.text3')}
                        </p>
                     </div>
                  </div>
               </div>
            </Container>
         </section>

         {/* Our Promise Section */}
         <section className="py-20 md:py-32">
            <Container>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div>
                     <h2 className="text-sm font-bold tracking-widest text-primary-700 uppercase mb-4">
                        {t('promise.title')}
                     </h2>
                     <h3 className="text-3xl md:text-4xl font-serif mb-8 text-neutral-900 leading-tight">
                        {t('promise.heading')}
                     </h3>
                     <ul className="space-y-8">
                        {[1, 2, 3].map((num) => (
                           <li key={num} className="flex gap-4">
                              <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 text-primary-700 font-serif font-bold text-sm">
                                 {num}
                              </span>
                              <span className="text-lg text-neutral-600 leading-relaxed pt-1">
                                 {t(`promise.items.${num}`)}
                              </span>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm border border-border">
                     <Image
                        src="/images/about-promise.jpg"
                        alt="Bloombox Sustainable Gift Box"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center"
                     />
                  </div>
               </div>
            </Container>
         </section>
      </div>
   );
}
