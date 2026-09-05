/**
 * Transition lock — ref-counted body class for animation coordination.
 *
 * Adds/removes the `.u-transition-active` class on `<body>` while any
 * section, route, or menu shutter transition is running. This class is
 * consumed by CSS to suspend the navbar's `backdrop-filter: blur()`,
 * which is expensive on iOS Safari and causes frame drops when the
 * shutter bars animate behind it.
 *
 * The active count is ref-counted so overlapping transitions (e.g. a
 * route wipe fired while the menu close wipe is still animating) don't
 * prematurely remove the class. The class is restored with a 100ms
 * delay after the last transition ends to avoid a visible flash.
 *
 * @module transition
 */
let active = 0;

export function beginTransition(): void {
  active += 1;
  document.body.classList.add('u-transition-active');
}

export function endTransition(delayMs = 100): void {
  window.setTimeout(() => {
    active = Math.max(0, active - 1);
    if (active === 0) document.body.classList.remove('u-transition-active');
  }, delayMs);
}
