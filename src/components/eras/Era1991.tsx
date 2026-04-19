'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import BrowserChrome from '../browser-chrome/BrowserChrome';
import HistoricalSites from '../HistoricalSites';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from '../../styles/era-1991.module.css';

const ASCII_HEADER = `
 _____ _   _ _____   _    _ _____ ____
|_   _| | | | ____| | |  | | ____| __ )
  | | | |_| |  _|   | |/\\| |  _| |  _ \\
  | | |  _  | |___  |  /\\  | |___| |_) |
  |_| |_| |_|_____|  \\/  \\/|_____|____/

 _____  ___  __  __    _    ____ _   _ ___ _   _ _____
|_   _||_ _||  \\/  |  / \\  / ___| | | |_ _| \\ | | ____|
  | |   | | | |\\/| | / _ \\| |   | |_| || ||  \\| |  _|
  | |   | | | |  | |/ ___ \\ |___|  _  || || |\\  | |___
  |_|  |___||_|  |_/_/   \\_\\____|_| |_|___|_| \\_|_____|
`.trim();

// ── Content sequence for typewriter ─────────────────────────────────────────
// Speeds tuned for ~12s total (was ~60s at uniform 30ms/char). The ASCII
// header and headings keep a deliberate terminal cadence; body paragraphs
// render in chunks of 3 chars per tick to preserve texture without making
// the reader wait. See `tick()` below for chunk handling.
const SEQUENCE = [
  { key: 'ascii',    text: ASCII_HEADER,  speed: 8,  chunk: 1 },
  { key: 'title',    text: 'The World Wide Web Project', speed: 20, chunk: 1 },
  { key: 'subtitle', text: 'A hypertext information system for the internet \u2014 Tim Berners-Lee, CERN, 1991', speed: 12, chunk: 1 },
  { key: 'para1',    text: 'The WorldWideWeb (W3) is a wide-area hypermedia information retrieval initiative aiming to give universal access to a large universe of documents. Everything there is online about W3 is linked directly or indirectly to this document.', speed: 10, chunk: 3 },
  { key: 'para2',    text: '> In August 1991, Tim Berners-Lee posted a summary of the World Wide Web project to the alt.hypertext newsgroup, marking the public debut of the web. The first website ran on a NeXT workstation at CERN.', speed: 10, chunk: 3 },
  { key: 'h2',       text: 'KEY FACTS:', speed: 20, chunk: 1 },
  { key: 'li1',      text: 'The first web browser was called WorldWideWeb, later renamed Nexus', speed: 10, chunk: 2 },
  { key: 'li2',      text: 'Tim Berners-Lee invented HTML, HTTP, and URLs \u2014 the three foundations of the web', speed: 10, chunk: 2 },
  { key: 'li3',      text: 'NCSA Mosaic (1993) was the first browser with inline images \u2014 it changed everything', speed: 10, chunk: 2 },
  { key: 'li4',      text: 'By 1994 there were 2.7 million web users; by 1995, over 16 million', speed: 10, chunk: 2 },
  { key: 'li5',      text: 'Pages were plain text files with minimal markup \u2014 no CSS, no JavaScript', speed: 10, chunk: 2 },
  { key: 'li6',      text: 'Gopher, FTP, and Usenet were competing protocols \u2014 HTTP won', speed: 10, chunk: 2 },
  { key: 'para3',    text: 'HOW IT WORKED: A user ran a text-mode browser like Lynx. They would see hyperlinks as numbered references. Navigation was purely keyboard-based. Images? You opened them in a separate viewer. Color? Not in the browser \u2014 your terminal emulator determined that.', speed: 10, chunk: 3 },
  { key: 'para4',    text: 'The web in 1991\u20131995 was academic and nerdy in the best possible way. Pages were written in raw HTML by the people who built the web protocols. The first web page still exists at its original URL at CERN.', speed: 10, chunk: 3 },
  { key: 'footer',   text: 'lynx> Waiting for your command', speed: 20, chunk: 1 },
] as const;

type SeqKey = typeof SEQUENCE[number]['key'];

const fakeSource = `<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html>
<head>
<title>The World Wide Web Project</title>
</head>
<body>
<h1>The World Wide Web</h1>
<p>
The WorldWideWeb (W3) is a wide-area<a
name=0 href="WhatIs.html">
hypermedia</a> information retrieval
initiative aiming to give universal
access to a large universe of documents.
</p>
<p>Everything there is online about
W3 is linked directly or indirectly
to this document, including an
<a href="Summary.html">executive
summary</a> of the project,
<a href="Administration/Mailing/Overview.html">
Mailing lists</a>
, <a href="Policy.html">Policy</a>
</body>
</html>`;

