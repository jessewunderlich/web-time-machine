import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { SITE_URL } from '../lib/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// viewport-fit=cover enables env(safe-area-inset-*) CSS variables so
// fixed elements (SoundToggle button) can clear iOS/Android gesture bars.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Web Time Machine — A Visual History of the Web',
  description:
    'Scroll through 35+ years of web design history. Each era is styled authentically in the visual language of its time.',
  keywords: ['web history', 'web design', 'geocities', 'flash era', 'web 2.0', 'css history', 'agentic era', 'ai web design'],
  alternates: {
    canonical: '/',
    types: {
      'application/atom+xml': '/feed.atom',
    },
  },
  openGraph: {
    title: 'Web Time Machine',
    description: 'A visual history of the web, styled in each era\'s authentic design language.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Time Machine',
    description: 'A visual history of the web, styled in each era\'s authentic design language.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      {/* No manual <head> needed — Next.js injects viewport, charset, and
       * metadata tags automatically from the exported `metadata` object.
       * A manual viewport meta here caused a duplicate in the rendered HTML. */}
      <body>
        {children}
        {/* Vercel Analytics — cookieless, GDPR-compliant, free tier.
         * Ships only on production deploys (no-op in dev). Tracks page
         * views + any custom events we fire via track(). */}
        <Analytics />
        {/* Speed Insights — real-user Web Vitals from actual visitors.
         * Complements Lighthouse synthetic scores with field data. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
