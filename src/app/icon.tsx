import { ImageResponse } from 'next/og';

/**
 * Dynamically generated favicon — the era color bar from the OG share card,
 * compressed into a 32×32 tile. Replaces the default create-next-app `N` ico
 * and keeps the site's brand (7-era spectrum) consistent across tab, share
 * card, and page chrome.
 *
 * Next.js convention: `src/app/icon.tsx` with a default export that returns
 * an ImageResponse becomes the site's favicon for every route.
 */

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// The 7 era accent colors, matching `ShareCard`.
const ERA_COLORS = [
  '#00ff00', // 1991 terminal green
  '#ff00ff', // 1996 GeoCities magenta
  '#4488ff', // 2000 Flash blue
  '#ff8c00', // 2005 Web 2.0 orange
  '#1abc9c', // 2010 flat teal
  '#e0e0e0', // 2015 minimal grey
  '#8b5cf6', // 2021 AI violet
] as const;

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#000',
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        {ERA_COLORS.map((color) => (
          <div
            key={color}
            style={{
              flex: 1,
              background: color,
              display: 'flex',
            }}
          />
        ))}
      </div>
    ),
    { ...size }
  );
}
