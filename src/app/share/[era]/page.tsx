import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ERA_CARDS, eraCardAlt, type EraId } from '../../_og/era-card';

/**
 * Per-era share landing route. The page itself just 301s back to the
 * canonical `/#era-XXXX` so existing nav/scroll behavior is unchanged;
 * what makes these URLs worth having is the per-era `opengraph-image`
 * and `twitter-image` siblings in the same folder.
 *
 * When someone pastes `https://.../share/2000` into Twitter/Discord/Slack,
 * the preview pulls the era-themed card instead of the generic site OG.
 *
 * Pre-rendered at build time (generateStaticParams) so the redirect is
 * fast and the OG image is cacheable on Vercel's edge.
 */

type Params = Promise<{ era: string }>;

export function generateStaticParams() {
  return (Object.keys(ERA_CARDS) as EraId[]).map((era) => ({ era }));
}

function isEraId(v: string): v is EraId {
  return Object.prototype.hasOwnProperty.call(ERA_CARDS, v);
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { era } = await params;
  if (!isEraId(era)) {
    return {
      title: 'Web Time Machine',
      description: 'Scroll through 30+ years of web design history.',
    };
  }
  const e = ERA_CARDS[era];
  const title = `${e.year}: ${e.label} — Web Time Machine`;
  const description = e.tagline;
  // NOTE: Do NOT set `openGraph.images` or `twitter.images` manually. The
  // co-located `opengraph-image.tsx` / `twitter-image.tsx` route files
  // register themselves automatically via Next's metadata file convention,
  // and when `generateImageMetadata` is used they're served at
  // `.../opengraph-image/og` (per-id path), not `.../opengraph-image`.
  // Letting Next populate the URLs avoids hard-coding a path that becomes
  // wrong the moment a generator function is added.
  //
  // We still export alt text here via the image routes' generateImageMetadata.
  void eraCardAlt; // keep import so alt generator signature stays exported
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `/#era-${era}`,
    },
  };
}

export default async function ShareEraPage({ params }: { params: Params }) {
  const { era } = await params;
  if (!isEraId(era)) {
    redirect('/');
  }
  // Send humans to the live era anchor; social scrapers have already
  // harvested the OG metadata above before following this redirect.
  redirect(`/#era-${era}`);
}
