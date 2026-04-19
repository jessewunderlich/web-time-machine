'use client';

import ScrollProvider from './ScrollProvider';
import EraTransition from './EraTransition';
import KeyboardNav from './KeyboardNav';
import HelpModal from './HelpModal';
import SoundToggle from './SoundToggle';
import ProgressBar from './ProgressBar';
import EraNav from './EraNav';
// Era components are client components already. Import them directly so the
// server can render the full JSX tree and React 19 can hydrate cleanly.
// An earlier attempt used next/dynamic with `ssr: false`, which emitted
// BAILOUT_TO_CLIENT_SIDE_RENDERING placeholders that React 19 refused to
// reconcile in production (hydration threw NotFoundError: insertBefore).
import Era1991 from './eras/Era1991';
import Era1996 from './eras/Era1996';
import Era2000 from './eras/Era2000';
import Era2005 from './eras/Era2005';
import Era2010 from './eras/Era2010';
import Era2015 from './eras/Era2015';
import Era2021 from './eras/Era2021';
import Era2026 from './eras/Era2026';
import styles from '../styles/era-container.module.css';

export default function EraContainer() {
  return (
    <ScrollProvider>
      {/* Skip to first era section — bypasses fixed nav/sound toggle for
       * keyboard and screen-reader users. Hidden visually until focused.
       * The target section has tabIndex={-1} so activation moves focus. */}
      <a href="#era-1991" className="skip-link">
        Skip to content
      </a>
      <ProgressBar />
      <EraNav />
      <KeyboardNav />
      <HelpModal />
      <SoundToggle />

      {/* Single page-level <main> landmark wraps every era + the intro splash.
       * Lets screen-reader users jump straight past the fixed nav/sound toggle
       * with a "main" landmark command. Only one main per page (WCAG). */}
      <main id="main-content">

      {/* Intro splash */}
      <div className={styles.splash}>
        <div className={styles.splashEyebrow}>A Visual History</div>
        <h1 className={styles.splashTitle}>Web Time Machine</h1>
        <p className={styles.splashLede}>
          Scroll through 30+ years of web design history — styled authentically in each
          era&apos;s visual language.
        </p>
        <div className={styles.splashHint}>
          <div className={styles.splashHintLine} />
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

      {/* Era 7: 2021–2025 */}
      <Era2021 />

      <EraTransition
        fromYear="2025"
        toYear="2026"
        fromColor="#050510"
        toColor="#0a0a0f"
        label="The browser stopped being the destination"
      />

      {/* Era 8: 2026 (the agentic era) */}
      <Era2026 />

      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerRow}>
          Built with Next.js · GSAP · Tailwind CSS
        </div>
        <div>The web is for everyone — Tim Berners-Lee, 1991</div>
      </footer>
    </ScrollProvider>
  );
}
