'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrowserChrome from '../browser-chrome/BrowserChrome';
import styles from '../../styles/era-1991.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

export default function Era1991() {
  const eraRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [showSource, setShowSource] = useState(false);

  useGSAP(
    () => {
      gsap.from(innerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: eraRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: eraRef }
  );

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

  return (
    <section ref={eraRef} id="era-1991">
      <BrowserChrome era="1991">
        <div className={styles.era}>
          <div ref={innerRef} className={styles.inner}>
            <pre className={styles.ascii}>{ASCII_HEADER}</pre>

            <hr className={styles.hr} />

            <h1 className={styles.title}>The World Wide Web Project</h1>
            <p className={styles.subtitle}>
              A hypertext information system for the internet — Tim Berners-Lee, CERN, 1991
            </p>

            <hr className={styles.hr} />

            <p className={styles.paragraph}>
              The WorldWideWeb (W3) is a wide-area hypermedia information retrieval initiative
              aiming to give universal access to a large universe of documents. Everything there is
              online about W3 is linked directly or indirectly to this document.
            </p>

            <p className={styles.paragraph}>
              <span className={styles.tag}>&gt;</span> In August 1991, Tim Berners-Lee posted a
              summary of the World Wide Web project to the alt.hypertext newsgroup, marking the
              public debut of the web. The first website ran on a{' '}
              <span className={styles.link}>NeXT workstation</span> at CERN.
            </p>

            <hr className={styles.hr} />

            <h2 className={styles.title}>KEY FACTS:</h2>
            <ul className={styles.list}>
              <li>
                The first web browser was called WorldWideWeb, later renamed Nexus
              </li>
              <li>
                Tim Berners-Lee invented HTML, HTTP, and URLs — the three foundations of the web
              </li>
              <li>
                NCSA Mosaic (1993) was the first browser with inline images — it changed everything
              </li>
              <li>
                By 1994 there were 2.7 million web users; by 1995, over 16 million
              </li>
              <li>
                Pages were plain text files with minimal markup — no CSS, no JavaScript
              </li>
              <li>
                Gopher, FTP, and Usenet were competing protocols — HTTP won
              </li>
            </ul>

            <hr className={styles.hr} />

            <p className={styles.paragraph}>
              <strong style={{ color: '#00ff00' }}>HOW IT WORKED:</strong> A user ran a text-mode
              browser like Lynx. They would see hyperlinks as numbered references. Navigation was
              purely keyboard-based. Images? You opened them in a separate viewer. Color? Not in
              the browser — your terminal emulator determined that.
            </p>

            <p className={styles.paragraph}>
              The web in 1991–1995 was academic and nerdy in the best possible way. Pages were
              written in raw HTML by the people who built the web protocols. The{' '}
              <span className={styles.link}>first web page</span> still exists at its original URL
              at CERN.
            </p>

            <hr className={styles.hr} />

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

            <div className={styles.prompt}>
              <span className={styles.tag}>lynx&gt;</span>{' '}
              <span>Waiting for your command</span>
              <span className={styles.cursor} />
            </div>

            <div className={styles.statusBar}>
              <span>Arrow keys: Up and Down to move. Right to follow a link; Left to go back.</span>
              <span>H)elp O)ptions P)rint G)o M)ain screen Q)uit</span>
            </div>
          </div>
        </div>
      </BrowserChrome>
    </section>
  );
}
