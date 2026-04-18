/**
 * View Transitions helper for era navigation.
 *
 * When a user jumps between eras via nav dots or keyboard shortcuts, we'd
 * rather crossfade between the two visual states than scroll through every
 * era in between. View Transitions API makes that trivial when supported
 * (Chrome 126+, Edge 126+, Safari 18.2+ \u2014 ~85% of users as of April 2026).
 *
 * Falls back to the current smooth-scroll behavior in unsupported browsers
 * (Firefox same-document support landed in 144, but we treat it as graceful
 * enhancement \u2014 nothing breaks if the API is absent).
 */

/**
 * Jump to an era with a View Transition crossfade when supported, else
 * smooth-scroll as a fallback. The `mutate` callback is what actually
 * changes the scroll position (or any other DOM state you want to
 * transition across).
 */
export function navigateWithTransition(mutate: () => void) {
  // Bail on reduced-motion \u2014 respect user preference, skip the crossfade
  // and do the mutation instantly.
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    mutate();
    return;
  }

  // Feature-detect — TS lib.dom already types `startViewTransition`, but we
  // cannot trust it exists at runtime in every browser yet.
  if (typeof document.startViewTransition === 'function') {
    document.startViewTransition(mutate);
    return;
  }

  mutate();
}
