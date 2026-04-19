/**
 * /feed.atom — Atom 1.0 feed for Web Time Machine updates.
 *
 * Serves a static feed of era additions and major updates.
 * Dev-circles still use RSS/Atom heavily; this is a free
 * subscriber-retention channel.
 */

const SITE_URL = 'https://web-time-machine-coral.vercel.app';
const FEED_TITLE = 'Web Time Machine';
const FEED_SUBTITLE = 'A visual history of the web — new eras and updates.';
const AUTHOR = 'Jesse Wunderlich';

interface FeedEntry {
  id: string;
  title: string;
  summary: string;
  link: string;
  updated: string; // ISO 8601
}

const ENTRIES: FeedEntry[] = [
  {
    id: 'era-2026-launch',
    title: 'New Era: 2026 — The Agentic Era',
    summary:
      'Tool loops, MCP, Claude Code, and autonomous agents. The browser stopped being the destination. Scroll through the newest era.',
    link: `${SITE_URL}/#era-2026`,
    updated: '2026-04-18T00:00:00Z',
  },
  {
    id: 'embed-support',
    title: 'Embeddable era widgets',
    summary:
      'Each era can now be embedded on any website via iframe. Use the </> button on any era to copy the snippet.',
    link: `${SITE_URL}/embed/era/1996`,
    updated: '2026-04-18T00:00:00Z',
  },
  {
    id: 'view-transitions',
    title: 'View Transitions + per-era OG cards',
    summary:
      'Era jumps now use the View Transitions API for a crossfade effect. Each era has its own OG card for social sharing.',
    link: `${SITE_URL}/share/2000`,
    updated: '2026-04-18T00:00:00Z',
  },
  {
    id: 'initial-launch',
    title: 'Web Time Machine launched',
    summary:
      'Scroll through 35+ years of web design history — from green-on-black terminals to glassmorphic AI interfaces, styled authentically in each era\'s visual language.',
    link: SITE_URL,
    updated: '2026-04-17T00:00:00Z',
  },
];

function buildAtomFeed(): string {
  const lastUpdated = ENTRIES[0]?.updated ?? new Date().toISOString();

  const entries = ENTRIES.map(
    (e) => `  <entry>
    <id>tag:web-time-machine,2026:${e.id}</id>
    <title>${escapeXml(e.title)}</title>
    <link href="${escapeXml(e.link)}" rel="alternate" />
    <updated>${e.updated}</updated>
    <summary>${escapeXml(e.summary)}</summary>
    <author><name>${escapeXml(AUTHOR)}</name></author>
  </entry>`
  ).join('\n');

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>tag:web-time-machine,2026:feed</id>
  <title>${escapeXml(FEED_TITLE)}</title>
  <subtitle>${escapeXml(FEED_SUBTITLE)}</subtitle>
  <link href="${SITE_URL}/feed.atom" rel="self" type="application/atom+xml" />
  <link href="${SITE_URL}" rel="alternate" type="text/html" />
  <updated>${lastUpdated}</updated>
  <author><name>${escapeXml(AUTHOR)}</name></author>
${entries}
</feed>`;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const xml = buildAtomFeed();
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
