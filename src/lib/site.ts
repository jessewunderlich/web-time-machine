/**
 * Canonical production URL for Web Time Machine.
 *
 * VERCEL_URL returns the deployment-specific subdomain (e.g.
 * web-time-machine-abc123-user.vercel.app), which is wrong for OG images,
 * feed autodiscovery, and JSON-LD `url` fields — those must use the
 * stable alias that social scrapers and RSS readers will actually
 * resolve. VERCEL_ENV is 'production' on the main-branch deploy,
 * 'preview' otherwise.
 *
 * Override at build time by setting NEXT_PUBLIC_SITE_URL when migrating
 * to a custom domain — no code changes needed elsewhere.
 */
export const CANONICAL_SITE_URL = 'https://web-time-machine-coral.vercel.app';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_ENV === 'production'
    ? CANONICAL_SITE_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : CANONICAL_SITE_URL);
