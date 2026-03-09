# Bloombox 設計ガイド

**最終更新:** 2026年3月9日
**このファイルは実装前に必ず読むこと**

---

## 1. プロジェクト概要

Bloomboxは花のECプラットフォーム。以下の差別化要素を持つ：
- **Flower Story System**: 花・生産者・時間の3ストーリーをトレース
- **Flower Miles & Impact**: ゲーミフィケーション要素
- **グローバル対応**: 初日から4言語（JP/EN/ZH/VI）

---

## 2. 技術スタック

| カテゴリ | 技術 | バージョン |
|---------|------|-----------|
| フレームワーク | Next.js (App Router) | 16.x |
| UI | React | 19.2 |
| 言語 | TypeScript | 5.x |
| スタイリング | Tailwind CSS | 4.x |
| アニメーション | Framer Motion | 12.x |
| UIプリミティブ | Radix UI | latest |
| 状態管理 | Zustand | 5.x |
| フォーム | react-hook-form + Zod | latest |
| 多言語 | next-intl | 4.x |
| BaaS | Supabase | latest |
| 決済 | Stripe | latest |
| 画像 | Cloudinary | - |
| メール | Resend | latest |
| 分析 | PostHog | latest |

---

## 3. ディレクトリ構造

```
bloombox/
├── src/
│   ├── app/                          # App Router
│   │   ├── [locale]/                 # next-intl ルーティング
│   │   │   ├── (shop)/              # ショッピング関連
│   │   │   │   ├── page.tsx         # トップページ
│   │   │   │   ├── products/        # 商品一覧・詳細
│   │   │   │   ├── cart/            # カート
│   │   │   │   └── checkout/        # 決済
│   │   │   ├── (content)/           # コンテンツ関連
│   │   │   │   ├── about/           # About
│   │   │   │   ├── story/           # Flower Story
│   │   │   │   └── sustainability/  # サステナビリティ
│   │   │   ├── (account)/           # アカウント関連
│   │   │   │   ├── mypage/          # マイページ
│   │   │   │   ├── orders/          # 注文履歴
│   │   │   │   └── settings/        # 設定
│   │   │   ├── layout.tsx           # ロケール別レイアウト
│   │   │   └── not-found.tsx        # 404
│   │   ├── api/                      # Route Handlers (Webhook等)
│   │   │   ├── webhooks/
│   │   │   │   ├── stripe/route.ts
│   │   │   │   └── line/route.ts
│   │   │   └── health/route.ts
│   │   ├── globals.css               # Tailwind v4 設定
│   │   └── layout.tsx                # ルートレイアウト
│   │
│   ├── features/                     # 機能別モジュール
│   │   ├── products/
│   │   │   ├── components/           # 機能専用コンポーネント
│   │   │   ├── hooks/                # 機能専用フック
│   │   │   ├── actions.ts            # Server Actions
│   │   │   ├── queries.ts            # データ取得関数
│   │   │   └── types.ts              # 型定義
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── flower-story/
│   │   ├── flower-miles/
│   │   ├── flower-impact/
│   │   └── auth/
│   │
│   ├── components/                   # 共有コンポーネント
│   │   ├── ui/                       # 汎用UIコンポーネント
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   └── layout/                   # レイアウトコンポーネント
│   │       ├── header.tsx
│   │       ├── footer.tsx
│   │       ├── navigation.tsx
│   │       └── container.tsx
│   │
│   ├── lib/                          # ユーティリティ・設定
│   │   ├── supabase/
│   │   │   ├── client.ts             # ブラウザ用クライアント
│   │   │   ├── server.ts             # サーバー用クライアント
│   │   │   └── types.ts              # 生成された型
│   │   ├── cloudinary/
│   │   │   ├── loader.ts             # next/image カスタムローダー
│   │   │   └── utils.ts
│   │   ├── stripe/
│   │   │   ├── client.ts
│   │   │   └── utils.ts
│   │   └── utils/
│   │       ├── cn.ts                 # clsx + twMerge
│   │       ├── format.ts             # 日付・通貨フォーマット
│   │       └── validation.ts         # 共通バリデーション
│   │
│   ├── i18n/                         # 多言語設定
│   │   ├── config.ts                 # ロケール設定
│   │   ├── request.ts                # next-intl request設定
│   │   └── navigation.ts             # 多言語対応ナビゲーション
│   │
│   ├── messages/                     # 翻訳ファイル
│   │   ├── ja.json
│   │   ├── en.json
│   │   ├── zh.json
│   │   └── vi.json
│   │
│   └── types/                        # グローバル型定義
│       └── global.d.ts
│
├── public/                           # 静的ファイル
│   ├── fonts/
│   └── images/                       # ロゴなど（花画像はCloudinary）
│
├── supabase/                         # Supabase設定
│   ├── migrations/                   # DBマイグレーション
│   ├── seed.sql                      # 初期データ
│   └── config.toml
│
├── .env.local                        # 環境変数（gitignore）
├── .env.example                      # 環境変数テンプレート
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. コーディング規約

### 4.1 TypeScript

```typescript
// ✅ GOOD: 明示的な型定義
interface Product {
  id: string;
  name: string;
  price: number;
  images: ProductImage[];
}

