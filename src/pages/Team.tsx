import { useEffect, useRef, useState } from 'react';
import PageShell from '../components/PageShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import FoundersPhoto from '../components/FoundersPhoto';
import { useReducedMotion } from '../lib/hooks';
import { Reveal } from '../lib/reveal';
import { FOUNDER_LINKS } from '../config';

interface Member {
  id: string;
  name: string;
  role: string;
  short: string;
  long: string;
  github: string;
  linkedin: string;
}

const TEAM: Member[] = [
  {
    id: 'gautam',
    name: 'GAUTAM KRISHNA',
    role: 'CO-FOUNDER · GROWTH & OPERATIONS',
    short:
      'Gautam runs everything that is not the machine — strategy, operations, hiring, partnerships, and the design of the brand, the product experience, and this website.',
    long: 'Gautam runs everything at Untether that is not the machine itself: company strategy, operations, hiring, early partnerships, and go-to-market, along with the design of the brand, the product experience, and this website. He turns a deep-tech roadmap into a company people can join, buy from, and trust, and keeps the reservation program, the founding community, and the day-to-day execution moving. He is also, for reasons nobody has ever fully been able to explain, fond of geckos.',
    github: FOUNDER_LINKS.gautam.github,
    linkedin: FOUNDER_LINKS.gautam.linkedin,
  },
  {
    id: 'harish',
    name: 'HARISH SENTHILKUMAR',
    role: 'CO-FOUNDER · INTELLIGENCE & ARCHITECTURE',
    short:
      'Harish leads the intelligence stack — the deterministic memory core, the reasoning pipeline, and the server architecture that keeps all of it running inside your home.',
    long: "Harish leads Untether's intelligence stack — the deterministic memory core, the reasoning pipeline, the perception models, and the whole server architecture that keeps every claim, relationship, and life episode inside your home instead of on someone else's machine. He is happiest in the load-bearing, unglamorous layers: how a memory is stored so it can be proven later, how a model can be swapped for a better one without losing a decade of context, and how a mind can reason about your life while never once asking the cloud for permission. He built the first end-to-end version of the memory engine, and he is the reason the whole thing runs locally.",
    github: FOUNDER_LINKS.harish.github,
    linkedin: FOUNDER_LINKS.harish.linkedin,
  },
];

function Social({ m }: { m: Member }) {
  return (
    <div className="mt-4 flex gap-5">
      <a
        href={m.github}
        target="_blank"
        rel="noreferrer"
        className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent"
        data-cursor="link"
      >
        GITHUB ↗
      </a>
      <a
        href={m.linkedin}
        target="_blank"
        rel="noreferrer"
        className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent"
        data-cursor="link"
      >
        LINKEDIN ↗
      </a>
    </div>
  );
}

function Role({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="u-annotation mt-2"
      style={{ letterSpacing: '0.28em', color: 'var(--accent-red)', fontSize: '0.75rem', fontWeight: 700 }}
    >
      {children}
    </p>
  );
}

export default function Team() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelect = (id: string) => {
    setSelected(id);
    window.requestAnimationFrame(() =>
      detailRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }),
    );
  };

  const sel = TEAM.find((m) => m.id === selected) ?? null;

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-5xl px-6 py-20 md:px-10">
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
        <Reveal index={3} as="p" className="u-body mt-4">
          We designed the Untether memory system by hand and shipped it as students — free API tier,
          4GB laptop GPU.
        </Reveal>

        <Reveal index={4} className="mt-14">
          <FoundersPhoto onSelect={handleSelect} />
        </Reveal>

        <div
          ref={detailRef}
          className="mt-16"
          style={{ scrollMarginTop: 'calc(var(--nav-total) + 16px)' }}
        >
          {sel ? (
            <div className="max-w-4xl">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="u-annotation transition-colors duration-ui ease-mech hover:text-accent"
                data-cursor="link"
              >
                ← BOTH FOUNDERS
              </button>
              <h2 className="u-display u-tile-title mt-6">{sel.name}</h2>
              <Role>{sel.role}</Role>
              <p className="u-body u-body-teal mt-5" style={{ maxWidth: 'none' }}>
                {sel.long}
              </p>
              <Social m={sel} />
            </div>
          ) : (
            <div className="grid gap-px sm:grid-cols-2">
              {TEAM.map((m) => (
                <article
                  key={m.id}
                  className="flex flex-col items-start pt-6 sm:px-8 sm:first:pl-0"
                  style={{ borderTop: '1px solid var(--hairline)' }}
                >
                  <h2 className="u-display u-tile-title">{m.name}</h2>
                  <Role>{m.role}</Role>
                  <p className="u-body u-body-teal mt-4">{m.short}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <button
                      type="button"
                      onClick={() => handleSelect(m.id)}
                      className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent"
                      data-cursor="link"
                    >
                      READ FULL BIO →
                    </button>
                    <a
                      href={m.github}
                      target="_blank"
                      rel="noreferrer"
                      className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent"
                      data-cursor="link"
                    >
                      GITHUB ↗
                    </a>
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent"
                      data-cursor="link"
                    >
                      LINKEDIN ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
