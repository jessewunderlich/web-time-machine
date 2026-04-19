import type { MetadataRoute } from 'next';

const BASE = 'https://web-time-machine-coral.vercel.app';

const ERAS = [1991, 1996, 2000, 2005, 2010, 2015, 2021, 2026] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return [
    // Main page (all eras)
    {
      url: BASE,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    // Per-era share pages (used as social landing pages)
    ...ERAS.map((era) => ({
      url: `${BASE}/share/${era}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    // Per-era embed pages
    ...ERAS.map((era) => ({
      url: `${BASE}/embed/era/${era}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ];
}
