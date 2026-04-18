'use client';

import { useState, useEffect } from 'react';
import styles from '../../styles/browser-chrome.module.css';

type Era = '1991' | '1996' | '2000' | '2005' | '2010' | '2015' | '2021';

interface BrowserChromeProps {
  era: Era;
  children: React.ReactNode;
}

interface EraChromeConfig {
  name: string;
  url: string;
  topBg: string;
  topColor: string;
  borderColor: string;
}

const ERA_CONFIG: Record<Era, EraChromeConfig> = {
  '1991': {
    name: 'Lynx 2.1',
    url: 'http://info.cern.ch/hypertext/WWW/TheProject.html',
    topBg: '#c0c0c0',
    topColor: '#000',
    borderColor: '#808080',
  },
  '1996': {
    name: 'Netscape Navigator 3.0',
    url: 'http://www.geocities.com/TimesSquare/7777/',
    topBg: '#c0c0c0',
    topColor: '#000',
    borderColor: '#808080',
  },
  '2000': {
    name: 'Internet Explorer 6',
    url: 'http://www.newgrounds.com',
    topBg: '#ece9d8',
    topColor: '#000',
    borderColor: '#848284',
  },
  '2005': {
    name: 'Mozilla Firefox 1.5',
    url: 'http://www.myspace.com/profile',
    topBg: '#e6e3da',
    topColor: '#000',
    borderColor: '#a0a0a0',
  },
  '2010': {
    name: 'Google Chrome 8',
    url: 'https://itunes.apple.com',
    topBg: '#dadada',
    topColor: '#333',
    borderColor: '#b0b0b0',
  },
  '2015': {
    name: 'Safari',
    url: 'https://example.com',
    topBg: '#f5f5f5',
    topColor: '#333',
    borderColor: '#d8d8d8',
  },
  '2021': {
    name: 'Arc',
    url: 'https://app.ai-beyond.dev',
    topBg: '#1a1a2e',
    topColor: '#ccc',
    borderColor: '#333',
  },
};

/** CSS custom-property bundle, derived from ERA_CONFIG so per-era colors
 *  stay data-driven while the stylesheet owns every dimension, font, and
 *  gradient. Passed as an inline `style` on the root of each era shell. */
function chromeVars(cfg: EraChromeConfig): React.CSSProperties {
  return {
    // CSS custom properties consumed by browser-chrome.module.css
    ['--chrome-top-bg' as string]: cfg.topBg,
    ['--chrome-top-color' as string]: cfg.topColor,
    ['--chrome-border' as string]: cfg.borderColor,
  };
}

// ── IE6 BSOD overlay (Era 2000 close-button easter egg) ─────────────────────
function Bsod({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const handler = () => onDismiss();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onDismiss]);

  return (
    <div
      onClick={onDismiss}
      className={styles.bsod}
      role="alert"
      aria-label="Blue screen of death (easter egg) — press any key or click to dismiss"
    >
      <div className={styles.bsodBody}>
        <p className={styles.bsodLead}>
          A problem has been detected and Windows has been shut down to prevent damage
          to your computer.
        </p>
        <p className={styles.bsodCode}>INTERNET_EXPLORER_6_FAULT</p>
        <p className={styles.bsodDetail}>
          Stop: 0x0000001E (0x00000000, 0x00000000)
        </p>
      </div>
      <p className={styles.bsodHint}>Press any key to restart...</p>
    </div>
  );
}

// ── Shared Win9x toolbar (used by 1996 + 2000) ──────────────────────────────
function Win9xToolbar({ url }: { url: string }) {
  return (
    <div className={styles.winToolbar}>
      {['◀', '▶', '✕', '⟳', '🏠'].map((btn) => (
        <div key={btn} className={styles.winToolBtn}>
          {btn}
        </div>
      ))}
      <div className={styles.winAddr}>{url}</div>
      <div className={styles.winGoBtn}>Go</div>
    </div>
  );
}

