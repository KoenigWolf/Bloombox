# Bloombox

Premium flower delivery platform with sustainability focus.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS 4
- **Language**: TypeScript 5
- **Database**: Supabase (PostgreSQL + Auth + RLS)
- **Payments**: Stripe Checkout
- **Email**: Resend
- **Messaging**: LINE Messaging API
- **Images**: Cloudinary
- **i18n**: next-intl (ja, en, zh, vi)
- **State**: Zustand

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Link Supabase project
supabase link --project-ref <your-project-ref>

# Push database schema
supabase db push

# Start development server
npm run dev
```

## Project Structure

```
src/
├── app/              # Next.js App Router (routes only)
├── components/       # Shared UI components
│   ├── ui/          # Primitives (Button, Input, Card)
│   └── layout/      # Layout components (Header, Footer)
├── features/        # Feature modules (domain-driven)
│   ├── auth/        # Authentication
│   ├── cart/        # Shopping cart
│   ├── checkout/    # Checkout flow
│   ├── products/    # Product catalog
│   ├── egift/       # eGift functionality
│   ├── flower-miles/ # Loyalty program
│   └── flower-story/ # Producer stories
├── lib/             # External integrations
│   ├── supabase/    # Database client & types
│   ├── stripe/      # Payment processing
│   ├── cloudinary/  # Image optimization
│   ├── resend/      # Transactional email
│   ├── line/        # LINE notifications
│   └── utils/       # Utility functions
├── config/          # App configuration
├── hooks/           # Shared React hooks
├── types/           # Shared TypeScript types
├── i18n/            # Internationalization config
└── messages/        # Translation files (ja, en, zh, vi)
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run type-check # Run TypeScript check
```

## Documentation

See [docs/README.md](./docs/README.md) for detailed documentation.

## Environment Variables

See [.env.example](./.env.example) for required environment variables.
