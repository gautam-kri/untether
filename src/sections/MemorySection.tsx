/**
 * Landing section 03 — "Memory with receipts", per the saved design canvas.
 *
 * Five stage cards joined by dashed, drifting arrows: Capture → Distill →
 * Evidence gate → Graph → Recall. The gate is the one card in accent — it
 * is the point of the whole page. The design's animated block-character
 * particles inside each card are a texture and are deliberately not
 * imported. Card styling lives in `index.css` under `.u-stage*`.
 *
 * The deeper schematic (`MemoryPipelineIllustration`) still lives on the
 * /memory page, which this section links to.
 *
 * @module MemorySection
 */
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SectionShell from '../components/SectionShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import SectionNumeral from '../components/SectionNumeral';
import CornerOrnament from '../components/CornerOrnament';
import { Reveal } from '../lib/reveal';

interface Stage {
  n: number;
  title: string;
  body: string;
  /** The evidence gate — rendered in accent with a GATE tag. */
  gate?: boolean;
}

const STAGES: Stage[] = [
  { n: 1, title: 'Capture', body: 'Email, Slack, calls, the hallway.' },
  { n: 2, title: 'Distill', body: 'Raw signal → observations. Originals destroyed.' },
  { n: 3, title: 'Evidence gate', body: 'No proof, no claim. Every entry timestamped.', gate: true },
  { n: 4, title: 'Graph', body: 'Structured claims, weighted contradictions.' },
  { n: 5, title: 'Recall', body: 'Answers with receipts. Auditable. Erasable.' },
];

/** Dashed connector with an arrowhead; the dash drifts toward the next stage. */
function StageArrow() {
  return (
    <svg className="u-stage-arrow" viewBox="0 0 40 24" aria-hidden="true">
      <line x1="0" y1="12" x2="32" y2="12" />
      <path d="M30 6 L38 12 L30 18" />
    </svg>
  );
}

export default function MemorySection() {
  return (
    <SectionShell fitMinScale={0.9}>
      <SectionNumeral n="02" />
      <CornerOrnament kind="c1" />
      <div className="max-w-[90rem]">
        <Reveal index={0}>
          <Kicker>02 / Memory with receipts</Kicker>
        </Reveal>
        <Reveal index={1} className="mt-5">
          <SectionHeading>Every memory, backed by evidence.</SectionHeading>
        </Reveal>
      </div>

      <Reveal index={2} className="u-stages mt-12">
        {STAGES.map((s, i) => (
          <Fragment key={s.n}>
            {i > 0 && <StageArrow />}
            <div className="u-stage" data-gate={s.gate ? '' : undefined}>
              {s.gate && (
                <span className="u-stage-tag" aria-hidden="true">
                  GATE
                </span>
              )}
              <div className="u-stage-n">Stage {s.n}</div>
              <h3 className="u-stage-title">{s.title}</h3>
              <p className="u-stage-body">{s.body}</p>
            </div>
          </Fragment>
        ))}
      </Reveal>

      <div className="mt-10 grid gap-8 min-[900px]:grid-cols-[1fr_auto] min-[900px]:items-end">
        <Reveal index={3} as="p" className="u-body u-body-teal" style={{ maxWidth: '46rem' }}>
          Nothing is believed without proof. Every claim links to timestamped evidence; contradictions
          are resolved by weight, not recency; queries traverse a structured graph, not a haystack.
          Models are plug-ins — the memory is the machine.
        </Reveal>
        <Reveal index={4} className="min-[900px]:mr-24">
          <Link
            to="/memory"
            className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent text-lg"
            data-cursor="link"
          >
            GO DEEPER →
          </Link>
        </Reveal>
      </div>
    </SectionShell>
  );
}
