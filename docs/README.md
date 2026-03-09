# Bloombox Documentation

## Directory Structure

```
docs/
├── specs/           # Project specifications
│   ├── 01_technical.md      # Technical architecture & stack
│   ├── 02_business.md       # Business model & strategy
│   ├── 03_operations.md     # Operations, legal & team structure
│   └── 04_product_strategy.md # Product & flower sourcing strategy
│
└── guides/          # Development guides
    └── DESIGN_GUIDE.md      # UI/UX design guidelines & patterns
```

## Specifications (specs/)

| Document | Description |
|----------|-------------|
| [01_technical.md](./specs/01_technical.md) | 技術仕様 - Next.js, Supabase, Stripe等の技術スタック |
| [02_business.md](./specs/02_business.md) | 事業仕様 - ビジネスモデル、KPI、マーケティング戦略 |
| [03_operations.md](./specs/03_operations.md) | 運営・法務・体制 - オペレーション、法的要件、チーム構成 |
| [04_product_strategy.md](./specs/04_product_strategy.md) | 商品・花材戦略 - 商品ラインナップ、仕入れ、品質管理 |

## Development Guides (guides/)

| Document | Description |
|----------|-------------|
| [DESIGN_GUIDE.md](./guides/DESIGN_GUIDE.md) | デザインガイド - UIコンポーネント、カラーパレット、タイポグラフィ |

## Quick Links

- **Technical Stack**: Next.js 15+, React 19, TypeScript, Tailwind CSS 4
- **Database**: Supabase (PostgreSQL + Auth + RLS)
- **Payments**: Stripe Checkout
- **i18n**: next-intl (ja, en, zh, vi)
- **State**: Zustand (cart), Server Components (default)
