import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Used to resolve relative URLs (e.g. the generated opengraph-image and
// twitter-image routes) to absolute URLs in social metadata. Vercel exposes
// VERCEL_URL on both preview and production; fall back to the canonical
// production domain for local dev builds.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://web-time-machine-coral.vercel.app';

// viewport-fit=cover enables env(safe-area-inset-*) CSS variables so
// fixed elements (SoundToggle button) can clear iOS/Android gesture bars.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Web Time Machine — A Visual History of the Web',
  description:
    'Scroll through 30+ years of web design history. Each era is styled authentically in the visual language of its time.',
  keywords: ['web history', 'web design', 'geocities', 'flash era', 'web 2.0', 'css history'],
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
      <body>{children}</body>
    </html>
  );
}