// ❌ BAD: any の使用
const data: any = fetchData();

// ✅ GOOD: 型ガード
function isProduct(value: unknown): value is Product {
  return typeof value === 'object' && value !== null && 'id' in value;
}
```

### 4.2 命名規則

| 対象 | 規則 | 例 |
|------|------|-----|
| ファイル（コンポーネント） | kebab-case | `product-card.tsx` |
| ファイル（その他） | kebab-case | `use-cart.ts` |
| コンポーネント | PascalCase | `ProductCard` |
| 関数・変数 | camelCase | `getProducts` |
| 定数 | UPPER_SNAKE_CASE | `MAX_CART_ITEMS` |
| 型・インターフェース | PascalCase | `ProductType` |
| Server Actions | camelCase + Action suffix | `addToCartAction` |

### 4.3 インポート順序

```typescript
// 1. React/Next.js
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. 外部ライブラリ
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

// 3. 内部モジュール（絶対パス）
import { Button } from '@/components/ui/button';
import { useCart } from '@/features/cart/hooks/use-cart';

// 4. 型
import type { Product } from '@/features/products/types';

// 5. スタイル・アセット
import styles from './styles.module.css';
```

### 4.4 コンポーネント設計

```typescript
// ✅ GOOD: Server Component（デフォルト）
// src/features/products/components/product-list.tsx
import { getProducts } from '../queries';
import { ProductCard } from './product-card';

export async function ProductList() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// ✅ GOOD: Client Component（インタラクションが必要な場合のみ）
// src/features/cart/components/add-to-cart-button.tsx
'use client';

import { useCart } from '../hooks/use-cart';
import { Button } from '@/components/ui/button';

interface AddToCartButtonProps {
  productId: string;
  variantId: string;
}

export function AddToCartButton({ productId, variantId }: AddToCartButtonProps) {
  const { addItem, isPending } = useCart();

  return (
    <Button
      onClick={() => addItem({ productId, variantId })}
      disabled={isPending}
    >
      カートに追加
    </Button>
  );
}
```

---

## 5. Server Actions パターン

```typescript
// src/features/cart/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const AddToCartSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid(),
  quantity: z.number().int().positive().max(99),
});

export async function addToCartAction(formData: FormData) {
  const supabase = await createClient();

  // 認証チェック
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  // バリデーション
  const parsed = AddToCartSchema.safeParse({
    productId: formData.get('productId'),
    variantId: formData.get('variantId'),
    quantity: Number(formData.get('quantity')),
  });

  if (!parsed.success) {
    return { error: 'Invalid input', details: parsed.error.flatten() };
  }

  // DB操作
  const { error } = await supabase
    .from('cart_items')
    .upsert({
      user_id: user.id,
      product_id: parsed.data.productId,
      variant_id: parsed.data.variantId,
      quantity: parsed.data.quantity,
    });

  if (error) {
    return { error: 'Failed to add item' };
  }

  revalidatePath('/cart');
  return { success: true };
}
```

---

## 6. Supabase パターン

### 6.1 クライアント作成

```typescript
// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './types';

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component では書き込み不可
          }
        },
      },
    }
  );
}

// src/lib/supabase/client.ts
'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### 6.2 RLSポリシー原則

```sql
-- ユーザーは自分のデータのみアクセス可能
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- 公開データは誰でも閲覧可能
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (is_published = true);
```

---

## 7. 多言語（i18n）パターン

### 7.1 設定

```typescript
// src/i18n/config.ts
export const locales = ['ja', 'en', 'zh', 'vi'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ja';

export const localeNames: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
  zh: '中文',
  vi: 'Tiếng Việt',
};
```

### 7.2 翻訳ファイル構造

