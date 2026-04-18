'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrowserChrome from '../browser-chrome/BrowserChrome';
import styles from '../../styles/era-1996.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Era1996() {
  const eraRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [showSource, setShowSource] = useState(false);

  useGSAP(
    () => {
      gsap.from(tableRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: eraRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: eraRef }
  );

  const fakeHtml = `<html>
<head>
<title>~*~ JESSE'S AWESOME HOMEPAGE ~*~</title>
<bgsound src="midis/awesome.mid" loop="-1">
</head>
<body bgcolor="#000033" text="#FFFF00"
      link="#FF00FF" vlink="#00FF00">

<center>
<table border="4" cellpadding="10"
       bgcolor="#000066">
<tr><td>
<marquee>
*** WELCOME TO MY PAGE! SIGN MY GUESTBOOK! ***
</marquee>

<img src="construction.gif">
<br>
<font face="Comic Sans MS" size="5"
      color="#FF00FF">
<b>THE GEOCITIES ERA</b>
</font>
<br>
<font size="2">
You are visitor number:
<img src="counter.cgi">
</font>
</td></tr>
</table>

<!-- webring code (don't remove!) -->
<table border="0">
<tr>
<td><a href="prev.html">[prev]</a></td>
<td>[webring: html fanatics]</td>
<td><a href="next.html">[next]</td>
</tr>
</table>
</center>
</body>
</html>`;

  return (
    <section ref={eraRef} id="era-1996">
      <BrowserChrome era="1996">
        <div className={styles.era}>
          <div ref={tableRef} className={styles.table}>
            {/* Marquee */}
            <div className={styles.marqueeWrapper}>
              <span className={styles.marquee}>
                ★ WELCOME TO THE GEOCITIES ERA ★ &nbsp;&nbsp;&nbsp; ✦ WHERE EVERY PAGE IS A
                HOMEPAGE ✦ &nbsp;&nbsp;&nbsp; ☆ SIGN MY GUESTBOOK! ☆ &nbsp;&nbsp;&nbsp; ♦
                GEOCITIES.COM — YOUR NEIGHBORHOOD ON THE WEB ♦ &nbsp;&nbsp;&nbsp; ★ BEST VIEWED IN
                NETSCAPE 3.0 AT 800×600 ★
              </span>
            </div>

            <div className={styles.title}>~*~ The GeoCities Era ~*~</div>
            <div className={styles.subtitle}>1996 — 1999</div>

            <hr className={styles.hr} />

            {/* Under construction */}
            <div className={styles.underConstruction}>
              <div className={styles.constructionGif} />
              <span className={`${styles.blink}`}>
                ⚠ THIS PAGE IS UNDER CONSTRUCTION ⚠
              </span>
              <div className={styles.constructionGif} />
            </div>

            <hr className={styles.hr} />

            <p className={styles.paragraph}>
              <strong style={{ color: '#ff00ff' }}>GeoCities</strong> (1994–2009) was a web
              hosting service that let anyone build their own homepage — for free! Organized into
              &quot;neighborhoods&quot; themed by interest, it was the first time millions of regular
              people could publish on the web. At its peak in 1999, GeoCities was the third-most
              visited website on the internet.
            </p>

            <p className={styles.paragraph}>
              Table-based layouts were the only way to control page design. CSS was barely supported.
              The <span className={styles.linkBlue}>font tag</span> was king.{' '}
              <code style={{ color: '#00ffff' }}>&lt;blink&gt;</code> and{' '}
              <code style={{ color: '#00ffff' }}>&lt;marquee&gt;</code> were legitimate design
              choices. Background music via <code style={{ color: '#00ffff' }}>&lt;bgsound&gt;</code>{' '}
              made every visit an adventure.
            </p>

            <hr className={styles.hr} />

            <p className={styles.paragraph}>
              <strong style={{ color: '#00ff00' }}>KEY MILESTONES:</strong>
            </p>
            <ul className={styles.list}>
              <li>Netscape Navigator dominates with ~80% market share</li>
              <li>CSS 1.0 published in December 1996 — barely anyone uses it yet</li>
              <li>JavaScript introduced in Netscape 2.0 (1995)</li>
              <li>Java applets: the original interactive web elements</li>
              <li>56k modems mean a 100KB image takes ~15 seconds to load</li>
              <li>Web rings connect related personal homepages</li>
              <li>Guestbooks, hit counters, and &quot;awards&quot; graphics are everywhere</li>
            </ul>

            <hr className={styles.hr} />

            {/* Visitor counter */}
            <div className={styles.counter}>
              You are visitor number:{' '}
              <span className={styles.counterNum}>0&#x200B;0&#x200B;4&#x200B;2&#x200B;1&#x200B;7</span>
              <br />
              <small>since Jan 1, 1997</small>
            </div>

            {/* Buttons row */}
            <div className={styles.guestbook}>
              <span className={styles.guestbookLink}>✉ Sign My Guestbook</span>
              <span className={styles.guestbookLink}>📖 View Guestbook</span>
              <span className={styles.guestbookLink}>💌 Email Me</span>
              <span className={styles.guestbookLink}>🏠 Home</span>
            </div>

            {/* Easter egg: view source */}
            <div className={styles.easterEgg}>
              <button
                className={styles.viewSource}
                onClick={() => setShowSource((v) => !v)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showSource ? '[-] hide source' : '[+] right-click → view source'}
              </button>
              <div className={`${styles.fakeSource} ${showSource ? styles.visible : ''}`}>
                {fakeHtml}
              </div>
            </div>

            <hr className={styles.hr} />

            {/* Webring */}
            <div className={styles.webring}>
              <div>[ HTML FANATICS WEB RING ]</div>
              <div className={styles.webringLinks}>
                <span className={styles.webringLink}>◀ Previous</span>
                <span className={styles.webringLink}>Random</span>
                <span className={styles.webringLink}>List Sites</span>
                <span className={styles.webringLink}>Next ▶</span>
              </div>
            </div>
          </div>
        </div>
      </BrowserChrome>
    </section>
  );
}
