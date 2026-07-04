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
