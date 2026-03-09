# Bloombox 技術選定・開発計画書（技術編）

**最終更新:** 2026年3月9日
**調査基準日:** 2026年3月

## 1. 技術アーキテクチャ全体像

### 1.1 推奨構成

```text
┌──────────────────────────────────────────────────────────┐
│          Vercel Pro（$20/月） + Cloudflare DNS            │
│       ホスティング + Edge Functions (CDNはVercel標準)        │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │            Next.js 16 (App Router)                 │  │
│  │     React 19.2 + RSC + Turbopack + ISR             │  │
│  │     next-intl (JP / EN / ZH / VI 4言語)            │  │
│  └──────────────────┬─────────────────────────────────┘  │
└─────────────────────┼────────────────────────────────────┘
                      │
        ┌─────────────┼───────────────────┐
        │             │                   │
        ▼             ▼                   ▼
  ┌──────────┐  ┌───────────┐   ┌──────────────────┐
  │ Supabase │  │  Stripe   │   │  外部サービス     │
  │  DB      │  │  決済     │   │                   │
  │  Auth    │  │  カード   │   │ ・Cloudinary      │
  │  Storage │  │  コンビニ │   │ ・Resend          │
  │  RLS     │  │  PayPay   │   │ ・LINE API        │
  │          │  │  Webhook  │   │ ・microCMS        │
  │          │  │           │   │ ・PostHog         │
  └──────────┘  └───────────┘   └──────────────────┘

```

### 1.2 設計原則

* **ツールは最小構成:** サービス数を絞り、運用負荷を最小化する。分離が明確に有利な場合のみ分割。
* **Webベース完全対応:** iPhone / Android / Windows / Mac / すべてのWebブラウザで動作するレスポンシブWebアプリ。ネイティブアプリは作らない。
* **画像パフォーマンス最優先:** 花の高品質写真を大量に使用しても、Core Web Vitals を維持する設計。
* **AI機能は初期除外:** AIメッセージ生成は将来フェーズで実装。初期MVPには含めない。
* **グローバル前提:** 初日から4言語（JP/EN/ZH/VI）対応のi18n設計。
* **ストーリーファースト:** Flower Story System（花・人・時間の3ストーリー）をデータモデルの中核に据える。すべての注文にバッチ（ロット）IDを紐づけ、トレーサビリティを確保。
* **ゲーミフィケーション内蔵:** Flower Miles / ランク / バッジをDB設計段階から組み込み、後付けではなく初期アーキテクチャの一部として設計。

## 2. インフラ選定

### 2.1 ホスティング比較

| 項目 | Vercel Pro | AWS Amplify | Google Cloud Run | Cloudflare Workers |
| --- | --- | --- | --- | --- |
| **月額** | **$20（固定）** | 従量（Free Tier有） | 従量（Free Tier有） | $5〜（Workers Paid） |
| **Next.js 16互換** | **✅ 完全（開発元）** | ✅ 良好（OpenNext） | △ Docker化が必要 | △ OpenNext beta |
| **東京リージョン** | **✅ Edge Network** | ✅ ap-northeast-1 | ✅ asia-northeast1 | ✅ グローバルエッジ |
| **CI/CD** | **✅ GitHub連携ゼロ設定** | ✅ 自動ビルド | △ Cloud Build設定要 | △ Wrangler設定要 |
| **画像最適化** | **✅ next/image対応** | △ 自前設定 | × 自前 | △ Images有 |
| **スケーラビリティ** | **○ 自動** | ◎ AWS全サービス連携 | ◎ 自動スケール | ○ エッジ |
| **運用難易度** | **★☆☆ 簡単** | ★★☆ AWS知識要 | ★★★ コンテナ知識要 | ★★☆ Workers知識要 |
| **帯域** | **1TB/月込み** | 15GB/月Free | 従量 | 無制限（Workers） |

### 2.2 選定結果: Vercel Pro + Cloudflare DNS

