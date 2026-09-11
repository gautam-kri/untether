/*
 * Trust & Security (Threat Model) page.
 *
 * A deep-dive into the privacy properties of the Untether system —
 * hardware switches, consent logic, local processing, and open foundations.
 * Built as a standard scrolling page (`PageShell`) with staggered reveal
 * animations for the policy blocks.
 */
import { useEffect } from 'react';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { Reveal } from '../lib/reveal';
import { GITHUB_URL } from '../config';
// WHITEPAPER_PDF_URL is paired with the commented whitepaper link below.
import SectionShell from '../components/SectionShell';

interface Section {
  n: string;
  title: string;
  body: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    n: '01',
    title: 'HARDWARE HONESTY',
    body: 'The hardware is yours. Pry open Aperture, or the Vault, and trace the wiring, check the firmware, and monitor the data. We designed every layer to be inspectable, and show the trail of data flow.',
  },
  {
    n: '02',
    title: 'DISTILL, THEN DESTROY',
    body: 'Raw audio and video are turned into observations, and then destroyed within seconds. No recording archive is ever created. There is no library of your day sitting on a disk to leak, steal, or regret. Only the structured memory remains.',
  },
  {
    n: '03',
    title: 'KEYS & ZERO KNOWLEDGE',
    body: 'Keys are generated and held in a hardware enclave you own. Remote access is WireGuard-only with zero open inbound ports, and everything is full-disk encrypted at rest. We hold no keys and we couldn\'t leak your memory if we tried.',
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
        . Open foundations mean your Vault keeps working even if we do not, and you can see how the system works.
      </>
    ),
  },
];

export default function TrustSection() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SectionShell fitMinScale={0.9}>
      <div className="max-w-[90rem]">
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

        <div className="mt-12 mx-auto max-w-[35rem]">
          <img
            src="/images/aperture.webp"
            alt="Untether Aperture — sensor-pure glasses"
            className="u-media-blend"
          />
          <p className="u-annotation mt-3 text-center text-sm">APERTURE · THE CAMERA THAT NEVER RECORDS</p>
        </div>

        <div className="mt-14 flex flex-col">
          {SECTIONS.map((s, i) => (
            <Reveal
              key={s.n}
              index={3 + i}
              className="grid gap-3 py-8 min-[700px]:grid-cols-[11.25rem_1fr]"
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

        <Reveal index={10} className="my-6 flex flex-wrap items-center gap-6">
          <Button to="/partners" variant="primary">
            BECOME A DESIGN PARTNER
          </Button>
          {/*<a
            href={WHITEPAPER_PDF_URL}
            target="_blank"
            rel="noreferrer"
            className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent"
            data-cursor="link"
          >
            READ THE SECURITY WHITEPAPER (PDF) →
          </a>*/}
        </Reveal>
      </div>
    </SectionShell>
  );
}
