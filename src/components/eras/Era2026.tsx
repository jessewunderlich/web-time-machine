'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BrowserChrome from '../browser-chrome/BrowserChrome';
import HistoricalSites from '../HistoricalSites';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from '../../styles/era-2026.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Era 2026 — The Agentic Era.
 *
 * By mid-2026 the dominant developer surface isn't "a chatbot in a browser
 * tab" anymore — it's an AI agent running a tool loop, reading files,
 * calling APIs, writing code, reporting back. Claude Code (GA May 2025),
 * Cursor agent mode, Devin (launched March 2024 by Cognition), Operator /
 * ChatGPT Agent Mode, and Model Context Protocol (MCP, open-sourced
 * November 25, 2024 and donated to the Linux Foundation's Agentic AI
 * Foundation in December 2025) reshaped how people build software.
 *
 * The visual language of this era is terminal-first: streaming tool output,
 * log lines, structured JSON, sparse UI. This component renders a fake
 * agent execution trace that "runs" as the user scrolls into view — a
 * decorative echo of what Claude Code and similar tools actually look like
 * while working.
 */

interface AgentStep {
  kind: 'think' | 'tool' | 'result' | 'commit';
  label: string;
  detail: string;
  durationMs: number;
}

const AGENT_TRACE: AgentStep[] = [
  {
    kind: 'think',
    label: 'Planning',
    detail: 'Read the brief. Identify files to touch. Decide on approach.',
    durationMs: 800,
  },
  {
    kind: 'tool',
    label: 'read_file',
    detail: 'src/components/Button.tsx · 84 lines',
    durationMs: 400,
  },
  {
    kind: 'tool',
    label: 'read_file',
    detail: 'src/styles/button.module.css · 42 lines',
    durationMs: 400,
  },
  {
    kind: 'tool',
    label: 'grep',
    detail: 'pattern="Button" in src/ · 23 matches',
    durationMs: 350,
  },
  {
    kind: 'think',
    label: 'Synthesizing',
    detail:
      'Existing Button already has variant prop. Adding tertiary variant keeps the API consistent.',
    durationMs: 900,
  },
  {
    kind: 'tool',
    label: 'write_patch',
    detail: 'src/components/Button.tsx · +14 lines',
    durationMs: 500,
  },
  {
    kind: 'tool',
    label: 'write_patch',
    detail: 'src/styles/button.module.css · +8 lines',
    durationMs: 500,
  },
  {
    kind: 'tool',
    label: 'run',
    detail: 'npm test -- --run Button',
    durationMs: 1200,
  },
  {
    kind: 'result',
    label: 'PASS',
    detail: '12 tests passed in 1.3s',
    durationMs: 400,
  },
  {
    kind: 'tool',
    label: 'run',
    detail: 'npx tsc --noEmit',
    durationMs: 900,
  },
  {
    kind: 'result',
    label: 'OK',
    detail: 'No type errors',
    durationMs: 350,
  },
  {
    kind: 'commit',
    label: 'done',
    detail: 'feat(button): add tertiary variant (2 files, +22 lines)',
    durationMs: 500,
  },
];

