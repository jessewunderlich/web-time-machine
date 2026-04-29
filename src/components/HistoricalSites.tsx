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
  /**
   * Domain shown in the fake browser URL bar. If omitted we fall back to a
   * derived string, but most real sites need an explicit value because their
   * name already includes a TLD (apple.com, info.cern.ch) or is a product
   * rather than a domain (Bootstrap → getbootstrap.com).
   */
  urlBar?: string;
}

const ERA_SITES: Record<EraKey, SiteCard[]> = {
  '1991': [
    {
      name: 'info.cern.ch',
      year: '1991',
      description: 'First website ever — Tim Berners-Lee at CERN',
      screenshotClass: 'cern91',
      screenshot: '/screenshots/cern91.webp',
      urlBar: 'info.cern.ch',
    },
    {
      name: 'NCSA Mosaic',
      year: '1993',
      description: 'First browser with inline images — changed everything',
      screenshotClass: 'mosaic93',
      screenshot: '/screenshots/mosaic93.webp',
      urlBar: 'ncsa.illinois.edu/mosaic',
    },
  ],
  '1996': [
    {
      name: 'Space Jam',
      year: '1996',
      description: 'The legendary movie site — still live today',
      screenshotClass: 'spacejam96',
      screenshot: '/screenshots/spacejam96.webp',
      urlBar: 'spacejam.com',
    },
    {
      name: 'Yahoo!',
      year: '1997',
      description: 'The original web directory and portal',
      screenshotClass: 'yahoo97',
      screenshot: '/screenshots/yahoo97.webp',
      urlBar: 'yahoo.com',
    },
    {
      name: 'GeoCities',
      year: '1997',
      description: 'Your neighborhood on the web',
      screenshotClass: 'geocities97',
      screenshot: '/screenshots/geocities97.webp',
      urlBar: 'geocities.com',
    },
  ],
  '2000': [
    {
      name: 'Newgrounds',
      year: '2000',
      description: 'Flash games and animations for the masses',
      screenshotClass: 'newgrounds00',
      screenshot: '/screenshots/newgrounds00.webp',
      urlBar: 'newgrounds.com',
    },
    {
      name: 'Apple',
      year: '2001',
      description: 'Aqua UI — glossy pinstripes, gel buttons, translucency',
      screenshotClass: 'apple01',
      screenshot: '/screenshots/apple01.webp',
      urlBar: 'apple.com',
    },
    {
      name: 'Google',
      year: '2002',
      description: 'Radical simplicity in the age of portals',
      screenshotClass: 'google02',
      screenshot: '/screenshots/google02.webp',
      urlBar: 'google.com',
    },
  ],
  '2005': [
    {
      name: 'MySpace',
      year: '2005',
      description: 'Your profile, your HTML, your background music',
      screenshotClass: 'myspace05',
      screenshot: '/screenshots/myspace05.webp',
      urlBar: 'myspace.com',
    },
    {
      name: 'YouTube',
      year: '2005',
      description: 'Broadcast yourself — founded in a garage',
      screenshotClass: 'youtube05',
      screenshot: '/screenshots/youtube05.webp',
      urlBar: 'youtube.com',
    },
    {
      name: 'Facebook',
      year: '2006',
      description: 'The feed-based social network that won',
      screenshotClass: 'facebook06',
      screenshot: '/screenshots/facebook06.webp',
      urlBar: 'facebook.com',
    },
  ],
  '2010': [
    {
      name: 'iOS 7 App Store',
      year: '2013',
      description: 'Apple goes flat — skeuomorphism is dead',
      screenshotClass: 'ios7appstore',
      screenshot: '/screenshots/ios7appstore.webp',
      urlBar: 'apple.com/ios/ios7',
    },
    {
      name: 'Bootstrap',
      year: '2011',
      description: 'The grid system that homogenized the web',
      screenshotClass: 'bootstrap11',
      screenshot: '/screenshots/bootstrap11.webp',
      urlBar: 'getbootstrap.com',
    },
    {
      name: 'Flat UI',
      year: '2013',
      description: 'Bold colors, thin fonts, zero shadows',
      screenshotClass: 'flatui13',
      screenshot: '/screenshots/flatui13.webp',
      urlBar: 'designmodo.github.io/Flat-UI',
    },
  ],
  '2015': [
    {
      name: 'Stripe',
      year: '2016',
      description: 'The gold standard of developer-focused design',
      screenshotClass: 'stripe16',
      screenshot: '/screenshots/stripe16.webp',
      urlBar: 'stripe.com',
    },
    {
      name: 'Airbnb',
      year: '2017',
      description: 'Large photos, generous whitespace, trust signals',
      screenshotClass: 'airbnb17',
      screenshot: '/screenshots/airbnb17.webp',
      urlBar: 'airbnb.com',
    },
    {
      name: 'GitHub',
      year: '2020',
      description: 'Dark mode arrives — the web wants to rest',
      screenshotClass: 'github18',
      screenshot: '/screenshots/github18.webp',
      urlBar: 'github.com',
    },
  ],
  '2021': [
    {
      name: 'ChatGPT',
      year: '2022',
      description: 'The chat interface that changed everything',
      screenshotClass: 'chatgpt22',
      urlBar: 'chat.openai.com',
    },
    {
      name: 'Vercel',
      year: '2022',
      description: 'Glassmorphic dashboard for the edge-first web',
      screenshotClass: 'vercel22',
      screenshot: '/screenshots/vercel22.webp',
      urlBar: 'vercel.com',
    },
    {
      name: 'Arc Browser',
      year: '2023',
      description: 'Reimagining the browser as an OS',
      screenshotClass: 'arc23',
      screenshot: '/screenshots/arc23.webp',
      urlBar: 'arc.net',
    },
  ],
  '2026': [
    {
      name: 'Claude Code',
      year: '2025',
      description: 'Terminal-native AI agent (GA May 2025)',
      screenshotClass: 'claudecode25',
      screenshot: '/screenshots/claudecode25.webp',
      urlBar: 'claude.com/product/claude-code',
    },
    {
      name: 'Cursor',
      year: '2024',
      description: 'Editor-integrated agent mode reshaped IDEs',
      screenshotClass: 'cursor24',
      screenshot: '/screenshots/cursor24.webp',
      urlBar: 'cursor.com',
    },
    {
      name: 'MCP Registry',
      year: '2025',
      description: 'Open protocol for agent-to-tool connections',
      screenshotClass: 'mcp25',
      screenshot: '/screenshots/mcp25.webp',
      urlBar: 'modelcontextprotocol.io',
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
                {site.urlBar ?? `${site.name.toLowerCase().replace(/[^a-z0-9]+/g, '')}.com`}
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
