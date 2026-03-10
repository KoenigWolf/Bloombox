import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout/container';

interface StoryPageProps {
   params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: StoryPageProps) {
   const { locale } = await params;
   const t = await getTranslations({ locale, namespace: 'nav' });

   return {
      title: t('story'),
   };
}

export default async function StoryPage({ params }: StoryPageProps) {
   const { locale } = await params;
   setRequestLocale(locale);
   const t = await getTranslations('flower_story');

   return (
      <div className="bg-background min-h-screen pb-32">
         {/* Hero Header */}
         <section className="pt-24 pb-16 md:pt-32 md:pb-24 text-center px-4">
            <Container className="max-w-4xl">
               <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-foreground mb-6">
                  {t('title')}
               </h1>
               <p className="text-xl md:text-2xl font-serif text-neutral-600 tracking-wide">
                  {t('subtitle')}
               </p>
            </Container>
         </section>

         <Container className="max-w-5xl space-y-32">
            {/* Story 1: Producer (People) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-sm">
                  <Image
                     src="/images/story-producer.jpg"
                     alt="花の生産者の様子"
                     fill
                     className="object-cover"
                     sizes="(max-width: 768px) 100vw, 50vw"
                  />
               </div>
               <div className="space-y-6 px-4 md:px-0 md:pr-12">
                  <span className="text-sm font-bold uppercase tracking-widest text-primary-600">01</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight">
                     {t('producer_story')}
                  </h2>
                  <div className="space-y-4 text-neutral-600 leading-relaxed">
                     <p>
                        お祝いの席を彩り、短期間で役目を終えてしまう花。
                        少し形が不揃いなだけで市場に出回らない花。
                     </p>
                     <p>
                        私たちは、情熱を持った生産者の方々と直接つながり、
                        彼らが手塩にかけて育てた命を、無駄なく「ギフト」として生まれ変わらせています。
                     </p>
                  </div>
               </div>
            </section>

            {/* Story 2: Flower (Product) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className="order-2 md:order-1 space-y-6 px-4 md:px-0 md:pl-12">
                  <span className="text-sm font-bold uppercase tracking-widest text-primary-600">02</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight">
                     命の軌跡をたどる
                  </h2>
                  <div className="space-y-4 text-neutral-600 leading-relaxed">
                     <p>
                        Bloomboxで届くすべての花には、その花だけの「ストーリー」があります。
                        どこで生まれ、誰の手によって育てられ、どんな花言葉を持っているのか。
                     </p>
                     <p>
                        パッケージに記されたQRコードを読み取ることで、その花が持つ
                        背景や歴史（バッチ情報）にアクセスし、より深く花を愛でることができます。
                     </p>
                  </div>
               </div>
               <div className="order-1 md:order-2 relative aspect-[4/5] overflow-hidden rounded-2xl shadow-sm">
                  <Image
                     src="/images/story-flower.jpg"
                     alt="美しい花のアップ"
                     fill
                     className="object-cover"
                     sizes="(max-width: 768px) 100vw, 50vw"
                  />
               </div>
            </section>

            {/* Story 3: Time (Sustainable Future) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-sm">
                  <Image
                     src="/images/story-time.jpg"
                     alt="長く飾られるドライフラワー"
                     fill
                     className="object-cover"
                     sizes="(max-width: 768px) 100vw, 50vw"
                  />
               </div>
               <div className="space-y-6 px-4 md:px-0 md:pr-12">
                  <span className="text-sm font-bold uppercase tracking-widest text-primary-600">03</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight">
                     {t('time_story')}
                  </h2>
                  <div className="space-y-4 text-neutral-600 leading-relaxed">
                     <p>
                        生花として楽しんだ後は、ドライフラワーとして。
                        時を経て変化していく美しさも、私たちが提案する「時間のストーリー」です。
                     </p>
                     <p>
                        花を長く楽しむことは、地球環境に配慮したサステナブルなアクション（Flower Impact）にもつながります。
                        共に、美しい時間を紡ぎましょう。
                     </p>
                  </div>
               </div>
            </section>
         </Container>
      </div>
   );
}
