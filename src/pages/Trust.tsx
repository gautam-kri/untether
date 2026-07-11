import { useEffect } from 'react';
import PageShell from '../components/PageShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { Reveal } from '../lib/reveal';
import { GITHUB_URL, THREAT_MODEL_PDF_URL } from '../config';

interface Section {
  n: string;
  title: string;
  body: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    n: '01',
    title: 'HARDWARE HONESTY',
    body: 'The capture light is wired to the sensor power rail, not to software. If the light is off, the sensors are off — this is not a setting. A physical shutter covers the camera. The mic switch cuts power, not code.',
  },
  {
    n: '02',
    title: 'BYSTANDERS',
    body: "People who haven't opted in are blurred and discarded by default. Face recognition is enrollment-only, embeddings live on your Vault, raw faces are never persisted. Pause zones let you geofence recording off.",
  },
  {
    n: '03',
    title: 'TRANSPORT & STORAGE',
    body: 'Device-keyed end-to-end encryption from glasses to Vault. Remote access is WireGuard-only with zero open inbound ports. Full-disk encryption at rest. We hold no keys — we cannot read, sell, or be compelled to produce your data, because we do not possess it.',
  },
  {
    n: '04',
    title: 'OPEN FOUNDATIONS',
    body: (
      <>
        The memory schema and clients are open source.{' '}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="text-accent underline underline-offset-4"
          data-cursor="link"
        >
          Read the code on GitHub
        </a>
        .
      </>
    ),
  },
  {
    n: '05',
    title: "WHAT WE CAN'T PROTECT YOU FROM",
    body: 'Physical theft of your Vault (mitigated by disk encryption), a fully compromised phone (the relay never holds plaintext), and the social responsibility of wearing a camera — which is why the light never lies.',
  },
];

export default function Trust() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-5xl px-6 py-20 md:px-10">
        <Reveal index={0}>
          <Kicker>TRUST</Kicker>
        </Reveal>
        <Reveal index={1} className="mt-5">
          <SectionHeading as="h1">Audit the machine that knows you.</SectionHeading>
        </Reveal>
        <Reveal index={2} as="p" className="u-body u-body-teal mt-6">
          Privacy you can't verify is just a promise. Here is exactly how Untether keeps your memory
          yours — in hardware, in transit, and at rest.
        </Reveal>

        <div className="mt-14 flex flex-col">
          {SECTIONS.map((s, i) => (
            <Reveal
              key={s.n}
              index={3 + i}
              className="grid gap-3 py-8 min-[700px]:grid-cols-[160px_1fr]"
              style={{ borderTop: '1px solid var(--hairline)' }}
            >
              <h2 className="u-display u-tile-title">
                <span style={{ color: 'var(--accent-red)' }}>{s.n}</span> {s.title}
              </h2>
              <p className="u-body u-body-teal" style={{ maxWidth: 'none' }}>
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal index={9} className="mt-12 flex flex-wrap items-center gap-6">
          <Button to="/reserve" variant="primary">
            RESERVE YOUR PLACE
          </Button>
          <a
            href={THREAT_MODEL_PDF_URL}
            target="_blank"
            rel="noreferrer"
            className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent"
            data-cursor="link"
          >
            READ THE FULL THREAT MODEL (PDF) →
          </a>
        </Reveal>
      </div>
    </PageShell>
  );
}
