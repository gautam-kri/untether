/**
 * Memory pipeline schematic.
 *
 * Raw input is refined into claims; a claim that clears the evidence gate is
 * PROMOTED into a fact; facts take typed forms — relationships, events,
 * preferences, commitments, traits — and those together compose the living
 * profile. The promotion is the whole argument of the page, so it is the one
 * thing carrying accent: the gate box, its connector, and its label.
 *
 * Two layouts share one data model. Above the `sm` breakpoint the spine runs
 * horizontally with the typed facts on a bus beneath it; below it, the spine
 * stacks and the types become an indented list. The stages are boxes and the
 * types are bare labels on purpose — a stage and a form are different kinds
 * of thing and should not look alike.
 *
 * @module MemoryPipelineIllustration
 */
import { IllustrationFrame, Rect, Line, Polyline } from './Illustration';
import { useMediaQuery } from '../lib/hooks';

interface Stage {
  label: string;
  sub?: string;
  accent?: boolean;
}

/** The refinement spine, in order. */
const SPINE: Stage[] = [
  { label: 'RAW INPUT' },
  { label: 'OBSERVATIONS' },
  { label: 'INFERENCES' },
  { label: 'CLAIMS', sub: 'CONFIDENCE · STATUS', accent: true },
  { label: 'FACTS' },
  { label: 'LIVING PROFILE' },
];

/** Spine index the evidence gate sits after — the connector out of it is the promotion. */
const GATE_I = 3;
/** Spine index the typed facts fan out from. */
const FACTS_I = 4;

/** The forms a promoted fact takes. */
const FACT_TYPES = ['RELATIONSHIPS', 'EVENTS', 'PREFERENCES', 'COMMITMENTS', 'TRAITS'];

const TITLE =
  'How raw input becomes claims, how claims that clear the evidence gate are promoted into facts, and how those typed facts compose a living profile';

/** Below this the diagram stacks. Exact complement of Tailwind's `sm:`. */
const VERTICAL_QUERY = '(max-width: 639.98px)';

const ACCENT = 'var(--accent-red)';

/**
 * TT2020 Base is monospaced with a 0.547em advance (read off the woff2's
 * `hmtx` table). Knowing it lets the fan align its outer *label edges* to the
 * spine's outer edges instead of its tick centres — with labels of different
 * widths those are not the same thing, and only the former reads as aligned.
 * Recomputed rather than hardcoded so the alignment survives editing
 * `FACT_TYPES`.
 */
const CH_ADVANCE = 0.547;

/** Rendered width of a tracked monospace label: n advances, minus the trailing track. */
function labelWidth(s: string, fontSize: number, tracking: number): number {
  return s.length * fontSize * (CH_ADVANCE + tracking) - fontSize * tracking;
}

interface Props {
  className?: string;
  style?: React.CSSProperties;
  decorative?: boolean;
}

export default function MemoryPipelineIllustration(props: Props) {
  const vertical = useMediaQuery(VERTICAL_QUERY);
  return vertical ? <VerticalPipeline {...props} /> : <HorizontalPipeline {...props} />;
}

/* ------------------------------------------------------------------ */
/* Horizontal — sm and up                                              */
/* ------------------------------------------------------------------ */

const H = {
  w: 148, // box width
  h: 52, // box height
  gap: 22,
  // The promotion carries its emphasis in the LENGTH of the run, not in a
  // fatter arrowhead: a long labelled shaft reads as a transition, an oversized
  // head just reads as an inconsistent arrow. Every head in the diagram is the
  // same size; only this gap is different.
  gateGap: 140,
  x0: 12,
  cy: 66,
  busY: 126,
  tickY: 138,
  labelY: 152,
  fanFs: 10,
  fanLs: 0.14,
  arrow: 7, // arrowhead length — uniform across every connector
  arrowV: 4, // arrowhead half-height
  height: 168,
};

