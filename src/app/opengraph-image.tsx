import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt =
  'Web Time Machine — scroll through 30+ years of web design history, styled in each era\'s authentic visual language.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Image generation — static, no params
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          background: '#000',
          color: '#fff',
          padding: '60px 80px',
          fontFamily: 'monospace',
        }}
      >
        {/* Era color bar (spectrum of the 7 eras) */}
        <div style={{ display: 'flex', width: '100%', height: '8px' }}>
          <div style={{ flex: 1, background: '#00ff00' }} />
          <div style={{ flex: 1, background: '#ff00ff' }} />
          <div style={{ flex: 1, background: '#4488ff' }} />
          <div style={{ flex: 1, background: '#ff8c00' }} />
          <div style={{ flex: 1, background: '#1abc9c' }} />
          <div style={{ flex: 1, background: '#e0e0e0' }} />
          <div style={{ flex: 1, background: '#8b5cf6' }} />
        </div>

        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            letterSpacing: 8,
            textTransform: 'uppercase',
            opacity: 0.55,
            marginTop: 24,
          }}
        >
          A Visual History
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 132,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1,
              fontFamily: 'sans-serif',
              display: 'flex',
            }}
          >
            Web Time Machine
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#888',
              lineHeight: 1.3,
              fontFamily: 'sans-serif',
              maxWidth: 900,
              display: 'flex',
            }}
          >
            Scroll through 30+ years of web design history — styled authentically
            in each era&apos;s visual language.
          </div>
        </div>

        {/* Footer — era year range */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 22,
            color: '#666',
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          <div style={{ display: 'flex' }}>1991</div>
          <div style={{ display: 'flex', gap: 6, opacity: 0.6 }}>
            <span>·</span>
            <span>·</span>
            <span>·</span>
            <span>·</span>
            <span>·</span>
          </div>
          <div style={{ display: 'flex', color: '#8b5cf6' }}>2026</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
