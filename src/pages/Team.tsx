import { useEffect, useRef, useState } from 'react';
import PageShell from '../components/PageShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import FoundersPhoto from '../components/FoundersPhoto';
import { useReducedMotion } from '../lib/hooks';
import { Reveal } from '../lib/reveal';

interface Member {
  id: string;
  name: string;
  role: string;
  short: string;
  long: string;
}

const TEAM: Member[] = [
  {
    id: 'gautam',
    name: 'GAUTAM KRISHNA',
    role: 'CO-FOUNDER',
    short:
      "Gautam leads Untether's intelligence stack — the deterministic memory core, the reasoning pipeline, and the server architecture that keeps all of it at home.",
    long: "Gautam leads Untether's intelligence stack — the deterministic memory core, the reasoning pipeline, and the whole server architecture that keeps every claim, relationship, and life episode inside your home instead of on someone else's machine. He is happiest in the load-bearing, unglamorous layers: how a memory is stored so it can be proven later, how a model can be swapped for a better one without losing a decade of context, and how a mind can reason about your life while never once asking the cloud for permission. He started Untether because he became convinced that keeping long-term intelligence in rented hands is a mistake we will all regret. Outside of that — and for reasons nobody has ever fully been able to explain — he likes geckos.",
  },
  {
    id: 'harish',
    name: 'HARISH SENTHILKUMAR',
    role: 'CO-FOUNDER',
    short:
      'Harish leads perception and product — the glasses, the sensor pipeline, and the experience of an assistant that already knows the context before you ask.',
    long: "Harish leads perception and product — the glasses, the sensor pipeline, and the feeling of an assistant that already understands the context before you have finished asking. He obsesses over the details you are not supposed to notice: how a frame sits on your face, how sound is captured without a trace of noise, how an answer arrives on the lens at the exact moment it is useful and never a second too early. He believes the most personal technology ever built should quietly disappear into everyday life. He is also, it must be said, quite short — which is precisely why, in the photo above, he has stationed himself crouched down in front, so that nobody can work out just how much shorter he really is than Gautam. How insecure.",
  },
];

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

        <Reveal index={3} className="mt-14">
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
              <p
                className="u-annotation mt-2"
                style={{
                  letterSpacing: '0.35em',
                  color: 'var(--accent-red)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                {sel.role}
              </p>
              <p className="u-body u-body-teal mt-5" style={{ maxWidth: 'none' }}>
                {sel.long}
              </p>
            </div>
          ) : (
            <div className="grid gap-px sm:grid-cols-2">
              {TEAM.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleSelect(m.id)}
                  className="flex flex-col items-start pt-6 text-left sm:px-8 sm:first:pl-0"
                  style={{ borderTop: '1px solid var(--hairline)' }}
                  data-cursor="link"
                >
                  <h2 className="u-display u-tile-title">{m.name}</h2>
                  <span
                    className="u-annotation mt-2"
                    style={{
                      letterSpacing: '0.35em',
                      color: 'var(--accent-red)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {m.role}
                  </span>
                  <span className="u-body u-body-teal mt-4">{m.short}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
