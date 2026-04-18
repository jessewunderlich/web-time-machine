'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrowserChrome from '../browser-chrome/BrowserChrome';
import HistoricalSites from '../HistoricalSites';
import styles from '../../styles/era-2010.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Era2010() {
  const eraRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(heroRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: eraRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });

        if (cardsRef.current) {
          gsap.from(cardsRef.current.children, {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });
    },
    { scope: eraRef }
  );

  const cards = [
    {
      icon: '📱',
      title: 'iOS 7 & Flat Design',
      text: 'Apple\'s 2013 redesign stripped away skeuomorphism — goodbye leather textures, hello bold colors and thin icons. Windows Phone\'s Metro UI had pioneered this in 2010.',
      color: styles.colorBlue,
    },
    {
      icon: '📐',
      title: 'Responsive Design',
      text: 'Ethan Marcotte coined "Responsive Web Design" in 2010. Bootstrap (2011) made responsive grids accessible to every developer.',
      color: styles.colorGreen,
    },
    {
      icon: '🔲',
      title: 'The Grid System',
      text: '960.gs and Bootstrap\'s 12-column grid became universal. Every site looked similar — but they all worked on mobile.',
      color: styles.colorOrange,
    },
    {
      icon: '✕',
      title: 'Death of Skeuomorphism',
      text: 'Textures, shadows, and 3D effects gave way to flat colors. The hamburger menu (☰) became universal. Helvetica Neue reigned supreme.',
      color: styles.colorPurple,
    },
    {
      icon: '⚡',
      title: 'Node.js (2009)',
      text: 'JavaScript on the server! Ryan Dahl\'s Node.js enabled real-time apps. npm would eventually host over a million packages.',
      color: styles.colorRed,
    },
    {
      icon: '☁',
      title: 'The Cloud Era',
      text: 'AWS, Heroku, and Dropbox made cloud storage and deployment mainstream. Every app became a web app.',
      color: styles.colorTeal,
    },
  ];

  return (
    <section ref={eraRef} id="era-2010">
      <BrowserChrome era="2010">
        <div className={styles.era}>
          {/* Sticky nav — decorative period mock; aria-hidden so screen readers
           * don't announce a second "navigation" alongside the real EraNav. The
           * hamburger loses its button role for the same reason — it's a glyph,
           * not an activator. */}
          <nav className={styles.nav} aria-hidden="true">
            <span className={styles.navLogo}>Flat Era</span>
            <div className={styles.hamburger}>
              <span />
              <span />
              <span />
            </div>
          </nav>

          {/* Hero */}
          <div ref={heroRef} className={styles.hero}>
            <div className={styles.heroEyebrow}>2010 — 2014</div>
            <h2 className={styles.heroTitle}>
              Flat Design &
              <br />
              The Mobile Revolution
            </h2>
            <p className={styles.heroSubtitle}>
              Goodbye gradients. Goodbye textures. Hello bold colors,
              thin fonts, and a screen in every pocket.
            </p>
            <button className={styles.flatBtn}>Explore the Era</button>
          </div>

          {/* Card grid */}
          <div ref={cardsRef} className={styles.cardGrid}>
            {cards.map(({ icon, title, text, color }) => (
              <div key={title} className={styles.card}>
                <div className={`${styles.colorStrip} ${color}`} />
                <div className={styles.cardIcon}>{icon}</div>
                <div className={styles.cardTitle}>{title}</div>
                <p className={styles.cardText}>{text}</p>
              </div>
            ))}
          </div>

          {/* Color section: Responsive */}
          <div className={`${styles.colorSection} ${styles.blue}`}>
            <h3 className={styles.colorSectionTitle}>The Year Everything Went Mobile</h3>
            <p className={styles.colorSectionText}>
              By 2014, mobile internet usage overtook desktop for the first time.
              Developers scrambled to make sites that worked on 320px screens.
              Media queries, flexbox, and viewport meta tags became essential.
              The mobile-first approach — designing for the smallest screen first —
              became gospel.
            </p>
          </div>

          {/* List section */}
          <div className={styles.listSection}>
            <div className={styles.listTitle}>Timeline of Flat Design</div>
            <ul className={styles.list}>
              {[
                '2010 — Ethan Marcotte writes "Responsive Web Design" for A List Apart',
                '2011 — Twitter Bootstrap 1.0 released, transforms web development',
                '2012 — Windows 8 Metro UI brings flat design to the mainstream',
                '2013 — iOS 7 overhaul: Apple goes flat, shocks the design world',
                '2013 — Material Design principles begin forming at Google',
                '2014 — Google announces Material Design at Google I/O',
                '2014 — Mobile internet traffic surpasses desktop for the first time',
              ].map((item) => (
                <li key={item}>
                  <span className={styles.dot} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Purple color section: Bootstrap */}
          <div className={`${styles.colorSection} ${styles.purple}`}>
            <h3 className={styles.colorSectionTitle}>Bootstrap Changed Everything</h3>
            <p className={styles.colorSectionText}>
              Released by Twitter engineers Mark Otto and Jacob Thornton in 2011,
              Bootstrap gave every developer a consistent, responsive grid and a set
              of styled components. It democratized professional-looking web design
              but also made the web look homogeneous. By 2014, you could recognize
              a Bootstrap site from 20 feet away.
            </p>
          </div>
        </div>
      </BrowserChrome>
      <HistoricalSites era="2010" />
    </section>
  );
}
