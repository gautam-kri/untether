/**
 * Landing section navigation — external store.
 *
 * The `Navbar` and `ProgressNav` live outside the Landing route subtree,
 * but they need to know which section is active and to be able to trigger
 * wipe transitions. This module solves that with a tiny external store
 * that works with React's `useSyncExternalStore`:
 *
 * - `landingNav.register()` / `.unregister()` — called by `WipeContainer`
 *   on mount/unmount to provide the `goTo` and `jump` callbacks.
 * - `landingNav.goTo(i)` — triggers an animated wipe to section `i`.
 * - `landingNav.jump(i)` — instantly swaps to section `i` (no animation),
 *   used by the mobile menu which plays its own shutter sweep.
 * - `useLandingIndex()` / `useLandingMounted()` — React hooks for
 *   consuming the store's active index and mount status.
 *
 * @module landingNav
 */
import { useSyncExternalStore } from 'react';

/**
 * Tiny external store so the Navbar and ProgressNav (which live outside the
 * Landing route subtree) can read the active section and drive the wipe.
 */
type Listener = () => void;

let activeIndex = 0;
let animating = false;
let mounted = false;
let goToImpl: (i: number) => void = () => {};
let jumpImpl: (i: number) => void = () => {};
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

export const landingNav = {
  subscribe(l: Listener) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
  getIndex: () => activeIndex,
  getAnimating: () => animating,
  isMounted: () => mounted,
  goTo(i: number) {
    goToImpl(i);
  },
  jump(i: number) {
    jumpImpl(i);
  },
  setIndex(i: number) {
    if (activeIndex !== i) {
      activeIndex = i;
      emit();
    }
  },
  setAnimating(a: boolean) {
    if (animating !== a) {
      animating = a;
      emit();
    }
  },
  register(go: (i: number) => void, jump: (i: number) => void) {
    goToImpl = go;
    jumpImpl = jump;
    mounted = true;
    emit();
  },
  unregister() {
    goToImpl = () => {};
    jumpImpl = () => {};
    mounted = false;
    activeIndex = 0;
    emit();
  },
};

export function useLandingIndex(): number {
  return useSyncExternalStore(landingNav.subscribe, landingNav.getIndex, () => 0);
}

export function useLandingMounted(): boolean {
  return useSyncExternalStore(landingNav.subscribe, landingNav.isMounted, () => false);
}
