'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrowserChrome from '../browser-chrome/BrowserChrome';
import HistoricalSites from '../HistoricalSites';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from '../../styles/era-2000.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Era2000() {
  const eraRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [showPopup, setShowPopup] = useState(true);
  // `loaded` gates the Flash-era loading screen easter egg. It flips true when
  // the user clicks "SKIP INTRO" or the reveal animation finishes. Reduced
  // motion users skip the easter egg (derived, not stored in state).
  const [loadedState, setLoaded] = useState(false);
  const loaded = reducedMotion || loadedState;
  const [hasEntered, setHasEntered] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Always register the onEnter trigger so the loading-screen state flips,
      // but skip the visual fade for users who prefer reduced motion.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(innerRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          scrollTrigger: {
            trigger: eraRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            onEnter: () => setHasEntered(true),
          },
        });
      });
      mm.add('(prefers-reduced-motion: reduce)', () => {
        ScrollTrigger.create({
          trigger: eraRef.current,
          start: 'top 80%',
          onEnter: () => setHasEntered(true),
        });
      });
    },
    { scope: eraRef }
  );

  return (
    <section ref={eraRef} id="era-2000">
      {/* Easter egg: Flash-era popup ad */}
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <div className={styles.popupTitleBar}>
              <span>Advertisement</span>
              <div
                className={styles.popupClose}
                onClick={() => setShowPopup(false)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setShowPopup(false)}
              >
                ✕
              </div>
            </div>
            <div className={styles.popupContent}>
              <div className={styles.popupAd}>
                🎉 YOU ARE THE 1,000,000th VISITOR! 🎉
              </div>
              <div className={styles.popupSubtitle}>
                Click below to claim your FREE iPod!
                <br />
                (Limited time offer — act now!)
              </div>
              <div className={styles.popupSubtitle} style={{ color: '#ff8800', marginTop: '0.5rem' }}>
                ⚠ This is a Flash-era easter egg. Close me! ⚠
              </div>
              <button
                className={styles.popupButton}
                onClick={() => setShowPopup(false)}
              >
                CLAIM NOW! →
              </button>
              <div style={{ marginTop: '0.5rem' }}>
                <span
                  className={styles.link}
                  onClick={() => setShowPopup(false)}
                  style={{ cursor: 'pointer', fontSize: '10px' }}
                >
                  No thanks, I don&apos;t want a free iPod
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <BrowserChrome era="2000">
        <div className={styles.era}>
          <div ref={innerRef} className={styles.inner}>
            <button
              className={styles.skipIntro}
              onClick={() => setLoaded(true)}
            >
              SKIP INTRO »
            </button>

            {hasEntered && !loaded ? (
              <div className={styles.loadingScreen}>
                <div className={styles.loadingTitle}>FLASH ERA</div>
                <div className={styles.loadingBarWrapper}>
                  <div className={styles.loadingBar} />
                </div>
                <div className={styles.loadingText}>LOADING... PLEASE WAIT</div>
                <div
                  className={styles.flashText}
                  onAnimationEnd={() => setLoaded(true)}
                >
                  ▶ CLICK TO ENTER ◀
                </div>
              </div>
            ) : (
              <>
                {/* Nav pills — decorative period mock; aria-hidden so screen
                 * readers don't announce it as a second "navigation" landmark. */}
                <nav className={styles.nav} aria-hidden="true">
                  {['HOME', 'PORTFOLIO', 'MUSIC', 'LINKS', 'CONTACT'].map((item) => (
                    <button key={item} className={styles.navBtn} tabIndex={-1}>
                      {item}
                    </button>
                  ))}
                </nav>

                {/* Content */}
                <div className={styles.contentBox}>
                  <div className={styles.sectionTitle}>The Flash Era (2000–2004)</div>
                  <p className={styles.paragraph}>
                    After the dot-com bubble burst in 2000–2001, the web got slicker. Flash by
                    Macromedia (later Adobe) enabled animation, video, and interactive games entirely
                    in the browser. Sites like Newgrounds.com and Miniclip.com built empires on
                    Flash games and cartoons.
                  </p>
                  <p className={styles.paragraph}>
                    Design shifted to dark gradients, glossy buttons, and fixed-width 800px layouts.
                    Verdana at 10–11px was the font of choice — readable on low-DPI monitors.
                    Everything was centered. Everything had a glow.
                  </p>
                </div>

                <div className={styles.contentBox}>
                  <div className={styles.sectionTitle}>Key Technologies</div>
                  <ul className={styles.list}>
                    <li>Macromedia Flash 5–MX — animation, games, entire sites</li>
                    <li>CSS 2.0 — mostly ignored by IE6</li>
                    <li>DHTML — JavaScript + CSS for dynamic content</li>
                    <li>Internet Explorer 6 — 90% market share, web dev nightmare</li>
                    <li>PHP + MySQL — the LAMP stack powers early web apps</li>
                    <li>Google launches PageRank — search changes forever</li>
                  </ul>
                </div>

                {/* Music player widget */}
                <div className={styles.musicPlayer}>
                  <div className={styles.playerIcon}>♪</div>
                  <div className={styles.playerInfo}>
                    <div className={styles.playerTrack}>Linkin Park — In The End.mp3</div>
                    <div className={styles.playerArtist}>Hybrid Theory (2000)</div>
                    <div className={styles.playerProgress}>
                      <div className={styles.playerBar} />
                    </div>
                  </div>
                  <div className={styles.playerControls}>
                    <span>⏮</span>
                    <span>⏸</span>
                    <span>⏭</span>
                  </div>
                </div>

                {/* Pixel icons */}
                <div className={styles.contentBox}>
                  <div className={styles.sectionTitle}>The Dot-Com Boom & Bust</div>
                  <p className={styles.paragraph}>
                    Between 1995 and 2000, internet companies raised billions with no viable business
                    models. Pets.com, Webvan, and Kozmo.com burned through VC money at absurd rates.
                    In March 2000 the NASDAQ peaked. By 2002 it had fallen 78%. Over $5 trillion in
                    market value evaporated. Thousands of companies folded.
                  </p>
                  <p className={styles.paragraph}>
                    The survivors — Google, Amazon, eBay — emerged leaner and smarter. They would
                    go on to reshape not just the web but all of commerce and culture.
                  </p>
                  <div className={styles.pixelIcons}>
                    {[
                      { emoji: '🌐', label: 'IE6' },
                      { emoji: '⚡', label: 'Flash' },
                      { emoji: '🖥', label: 'CRT' },
                      { emoji: '📀', label: 'CD-ROM' },
                      { emoji: '🎮', label: 'Newgrounds' },
                      { emoji: '💾', label: 'Napster' },
                    ].map(({ emoji, label }) => (
                      <div key={label} className={styles.pixelIcon}>
                        <span style={{ fontSize: '24px' }}>{emoji}</span>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </BrowserChrome>
      <HistoricalSites era="2000" />
    </section>
  );
}
