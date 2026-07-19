import SectionShell from '../components/SectionShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import { Reveal } from '../lib/reveal';

const BLOCKS = [
  {
    n: '01',
    title: 'HEARS',
    body: 'Every channel you live in — email, Slack, calendar, calls — and with Aperture, the physical world: the hallway aside, the whiteboard, the handshake commitment.',
  },
  {
    n: '02',
    title: 'REMEMBERS',
    body: 'Evidence-gated memory that gets sharper with history instead of blurrier. Nothing is believed without proof, and nothing is invented.',
  },
  {
    n: '03',
    title: 'NEVER ACTS ALONE',
    body: 'It drafts, schedules, and chases — but every outbound send is a one-tap approval. The judgment stays yours.',
  },
];

export default function TwoWallsSection() {
  return (
    <SectionShell>
      <div className="max-w-[46rem]">
        <Reveal index={0}>
          <Kicker>THE TWO WALLS</Kicker>
        </Reveal>
        <Reveal index={1} className="mt-5">
          <SectionHeading>Why your AI still forgets you.</SectionHeading>
        </Reveal>
        <Reveal index={2} as="p" className="u-body mt-6">
          Context windows blur and forget. Retrieval guesses by similarity and invents "memories"
          that were never said. And the more valuable your context — a fundraise, an acquisition —
          the less you're allowed to hand to someone's cloud anyway. Recall degrades exactly as your
          history, and your value, grows.
        </Reveal>
      </div>

      <div className="mt-12 grid gap-px sm:grid-cols-3">
        {BLOCKS.map((b, i) => (
          <Reveal
            key={b.n}
            index={3 + i}
            className="pt-5"
            style={{ borderTop: '1px solid var(--hairline)' }}
          >
            <h3 className="u-display u-tile-title">
              <span style={{ color: 'var(--accent-red)' }}>{b.n}</span> {b.title}
            </h3>
            <p className="u-body u-body-teal mt-3" style={{ paddingRight: '16px' }}>
              {b.body}
            </p>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