初期〜中期（ユーザー10万人まで）はVercel Proを推奨する。理由は以下の通り。

1. **Next.js 16との完全互換性:** VercelはNext.jsの開発元であり、App Router / RSC / Turbopack / ISR / React Compiler のすべての機能が完全にサポートされている。
2. **1〜2人開発体制での運用効率:** GitHub Push → Preview → Production の自動デプロイがゼロ設定で動く。
3. **コスト予測性:** $20/月の固定費で帯域1TB含む。
4. **将来の移行パス:** スケール限界に達した場合、OpenNext + AWS Amplify またはSSTへの移行が可能。コードベースはそのまま移行できる。

**🚨 Cloudflare DNS併用時の注意点（プロキシ問題の回避）:**
Vercel公式の非推奨事項に従い、Cloudflareは**DNS管理（プロキシOFFのグレーの雲マーク）**としてのみ使用し、CDNレイヤーはVercel Edge Networkの標準機能をそのまま活用する（二重CDNによるSSLエラーやキャッシュ不整合を防ぐため）。帯域を圧迫する「画像」はCloudinaryへ完全に逃がすため、Vercelの帯域1TBを超えるリスクは低い。

### 2.3 スケールに応じたインフラ移行計画

| フェーズ | ユーザー規模 | インフラ構成 | 月額目安 |
| --- | --- | --- | --- |
| **初期** | 〜1,000人 | Vercel Pro + Supabase Free | ¥3,000 |
| **成長期** | 1,000〜10,000人 | Vercel Pro + Supabase Pro | ¥7,000 |
| **拡大期** | 10,000〜100,000人 | Vercel Pro + Supabase Pro | ¥7,000 |
| **大規模** | 100,000人〜 | AWS Amplify/SST + Aurora Serverless + CloudFront | 従量（¥50,000〜） |

## 3. 技術スタック詳細

### 3.1 フロントエンド

| 技術 | バージョン | 用途 | 選定理由 |
| --- | --- | --- | --- |
| **Next.js** | 16.x (App Router) | フレームワーク | RSC安定、Turbopack標準、React Compiler内蔵 |
| **React** | 19.2 | UIライブラリ | Server Components / Actions が安定版 |
| **TypeScript** | 5.x | 型安全 | 業界標準 |
| **Tailwind CSS** | 4.x | ユーティリティCSS | JIT、高速ビルド、設定ファイルレス化 |
| **Framer Motion** | 12.x | アニメーション | 花のビジュアル演出 |
| **Radix UI** | latest | アクセシブルUI | a11y準拠、unstyled |
| **Zustand** | 5.x | 状態管理（カート） | 軽量、SSR対応 |
| **react-hook-form** | latest | フォーム | Zod連携による型安全バリデーション |
| **next-intl** | 4.x | 多言語対応 | App Router完全対応 |

### 3.2 バックエンド言語の選定

**結論: Next.js の Server Actions と Route Handlers (API Routes) をバックエンドとして使用する。Go等の別言語は採用しない。**

* **データの取得・更新（カート追加、プロフ更新など）:** Server Actions を使用。
* **外部からの通信（Stripe Webhook, LINE Webhookなど）:** Route Handlers (API Routes) を使用。

**選定理由:**

* **フロント/バック統一:** TypeScriptで統一することで、型定義の共有、1リポジトリ管理が実現。1〜2人の開発体制では、言語の切り替えコストを排除することが最も効率的。
* **Supabase連携:** Supabaseの型生成で生成されたTypeScript型を直接共有できる。
* **パフォーマンス十分:** ECサイトの一般的なトラフィックであれば、Vercelの環境で十分に対応可能。

### 3.3 データベース選定

**結論: Supabase を継続採用する。**
オールインワン（DB + Auth + Storage + RLS + Realtime）であり、ツール最小構成の原則に合致。行レベルセキュリティ（RLS）により、APIレイヤーでの認可チェックを簡素化できる。
※初期〜中期は単一データベース（Supabase 1インスタンス）で十分。冗長化やバックアップはSupabase側のマネージド機能に任せる。

