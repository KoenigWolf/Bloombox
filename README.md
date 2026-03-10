# Bloombox

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase)](https://supabase.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3-6E9F18?logo=vitest)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright)](https://playwright.dev/)

**サステナビリティを重視したプレミアムフラワーデリバリープラットフォーム**

花の生産者から届けられるストーリー、フラワーロス削減への貢献、そしてお客様との長期的な関係構築を実現する次世代の花のECプラットフォームです。

## Features

### Core Features
- **商品カタログ** - 多言語対応の商品一覧・詳細表示
- **カート & チェックアウト** - Stripe Checkoutによる安全な決済
- **認証** - Supabase Authによるメール認証
- **eギフト** - URLベースのギフト送付機能

### Unique Features
- **Flower Story** - 生産者のストーリーとトレーサビリティ
- **Flower Miles** - ロイヤリティプログラム（ランク制度）
- **Flower Rescue** - 規格外の花を活用したサステナブル商品
- **LINE通知** - 注文確認・発送通知をLINEで配信

### Technical Features
- **多言語対応** - 日本語、英語、中国語、ベトナム語
- **Server Components** - React 19のServer Componentsをデフォルト採用
- **Row Level Security** - Supabaseによるセキュアなデータアクセス
- **Edge Middleware** - 認証・i18nのミドルウェア処理

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 4 |
| Language | TypeScript 5 |
| Database | Supabase (PostgreSQL + Auth + RLS) |
| Payments | Stripe Checkout |
| Email | Resend |
| Messaging | LINE Messaging API |
| Images | Cloudinary |
| i18n | next-intl |
| State | Zustand |
| Testing | Vitest, React Testing Library, Playwright |
| CI/CD | GitHub Actions |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Supabase CLI
- Supabase Project
- Stripe Account

### Installation

```bash
# Clone the repository
git clone https://github.com/KoenigWolf/Bloombox.git
cd Bloombox

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys
```

### Database Setup

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref <your-project-ref>

# Push database schema
supabase db push

# (Optional) Reset with seed data
supabase db reset --linked
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
Bloombox/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── docs/                    # Documentation
│   ├── specs/              # Project specifications
│   └── guides/             # Development guides
├── e2e/                     # Playwright E2E tests
├── supabase/               # Database configuration
│   ├── migrations/         # SQL migrations
│   └── seed.sql           # Seed data
└── src/
    ├── app/                # Next.js App Router
    │   ├── [locale]/       # Localized routes
    │   │   ├── (shop)/    # Public shop pages
    │   │   ├── (auth)/    # Auth pages
    │   │   ├── (account)/ # Protected pages
    │   │   └── (content)/ # Content pages (About, Story)
    │   └── api/           # API routes
    ├── components/         # Shared components
    │   ├── ui/            # Primitives (Button, Card, Input)
    │   └── layout/        # Layout (Header, Footer)
    ├── features/          # Feature modules
    │   ├── auth/          # Authentication
    │   ├── cart/          # Shopping cart
    │   ├── checkout/      # Checkout flow
    │   ├── products/      # Product catalog
    │   ├── egift/         # eGift functionality
    │   ├── flower-miles/  # Loyalty program
    │   └── flower-story/  # Producer stories
    ├── lib/               # External integrations
    │   ├── supabase/      # Database client
    │   ├── stripe/        # Payment processing
    │   ├── cloudinary/    # Image optimization
    │   ├── resend/        # Email delivery
    │   └── line/          # LINE Messaging
    ├── test/              # Test utilities & mocks
    ├── config/            # App configuration
    ├── hooks/             # Shared React hooks
    ├── types/             # Shared TypeScript types
    ├── i18n/              # i18n configuration
    └── messages/          # Translation files (ja, en, zh, vi)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |
| `npm run test` | Run unit tests in watch mode |
| `npm run test:run` | Run unit tests once |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:e2e` | Run E2E tests with Playwright |
| `npm run check-all` | Run lint, type-check, test, and build |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `RESEND_API_KEY` | Resend API key |
| `LINE_CHANNEL_ACCESS_TOKEN` | LINE channel access token |
| `LINE_CHANNEL_SECRET` | LINE channel secret |

See [.env.example](./.env.example) for the complete list.

## Testing

### Unit Tests (Vitest + React Testing Library)

```bash
# Run in watch mode
npm run test

# Run once
npm run test:run

# With coverage
npm run test:coverage
```

テスト対象:
- `lib/utils/` - ユーティリティ関数
- `features/*/` - ストア、フック、型定義
- `components/ui/` - UIコンポーネント

### E2E Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui
```

テスト対象:
- ホームページナビゲーション
- 商品一覧・詳細
- カート機能
- チェックアウトフロー
- アクセシビリティ

### CI/CD

GitHub Actionsで以下を自動実行:
1. **Lint** - ESLint
2. **Type Check** - TypeScript
3. **Unit Tests** - Vitest
4. **Build** - Next.js
5. **E2E Tests** - Playwright (Chrome)

## Documentation

| Document | Description |
|----------|-------------|
| [Technical Spec](./docs/specs/01_technical.md) | 技術仕様 |
| [Business Spec](./docs/specs/02_business.md) | 事業仕様 |
| [Operations](./docs/specs/03_operations.md) | 運営・法務・体制 |
| [Product Strategy](./docs/specs/04_product_strategy.md) | 商品・花材戦略 |
| [Design Guide](./docs/guides/DESIGN_GUIDE.md) | デザインガイド |

## License

Private - All rights reserved.
