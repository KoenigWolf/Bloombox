import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function CheckoutCancelPage() {
  return (
    <section className="py-12">
      <Container className="max-w-2xl">
        <Card className="p-12 text-center shadow-md bg-white">
          <div className="inline-flex items-center justify-center p-4 bg-neutral-100 rounded-full mb-8">
            <span className="text-6xl">⚠️</span>
          </div>
          <h1 className="text-4xl font-serif font-medium mb-6 text-foreground tracking-tight">
            お支払いがキャンセルされました
          </h1>
          <p className="text-lg text-foreground font-medium mb-8 leading-relaxed">
            カートの商品はそのまま保持されていますので、<br />お時間のある時に再度手続きをお願いいたします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/cart">カートに戻る</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products">買い物を続ける</Link>
            </Button>
          </div>
        </Card>
      </Container>
    </section>
  );
}
