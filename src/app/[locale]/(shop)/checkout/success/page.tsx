'use client';

import { useEffect } from 'react';
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
        <Card className="p-12 text-center shadow-md bg-white">
          <div className="inline-flex items-center justify-center p-4 bg-primary-50 rounded-full mb-8">
            <span className="text-6xl">🎉</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6 text-foreground tracking-tight">
            ご注文ありがとうございます！
          </h1>
          <p className="text-lg text-foreground font-medium mb-8 leading-relaxed">
            ご注文の確認メールをお送りしました。<br />
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