### 3.4 決済システム選定

**結論: Stripe を主軸に、PayPay / コンビニ払いもStripe内で対応する。KOMOJUは楽天ペイ追加時のみ検討。**

* **海外対応:** クロスボーダーギフト（海外→日本）に対応する多通貨機能。
* **開発容易性:** Stripe CheckoutによるPCI DSS準拠のホスティング済み決済フォームを利用し、セキュリティ実装負担をゼロにする。

### 3.5 画像パフォーマンス戦略（重要）

花の高品質写真を大量に使用しながらページ速度を維持するための設計。

**🚨 Vercel画像課金トラップの回避:**
`next/image` のデフォルト機能を使うとVercel側で再処理が走り、高額なImage Optimization費用が発生する。これを防ぐため、**Cloudinary専用のカスタムローダーを設定**する。

```tsx
import Image from 'next/image';

// next.config.ts にて loader: 'custom' と設定し、
// Cloudinaryから直接最適化画像（WebP/AVIF）を取得する
<Image
  src="bouquet-spring" // Cloudinaryの公開ID
  alt="春のブーケ"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={isAboveFold} // LCP画像はプリロード
  placeholder="blur"
  blurDataURL={blurDataUrl} // サーバーサイドで生成した低解像度プレースホルダー
/>

```

### 3.6 多言語対応（i18n）設計

対応言語: 日本語（ja）、英語（en）、中国語簡体字（zh）、ベトナム語（vi）
ディレクトリベースのルーティング（例: `/en/products`）で構築。翻訳ファイル（JSON）は `src/messages/` 配下で管理。データベースも多言語対応を前提に設計（`product_translations` テーブル）。

### 3.7 LINE Messaging API 設計

初期はコミュニケーションプラン（無料・200通/月）で開始。

* **用途:** 注文完了通知、配送状況通知、リマインダー（誕生日2週間前に通知）、バッジ・Miles獲得通知。
* **注意点:** LINE Notifyは2025年3月にサービス終了したため、Messaging APIに一本化して実装する。

### 3.8 アクセス解析選定

**結論: PostHog（無料プラン）を主軸に、GA4を併用する。**
月100万イベントまで無料で、イベント分析・セッション録画・A/Bテスト・ヒートマップが1ツールで完結するPostHogを採用。GA4はSEOと広告効果測定用に並行稼働。

## 4. データベース設計

### 4.1 設計原則

* グローバル前提: テキストカラムは4言語対応（ja/en/zh/vi）
* 拡張性重視: 将来のマイグレーションを最小化する初期設計
* エラー耐性: NOT NULL制約、CHECK制約、外部キー制約を活用

### 4.2 ER図

```text
farmers ──── flower_batches ──── flower_rescue_events
  │              │
  │              └── order_items（batch_id参照）
  │
florists ─────────── orders（florist_id参照）

customers ──┬── orders ──── order_items ──── product_variants ──── products
            │      │                                                   │
            │      ├── (gift info: message, wrapping, noshi)          │
            │      ├── (egift: url_token, claimed)                    │
            │      └── (sustainability_message, rescued_flower_count)  │
            │                                                          │
            ├── saved_addresses                             product_images
            ├── important_dates                             product_translations
            │                                               flower_meanings
            ├── flower_miles_transactions                   reviews
            └── user_flower_impact

```

*(※具体的なテーブル定義SQL（products, orders, customers, farmers, flower_batches等）およびRLSポリシーは、レビュー前の設計と同一のため割愛・維持するものとします。)*

## 5. プロジェクトディレクトリ構成

2026年時点のNext.js 16ベストプラクティスに基づく構成。Feature-based + Colocation パターン。

