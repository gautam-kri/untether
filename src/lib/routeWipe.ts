/**
 * Route-level wipe request channel (pub/sub).
 *
 * Decouples wipe-request _producers_ (the capture-phase click interceptor
 * in `App.tsx`, or any imperative caller) from the wipe-request _consumer_
 * (`RouteWipeHost` in `App.tsx`), which actually orchestrates the shutter
 * bars and the React Router navigation.
 *
 * **Cover-first strategy:** the shutter bars sweep in over the CURRENT
 * page first; the route is swapped only after the bars fully cover the
 * screen (at `SWAP_AT` ms); then the bars sweep out to reveal the new
 * page. This ensures the content swap is never visible to the user.
 *
 * @module routeWipe
 */
export interface WipeRequest {
  to: string;
  dir: number;
  key: number;
}

type Listener = (req: WipeRequest) => void;

let listener: Listener | null = null;

export const routeWipe = {
  subscribe(l: Listener): () => void {
    listener = l;
    return () => {
      if (listener === l) listener = null;
    };
  },
  go(to: string, dir = 1): void {
    if (listener) listener({ to, dir, key: Date.now() });
  },
  /** True when a host is mounted to service wipes (i.e. we can cover-first). */
  isReady(): boolean {
    return listener !== null;
  },
};
