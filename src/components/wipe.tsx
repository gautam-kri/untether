export const BAR_COUNT = 5;
export const BAR_WIDTH = '400vw';
export const SHUTTER_STAGGER = 35;
export const SWAP_AT = 500; // swap the section under full cover
export const TRANSITION_LOCK = 950; // last bar clears at 140 + 780 = 920ms
export const REDUCED_LOCK = 200;
export const REDUCED_DUR = 150;

/**
 * Five fully-opaque shutter bars that each perform one uninterrupted stroke from
 * off one side of the viewport to off the other. Because the bars are wider than
 * the viewport (400vw) there is a window mid-stroke where all five fully cover
 * the screen at once — the section is swapped instantly inside that window.
 * Downward navigation sweeps left→right, upward right→left. Mount fresh to play.
 */
export function ShutterBars({ dir, className }: { dir: number; className?: string }) {
  const name = dir === 1 ? 'u-shutter-ltr' : 'u-shutter-rtl';
  return (
    <div aria-hidden="true" className={`u-shutter-overlay ${className ?? ''}`}>
      {/* Guarantees a fully-opaque cover during the swap, behind the bars. */}
      <div className="u-shutter-cover" />
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <div
          key={i}
          className="u-shutter-bar"
          data-dir={dir}
          style={{
            // % of the overlay (not dvh) with a 3px overlap above and below each
            // neighbour, so sub-pixel rounding at high DPR can't open a seam.
            top: i === 0 ? 0 : `calc(${i * 20}% - 3px)`,
            height: 'calc(20% + 6px)',
            width: BAR_WIDTH,
            animation: `${name} var(--dur-shutter) var(--ease-shutter) ${i * SHUTTER_STAGGER}ms both`,
          }}
        />
      ))}
    </div>
  );
}
