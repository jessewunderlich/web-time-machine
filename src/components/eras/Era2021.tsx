'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrowserChrome from '../browser-chrome/BrowserChrome';
import HistoricalSites from '../HistoricalSites';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from '../../styles/era-2021.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AI_MESSAGES = [
  { role: 'user', text: 'What is this website?' },
  {
    role: 'ai',
    text: 'This is the Web Time Machine — a site that uses the medium to explain itself. You\'re reading about the history of web design while experiencing it through period-accurate styles.',
  },
  { role: 'user', text: 'Are you self-aware?' },
  {
    role: 'ai',
    text: 'I\'m a decorative easter egg — a fake AI chatbot inside an AI-era section of a website about web history. So: only as self-aware as the developer made me. Which, honestly, feels very 2024.',
  },
];

export default function Era2021() {
  const eraRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [visibleMessages, setVisibleMessages] = useState(1);
  const [typing, setTyping] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(headlineRef.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: eraRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });

        if (gridRef.current) {
          gsap.from(Array.from(gridRef.current.children), {
            opacity: 0,
            y: 24,
            stagger: 0.12,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });
    },
    { scope: eraRef }
  );

  // Easter egg: chatbot auto-advances messages.
  // Reduced motion: reveal the full conversation immediately, no typing delay.
  useEffect(() => {
    if (reducedMotion || visibleMessages >= AI_MESSAGES.length) return;
    const timer = setTimeout(() => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setVisibleMessages((v) => v + 1);
      }, 1800);
    }, 2500);
    return () => clearTimeout(timer);
  }, [visibleMessages, reducedMotion]);

  // When the reduced-motion flag flips on (including first paint after mount),
  // surface all messages at once instead of auto-advancing.
  const messagesToRender = reducedMotion ? AI_MESSAGES.length : visibleMessages;
  const showTyping = reducedMotion ? false : typing;

  const bentoItems = [
    {
      span: 'span7',
      accent: 'accentPurple',
      label: 'Overview',
      title: 'The AI Era (2021–2025)',
      text: 'ChatGPT launched in November 2022 and reached 100 million users in 2 months — one of the fastest consumer product adoptions ever (Threads hit that mark in 5 days in 2023). The web became a surface for AI interfaces, prompts, and generated content.',
    },
    {
      span: 'span5',
      accent: 'accentBlue',
      label: 'Design Trend',
      title: 'Glassmorphism',
      text: 'Frosted glass panels, mesh gradients, and noise textures defined the aesthetic of the early 2020s. Figma made it easy. Everyone used it. Some used it too much.',
    },
    {
      span: 'span4',
      accent: 'accentGreen',
      label: 'Framework',
      title: 'The Bento Grid',
      text: 'Apple popularized asymmetric bento-box layouts for product pages. Developers copied it immediately.',
    },
    {
      span: 'span8',
      accent: 'accentPink',
      label: 'History',
      title: 'Web3 — Hype to Reality Check',
      text: 'NFTs peaked in 2021 at $69M (Beeple). The crypto market lost $2 trillion in the 2022 crash. Web3\'s decentralized web vision largely stalled, though blockchain technology found real use cases in finance and supply chains.',
    },
    {
      span: 'span3',
      accent: 'accentPurple',
      label: 'Stat',
      statNum: '~1.76T',
      statLabel: 'GPT-4 parameters (estimated; OpenAI never confirmed)',
    },
    {
      span: 'span3',
      accent: 'accentBlue',
      label: 'Stat',
      statNum: '1.8B',
      statLabel: 'Websites online in 2024',
    },
    {
      span: 'span6',
      accent: 'accentGreen',
      label: 'Tools Revolution',
      title: 'AI-Assisted Development',
      text: 'GitHub Copilot (2021), Cursor, and Claude Code changed how developers write software. Designers got Midjourney, DALL-E, and Figma AI. The definition of "building for the web" expanded to include prompting.',
    },
  ];

  return (
    <section ref={eraRef} id="era-2021">
      <BrowserChrome era="2021">
        <div className={styles.era}>
          <div className={styles.meshBg} />
          <div className={styles.noise} />

          <div className={styles.inner}>
            {/* Top bar */}
            <div className={styles.topBar}>
              <span className={styles.brandName}>web-time-machine</span>
              <span className={styles.pill}>2021 → Now</span>
            </div>

            {/* Headline */}
            <div ref={headlineRef}>
              <h2 className={styles.headline}>
                AI &<br />
                <span className={styles.gradientText}>Beyond.</span>
              </h2>
              <p className={styles.subHeadline}>
                The web turned 30. Then it got a brain. Now every product has an AI feature
                and every AI is a product.
              </p>
            </div>

            {/* Bento grid */}
            <div ref={gridRef} className={styles.bentoGrid}>
              {bentoItems.map((item, i) => (
                <div
                  key={i}
                  className={`${styles.glassCard} ${styles[item.span as keyof typeof styles]}`}
                >
                  <div
                    className={`${styles.cardAccent} ${styles[item.accent as keyof typeof styles]}`}
                  />
                  <div className={styles.cardLabel}>{item.label}</div>
                  {item.statNum ? (
                    <>
                      <div className={styles.statNum}>{item.statNum}</div>
                      <div className={styles.statLabel}>{item.statLabel}</div>
                    </>
                  ) : (
                    <>
                      <div className={styles.cardTitle}>{item.title}</div>
                      <p className={styles.cardText}>{item.text}</p>
                    </>
                  )}
                </div>
              ))}

              {/* 3D floating cube card */}
              <div className={`${styles.glassCard} ${styles.span3}`}>
                <div className={`${styles.cardAccent} ${styles.accentPink}`} />
                <div className={styles.cardLabel}>CSS 3D</div>
                <div className={styles.floatingElement}>
                  <div className={styles.cube}>
                    {['front', 'back', 'left', 'right', 'top', 'bottom'].map((face) => (
                      <div key={face} className={`${styles.cubeFace} ${styles[face as keyof typeof styles]}`}>
                        {face === 'front' ? '🌐' : ''}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.cardLabel}>Pure CSS 3D</div>
              </div>

              {/* AI Chatbot — easter egg */}
              <div className={`${styles.glassCard} ${styles.span9}`}>
                <div className={`${styles.cardAccent} ${styles.accentPurple}`} />
                <div className={styles.chatbotWidget}>
                  <div className={styles.chatbotHeader}>
                    <div className={styles.chatbotDot} />
                    <span className={styles.chatbotName}>TimeMachineAI</span>
                    <span className={styles.chatbotStatus}>
                      {showTyping ? 'typing...' : 'online'}
                    </span>
                  </div>
                  <div className={styles.chatbotMessages}>
                    {AI_MESSAGES.slice(0, messagesToRender).map((msg, i) => (
                      <div
                        key={i}
                        className={`${styles.chatMsg} ${msg.role === 'user' ? styles.chatMsgUser : ''}`}
                      >
                        {msg.text}
                      </div>
                    ))}
                    {showTyping && (
                      <div className={styles.typingIndicator}>
                        <div className={styles.typingDot} />
                        <div className={styles.typingDot} />
                        <div className={styles.typingDot} />
                      </div>
                    )}
                  </div>
                  <div className={styles.chatInput}>
                    <input
                      className={styles.chatInputField}
                      placeholder="Ask about web history..."
                      readOnly
                      aria-label="Chat input (decorative demo — this input is read-only)"
                    />
                    <button
                      className={styles.chatSend}
                      type="button"
                      aria-label="Send message (decorative — this chatbot is a demo)"
                    >
                      ↑
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Final reflection */}
            <div id="era-2021-meta" className={`${styles.glassCard} ${styles.finalCard}`}>
              <div className={`${styles.cardAccent} ${styles.accentPurple}`} />
              <div className={styles.cardLabel}>Meta moment</div>
              <div className={styles.cardTitle}>
                You just scrolled through 35+ years of web history.
              </div>
              <p className={styles.cardText}>
                From a single page on a NeXT workstation at CERN in 1991, to a global network
                of 1.8 billion websites serving 5 billion users. From green text on black screens
                to glassmorphic AI interfaces. The web is the most important communication
                technology ever built — and it&apos;s still only getting started.
              </p>
              <ul className={`${styles.list} ${styles.listSpaced}`}>
                <li>This site was built with Next.js 16, GSAP, and Tailwind CSS</li>
                <li>Each era uses period-accurate CSS to style its section</li>
                <li>There are 8 easter eggs hidden in the eras — did you find them all?</li>
                <li>Tim Berners-Lee never patented the web. He gave it to all of us.</li>
              </ul>
            </div>
          </div>
        </div>
      </BrowserChrome>
      <HistoricalSites era="2021" />
    </section>
  );
}
