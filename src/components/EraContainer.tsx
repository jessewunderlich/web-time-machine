'use client';

import dynamic from 'next/dynamic';
import ScrollProvider from './ScrollProvider';
import EraTransition from './EraTransition';
import KeyboardNav from './KeyboardNav';
import SoundToggle from './SoundToggle';
import ProgressBar from './ProgressBar';
import EraNav from './EraNav';

// Lazy-load era components — each uses 'use client' + GSAP/browser APIs
// ssr: false is required here and must be in a Client Component (Next.js 16+)
const Era1991 = dynamic(() => import('./eras/Era1991'), { ssr: false });
const Era1996 = dynamic(() => import('./eras/Era1996'), { ssr: false });
const Era2000 = dynamic(() => import('./eras/Era2000'), { ssr: false });
const Era2005 = dynamic(() => import('./eras/Era2005'), { ssr: false });
const Era2010 = dynamic(() => import('./eras/Era2010'), { ssr: false });
const Era2015 = dynamic(() => import('./eras/Era2015'), { ssr: false });
const Era2021 = dynamic(() => import('./eras/Era2021'), { ssr: false });

export default function EraContainer() {
  return (
    <ScrollProvider>
      <ProgressBar />
      <EraNav />
      <KeyboardNav />
      <SoundToggle />
      {/* Intro splash */}
      <div
        style={{
          minHeight: '100vh',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          fontFamily: 'Courier New, monospace',
          color: '#00ff00',
        }}
      >
        <div
          style={{
            fontSize: 'clamp(0.6rem, 2vw, 0.9rem)',
            letterSpacing: '0.3rem',
            textTransform: 'uppercase',
            opacity: 0.5,
            marginBottom: '2rem',
          }}
        >
          A Visual History
        </div>
        <h1
          style={{
            fontSize: 'clamp(2rem, 8vw, 5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#fff',
            margin: 0,
            lineHeight: 1,
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          Web Time Machine
        </h1>
        <p
          style={{
            marginTop: '1.5rem',
            color: '#666',
            fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
            maxWidth: '500px',
            lineHeight: 1.7,
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          Scroll through 30+ years of web design history — styled authentically in each
          era&apos;s visual language.
        </p>
        <div
          style={{
            marginTop: '3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#333',
            fontSize: '0.8rem',
            fontFamily: '-apple-system, sans-serif',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '60px',
              background: 'linear-gradient(to bottom, transparent, #444)',
            }}
          />
          <span>scroll</span>
        </div>
      </div>

      {/* Era 1: 1991–1995 */}
      <Era1991 />

      <EraTransition
        fromYear="1995"
        toYear="1996"
        fromColor="#000000"
        toColor="#000033"
        label="The web goes public"
      />

      {/* Era 2: 1996–1999 */}
      <Era1996 />

      <EraTransition
        fromYear="1999"
        toYear="2000"
        fromColor="#000033"
        toColor="#000022"
        label="Dot-com boom peaks"
      />

      {/* Era 3: 2000–2004 */}
      <Era2000 />

      <EraTransition
        fromYear="2004"
        toYear="2005"
        fromColor="#000022"
        toColor="#f0ece4"
        label="Web 2.0 begins"
      />

      {/* Era 4: 2005–2009 */}
      <Era2005 />

      <EraTransition
        fromYear="2009"
        toYear="2010"
        fromColor="#f0ece4"
        toColor="#1abc9c"
        label="The mobile revolution"
      />

      {/* Era 5: 2010–2014 */}
      <Era2010 />

      <EraTransition
        fromYear="2014"
        toYear="2015"
        fromColor="#1abc9c"
        toColor="#ffffff"
        label="Design systems emerge"
      />

      {/* Era 6: 2015–2020 */}
      <Era2015 />

      <EraTransition
        fromYear="2020"
        toYear="2021"
        fromColor="#ffffff"
        toColor="#050510"
        label="The AI era begins"
      />

      {/* Era 7: 2021–2026 */}
      <Era2021 />

      {/* Footer */}
      <footer
        style={{
          background: '#050510',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '3rem 2rem',
          textAlign: 'center',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          color: 'rgba(255,255,255,0.2)',
          fontSize: '0.75rem',
          letterSpacing: '0.05rem',
        }}
      >
        <div style={{ marginBottom: '0.5rem' }}>
          Built with Next.js · GSAP · Tailwind CSS
        </div>
        <div>The web is for everyone — Tim Berners-Lee, 1991</div>
      </footer>
    </ScrollProvider>
  );
}
