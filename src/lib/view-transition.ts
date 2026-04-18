/**
 * View Transitions helper for era navigation.
 *
 * When a user jumps between eras via nav dots or keyboard shortcuts, we'd
 * rather crossfade between the two visual states than scroll through every
 * era in between. View Transitions API makes that trivial when supported
 * (Chrome 126+, Edge 126+, Safari 18.2+ — ~85% of users as of April 2026).
 *
 * Falls back to the current smooth-scroll behavior in unsupported browsers
 * (Firefox same-document support landed in 144, but we treat it as graceful
 * enhancement — nothing breaks if the API is absent).
 */

/**
 * Is a real View Transition (crossfade) going to happen if we call
 * `navigateWithTransition` right now? Answers "no" when:
 *   - running on the server (no document)
 *   - the browser doesn't implement startViewTransition
 *   - the user has prefers-reduced-motion: reduce
 *
 * Callers use this to decide between `behavior: 'instant'` (inside a VT,
 * so the scroll completes synchronously and the crossfade plays cleanly)
 * and `behavior: 'smooth'` (no VT, use the normal animated scroll).
 */
export function willUseViewTransition(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }
  if (typeof document.startViewTransition !== 'function') {
    return false;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }
  return true;
}

/**
 * Jump to an era with a View Transition crossfade when supported, else
 * run `mutate` directly. The `mutate` callback is what actually changes
 * the scroll position (or any other DOM state you want to transition
 * across).
 *
 * IMPORTANT for callers: when `willUseViewTransition()` is true, anything
 * `mutate` does must complete SYNCHRONOUSLY. View Transitions snapshot
 * old state, run mutate(), snapshot new state, then crossfade. A smooth
 * scroll kicked off inside mutate() is async and won't be done when
 * mutate returns, so VT will capture a mid-scroll snapshot and the
 * crossfade will play on top of continuing scroll — visually broken.
 * Use `behavior: 'instant'` for scrolls inside the mutate callback when
 * `willUseViewTransition()` returns true.
 */
export function navigateWithTransition(mutate: () => void) {
  if (!willUseViewTransition()) {
    mutate();
    return;
  }
  // willUseViewTransition() already verified startViewTransition exists.
  document.startViewTransition(mutate);
}
