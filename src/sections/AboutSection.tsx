import SectionShell from '../components/SectionShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import ServerIllustration from '../illustrations/ServerIllustration';
import { Reveal } from '../lib/reveal';

const TRIPTYCH = [
  {
    n: '01',
    title: 'PERCEIVE',
    body: 'Glasses capture sight and sound and hand them straight to your server. No onboard compute, no cloud detour.',
  },
  {
    n: '02',
    title: 'REMEMBER',
    body: 'Observations become claims, relationships, and life episodes — each one linked to the exact moments that back it.',
  },
  {
    n: '03',
    title: 'OWN',
    body: "The models, the memory, and the machine are yours. Inspect any belief. Erase any trace. Unplug any time. Privacy isn't a policy — it's physics.",
  },
];

export default function AboutSection() {
  return (
    <SectionShell>
      <div className="grid items-start gap-10 min-[900px]:grid-cols-[55%_45%]">
        <div>
          <Reveal index={0}>
            <Kicker>ABOUT</Kicker>
          </Reveal>
          <Reveal index={1} className="mt-5">
            <SectionHeading>The assistant that finally remembers.</SectionHeading>
          </Reveal>
          <Reveal index={2} as="p" className="u-body mt-6">
            Today's AI assistants are prompt-driven amnesiacs. The ones that finally remember your
            life do it on someone else's servers — and in 2025 those servers changed hands: the
            biggest independent memory companies were absorbed by the largest ad and commerce
            businesses on earth.
          </Reveal>
          <Reveal index={3} as="p" className="u-body mt-4">
            Untether is the other path: sensor-pure glasses that perceive your day, and a server in
            your home that turns raw observation into structured, evidence-backed memory. Everything
            is processed locally. Nothing is streamed, mined, or sold.
          </Reveal>
        </div>

        <Reveal index={2} className="order-first min-[900px]:order-none" aria-hidden="true">
          <div className="mx-auto w-full max-w-[420px]">
            <ServerIllustration />
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-px sm:grid-cols-3">
        {TRIPTYCH.map((t, i) => (
          <Reveal key={t.n} index={4 + i} className="pt-5" style={{ borderTop: '1px solid var(--hairline)' }}>
            <h3 className="u-display u-tile-title">
              <span style={{ color: 'var(--accent-red)' }}>{t.n}</span> {t.title}
            </h3>
            <p className="u-body u-body-teal mt-3" style={{ paddingRight: '16px' }}>
              {t.body}
            </p>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