```text
bloombox/
├── src/
│   ├── app/                              # App Router
│   │   ├── [locale]/                     # next-intl ロケールルーティング
│   │   │   ├── (shop)/                   # ショッピング関連（グループ）
│   │   │   ├── (content)/                # コンテンツ関連（グループ）
│   │   │   ├── (account)/                # アカウント関連（グループ）
│   │   │   └── api/                      # Route Handlers (Webhook等外部向け)
│   │   └── globals.css                   # Tailwind v4の設定もここに内包
│   │
│   ├── features/                         # 機能別モジュール（Feature-based）
│   │   ├── products/                     # components, hooks, actions (Server Actions)
│   │   ├── flower-story/
│   │   ├── flower-miles/
│   │   └── flower-impact/
│   │
│   ├── components/                       # 共有コンポーネント (layout, ui)
│   ├── lib/                              # 共有ユーティリティ (supabase, cloudinary)
│   ├── i18n/                             # 多言語設定
│   └── messages/                         # 翻訳ファイル (ja.json 等)
│
├── public/                               # 静的ファイル
├── supabase/                             # DB マイグレーション
├── next.config.ts
├── tsconfig.json
└── package.json

```

**設計思想:**

* **Server Actionsの配置:** 各 `features/*/actions.ts` 等に配置し、データミューテーションを機能ごとにカプセル化。
* **Tailwind v4:** 設定ファイル (`tailwind.config.ts`) は廃止されたため存在せず、`globals.css` の `@theme` ディレクティブで管理。

## 6. 月額コスト見積もり

（※変更なし。Vercel Pro $20, Supabase Free〜Pro等を前提とした低コスト運用）

## 7. 開発ロードマップ

### Phase 0: 基盤構築（1週間）

* [x] Next.js 16 プロジェクト初期化（Turbopack）
* [x] Tailwind CSS 4 + フォント設定
* [x] Supabase プロジェクト作成 + RLS設定
* [x] Vercel デプロイ設定 + GitHub連携
* [x] Cloudflare DNS設定（プロキシOFF）

### Phase 1: MVP — 花が1件売れる（3〜4週間）

* [x] デザインシステム・レイアウト・トップページ
* [x] 商品一覧・詳細ページ（Cloudinaryカスタムローダー設定）
* [x] カート（Zustand）
* [x] Stripe Checkout → Webhook → 注文保存（Route Handlers）
* [x] 注文確認メール（Resend）

### Phase 2: 体験強化（3〜4週間）

* [x] Flower Story System: バッチ管理、Flower Timeline表示
* [x] Flower Miles & Impact ダッシュボード
* [x] eギフト機能・のし選択UI
* [x] LINE連携（Messaging APIによる通知全般）

## 8. 技術リスクと対策

| リスク | 影響 | 対策 |
| --- | --- | --- |
| **Vercel画像課金超過** | 高額請求 | next/imageの標準最適化を切り、Cloudinaryカスタムローダーで完全にバイパスする |
| **Vercel帯域超過** | 追加料金 | Cloudflare CDNは使わず、Cloudinary経由の画像配信で帯域自体を極小化する |
| **Supabase Free枠上限** | DB停止 | 月商が立った段階で$25 Proに即移行。データ移行不要 |
| **Next.js 16の新規バグ** | 開発遅延 | セキュリティパッチ適用済み安定版を使用。Server Actionsのバグに注意 |

## 9. Day 1 セットアップチェックリスト

* [ ] GitHub リポジトリ作成（private）
* [ ] Next.js 16 プロジェクト初期化（Turbopack有効）
* [ ] Vercel アカウント作成 → Pro契約 → GitHub連携
* [ ] Cloudflare アカウント作成 → DNS設定（※プロキシ無効化を確認）
* [ ] Supabase プロジェクト作成（東京リージョン: ap-northeast-1）
* [ ] Stripe / Cloudinary / microCMS / Resend / PostHog アカウント作成
* [ ] LINE Developers アカウント作成 → Messaging APIチャネル作成
* [ ] ドメイン取得（bloombox.jp 等）→ Cloudflare DNS → Vercelに設定