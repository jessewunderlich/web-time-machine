/**
 * Central GSAP entry point.
 *
 * All animation code in this app should import from here, not from
 * `gsap` / `gsap/ScrollTrigger` / `@gsap/react` directly. Two reasons:
 *
 * 1. Plugins register exactly once. Calling `gsap.registerPlugin()` ten
 *    times across the bundle is harmless but wastes parse work and
 *    obscures which plugins the app actually uses.
 *
 * 2. The bundler sees a single canonical import edge for GSAP, so
 *    tree-shaking and chunk-splitting are predictable. Adding a new
 *    plugin (e.g. ScrollSmoother) is a one-file change.
 *
 * Consumers must be `'use client'` — GSAP touches `window` and React
 * refs. The module guards against accidental server import via the
 * `typeof window` check.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
export default gsap;
