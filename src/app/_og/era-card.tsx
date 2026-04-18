// Per-era share card JSX. Rendered by `/share/[era]/opengraph-image` and
// the matching twitter-image route. Each era gets its own dominant color,
// typography family, and mini-tagline so a shared link previews in a style
// that matches where you'll land.
//
// Kept in `_og/` (underscore prefix) so Next.js does not route this file.
//
// The ImageResponse renderer supports a limited CSS subset (Satori). Keep
// this intentionally flat — no CSS modules, no @media, only inline styles
// on `div`-like elements with explicit `display`.

export type EraId = '1991' | '1996' | '2000' | '2005' | '2010' | '2015' | '2021';

type EraCardData = {
  year: string;
  label: string;
  tagline: string;
  color: string;
  bgStart: string;
  bgEnd: string;
  fontFamily: string;
  accentChar: string;
};

export const ERA_CARDS: Record<EraId, EraCardData> = {
  '1991': {
    year: '1991',
    label: 'The Dawn',
    tagline: 'Text-only web. Hyperlinks, and not much else.',
    color: '#00ff00',
    bgStart: '#000000',
    bgEnd: '#001a00',
    fontFamily: 'monospace',
    accentChar: '_',
  },
  '1996': {
    year: '1996',
    label: 'GeoCities',
    tagline: 'Under construction. Please sign my guestbook.',
    color: '#ff00ff',
    bgStart: '#1a0033',
    bgEnd: '#330066',
    fontFamily: 'monospace',
    accentChar: '\u2605',
  },
  '2000': {
    year: '2000',
    label: 'Flash',
    tagline: 'Intro skip. Loading bar. Ambient techno.',
    color: '#4488ff',
    bgStart: '#0a1a3a',
    bgEnd: '#1a2a5a',
    fontFamily: 'sans-serif',
    accentChar: '\u25B6',
  },
  '2005': {
    year: '2005',
    label: 'Web 2.0',
    tagline: 'Gradients, rounded corners, glossy beta badges.',
    color: '#ff8c00',
    bgStart: '#2a1500',
    bgEnd: '#4a2500',
    fontFamily: 'sans-serif',
    accentChar: '\u25C6',
  },
  '2010': {
    year: '2010',
    label: 'Flat / Responsive',
    tagline: 'Helvetica. White space. Mobile first.',
    color: '#1abc9c',
    bgStart: '#0a1a18',
    bgEnd: '#142e2a',
    fontFamily: 'sans-serif',
    accentChar: '\u25A0',
  },
  '2015': {
    year: '2015',
    label: 'Material',
    tagline: 'Cookie banners. Cards. Full-bleed hero images.',
    color: '#e0e0e0',
    bgStart: '#111111',
    bgEnd: '#222222',
    fontFamily: 'sans-serif',
    accentChar: '\u25CF',
  },
  '2021': {
    year: '2021',
    label: 'AI-native',
    tagline: 'Glassmorphism. Chatbots. Bento grids.',
    color: '#8b5cf6',
    bgStart: '#120a25',
    bgEnd: '#241540',
    fontFamily: 'sans-serif',
    accentChar: '\u2728',
  },
};

export const ERA_CARD_SIZE = { width: 1200, height: 630 } as const;

export function eraCardAlt(eraId: EraId): string {
  const e = ERA_CARDS[eraId];
  return `Web Time Machine — ${e.year}: ${e.label}. ${e.tagline}`;
}

export function EraCard({ eraId }: { eraId: EraId }) {
  const era = ERA_CARDS[eraId];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: `linear-gradient(135deg, ${era.bgStart} 0%, ${era.bgEnd} 100%)`,
        color: '#fff',
        padding: '60px 80px',
        fontFamily: era.fontFamily,
        position: 'relative',
      }}
    >
      {/* Top color bar — era's signature color */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: 10,
          background: era.color,
          boxShadow: `0 0 40px ${era.color}`,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />

      {/* Eyebrow */}
      <div
        style={{
          display: 'flex',
          fontSize: 22,
          letterSpacing: 8,
          textTransform: 'uppercase',
          color: era.color,
          marginTop: 20,
          fontFamily: 'monospace',
        }}
      >
        Web Time Machine {era.accentChar} Era {era.year}
      </div>

      {/* Main title block */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 200,
            fontWeight: 900,
            letterSpacing: -8,
            lineHeight: 0.9,
            fontFamily: era.fontFamily,
            color: era.color,
            display: 'flex',
            textShadow: `0 0 60px ${era.color}66`,
          }}
        >
          {era.year}
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1,
            fontFamily: 'sans-serif',
            color: '#fff',
            display: 'flex',
          }}
        >
          {era.label}
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#cccccc',
            lineHeight: 1.3,
            fontFamily: 'sans-serif',
            maxWidth: 900,
            display: 'flex',
          }}
        >
          {era.tagline}
        </div>
      </div>

      {/* Footer — tiny era ribbon to anchor the card as part of a series */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 18,
          color: '#888',
          letterSpacing: 4,
          textTransform: 'uppercase',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ display: 'flex' }}>
          1991 · 1996 · 2000 · 2005 · 2010 · 2015 · 2021
        </div>
        <div style={{ display: 'flex', color: era.color }}>
          web-time-machine.com
        </div>
      </div>
    </div>
  );
}