export default function BrowserChrome({ era, children }: BrowserChromeProps) {
  const cfg = ERA_CONFIG[era];
  const [crashed, setCrashed] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const vars = chromeVars(cfg);

  if (era === '1991') {
    return (
      <div className={styles.shell1991} style={vars}>
        <div className={styles.lynxBar}>
          <span className={styles.lynxName}>{cfg.name}</span>
          <span className={styles.lynxUrl}>{cfg.url}</span>
        </div>
        {children}
      </div>
    );
  }

  if (era === '1996') {
    return (
      <div className={styles.shell1996} style={vars}>
        <div className={styles.winTitle}>
          <span>
            {cfg.name} — [{cfg.url}]
          </span>
          <div className={styles.winTitleBtns}>
            {['_', '□', '✕'].map((btn) => (
              <div key={btn} className={styles.winBtn}>
                {btn}
              </div>
            ))}
          </div>
        </div>
        <Win9xToolbar url={cfg.url} />
        {children}
      </div>
    );
  }

  if (era === '2000') {
    return (
      <div className={styles.shell2000} style={vars}>
        {crashed && <Bsod onDismiss={() => setCrashed(false)} />}

        <div className={styles.winTitle}>
          <span>
            {cfg.name} — [{cfg.url}]
          </span>
          <div className={styles.winTitleBtns}>
            <div
              role="button"
              tabIndex={0}
              className={styles.winBtn}
              onClick={() => setMinimized(true)}
              onKeyDown={(e) => e.key === 'Enter' && setMinimized(true)}
              title="Minimize"
              aria-label="Minimize window"
            >
              _
            </div>
            <div
              role="button"
              tabIndex={0}
              className={styles.winBtn}
              onClick={() => setMinimized(false)}
              onKeyDown={(e) => e.key === 'Enter' && setMinimized(false)}
              title="Restore"
              aria-label="Restore window"
            >
              □
            </div>
            <div
              role="button"
              tabIndex={0}
              className={styles.winBtn}
              onClick={() => setCrashed(true)}
              onKeyDown={(e) => e.key === 'Enter' && setCrashed(true)}
              title="Close (easter egg: crashes the page, IE6 style)"
              aria-label="Close window (easter egg - crashes the page in IE6 style)"
            >
              ✕
            </div>
          </div>
        </div>

        <Win9xToolbar url={cfg.url} />

        <div
          className={styles.minimizedWrap}
          data-minimized={minimized ? 'true' : 'false'}
        >
          {minimized && <div className={styles.minimizedNote}>— minimized —</div>}
          {children}
        </div>
      </div>
    );
  }

  if (era === '2005') {
    const tabs = ['MySpace ♥ music', 'Google', 'Del.icio.us'];
    return (
      <div className={styles.shell2005} style={vars}>
        <div className={styles.ffTabStrip}>
          {tabs.map((tab, i) => (
            <div
              key={tab}
              className={styles.ffTab}
              data-active={i === 0 ? 'true' : 'false'}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className={styles.ffAddressBar}>
          {['◀', '▶', '⟳'].map((btn) => (
            <button key={btn} className={styles.ffNavBtn}>
              {btn}
            </button>
          ))}
          <div className={styles.ffUrlBox}>🔒 {cfg.url}</div>
        </div>
        {children}
      </div>
    );
  }

  if (era === '2010') {
    return (
      <div className={styles.shell2010} style={vars}>
        <div className={styles.chrBar}>
          <div className={styles.chrNav}>
            {['◀', '▶'].map((btn) => (
              <button key={btn} className={styles.chrNavBtn}>
                {btn}
              </button>
            ))}
          </div>
          <div className={styles.chrOmnibox}>{cfg.url}</div>
          <div className={styles.chrIcons}>
            {'☆⋮'.split('').map((icon) => (
              <span key={icon} className={styles.chrIcon}>
                {icon}
              </span>
            ))}
          </div>
        </div>
        {children}
      </div>
    );
  }

  if (era === '2015') {
    return (
      <div className={styles.shell2015} style={vars}>
        <div className={styles.safariBar}>
          <div className={styles.trafficLights}>
            <div className={`${styles.trafficLight} ${styles.lightRed}`} />
            <div className={`${styles.trafficLight} ${styles.lightYellow}`} />
            <div className={`${styles.trafficLight} ${styles.lightGreen}`} />
          </div>
          <div className={styles.safariUrl}>🔒 {cfg.url}</div>
        </div>
        {children}
      </div>
    );
  }

  // 2021 — Arc-style
  return (
    <div className={styles.shell2021} style={vars}>
      <div className={styles.arcBar}>
        <div className={styles.trafficLights}>
          <div className={`${styles.arcLight} ${styles.lightRed}`} />
          <div className={`${styles.arcLight} ${styles.lightYellow}`} />
          <div className={`${styles.arcLight} ${styles.lightGreen}`} />
        </div>
        <div className={styles.arcUrl}>{cfg.url}</div>
        <span className={styles.arcMenu}>⋯</span>
      </div>
      {children}
    </div>
  );
}