function HorizontalPipeline({ className, style, decorative }: Props) {
  const xs: number[] = [];
  for (let i = 0, x = H.x0; i < SPINE.length; i++) {
    xs.push(x);
    x += H.w + (i === GATE_I ? H.gateGap : H.gap);
  }
  const totalW = xs[xs.length - 1] + H.w + H.x0;
  const top = H.cy - H.h / 2;
  const bottom = H.cy + H.h / 2;
  const factsCx = xs[FACTS_I] + H.w / 2;

  // The fan squares off against the spine: the outermost labels' outer edges
  // sit on the spine's outer edges, so the tick centres are inset by half a
  // label at each end. The bus terminates on those outer ticks rather than
  // running to the spine's edges — an overhang past the last tap reads as a
  // stray line, not as alignment.
  const spineL = xs[0];
  const spineR = xs[xs.length - 1] + H.w;
  const fanX0 = spineL + labelWidth(FACT_TYPES[0], H.fanFs, H.fanLs) / 2;
  const fanX1 = spineR - labelWidth(FACT_TYPES[FACT_TYPES.length - 1], H.fanFs, H.fanLs) / 2;
  const step = (fanX1 - fanX0) / (FACT_TYPES.length - 1);

  return (
    <IllustrationFrame
      viewBox={`0 0 ${totalW} ${H.height}`}
      title={TITLE}
      decorative={decorative}
      className={className}
      style={style}
    >
      {SPINE.map((s, i) => {
        const x = xs[i];
        const cx = x + H.w / 2;
        // The connector *into* this box; the one out of the gate is the promotion.
        const promoted = i === GATE_I + 1;
        const stroke = promoted ? ACCENT : undefined;
        const prevRight = i > 0 ? xs[i - 1] + H.w : 0;
        return (
          <g key={s.label}>
            {i > 0 && (
              <>
                <Line x1={prevRight} y1={H.cy} x2={x} y2={H.cy} stroke={stroke} />
                <Polyline
                  points={`${x - H.arrow},${H.cy - H.arrowV} ${x},${H.cy} ${x - H.arrow},${H.cy + H.arrowV}`}
                  fill="none"
                  stroke={stroke}
                />
                {promoted && (
                  <text
                    className="u-illus-anno"
                    x={(prevRight + x) / 2}
                    y={H.cy - 10}
                    textAnchor="middle"
                    style={{ fontSize: 12, letterSpacing: '0.14em', fill: ACCENT }}
                  >
                    PROMOTED
                  </text>
                )}
              </>
            )}

            <Rect
              x={x}
              y={top}
              width={H.w}
              height={H.h}
              rx={4}
              stroke={s.accent ? ACCENT : undefined}
            />
            <text
              className="u-illus-anno"
              x={cx}
              y={H.cy + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontSize: 13, letterSpacing: '0.06em', fill: s.accent ? ACCENT : undefined }}
            >
              {s.label}
            </text>
            {s.sub && (
              <text
                className="u-illus-anno"
                x={cx}
                y={bottom + 16}
                textAnchor="middle"
                style={{ fontSize: 10, letterSpacing: '0.14em' }}
              >
                {s.sub}
              </text>
            )}
          </g>
        );
      })}

      {/* Typed facts: drop from FACTS onto a bus, then a tick per form. */}
      <Line x1={factsCx} y1={bottom} x2={factsCx} y2={H.busY} />
      <Line x1={fanX0} y1={H.busY} x2={fanX1} y2={H.busY} />
      {FACT_TYPES.map((t, i) => {
        const cx = fanX0 + i * step;
        return (
          <g key={t}>
            <Line x1={cx} y1={H.busY} x2={cx} y2={H.tickY} />
            <text
              className="u-illus-anno"
              x={cx}
              y={H.labelY}
              textAnchor="middle"
              style={{ fontSize: H.fanFs, letterSpacing: `${H.fanLs}em` }}
            >
              {t}
            </text>
          </g>
        );
      })}
    </IllustrationFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Vertical — below sm                                                 */
/* ------------------------------------------------------------------ */

const V = {
  w: 300, // viewBox width
  bx: 24,
  bw: 252,
  bh: 40,
  cx: 150,
  gap: 22,
  gateGap: 66, // room for the sub-label and the promotion label
  busX: 78,
  tickX: 96,
  labelX: 104,
  tickStep: 22,
  arrow: 7, // arrowhead length — uniform across every connector
  arrowV: 4, // arrowhead half-width
};

function VerticalPipeline({ className, style, decorative }: Props) {
  // Spine y positions up to and including FACTS; LIVING PROFILE sits below the fan.
  const ys: number[] = [];
  for (let i = 0, y = 0; i <= FACTS_I; i++) {
    ys.push(y);
    y += V.bh + (i === GATE_I ? V.gateGap : V.gap);
  }
  const factsBottom = ys[FACTS_I] + V.bh;

  // The bus is one straight run at `busX`, dropping out of the FACTS box and
  // continuing into LIVING PROFILE without ever jogging back to the centreline
  // — it leaves both boxes off-centre, which is what keeps the line straight.
  const firstTick = factsBottom + 20;
  const profileY = firstTick + (FACT_TYPES.length - 1) * V.tickStep + 20;
  ys.push(profileY);

  const height = profileY + V.bh + 8;

  return (
    <IllustrationFrame
      viewBox={`0 0 ${V.w} ${height}`}
      title={TITLE}
      decorative={decorative}
      className={className}
      style={style}
    >
      {SPINE.map((s, i) => {
        const y = ys[i];
        const promoted = i === GATE_I + 1;
        const stroke = promoted ? ACCENT : undefined;
        // Every box takes a straight connector from the one above, except
        // LIVING PROFILE, which is fed by the fan's rejoin below.
        const straightIn = i > 0 && i <= FACTS_I;
        const prevBottom = i > 0 ? ys[i - 1] + V.bh : 0;
        return (
          <g key={s.label}>
            {straightIn && (
              <>
                <Line x1={V.cx} y1={prevBottom} x2={V.cx} y2={y} stroke={stroke} />
                <Polyline
                  points={`${V.cx - V.arrowV},${y - V.arrow} ${V.cx},${y} ${V.cx + V.arrowV},${y - V.arrow}`}
                  fill="none"
                  stroke={stroke}
                />
                {promoted && (
                  <text
                    className="u-illus-anno"
                    x={V.cx + 12}
                    y={(prevBottom + y) / 2 + 10}
                    style={{ fontSize: 9, letterSpacing: '0.14em', fill: ACCENT }}
                  >
                    PROMOTED
                  </text>
                )}
              </>
            )}

            <Rect
              x={V.bx}
              y={y}
              width={V.bw}
              height={V.bh}
              rx={4}
              stroke={s.accent ? ACCENT : undefined}
            />
            <text
              className="u-illus-anno"
              x={V.cx}
              y={y + V.bh / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontSize: 12, letterSpacing: '0.06em', fill: s.accent ? ACCENT : undefined }}
            >
              {s.label}
            </text>
            {/* Left-aligned to the box edge, not centred: the outgoing
                connector runs down the centreline and would otherwise be drawn
                straight through the middle of this text. PROMOTED clears the
                same line on the other side. */}
            {s.sub && (
              <text
                className="u-illus-anno"
                x={V.bx}
                y={y + V.bh + 14}
                style={{ fontSize: 9, letterSpacing: '0.14em' }}
              >
                {s.sub}
              </text>
            )}
          </g>
        );
      })}

      {/* Typed facts: one straight run out of FACTS and on into LIVING PROFILE,
          with a tick per form taken off its right. */}
      <Line x1={V.busX} y1={factsBottom} x2={V.busX} y2={profileY} />
      {FACT_TYPES.map((t, i) => {
        const ty = firstTick + i * V.tickStep;
        return (
          <g key={t}>
            <Line x1={V.busX} y1={ty} x2={V.tickX} y2={ty} />
            <text
              className="u-illus-anno"
              x={V.labelX}
              y={ty + 3}
              style={{ fontSize: 10, letterSpacing: '0.14em' }}
            >
              {t}
            </text>
          </g>
        );
      })}
      <Polyline
        points={`${V.busX - V.arrowV},${profileY - V.arrow} ${V.busX},${profileY} ${
          V.busX + V.arrowV
        },${profileY - V.arrow}`}
        fill="none"
      />
    </IllustrationFrame>
  );
}
