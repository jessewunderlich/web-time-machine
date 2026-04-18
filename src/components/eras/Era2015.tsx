'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrowserChrome from '../browser-chrome/BrowserChrome';
import HistoricalSites from '../HistoricalSites';
import styles from '../../styles/era-2015.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Era2015() {
  const eraRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);

  // Show cookie banner after entering view
  useEffect(() => {
    const timer = setTimeout(() => setCookieVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(heroRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: eraRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    },
    { scope: eraRef }
  );

  // Intersection observer for fade sections
  useEffect(() => {
    const sections = [section1Ref.current, section2Ref.current].filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={eraRef} id="era-2015">
      <BrowserChrome era="2015">
        <div className={`${styles.era} ${darkMode ? styles.dark : ''}`}>
          {/* Sticky nav — decorative period mock with one real control (dark
           * mode toggle). Distinct aria-label so screen readers can tell this
           * apart from the real EraNav; decorative links are aria-hidden. */}
          <nav className={styles.stickyNav} aria-label="Era 2015 demo nav">
            <span className={styles.navLogo} aria-hidden="true">Modern Web</span>
            <div className={styles.navItems}>
              <div className={styles.navItemsList} aria-hidden="true">
                {['About', 'Work', 'Blog', 'Contact'].map((item) => (
                  <span key={item} className={styles.navItem}>
                    {item}
                  </span>
                ))}
              </div>
              <button
                type="button"
                className={styles.darkToggle}
                onClick={() => setDarkMode((d) => !d)}
                aria-pressed={darkMode}
                aria-label={darkMode ? 'Switch to light mode (era 2015 demo)' : 'Switch to dark mode (era 2015 demo)'}
              >
                {darkMode ? '☀ Light' : '◑ Dark'}
              </button>
            </div>
          </nav>

          {/* Video hero (CSS animated gradient) */}
          <div className={styles.videoHero}>
            <div className={styles.videoBg} />
            <div className={styles.heroEyebrow}>2015 — 2020</div>
            <h2 ref={heroRef} className={styles.heroTitle}>
              Modern{' '}
              <span>Minimal.</span>
              <br />
              Ruthlessly Simple.
            </h2>
            <p className={styles.heroSubtitle}>
              Whitespace became a design element. Performance became a moral issue.
              Accessibility stopped being optional.
            </p>
            <div className={styles.heroBtns}>
              <button className={styles.primaryBtn}>View Our Work</button>
              <button className={styles.secondaryBtn}>Read the Blog</button>
            </div>
          </div>

          {/* Fade section 1 */}
          <div ref={section1Ref} className={styles.fadeSection}>
            <div className={styles.sectionLabel}>The Philosophy</div>
            <h3 className={styles.sectionTitle}>
              Design Systems &
              <br />
              The Accessibility Movement
            </h3>
            <p className={styles.sectionParagraph}>
              Between 2015 and 2020, the design conversation shifted from aesthetics to systems.
              Google&apos;s Material Design (2014), Apple&apos;s Human Interface Guidelines, and
              IBM&apos;s Carbon Design System introduced the idea that design should be
              codified, consistent, and reusable.
            </p>
            <p className={styles.sectionParagraph}>
              Simultaneously, accessibility moved from afterthought to standard. WCAG 2.1 gave
              developers concrete guidelines. Screen readers, keyboard navigation, and color contrast
              became first-class concerns. The web was supposed to be for everyone — finally,
              the tools existed to make it so.
            </p>

            <div className={styles.asymGrid}>
              <div className={styles.asymCard}>
                <div className={styles.asymCardTitle}>Progressive Web Apps</div>
                <p className={styles.asymCardText}>
                  Service workers, manifest files, and push notifications let websites behave like
                  native apps. Google championed PWAs as the future of mobile in 2015. Twitter Lite,
                  Pinterest, and Starbucks adopted the pattern with dramatic results.
                </p>
              </div>
              <div className={styles.asymCard}>
                <div className={styles.asymCardTitle}>Mobile-First</div>
                <p className={styles.asymCardText}>
                  Google started mobile-first indexing in 2018. If your site wasn&apos;t
                  responsive, it was invisible in search. The desktop web became secondary.
                </p>
              </div>
            </div>
          </div>

          {/* Fade section 2 */}
          <div ref={section2Ref} className={styles.fadeSection}>
            <div className={styles.sectionLabel}>The Technology Stack</div>
            <h3 className={styles.sectionTitle}>React, Vue, and the SPA Era</h3>
            <p className={styles.sectionParagraph}>
              React (2013, popularized 2015+) changed how developers built UIs. Component-based
              architecture, virtual DOM, and one-way data flow became the dominant mental model.
              Vue.js offered a gentler on-ramp. Angular 2 provided enterprise-scale structure.
              The Single Page Application pattern meant JavaScript now owned the entire UI.
            </p>
            <ul className={styles.list}>
              <li>2015 — React popularizes component architecture; ES6 lands</li>
              <li>2016 — Vue.js gains momentum as a &ldquo;progressive&rdquo; framework</li>
              <li>2017 — CSS Grid finally ships in all major browsers</li>
              <li>2018 — Design systems proliferate; WCAG 2.1 raises accessibility bar</li>
              <li>2019 — Figma displaces Sketch as the design tool of record</li>
              <li>2020 — Tailwind CSS gains critical mass; utility-first wins</li>
            </ul>
          </div>

          {/* Cookie banner easter egg */}
          <div className={`${styles.cookieBanner} ${cookieVisible ? styles.visible : ''}`}>
            <div className={styles.cookieText}>
              We use cookies to enhance your experience. By continuing to visit this site you
              agree to our use of cookies.{' '}
              <button
                type="button"
                className={styles.cookieLearnMore}
                onClick={() => setCookieVisible(false)}
                aria-label="Learn more about our cookie policy (easter egg — just closes the banner)"
              >
                Learn more
              </button>
              {' '}(This is an easter egg — the cookie banner is itself a 2015–2020 web phenomenon.)
            </div>
            <button
              className={styles.cookieDecline}
              onClick={() => setCookieVisible(false)}
            >
              Decline
            </button>
            <button
              className={styles.cookieAccept}
              onClick={() => setCookieVisible(false)}
            >
              Accept All
            </button>
          </div>
        </div>
      </BrowserChrome>
      <HistoricalSites era="2015" />
    </section>
  );
}
