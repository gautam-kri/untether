import { useEffect } from 'react';
import PageShell from '../components/PageShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { Reveal } from '../lib/reveal';
import { GITHUB_URL, WHITEPAPER_PDF_URL } from '../config';

interface Section {
  n: string;
  title: string;
  body: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    n: '01',
    title: 'HARDWARE HONESTY',
    body: 'The capture light is wired to the sensor power rail, not to software: if the light is off, the sensors are off — not a setting. A physical shutter covers the camera, the mic switch cuts power rather than code, and a spoken kill phrase drops capture instantly.',
  },
  {
    n: '02',
    title: 'CONSENT BY DESIGN',
    body: 'Consent mode keeps Aperture to your own voice by default — the people around you are not transcribed unless they opt in. It ships ready for two-party-consent jurisdictions, so the device follows the stricter rule wherever you are.',
  },
  {
    n: '03',
    title: 'DISTILL, THEN DESTROY',
    body: 'Raw audio and video are turned into facts and then destroyed within seconds. No recording archive is ever created — there is no library of your day sitting on a disk to leak, subpoena, or regret. Only the structured memory remains.',
  },
  {
    n: '04',
    title: 'KEYS & ZERO KNOWLEDGE',
    body: 'Keys are generated and held in a hardware enclave you own. Remote access is WireGuard-only with zero open inbound ports, and everything is full-disk encrypted at rest. We hold no keys — we could not leak your memory if we were breached, because we cannot read it.',
  },
  {
    n: '05',
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
        . Open foundations mean your Vault keeps working even if we do not.
      </>
    ),
  },
  {
    n: '06',
    title: "WHAT WE CAN'T PROTECT YOU FROM",
    body: 'Physical theft of your Vault — mitigated by full-disk encryption. A fully compromised phone — the relay never holds plaintext, so it stays a dumb pipe. And the duty of wearing a microphone in the world: that is on you, which is why the light never lies.',
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
          <Kicker>SECURITY & THREAT MODEL</Kicker>
        </Reveal>
        <Reveal index={1} className="mt-5">
          <SectionHeading as="h1">Audit the machine that knows you.</SectionHeading>
        </Reveal>
        <Reveal index={2} as="p" className="u-body u-body-teal mt-6">
          Privacy you can't verify is just a promise. Here is exactly how Untether keeps your memory
          yours — in hardware, in consent, in transit, and at rest.
        </Reveal>

        <div className="mt-14 flex flex-col">
          {SECTIONS.map((s, i) => (
            <Reveal
              key={s.n}
              index={3 + i}
              className="grid gap-3 py-8 min-[700px]:grid-cols-[180px_1fr]"
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

        <Reveal index={10} className="mt-12 flex flex-wrap items-center gap-6">
          <Button to="/partners" variant="primary">
            BECOME A DESIGN PARTNER
          </Button>
          <a
            href={WHITEPAPER_PDF_URL}
            target="_blank"
            rel="noreferrer"
            className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent"
            data-cursor="link"
          >
            READ THE SECURITY WHITEPAPER (PDF) →
          </a>
        </Reveal>
      </div>
    </PageShell>
  );
}
