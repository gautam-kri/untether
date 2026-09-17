/**
 * Bottom-right corner ornaments, from the design kit (C1, C2, C3, C6).
 *
 * Pure CSS, decorative, hidden from assistive tech and pointer events.
 * Mount inside any `position: relative` container; the ornament pins
 * itself to that container's bottom-right. `offset` lifts it off the
 * bottom edge — e.g. to sit level with a call-to-action that carries a
 * bottom margin. Styling lives in `styles/design-import.css` under
 * `.u-corner-orn`.
 *
 * - c1 — hatch
 * - c2 — dot matrix
 * - c3 — nested frames with an accent square
 * - c6 — bracket with a blinking accent dot
 *
 * @module CornerOrnament
 */
export type CornerKind = 'c1' | 'c2' | 'c3' | 'c6';

export default function CornerOrnament({ kind, offset }: { kind: CornerKind; offset?: string }) {
  return (
    <div
      className="u-corner-orn"
      data-kind={kind}
      aria-hidden="true"
      style={offset ? { bottom: offset } : undefined}
    >
      {kind === 'c3' && (
        <>
          <span className="u-corner-orn-frame" data-i="0" />
          <span className="u-corner-orn-frame" data-i="1" />
          <span className="u-corner-orn-frame" data-i="2" />
          <span className="u-corner-orn-square" />
        </>
      )}
      {kind === 'c6' && (
        <>
          <span className="u-corner-orn-bracket" />
          <span className="u-corner-orn-dot" />
        </>
      )}
    </div>
  );
}
