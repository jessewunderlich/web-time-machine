'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrowserChrome from '../browser-chrome/BrowserChrome';
import styles from '../../styles/era-2005.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Era2005() {
  const eraRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(layoutRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: eraRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: eraRef }
  );

  return (
    <section ref={eraRef} id="era-2005">
      <BrowserChrome era="2005">
        <div className={styles.era}>
          {/* Top nav */}
          <nav className={styles.topNav}>
            <div className={styles.logo}>Web 2.0</div>
            <div className={styles.rssIcon}>RSS</div>
            <div className={styles.navLinks}>
              {['Home', 'About', 'Blog', 'Tags', 'Archive', 'Contact'].map((item) => (
                <span key={item} className={styles.navLink}>
                  {item}
                </span>
              ))}
            </div>
          </nav>

          <div ref={layoutRef} className={styles.layout}>
            {/* Main column */}
            <main className={styles.main}>
              {/* Hero */}
              <div className={styles.heroBox}>
                <div className={styles.badge}>Web 2.0 CERTIFIED!</div>
                <div className={styles.heroTitle}>The Web Gets Social</div>
                <p className={styles.heroParagraph}>
                  Between 2004 and 2009, the web transformed from a read-only medium into a
                  participatory platform. Blogs, wikis, social networks, and user-generated content
                  redefined what it meant to be online.
                </p>
              </div>

              {/* Card: What was Web 2.0 */}
              <div className={styles.card}>
                <div className={styles.cardTitle}>What Was Web 2.0?</div>
                <p className={styles.paragraph}>
                  Tim O&apos;Reilly coined the term at the 2004 O&apos;Reilly Media Web 2.0
                  Conference. It described a shift: from static pages to dynamic, user-driven
                  applications. Web 2.0 sites read <em>and</em> wrote. They leveraged the web as
                  a platform, not just a medium.
                </p>
                <p className={styles.paragraph}>
                  The aesthetic matched the philosophy: rounded corners, gradients, reflections,
                  glossy buttons. Everything felt touchable, friendly, and collaborative. Ajax
                  (Asynchronous JavaScript and XML) made pages update without full reloads —
                  Gmail launching in 2004 proved what was possible.
                </p>
                <div>
                  <button className={styles.glossyBtn}>Read More →</button>
                  <button className={`${styles.glossyBtn} ${styles.glossyBtnOrange}`}>
                    Subscribe via RSS
                  </button>
                </div>
              </div>

              {/* Card: MySpace & Social */}
              <div className={styles.card}>
                <div className={styles.cardTitle}>MySpace, Facebook & The Social Web</div>
                <p className={styles.paragraph}>
                  MySpace launched in 2003 and let users customize their profiles with raw HTML and
                  CSS — leading to gloriously chaotic personal pages reminiscent of GeoCities.
                  Facebook (2004) went the opposite direction: everything standardized, clean, and
                  feed-based. It won.
                </p>
                <p className={styles.paragraph}>
                  YouTube (2005), Twitter (2006), and Flickr brought video, microblogging, and
                  photo sharing to the masses. The &quot;Like&quot; button, social sharing, and the
                  feed became the dominant interaction model for the next decade.
                </p>
                <ul className={styles.list}>
                  <li>2004 — Gmail launches: 1GB free storage shocks the industry</li>
                  <li>2004 — Facebook opens to Harvard students</li>
                  <li>2005 — YouTube founded in a garage above a pizza shop</li>
                  <li>2006 — Twitter: &quot;What are you doing?&quot;</li>
                  <li>2007 — iPhone launches — touch screens change everything</li>
                  <li>2006 — jQuery 1.0: JavaScript finally becomes bearable</li>
                </ul>
              </div>

              {/* Card: AJAX & jQuery */}
              <div className={styles.card}>
                <div className={styles.cardTitle}>AJAX & jQuery — Interactivity Unleashed</div>
                <p className={styles.paragraph}>
                  Jesse James Garrett coined &quot;Ajax&quot; in 2005. It described using
                  XMLHttpRequest to fetch data without a page reload. Google Maps used it to pan
                  and zoom without refreshing. Google Suggest autocompleted search in real time.
                </p>
                <p className={styles.paragraph}>
                  jQuery (2006) abstracted the browser incompatibilities that made JavaScript so
                  painful. Suddenly developers could write{' '}
                  <code style={{ fontFamily: 'monospace', background: '#f5f5f5', padding: '0 3px' }}>
                    $(&apos;.button&apos;).click(...)
                  </code>{' '}
                  and have it work in every browser. jQuery became the most widely deployed
                  JavaScript library in history.
                </p>
              </div>
            </main>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              {/* Tag cloud */}
              <div className={styles.sidebarWidget}>
                <div className={styles.widgetTitle}>Tag Cloud</div>
                <div className={styles.tagCloud}>
                  <span className={`${styles.tag} ${styles.tagLg}`}>ajax</span>
                  <span className={`${styles.tag} ${styles.tagMd}`}>web2.0</span>
                  <span className={`${styles.tag} ${styles.tagLg}`}>jquery</span>
                  <span className={`${styles.tag} ${styles.tagSm}`}>myspace</span>
                  <span className={`${styles.tag} ${styles.tagMd}`}>rss</span>
                  <span className={`${styles.tag} ${styles.tagSm}`}>folksonomy</span>
                  <span className={`${styles.tag} ${styles.tagLg}`}>social</span>
                  <span className={`${styles.tag} ${styles.tagMd}`}>mashup</span>
                  <span className={`${styles.tag} ${styles.tagSm}`}>del.icio.us</span>
                  <span className={`${styles.tag} ${styles.tagLg}`}>blog</span>
                  <span className={`${styles.tag} ${styles.tagMd}`}>iphone</span>
                  <span className={`${styles.tag} ${styles.tagSm}`}>css</span>
                </div>
              </div>

              {/* Recent posts */}
              <div className={styles.sidebarWidget}>
                <div className={styles.widgetTitle}>Recent Posts</div>
                <ul className={styles.list}>
                  <li>Gmail storage hits 2GB — Google keeps giving!</li>
                  <li>I finally understand del.icio.us</li>
                  <li>
                    AJAX tutorial for absolute beginners
                  </li>
                  <li>Why MySpace will outlast Facebook</li>
                  <li>My Flickr photostream is live!</li>
                </ul>
              </div>

              {/* Blogroll */}
              <div className={styles.sidebarWidget}>
                <div className={styles.widgetTitle}>Blogroll</div>
                <ul className={styles.list}>
                  <li>A List Apart</li>
                  <li>CSS-Tricks</li>
                  <li>Slashdot</li>
                  <li>Digg</li>
                  <li>Lifehacker</li>
                </ul>
              </div>

              {/* Web 2.0 starburst */}
              <div className={styles.sidebarWidget} style={{ textAlign: 'center' }}>
                <div className={styles.starBurst}>WEB 2.0 READY!</div>
              </div>
            </aside>
          </div>

          <div className={styles.footer}>
            © 2008 Web Time Machine · Powered by WordPress · Valid XHTML 1.0 Transitional
          </div>
        </div>
      </BrowserChrome>
    </section>
  );
}
