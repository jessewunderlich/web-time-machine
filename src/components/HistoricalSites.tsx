'use client';

import Image from 'next/image';
import styles from '../styles/historical-sites.module.css';

type EraKey = '1991' | '1996' | '2000' | '2005' | '2010' | '2015' | '2021' | '2026';

interface SiteCard {
  name: string;
  year: string;
  description: string;
  screenshotClass: string;
  /** Path to a real screenshot in /public (e.g. '/screenshots/cern91.webp') */
  screenshot?: string;
}

const ERA_SITES: Record<EraKey, SiteCard[]> = {
  '1991': [
    {
      name: 'info.cern.ch',
      year: '1991',
      description: 'First website ever — Tim Berners-Lee at CERN',
      screenshotClass: 'cern91',
      screenshot: '/screenshots/cern91.webp',
    },
    {
      name: 'NCSA Mosaic',
      year: '1993',
      description: 'First browser with inline images — changed everything',
      screenshotClass: 'mosaic93',
      screenshot: '/screenshots/mosaic93.webp',
    },
  ],
  '1996': [
    {
      name: 'Space Jam',
      year: '1996',
      description: 'The legendary movie site — still live today',
      screenshotClass: 'spacejam96',
      screenshot: '/screenshots/spacejam96.webp',
    },
    {
      name: 'Yahoo!',
      year: '1997',
      description: 'The original web directory and portal',
      screenshotClass: 'yahoo97',
      screenshot: '/screenshots/yahoo97.webp',
    },
    {
      name: 'GeoCities',
      year: '1997',
      description: 'Your neighborhood on the web',
      screenshotClass: 'geocities97',
      screenshot: '/screenshots/geocities97.webp',
    },
  ],
  '2000': [
    {
      name: 'Newgrounds.com',
      year: '2000',
      description: 'Flash games and animations for the masses',
      screenshotClass: 'newgrounds00',
      screenshot: '/screenshots/newgrounds00.webp',
    },
    {
      name: 'Apple.com',
      year: '2001',
      description: 'Aqua UI — glossy pinstripes, gel buttons, translucency',
      screenshotClass: 'apple01',
      screenshot: '/screenshots/apple01.webp',
    },
    {
      name: 'Google.com',
      year: '2002',
      description: 'Radical simplicity in the age of portals',
      screenshotClass: 'google02',
      screenshot: '/screenshots/google02.webp',
    },
  ],
  '2005': [
    {
      name: 'MySpace',
      year: '2005',
      description: 'Your profile, your HTML, your background music',
      screenshotClass: 'myspace05',
      screenshot: '/screenshots/myspace05.webp',
    },
    {
      name: 'YouTube',
      year: '2005',
      description: 'Broadcast yourself — founded in a garage',
      screenshotClass: 'youtube05',
      screenshot: '/screenshots/youtube05.webp',
    },
    {
      name: 'Facebook',
      year: '2006',
      description: 'The feed-based social network that won',
      screenshotClass: 'facebook06',
      screenshot: '/screenshots/facebook06.webp',
    },
  ],
  '2010': [
    {
      name: 'iOS 7 App Store',
      year: '2013',
      description: 'Apple goes flat — skeuomorphism is dead',
      screenshotClass: 'ios7appstore',
      screenshot: '/screenshots/ios7appstore.webp',
    },
    {
      name: 'Bootstrap',
      year: '2011',
      description: 'The grid system that homogenized the web',
      screenshotClass: 'bootstrap11',
      screenshot: '/screenshots/bootstrap11.webp',
    },
    {
      name: 'Flat UI',
      year: '2013',
      description: 'Bold colors, thin fonts, zero shadows',
      screenshotClass: 'flatui13',
      screenshot: '/screenshots/flatui13.webp',
    },
  ],
  '2015': [
    {
      name: 'Stripe.com',
      year: '2016',
      description: 'The gold standard of developer-focused design',
      screenshotClass: 'stripe16',
      screenshot: '/screenshots/stripe16.webp',
    },
    {
      name: 'Airbnb',
      year: '2017',
      description: 'Large photos, generous whitespace, trust signals',
      screenshotClass: 'airbnb17',
      screenshot: '/screenshots/airbnb17.webp',
    },
    {
      name: 'GitHub',
      year: '2020',
      description: 'Dark mode arrives — the web wants to rest',
      screenshotClass: 'github18',
      screenshot: '/screenshots/github18.webp',
    },
  ],
  '2021': [
    {
      name: 'ChatGPT',
      year: '2022',
      description: 'The chat interface that changed everything',
      screenshotClass: 'chatgpt22',
    },
    {
      name: 'Vercel',
      year: '2022',
      description: 'Glassmorphic dashboard for the edge-first web',
      screenshotClass: 'vercel22',
      screenshot: '/screenshots/vercel22.webp',
    },
    {
      name: 'Arc Browser',
      year: '2023',
      description: 'Reimagining the browser as an OS',
      screenshotClass: 'arc23',
      screenshot: '/screenshots/arc23.webp',
    },
  ],
  '2026': [
    {
      name: 'Claude Code',
      year: '2025',
      description: 'Terminal-native AI agent (GA May 2025)',
      screenshotClass: 'claudecode25',
      screenshot: '/screenshots/claudecode25.webp',
    },
    {
      name: 'Cursor',
      year: '2024',
      description: 'Editor-integrated agent mode reshaped IDEs',
      screenshotClass: 'cursor24',
      screenshot: '/screenshots/cursor24.webp',
    },
    {
      name: 'MCP Registry',
      year: '2025',
      description: 'Open protocol for agent-to-tool connections',
      screenshotClass: 'mcp25',
      screenshot: '/screenshots/mcp25.webp',
    },
  ],
};

interface HistoricalSitesProps {
  era: EraKey;
}

export default function HistoricalSites({ era }: HistoricalSitesProps) {
  const sites = ERA_SITES[era];

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Notable Sites of This Era</div>
      <div className={styles.scrollRow}>
        {sites.map((site) => (
          <div key={site.name} className={styles.card}>
            {/* Mini browser chrome */}
            <div className={styles.chrome}>
              <div className={styles.trafficLights}>
                <span className={`${styles.light} ${styles.lightRed}`} />
                <span className={`${styles.light} ${styles.lightYellow}`} />
                <span className={`${styles.light} ${styles.lightGreen}`} />
              </div>
              <div className={styles.urlBar}>
                {site.name.toLowerCase().replace(/\s+/g, '') + '.com'}
              </div>
            </div>
            {/* Screenshot: real image when available, CSS art fallback */}
            {site.screenshot ? (
              <div className={styles.screenshot}>
                <Image
                  src={site.screenshot}
                  alt={`${site.name} (${site.year}) — archived screenshot`}
                  width={800}
                  height={500}
                  unoptimized
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading="lazy"
                />
              </div>
            ) : (
              <div
                className={`${styles.screenshot} ${styles[site.screenshotClass as keyof typeof styles]}`}
              />
            )}
            {/* Caption */}
            <div className={styles.caption}>
              <div className={styles.captionRow}>
                <span className={styles.siteName}>{site.name}</span>
                <span className={styles.siteYear}>{site.year}</span>
              </div>
              <p className={styles.siteDesc}>{site.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
