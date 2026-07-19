import SectionShell from '../components/SectionShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import Chip from '../components/Chip';
import { Reveal } from '../lib/reveal';
import { TIERS } from '../config';

export default function TiersSection() {
  return (
    <SectionShell>
      <Reveal index={0}>
        <Kicker>TIERS</Kicker>
      </Reveal>
      <Reveal index={1} className="mt-5">
        <SectionHeading>Choose how close to home it lives.</SectionHeading>
      </Reveal>

      <div className="mt-10 grid gap-6 min-[900px]:grid-cols-3">
        {TIERS.map((t, i) => (
          <Reveal key={t.name} index={2 + i} className="h-full">
            <article
              className="u-tile flex h-full flex-col"
              style={{
                padding: '32px',
                borderColor: t.badge === 'FLAGSHIP' ? 'var(--accent-red)' : undefined,
              }}
            >
              <Chip>{t.badge}</Chip>
              <h3 className="u-display u-tile-title mt-5">{t.name}</h3>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="u-display" style={{ fontSize: '1.5rem' }}>
                  {t.price}
                </span>
                {t.sub && <span className="u-annotation">{t.sub}</span>}
              </p>
              <p className="u-body u-body-teal mt-4">{t.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal index={5} as="p" className="u-annotation mt-8" style={{ lineHeight: 1.7 }}>
        Commodity hardware, our software. Yours to unplug.
      </Reveal>
    </SectionShell>
  );
}
