/**
 * Marks the document while a section / route / menu transition is running so the
 * navbar can drop its (expensive on iOS) backdrop blur for the duration. The blur
 * is restored 100ms after the last transition ends. Ref-counted for safety.
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
