/**
 * Cover-first route transitions. A click on an internal link asks for a wipe;
 * the host (in App) sweeps the shutter bars in, swaps the route under full
 * cover at SWAP_AT, then sweeps the bars out to reveal the new page — so the
 * content never visibly changes before the bars arrive.
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
