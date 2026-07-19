import { useEffect } from 'react';
import PageShell from '../components/PageShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { Reveal } from '../lib/reveal';

const QA: [string, string][] = [
  [
    'Is it always recording?',
    'No. Capture is event-gated, and the hard-wired light shows exactly when the sensors are live. Raw audio and video are distilled into facts and destroyed within seconds — no recording archive is ever kept.',
  ],
  [
    "How is this different from ChatGPT's memory?",
    "Theirs is a context window on their servers — it blurs as it fills and lives on someone else's machine. Ours is an evidence-gated graph on your hardware: it gets sharper with history, and every memory shows its receipts.",
  ],
  [
    'What about the people around me?',
    'Consent mode keeps Aperture to your own voice by default, the people near you are not transcribed unless they opt in, and a spoken kill phrase drops capture instantly.',
  ],
  [
    'Can you read my data?',
    'No. Your keys live in an enclave you own — we hold none. We cannot read your memory for support, we cannot sell it, and we cannot be compelled to produce it, because we do not possess it.',
  ],
  [
    'Does it work away from the box?',
    'Yes. Your phone acts as an encrypted relay to your home node or Vault — a dumb pipe that never holds plaintext.',
  ],
  [
    'What does it cost?',
    'Untether Cloud is $300/mo, Bridge is $400/mo with a home node, and Vault is a $3–5K appliance plus $500/mo. Commodity hardware, our software.',
  ],
  [
    'What happens if Untether shuts down?',
    "Your Vault keeps working. It's built on open foundations with no cloud dependency to switch off — the memory is yours to keep running.",
  ],
  [
    'Is it autonomous?',
    'It drafts, schedules, and chases things down — but every outbound action is a one-tap approval. It never sends on your behalf without you.',
  ],
  [
    'Does it have a name?',
    "No — you name yours. It's your chief of staff, not our mascot.",
  ],
];

export default function Faq() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-4xl px-6 py-20 md:px-10">
        <Reveal index={0}>
          <Kicker>FAQ</Kicker>
        </Reveal>
        <Reveal index={1} className="mt-5">
          <SectionHeading as="h1">Questions, answered.</SectionHeading>
        </Reveal>

        <div className="mt-14 flex flex-col">
          {QA.map(([q, a], i) => (
            <Reveal
              key={q}
              index={2 + i}
              className="py-7"
              style={{ borderTop: '1px solid var(--hairline)' }}
            >
              <h2 className="u-display u-tile-title">{q}</h2>
              <p className="u-body u-body-teal mt-3" style={{ maxWidth: 'none' }}>
                {a}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal index={12} className="mt-12">
          <Button to="/partners" variant="primary">
            BECOME A DESIGN PARTNER
          </Button>
        </Reveal>
      </div>
    </PageShell>
  );
}
