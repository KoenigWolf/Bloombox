import { XCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function CheckoutCancelPage() {
  return (
    <section className="py-12">
      <Container className="max-w-2xl">
        <Card className="p-12 text-center">
          <XCircle className="h-16 w-16 text-error mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">お支払いがキャンセルされました</h1>
          <p className="text-neutral-600 mb-8">
            お支払いがキャンセルされました。
            <br />
            カートの商品はそのまま保持されています。
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
