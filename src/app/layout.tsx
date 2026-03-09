import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Bloombox - 花のギフトEC',
    template: '%s | Bloombox',
  },
  description:
    'Bloomboxは、花の生産者と消費者をつなぐサステナブルな花のギフトプラットフォームです。',
  keywords: ['花', 'ギフト', 'フラワー', 'EC', 'サステナブル', 'Bloombox'],
  authors: [{ name: 'Bloombox' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Bloombox',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
