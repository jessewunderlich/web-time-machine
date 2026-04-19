import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Canonical production domain. VERCEL_URL returns the deployment-specific
// subdomain (e.g. web-time-machine-abc123-user.vercel.app), which is wrong
// for OG images and feed autodiscovery links — those must use the stable
// alias that social scrapers and RSS readers will actually resolve.
// VERCEL_ENV is 'production' on the main-branch deploy, 'preview' otherwise.
const CANONICAL = 'https://web-time-machine-coral.vercel.app';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_ENV === 'production'
    ? CANONICAL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : CANONICAL);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Web Time Machine — A Visual History of the Web',
  description:
    'Scroll through 35+ years of web design history. Each era is styled authentically in the visual language of its time.',
  keywords: ['web history', 'web design', 'geocities', 'flash era', 'web 2.0', 'css history', 'agentic era', 'ai web design'],
  alternates: {
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
