import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ERA_CARDS, type EraId } from '../../_og/era-card';

/**
 * Per-era share landing route.
 *
 * IMPORTANT: We deliberately DO NOT issue an HTTP redirect here. Social
 * scrapers (Twitterbot, facebookexternalhit, Discordbot, Slackbot,
 * LinkedInBot) follow HTTP 3xx responses by default and parse the final
 * destination's HTML — which would mean they end up on `/` and pick up
 * the generic site-wide OG image, defeating the whole point of per-era
 * share URLs.
 *
 * Instead, this page renders real HTML with:
 *   1. Per-era OG / Twitter metadata in <head> via generateMetadata.
 *   2. A client-side <meta http-equiv="refresh"> + JS fallback that
 *      bounces a human visitor to `/#era-XXXX` after the scrapers are
 *      done reading the head.
 *
 * Scrapers get the era card; humans land on the right era anchor within
 * a few hundred milliseconds.
 *
 * Pre-rendered at build time (generateStaticParams) so every era URL is
 * a static HTML file on Vercel's edge.
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
  // NOTE: Do NOT set `openGraph.images[].url` or `twitter.images[].url`
  // manually. The co-located `opengraph-image.tsx` / `twitter-image.tsx`
  // files register themselves via Next's metadata file convention, and
  // with `generateImageMetadata` they're served at `.../opengraph-image/og`
  // (a per-id sub-path), not `.../opengraph-image`. Letting Next populate
  // the URLs avoids hard-coding a path that silently breaks.
  return {
    title,
    description,
    // Robots: allow indexing so social scrapers can reach the page, but
    // tell search engines the real destination is the homepage anchor.
    alternates: {
      canonical: `/#era-${era}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `/share/${era}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ShareEraPage({ params }: { params: Params }) {
  const { era } = await params;
  if (!isEraId(era)) {
    redirect('/');
  }

  const target = `/#era-${era}`;
  const e = ERA_CARDS[era];

  // Render real HTML with:
  //   - <meta http-equiv="refresh" content="0;url=..."> — honored by most
  //     browsers even with JS disabled.
  //   - A tiny inline script as a belt-and-suspenders fallback that uses
  //     location.replace() so the share URL doesn't accumulate in history.
  //   - A human-readable fallback link in <noscript>-style <main>.
  //
  // Social scrapers (which do not follow meta-refresh or execute JS) stop
  // after parsing the <head>, where our per-era OG metadata lives. Humans
  // bounce to the era anchor in <100ms.
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <script
        // Use dangerouslySetInnerHTML so React doesn't escape the string and
        // so the script runs before hydration (inline <script> tags work
        // this way during SSR).
        dangerouslySetInnerHTML={{
          __html: `location.replace(${JSON.stringify(target)});`,
        }}
      />
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
          background: '#000',
          color: '#fff',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          {e.year}: {e.label}
        </h1>
        <p style={{ color: '#999', marginBottom: '2rem' }}>{e.tagline}</p>
        <p>
          Redirecting to{' '}
          <a href={target} style={{ color: e.color }}>
            Web Time Machine
          </a>
          …
        </p>
      </main>
    </>
  );
}