```json
// src/messages/ja.json
{
  "common": {
    "add_to_cart": "カートに追加",
    "buy_now": "今すぐ購入",
    "loading": "読み込み中..."
  },
  "products": {
    "title": "商品一覧",
    "no_products": "商品がありません",
    "price": "{price, number, currency}"
  },
  "cart": {
    "title": "ショッピングカート",
    "empty": "カートは空です",
    "total": "合計: {total, number, currency}"
  }
}
```

### 7.3 使用方法

```typescript
// Server Component
import { getTranslations } from 'next-intl/server';

export default async function ProductsPage() {
  const t = await getTranslations('products');
  return <h1>{t('title')}</h1>;
}

// Client Component
'use client';
import { useTranslations } from 'next-intl';

export function AddToCartButton() {
  const t = useTranslations('common');
  return <button>{t('add_to_cart')}</button>;
}
```

---

## 8. 画像最適化（Cloudinary）

### 8.1 カスタムローダー

```typescript
// src/lib/cloudinary/loader.ts
import type { ImageLoaderProps } from 'next/image';

const CLOUDINARY_BASE = 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload';

export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const params = [
    `w_${width}`,
    `q_${quality || 'auto'}`,
    'f_auto',
    'c_limit',
  ].join(',');

  return `${CLOUDINARY_BASE}/${params}/${src}`;
}
```

### 8.2 next.config.ts 設定

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/cloudinary/loader.ts',
  },
};

export default nextConfig;
```

### 8.3 使用方法

```typescript
import Image from 'next/image';

// src は Cloudinary の public_id
<Image
  src="products/bouquet-spring"
  alt="春のブーケ"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority // LCP対象の場合
/>
```

---

## 9. エラーハンドリング

### 9.1 Server Actions

```typescript
// 戻り値の型を統一
type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string; details?: unknown };

export async function someAction(): Promise<ActionResult> {
  try {
    // 処理
    return { success: true };
  } catch (error) {
    console.error('Action failed:', error);
    return { success: false, error: 'Something went wrong' };
  }
}
```

### 9.2 データ取得

```typescript
// src/features/products/queries.ts
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export async function getProduct(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('products')
    .select('*, translations:product_translations(*)')
    .eq('id', id)
    .single();

  if (error || !data) {
    notFound();
  }

  return data;
}
```

---

## 10. パフォーマンス最適化

### 10.1 原則

1. **Server Components をデフォルトに**: Client Component は必要最小限
2. **動的インポート**: 重いコンポーネントは `dynamic()` で遅延読み込み
3. **画像最適化**: Cloudinary経由で自動最適化
4. **ISR活用**: 商品ページは `revalidate` で定期更新

### 10.2 動的インポート例

```typescript
import dynamic from 'next/dynamic';

const FlowerTimeline = dynamic(
  () => import('@/features/flower-story/components/timeline'),
  { loading: () => <div>Loading...</div> }
);
```

---

## 11. セキュリティチェックリスト

- [ ] 環境変数は `.env.local` に保存し、gitignore済み
- [ ] Supabase RLSポリシーを全テーブルに設定
- [ ] Server Actions でユーザー認証を必ずチェック
- [ ] Stripe Webhook は署名検証を実施
- [ ] ユーザー入力は Zod でバリデーション
- [ ] CSRF対策: Server Actions は自動で保護される

---

## 12. 実装優先順位

### Phase 0: 基盤構築
1. Next.js 16 プロジェクト初期化
2. Tailwind CSS 4 設定
3. Supabase クライアント設定
4. next-intl 多言語設定
5. Cloudinary ローダー設定
6. 共通コンポーネント（Button, Input, Card）
7. レイアウト（Header, Footer, Navigation）

### Phase 1: MVP
1. 商品一覧・詳細ページ
2. カート機能（Zustand）
3. Stripe Checkout 連携
4. 注文確認メール（Resend）
5. 基本的なマイページ

### Phase 2: 体験強化
1. Flower Story System
2. Flower Miles & Impact
3. eギフト機能
4. LINE連携

---

## 13. コミットメッセージ規約

```
<type>(<scope>): <subject>

<body>

<footer>
```

### type
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: フォーマット
- `refactor`: リファクタリング
- `test`: テスト
- `chore`: ビルド・設定

### 例
```
feat(cart): add to cart functionality

- Implement addToCartAction server action
- Add Zustand store for cart state
- Create AddToCartButton component
```

---

**このガイドに従って実装を進めてください。**
