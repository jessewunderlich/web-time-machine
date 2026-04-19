'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/browser-chrome.module.css';

type Era = '1991' | '1996' | '2000' | '2005' | '2010' | '2015' | '2021' | '2026';

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
  '2026': {
    // Terminal-first: Era 2026's "browser" is a terminal because the
    // dominant dev surface isn't a browser anymore. Keeping the chrome
    // component for visual consistency across eras.
    name: 'Claude Code',
    url: '~/projects/app/src',
    topBg: '#0a0a0f',
    topColor: '#d0d0dc',
    borderColor: '#2a2a35',
  },
};

/** CSS custom-property bundle, derived from ERA_CONFIG so per-era colors
 *  stay data-driven while the stylesheet owns every dimension, font, and
 *  gradient. Passed as an inline `style` on the root of each era shell.
 *  React 19 accepts CSS custom properties natively in CSSProperties. */
function chromeVars(cfg: EraChromeConfig): React.CSSProperties {
  return {
    '--chrome-top-bg': cfg.topBg,
    '--chrome-top-color': cfg.topColor,
    '--chrome-border': cfg.borderColor,
  } as React.CSSProperties;
}

// ── IE6 BSOD overlay (Era 2000 close-button easter egg) ─────────────────────
// Uses role="alertdialog" (not "alert") because this is an interactive
// overlay, not a passive notification: it blocks clicks on the page beneath
// and requires user action (any key or click) to dismiss. Focus is moved
// into the dialog on mount and restored to the trigger on dismiss.
function Bsod({ onDismiss }: { onDismiss: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remember the element that had focus before the BSOD appeared so we can
    // restore it on dismiss. Typically this is the IE6 close button.
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    // Any key dismisses — authentic BSOD behavior. Modifier-only presses
    // (Shift, Control, etc. alone) are ignored so assistive-tech chording
    // doesn't accidentally close the overlay.
    const onKey = (e: KeyboardEvent) => {
      const isModifierOnly =
        e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta';
      if (!isModifierOnly) onDismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      // Restore focus so keyboard users land back on the button they activated.
      previouslyFocused?.focus?.();
    };
  }, [onDismiss]);

  return (
    <div
      ref={dialogRef}
      onClick={onDismiss}
      className={styles.bsod}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="bsod-title"
      aria-describedby="bsod-desc"
      tabIndex={-1}
    >
      <div className={styles.bsodBody}>
        <p id="bsod-desc" className={styles.bsodLead}>
          A problem has been detected and Windows has been shut down to prevent damage
          to your computer.
        </p>
        <p id="bsod-title" className={styles.bsodCode}>
          INTERNET_EXPLORER_6_FAULT
        </p>
        <p className={styles.bsodDetail}>
          Stop: 0x0000001E (0x00000000, 0x00000000)
        </p>
      </div>
      <p className={styles.bsodHint}>Press any key to restart...</p>
    </div>
  );
}

// ── Shared Win9x toolbar (used by 1996 + 2000) ──────────────────────────────
// Period-accurate decorative mock. aria-hidden removes it from the a11y tree
// entirely so screen readers don't announce five fake navigation buttons.
function Win9xToolbar({ url }: { url: string }) {
  return (
    <div className={styles.winToolbar} aria-hidden="true">
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
        {/* Decorative Lynx chrome strip. */}
        <div className={styles.lynxBar} aria-hidden="true">
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
          {/* Decorative title-bar controls — Netscape 3.0 has no easter egg
           * (only IE6 below does), so these three are mocks. */}
          <div className={styles.winTitleBtns} aria-hidden="true">
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
          {/* IE6 title-bar controls — real interactive buttons (easter egg).
           * Use semantic <button> instead of div[role=button]; the browser
           * handles Space/Enter activation, focus ring, and ARIA role. */}
          <div className={styles.winTitleBtns}>
            <button
              type="button"
              className={`${styles.winBtn} ${styles.winBtnActive}`}
              onClick={() => setMinimized(true)}
              title="Minimize"
              aria-label="Minimize window"
            >
              _
            </button>
            <button
              type="button"
              className={`${styles.winBtn} ${styles.winBtnActive}`}
              onClick={() => setMinimized(false)}
              title="Restore"
              aria-label="Restore window"
            >
              □
            </button>
            <button
              type="button"
              className={`${styles.winBtn} ${styles.winBtnActive}`}
              onClick={() => setCrashed(true)}
              title="Close (easter egg: crashes the page, IE6 style)"
              aria-label="Close window (easter egg - crashes the page in IE6 style)"
            >
              ✕
            </button>
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
        {/* Decorative Firefox 1.5 chrome. aria-hidden removes the fake tabs
         * and decorative nav buttons from the a11y tree; real navigation is
         * exposed only through EraNav at the page level. */}
        <div className={styles.ffTabStrip} aria-hidden="true">
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
        <div className={styles.ffAddressBar} aria-hidden="true">
          {['◀', '▶', '⟳'].map((btn) => (
            <button key={btn} type="button" className={styles.ffNavBtn} tabIndex={-1}>
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
        {/* Decorative Chrome 8 bar. */}
        <div className={styles.chrBar} aria-hidden="true">
          <div className={styles.chrNav}>
            {['◀', '▶'].map((btn) => (
              <button key={btn} type="button" className={styles.chrNavBtn} tabIndex={-1}>
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
        {/* Decorative Safari chrome bar. */}
        <div className={styles.safariBar} aria-hidden="true">
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

  // 2021 — Arc-style. Decorative chrome bar, aria-hidden.
  return (
    <div className={styles.shell2021} style={vars}>
      <div className={styles.arcBar} aria-hidden="true">
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
