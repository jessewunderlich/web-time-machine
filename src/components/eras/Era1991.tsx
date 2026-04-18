'use client';

import { useRef, useState, useEffect } from 'react';
import BrowserChrome from '../browser-chrome/BrowserChrome';
import HistoricalSites from '../HistoricalSites';
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
const SEQUENCE = [
  { key: 'ascii',    text: ASCII_HEADER,  speed: 10 },
  { key: 'title',    text: 'The World Wide Web Project', speed: 30 },
  { key: 'subtitle', text: 'A hypertext information system for the internet \u2014 Tim Berners-Lee, CERN, 1991', speed: 30 },
  { key: 'para1',    text: 'The WorldWideWeb (W3) is a wide-area hypermedia information retrieval initiative aiming to give universal access to a large universe of documents. Everything there is online about W3 is linked directly or indirectly to this document.', speed: 30 },
  { key: 'para2',    text: '> In August 1991, Tim Berners-Lee posted a summary of the World Wide Web project to the alt.hypertext newsgroup, marking the public debut of the web. The first website ran on a NeXT workstation at CERN.', speed: 30 },
  { key: 'h2',       text: 'KEY FACTS:', speed: 30 },
  { key: 'li1',      text: 'The first web browser was called WorldWideWeb, later renamed Nexus', speed: 30 },
  { key: 'li2',      text: 'Tim Berners-Lee invented HTML, HTTP, and URLs \u2014 the three foundations of the web', speed: 30 },
  { key: 'li3',      text: 'NCSA Mosaic (1993) was the first browser with inline images \u2014 it changed everything', speed: 30 },
  { key: 'li4',      text: 'By 1994 there were 2.7 million web users; by 1995, over 16 million', speed: 30 },
  { key: 'li5',      text: 'Pages were plain text files with minimal markup \u2014 no CSS, no JavaScript', speed: 30 },
  { key: 'li6',      text: 'Gopher, FTP, and Usenet were competing protocols \u2014 HTTP won', speed: 30 },
  { key: 'para3',    text: 'HOW IT WORKED: A user ran a text-mode browser like Lynx. They would see hyperlinks as numbered references. Navigation was purely keyboard-based. Images? You opened them in a separate viewer. Color? Not in the browser \u2014 your terminal emulator determined that.', speed: 30 },
  { key: 'para4',    text: 'The web in 1991\u20131995 was academic and nerdy in the best possible way. Pages were written in raw HTML by the people who built the web protocols. The first web page still exists at its original URL at CERN.', speed: 30 },
  { key: 'footer',   text: 'lynx> Waiting for your command', speed: 30 },
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

  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState<Partial<Record<SeqKey, string>>>({});
  const [showSource, setShowSource] = useState(false);

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

  // ── Recursive setTimeout typewriter ─────────────────────────────────────
  useEffect(() => {
    if (!started) return;

    let blockIdx = 0;
    let charIdx = 0;
    let timerId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (blockIdx >= SEQUENCE.length) return;

      const block = SEQUENCE[blockIdx];
      charIdx++;
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
  }, [started]);

  // ── Helper: show text only after it starts appearing ────────────────────
  const t = (key: SeqKey): string => visible[key] ?? '';
  const shown = (key: SeqKey): boolean => visible[key] !== undefined;

  return (
    <section ref={eraRef} id="era-1991">
      <BrowserChrome era="1991">
        <div className={styles.era}>
          <div className={styles.inner}>
            {/* ASCII art */}
            <pre className={styles.ascii}>{t('ascii')}</pre>

            {shown('title') && <hr className={styles.hr} />}

            {shown('title') && (
              <h1 className={styles.title}>{t('title')}</h1>
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
              <h2 className={styles.title}>{t('h2')}</h2>
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
