import { useEffect } from 'react';
import PageShell from '../components/PageShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import PortraitPlaceholder from '../illustrations/PortraitPlaceholder';
import { Reveal } from '../lib/reveal';

const TEAM = [
  {
    name: 'GAUTAM KRISHNA',
    role: 'CO-FOUNDER',
    bio: "Gautam leads Untether's intelligence stack — the deterministic memory core, the reasoning pipeline, and the server architecture that keeps all of it at home.",
  },
  {
    name: 'HARISH SENTHILKUMAR',
    role: 'CO-FOUNDER',
    bio: 'Harish leads perception and product — the glasses, the sensor pipeline, and the experience of an assistant that already knows the context before you ask.',
  },
];

export default function Team() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
        <Reveal index={0}>
          <Kicker>TEAM</Kicker>
        </Reveal>
        <Reveal index={1} className="mt-5">
          <SectionHeading as="h1">Two people, one obsession.</SectionHeading>
        </Reveal>
        <Reveal index={2} as="p" className="u-body u-body-teal mt-6">
          Untether is built by a small team that believes the most personal technology ever made
          should also be the most private.
        </Reveal>

        <div className="mt-16 grid gap-12 min-[700px]:grid-cols-2">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} index={3 + i} className="flex flex-col items-start">
              <div style={{ width: '220px', height: '220px' }} className="text-body">
                <PortraitPlaceholder label={m.name} />
              </div>
              <h2 className="u-display u-tile-title mt-6">{m.name}</h2>
              <p
                className="u-annotation mt-2"
                style={{
                  letterSpacing: '0.35em',
                  color: 'var(--accent-red)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                {m.role}
              </p>
              <p className="u-body u-body-teal mt-4">{m.bio}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