export default function Era1991() {
  const eraRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);
  const reducedMotion = useReducedMotion();

  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState<Partial<Record<SeqKey, string>>>({});
  const [showSource, setShowSource] = useState(false);

  // Pre-computed full content map — rendered directly when reduced motion is on.
  const fullContent = useMemo<Partial<Record<SeqKey, string>>>(() => {
    const all: Partial<Record<SeqKey, string>> = {};
    for (const block of SEQUENCE) all[block.key] = block.text;
    return all;
  }, []);

  // ── Start typewriter when era enters viewport ────────────────────────────
  useEffect(() => {
    if (!eraRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          setStarted(true);
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(eraRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Recursive setTimeout typewriter ─────────────────────────────────
  useEffect(() => {
    // Reduced motion: no animation. The render path reads `fullContent` directly.
    if (!started || reducedMotion) return;

    let blockIdx = 0;
    let charIdx = 0;
    let timerId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (blockIdx >= SEQUENCE.length) return;

      const block = SEQUENCE[blockIdx];
      // Advance by the block's chunk size so long paragraphs render in
      // multi-char bursts while headings stay one-at-a-time.
      charIdx = Math.min(charIdx + block.chunk, block.text.length);
      const slice = block.text.slice(0, charIdx);

      setVisible((prev) => ({ ...prev, [block.key]: slice }));

      if (charIdx >= block.text.length) {
        blockIdx++;
        charIdx = 0;
      }

      if (blockIdx < SEQUENCE.length) {
        timerId = setTimeout(tick, SEQUENCE[blockIdx].speed);
      }
    };

    timerId = setTimeout(tick, SEQUENCE[0].speed);
    return () => clearTimeout(timerId);
  }, [started, reducedMotion]);

  // ── Helper: show text only after it starts appearing ────────────────────
  // When reduced motion is active, fall back to the full content map so
  // everything is visible on first paint — no setState in effect required.
  const source = reducedMotion ? fullContent : visible;
  const t = (key: SeqKey): string => source[key] ?? '';
  const shown = (key: SeqKey): boolean => source[key] !== undefined;

  return (
    // tabIndex={-1} lets the skip-link move focus into this section when
    // activated. Without it the link scrolls but the next Tab resumes from
    // the top nav, defeating the skip. All other era sections are reached
    // via scroll only, so they don't need tabindex.
    <section ref={eraRef} id="era-1991" tabIndex={-1}>
      <BrowserChrome era="1991">
        <div className={styles.era}>
          {/* A11y: when the typewriter is animating (not reduced-motion), the
           * visible tree streams characters in and would be announced by screen
           * readers as a stuttering, unstable string. Mark the animating tree
           * aria-hidden and provide the full, stable prose in a visually-hidden
           * sibling so screen readers get clean, readable content on first paint.
           * With reduced motion, the content is already fully rendered, so
           * expose the visible tree and skip the hidden duplicate. */}
          {!reducedMotion && (
            <div className={styles.srOnly}>
              <h2>The World Wide Web Project</h2>
              <p>{SEQUENCE.find((b) => b.key === 'subtitle')?.text}</p>
              {SEQUENCE.filter((b) => b.key === 'para1' || b.key === 'para2' || b.key === 'para3' || b.key === 'para4').map((b) => (
                <p key={b.key}>{b.text}</p>
              ))}
              <h3>Key facts</h3>
              <ul>
                {SEQUENCE.filter((b) => b.key.startsWith('li')).map((b) => (
                  <li key={b.key}>{b.text}</li>
                ))}
              </ul>
            </div>
          )}
          <div className={styles.inner} aria-hidden={reducedMotion ? undefined : 'true'}>
            {/* ASCII art */}
            <pre className={styles.ascii}>{t('ascii')}</pre>

            {shown('title') && <hr className={styles.hr} />}

            {shown('title') && (
              <h2 className={styles.title}>{t('title')}</h2>
            )}
            {shown('subtitle') && (
              <p className={styles.subtitle}>{t('subtitle')}</p>
            )}

            {shown('para1') && <hr className={styles.hr} />}

            {shown('para1') && (
              <p className={styles.paragraph}>{t('para1')}</p>
            )}
            {shown('para2') && (
              <p className={styles.paragraph}>{t('para2')}</p>
            )}

            {shown('h2') && <hr className={styles.hr} />}

            {shown('h2') && (
              <h3 id="era-1991-key-facts" className={styles.title}>{t('h2')}</h3>
            )}
            {shown('li1') && (
              <ul className={styles.list}>
                {shown('li1') && <li>{t('li1')}</li>}
                {shown('li2') && <li>{t('li2')}</li>}
                {shown('li3') && <li>{t('li3')}</li>}
                {shown('li4') && <li>{t('li4')}</li>}
                {shown('li5') && <li>{t('li5')}</li>}
                {shown('li6') && <li>{t('li6')}</li>}
              </ul>
            )}

            {shown('para3') && <hr className={styles.hr} />}

            {shown('para3') && (
              <p className={styles.paragraph}>{t('para3')}</p>
            )}
            {shown('para4') && (
              <p className={styles.paragraph}>{t('para4')}</p>
            )}

            {shown('footer') && <hr className={styles.hr} />}

            {/* Easter egg — show after full content appears */}
            {shown('footer') && (
              <div className={styles.easterEgg}>
                <button
                  id="era-1991-source"
                  className={styles.viewSource}
                  onClick={() => setShowSource((v) => !v)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {showSource ? '[-] hide source' : '[+] view-source: this page'}
                </button>
                <div className={`${styles.sourceCode} ${showSource ? styles.visible : ''}`}>
                  {fakeSource}
                </div>
              </div>
            )}

            {shown('footer') && (
              <div className={styles.prompt}>
                <span className={styles.tag}>{t('footer')}</span>
                <span className={styles.cursor} />
              </div>
            )}

            <div className={styles.statusBar}>
              <span>Arrow keys: Up and Down to move. Right to follow a link; Left to go back.</span>
              <span>H)elp O)ptions P)rint G)o M)ain screen Q)uit</span>
            </div>
          </div>
        </div>
      </BrowserChrome>
      <HistoricalSites era="1991" />
    </section>
  );
}
