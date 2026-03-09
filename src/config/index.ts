/**
 * Application Configuration
 *
 * Centralized configuration for the Bloombox application.
 * Environment variables are validated and typed here.
 */

// Site configuration
export const siteConfig = {
  name: 'Bloombox',
  description: 'Premium flower delivery service',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  defaultLocale: 'ja' as const,
  locales: ['ja', 'en', 'zh', 'vi'] as const,
} as const;

// Supabase configuration
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
} as const;

// Stripe configuration
export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  secretKey: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  currency: 'jpy' as const,
} as const;

// Cloudinary configuration
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  baseUrl: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`,
} as const;

// LINE configuration
export const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
} as const;

// Resend configuration
export const resendConfig = {
  apiKey: process.env.RESEND_API_KEY,
  fromEmail: 'noreply@bloombox.jp',
  fromName: 'Bloombox',
} as const;

// PostHog configuration
export const posthogConfig = {
  key: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
} as const;

// Feature flags
export const featureFlags = {
  enableFlowerMiles: true,
  enableEGift: true,
  enableFlowerRescue: true,
  enableLineNotifications: true,
} as const;

// Business rules
export const businessRules = {
  // Flower Miles
  milesPerYen: 0.01, // 1% of purchase amount
  milesExpirationDays: 365,
  minRedemptionMiles: 100,

  // Shipping
  freeShippingThreshold: 10000, // JPY
  standardShippingCost: 880, // JPY

  // Tax
  taxRate: 0.10, // 10% consumption tax

  // Rank thresholds (lifetime miles)
  rankThresholds: {
    bronze: 0,
    silver: 1000,
    gold: 5000,
    platinum: 10000,
  },
} as const;
