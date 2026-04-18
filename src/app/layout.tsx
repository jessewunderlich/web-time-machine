import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Web Time Machine — A Visual History of the Web',
  description:
    'Scroll through 30+ years of web design history. Each era is styled authentically in the visual language of its time.',
  keywords: ['web history', 'web design', 'geocities', 'flash era', 'web 2.0', 'css history'],
  openGraph: {
    title: 'Web Time Machine',
    description: 'A visual history of the web, styled in each era\'s authentic design language.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
