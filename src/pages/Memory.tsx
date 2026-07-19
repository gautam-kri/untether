import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import DemoVideo from '../components/DemoVideo';
import MemoryPipelineIllustration from '../illustrations/MemoryPipelineIllustration';
import { Reveal } from '../lib/reveal';

const FAILS: [string, string][] = [
  ['DECAY WITH SCALE', 'Context windows blur as they fill. The longer your history, the more the model forgets — recall gets worse exactly where it should get better.'],
  ['SIMILARITY GUESSWORK', 'Retrieval fetches whatever looks nearest in vector space. "Close" is not "correct," and the wrong-but-similar chunk wins constantly.'],
  ['CONFABULATION', 'Asked to recall, a language model will happily invent a memory that was never said, stated with total confidence.'],
  ['NO PROVENANCE', 'A generated answer has no receipts. You cannot see why it believes something, or trust it enough to act.'],
];

const CHANGES: [string, string][] = [
  ['RECALL THAT DOESN’T DECAY', 'Memory is stored as structured claims in a graph, not tokens in a window. History makes it sharper, not blurrier.'],
  ['ZERO HALLUCINATED MEMORIES', 'A claim only exists if evidence exists. Nothing is promoted to memory without proof behind it.'],
  ['AUDITABLE & ERASABLE', 'Every claim links to its evidence. Delete the evidence and dependent claims cascade out — a true right to be forgotten.'],
  ['MODEL-AGNOSTIC', 'Models are plug-ins. Swap in better perception or reasoning as it arrives without losing a day of memory.'],
];

const STATS: [string, string][] = [
  ['96', 'RAW CHUNKS INGESTED'],
  ['29', 'EVIDENCE-GATED CLAIMS'],
  ['230', 'LINKED RECEIPTS'],
  ['0', 'MANUAL TAGS'],
];

export default function Memory() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:px-10">
        <Reveal index={0}>
          <Kicker>THE CORE</Kicker>
        </Reveal>
        <Reveal index={1} className="mt-5">
          <SectionHeading as="h1">Memory with receipts.</SectionHeading>
        </Reveal>
        <Reveal index={2} as="p" className="u-body u-body-teal mt-6 max-w-[46rem]">
          The models are interchangeable. The memory is the machine. Here is how raw input becomes a
          living profile of your life that you can prove, audit, and erase.
        </Reveal>

        {/* 1 — Schematic */}
        <Reveal index={3} className="mt-14 w-full overflow-x-auto">
          <div className="min-w-[760px]">
            <MemoryPipelineIllustration />
          </div>
        </Reveal>

        {/* 2 — Why windows and RAG fail */}
        <Section n="01" title="Why windows and RAG fail">
          <Grid items={FAILS} />
        </Section>

        {/* 3 — What evidence-gating changes */}
        <Section n="02" title="What evidence-gating changes">
          <Grid items={CHANGES} accent />
        </Section>

        {/* 4 — Proven on ₹0 */}
        <Section n="03" title="Proven on ₹0">
          <p className="u-body u-body-teal max-w-[46rem]">
            The first end-to-end memory engine was built and run by two students on a free API tier
            and a 4GB laptop GPU — no manual tagging, no annotation team.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-px sm:grid-cols-4">
            {STATS.map(([v, l]) => (
              <div
                key={l}
                className="pt-5"
                style={{ borderTop: '1px solid var(--hairline)' }}
              >
                <p className="u-display" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
                  {v}
                </p>
                <p className="u-annotation mt-2">{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-[420px]">
            <DemoVideo />
          </div>
        </Section>

        {/* 5 — Patent-pending + trust */}
        <div className="mt-16 border-t border-hairline pt-8">
          <p className="u-annotation" style={{ lineHeight: 1.7 }}>
            The evidence-gating architecture is patent-pending.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <Button to="/partners" variant="primary">
              BECOME A DESIGN PARTNER
            </Button>
            <Link
              to="/trust"
              className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent"
              data-cursor="link"
            >
              READ THE THREAT MODEL →
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-16">
      <h2 className="u-display u-section-heading">
        <span style={{ color: 'var(--accent-red)' }}>{n}</span>&nbsp;&nbsp;{title}
      </h2>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Grid({ items, accent }: { items: [string, string][]; accent?: boolean }) {
  return (
    <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
      {items.map(([title, body]) => (
        <div key={title} className="pt-5" style={{ borderTop: '1px solid var(--hairline)' }}>
          <p
            className="u-annotation"
            style={{ fontWeight: 700, color: accent ? 'var(--accent-red)' : undefined }}
          >
            {title}
          </p>
          <p className="u-body u-body-teal mt-2" style={{ maxWidth: 'none' }}>
            {body}
          </p>
        </div>
      ))}
    </div>
  );
}