export default function Era2026() {
  const eraRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  // When reduced motion is on we paint the whole trace instantly; when it
  // isn't we start at 0 and stream via IntersectionObserver. Initialising
  // from the reducedMotion flag avoids a setState-in-effect round-trip.
  const [visibleSteps, setVisibleSteps] = useState(() =>
    reducedMotion ? AGENT_TRACE.length : 0
  );

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
      });
    },
    { scope: eraRef }
  );

  // Stream the agent trace one step at a time when the terminal enters
  // view. Reduced-motion branch skips the observer entirely (no work).
  useEffect(() => {
    if (reducedMotion) return;
    const term = terminalRef.current;
    if (!term) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleSteps((v) => (v === 0 ? 1 : v));
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(term);
    return () => obs.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || visibleSteps === 0 || visibleSteps >= AGENT_TRACE.length) {
      return;
    }
    const current = AGENT_TRACE[visibleSteps - 1];
    const timer = setTimeout(
      () => setVisibleSteps((v) => v + 1),
      current.durationMs
    );
    return () => clearTimeout(timer);
  }, [visibleSteps, reducedMotion]);

  const runningStep =
    visibleSteps > 0 && visibleSteps < AGENT_TRACE.length
      ? AGENT_TRACE[visibleSteps - 1]
      : null;
  const allDone = visibleSteps >= AGENT_TRACE.length;

  return (
    <section
      ref={eraRef}
      id="era-2026"
      className={styles.era}
      tabIndex={-1}
      aria-labelledby="era-2026-heading"
    >
      <div className={styles.gradientBg} aria-hidden="true" />

      <BrowserChrome era="2026">
        <div className={styles.inner}>
          <div ref={headlineRef} className={styles.headlineWrap}>
            <div className={styles.eyebrow}>Era VIII · 2026</div>
            <h2 id="era-2026-heading" className={styles.headline}>
              The Agentic Era
            </h2>
            <p className={styles.subhead}>
              When the browser stopped being the destination.
            </p>
          </div>

          <div className={styles.introGrid}>
            <p className={styles.intro}>
              In 2024 an AI answered a question. In 2025 it wrote a function.
              By mid-2026 it opens your repo, reads the code, runs the tests,
              commits a patch, and tells you what it did. The UI stopped
              being a chat bubble and became a <em>tool loop</em>.
            </p>
            <div className={styles.introStats}>
              <div className={styles.stat}>
                <div className={styles.statNum}>Nov 2024</div>
                <div className={styles.statLabel}>
                  Model Context Protocol (MCP) open-sourced by Anthropic
                </div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>May 2025</div>
                <div className={styles.statLabel}>Claude Code GA</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>Dec 2025</div>
                <div className={styles.statLabel}>
                  MCP donated to the Linux Foundation&apos;s Agentic AI
                  Foundation (co-founded by Anthropic, Block, and OpenAI)
                </div>
              </div>
            </div>
          </div>

          {/* Fake agent trace — scrolls into view, streams line by line. */}
          <div
            ref={terminalRef}
            className={styles.terminal}
            role="region"
            aria-label="Example of an AI agent executing a task"
          >
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className={styles.terminalTitle}>
                agent · task: add tertiary button variant
              </div>
              <div
                className={`${styles.terminalStatus} ${allDone ? styles.statusDone : styles.statusRunning}`}
                aria-live="polite"
              >
                {allDone ? 'done' : runningStep ? 'running' : 'idle'}
              </div>
            </div>

            <div className={styles.terminalBody}>
              {AGENT_TRACE.slice(0, visibleSteps).map((step, i) => (
                <div
                  key={i}
                  className={`${styles.step} ${styles[`step-${step.kind}`] ?? ''}`}
                >
                  <span className={styles.stepMarker} aria-hidden="true">
                    {markerFor(step.kind)}
                  </span>
                  <span className={styles.stepLabel}>{step.label}</span>
                  <span className={styles.stepDetail}>{step.detail}</span>
                </div>
              ))}
              {runningStep && !reducedMotion && (
                <div className={styles.caret} aria-hidden="true">
                  <span className={styles.caretBlink}>▋</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.contentSections}>
            <div className={styles.contentCard}>
              <h3 id="era-2026-tool-loop" className={styles.contentHeading}>
                From chatbot to tool loop
              </h3>
              <p className={styles.contentText}>
                Early LLM products were chat interfaces — you typed, the model
                typed back. Agentic products added a control loop: the model
                writes a tool call, the runtime executes it, the output
                becomes the next context. The UI is no longer a transcript;
                it&apos;s a live log of structured operations.
              </p>
              <ul className={styles.contentList}>
                <li><strong>Claude Code</strong> — Anthropic&apos;s terminal-native agent, GA May 2025</li>
                <li><strong>Cursor agent mode</strong> — editor-integrated background workers</li>
                <li><strong>Devin</strong> — Cognition&apos;s autonomous engineer, launched March 2024</li>
                <li><strong>Operator / ChatGPT Agent Mode</strong> — browser-use agents for general tasks</li>
              </ul>
            </div>

            <div className={styles.contentCard}>
              <h3 id="era-2026-mcp" className={styles.contentHeading}>
                MCP — the protocol that made it portable
              </h3>
              <p className={styles.contentText}>
                Before the Model Context Protocol, every AI-to-tool connection
                was bespoke. MCP (released November 25, 2024) standardized
                the handshake between agents and the resources they operate
                on — file systems, databases, APIs, browsers. OpenAI, Google
                DeepMind, Microsoft, and others adopted it within months.
              </p>
              <p className={styles.contentText}>
                In December 2025 Anthropic donated MCP to the newly formed{' '}
                <strong>Agentic AI Foundation</strong>{' '}under the Linux Foundation, removing single-vendor control from the protocol. 97M+ monthly SDK downloads across Python and TypeScript by early 2026.
              </p>
            </div>

            <div className={styles.contentCard}>
              <h3 className={styles.contentHeading}>
                What it means for web design
              </h3>
              <p className={styles.contentText}>
                UIs now have two audiences: <em>humans</em> who glance at a streaming log and <em>other agents</em>{' '}that parse structured output. &ldquo;Design&rdquo; expands to include tool schemas,
                error envelopes, streaming formats, and prompt scaffolds.
                The visual metaphor of the era isn&apos;t a page — it&apos;s
                a <em>trace</em>.
              </p>
              <p className={styles.contentTextMuted}>
                This era is still being written. Check back in 2027.
              </p>
            </div>
          </div>
        </div>
      </BrowserChrome>
      <HistoricalSites era="2026" />
    </section>
  );
}

function markerFor(kind: AgentStep['kind']): string {
  switch (kind) {
    case 'think':
      return '▸';
    case 'tool':
      return '$';
    case 'result':
      return '✓';
    case 'commit':
      return '⎙';
  }
}
