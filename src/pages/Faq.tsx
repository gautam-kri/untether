import { useEffect } from 'react';
import PageShell from '../components/PageShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { Reveal } from '../lib/reveal';

const QA: [string, string][] = [
  [
    'Is it always recording?',
    'No. Capture is event-gated, and the hard-wired light shows exactly when the sensors are live. If the light is off, nothing is being captured.',
  ],
  [
    'What about the people around me?',
    'Bystanders are blurred and discarded by default. Recognition is opt-in and enrollment-only, and pause zones let you switch recording off in the places you choose.',
  ],
  [
    'Does it work away from home?',
    'Yes. Your phone acts as an encrypted relay to your Vault at home — a dumb pipe that never sees your data.',
  ],
  [
    'What does it cost?',
    'The founding bundle is ₹1,99,000, or Sanctum hosted is ₹4,999/mo. A ₹999 reservation holds your place and is fully refundable.',
  ],
  [
    'What happens if Untether shuts down?',
    "Your Vault keeps working. It's yours, built on open foundations, with no cloud dependency to switch off.",
  ],
  [
    'What is the battery life?',
    'Six to eight hours of mixed use, with a charging case to carry you through the rest of the day.',
  ],
  [
    'When can I get one?',
    'The first thousand units ship to reservation holders first, in order. Live timelines live on the build log.',
  ],
  [
    'Can I see what it believes about me?',
    'Every claim, with the evidence behind it — you have full access to the database that stores your memory.',
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

        <Reveal index={11} className="mt-12">
          <Button to="/reserve" variant="primary">
            RESERVE YOUR PLACE
          </Button>
        </Reveal>
      </div>
    </PageShell>
  );
}
