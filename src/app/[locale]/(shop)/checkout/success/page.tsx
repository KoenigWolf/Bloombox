'use client';

import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/features/cart/hooks/use-cart';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  // 注文完了後、カートをクリア
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <section className="py-12">
      <Container className="max-w-2xl">
        <Card className="p-12 text-center">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">
            ご注文ありがとうございます
          </h1>
          <p className="text-neutral-600 mb-8">
            ご注文の確認メールをお送りしました。
            <br />
            商品の発送準備ができ次第、発送通知メールをお送りいたします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/products">買い物を続ける</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/mypage/orders">注文履歴を確認</Link>
            </Button>
          </div>
        </Card>
      </Container>
    </section>
  );
}
