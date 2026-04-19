import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EmbedEraClient from './EmbedEraClient';

/**
 * /embed/era/[era] — Embeddable single-era widget.
 *
 * Strips all site chrome (nav, progress bar, sound, keyboard nav) and
 * renders one era in a compact frame suitable for third-party iframes.
 *
 * The layout is a standalone HTML document with its own metadata so it
 * works in sandboxed iframes on Medium, dev.to, Notion, Substack, etc.
 */

const VALID_ERAS = ['1991', '1996', '2000', '2005', '2010', '2015', '2021', '2026'] as const;
type EraId = (typeof VALID_ERAS)[number];

const ERA_LABELS: Record<EraId, string> = {
  '1991': 'The Dawn of the Web',
  '1996': 'GeoCities & the Personal Web',
  '2000': 'The Flash Era',
  '2005': 'Web 2.0',
  '2010': 'Flat & Responsive',
  '2015': 'Material & Design Systems',
  '2021': 'The AI Era',
  '2026': 'The Agentic Era',
};

export function generateStaticParams() {
  return VALID_ERAS.map((era) => ({ era }));
}

type PageProps = { params: Promise<{ era: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { era } = await params;
  if (!VALID_ERAS.includes(era as EraId)) return {};
  const label = ERA_LABELS[era as EraId];
  return {
    title: `${era}: ${label} — Web Time Machine`,
    description: `Embeddable widget: ${label}. Part of the Web Time Machine visual history.`,
    robots: { index: false, follow: false },
  };
}

export default async function EmbedEraPage({ params }: PageProps) {
  const { era } = await params;
  if (!VALID_ERAS.includes(era as EraId)) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://web-time-machine-coral.vercel.app';

  return (
    <EmbedEraClient era={era as EraId} siteUrl={siteUrl} />
  );
}
