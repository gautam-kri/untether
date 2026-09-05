/**
 * Landing section 02 — "One Tuesday".
 *
 * Eight moments from an ordinary day, rendered as a transcript, followed
 * by the argument the transcript exists to set up. The transcript is a
 * log, not a chat: a fixed timestamp gutter, a hairline between entries,
 * and a hanging indent that keeps every spoken line flush left. All of
 * its styling lives in `index.css` under `.u-transcript`.
 *
 * @module TwoWallsSection
 */
import { useRef } from 'react';
import type { CSSProperties } from 'react';
import SectionShell from '../components/SectionShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import { Reveal, useReveal } from '../lib/reveal';

/** `it` — Aperture speaking. `you` — the user. `stage` — a stage direction. */
type LineKind = 'it' | 'you' | 'stage';

interface Line {
  kind: LineKind;
  text: string;
}

interface Entry {
  /** Displayed, and used verbatim as the `<time datetime>` value. */
  time: string;
  lines: Line[];
}

/** Screen-reader-only speaker label; the visible mark is a CSS `::before`. */
const SPEAKER: Record<LineKind, string> = {
  it: 'Aperture:',
  you: 'You:',
  stage: 'Stage direction:',
};

const TRANSCRIPT: Entry[] = [
  {
    time: '06:40',
    lines: [
      {
        kind: 'it',
        text: '“Morning, sir. You’re up on time. You have about one hour and thirty minutes to leave the house. Want to hit the weights?”',
      },
    ],
  },
  {
    time: '07:55',
    lines: [
      {
        kind: 'it',
        text: '“The draft you printed last night is still on the desk, sir.”',
      },
    ],
  },
  {
    time: '09:10',
    lines: [
      {
        kind: 'it',
        text: '“Straight to work, I see. I’ll ask the intern to have your coffee ready. Frappé, or Americano today?”',
      },
    ],
  },
  {
    time: '10:20',
    lines: [
      {
        kind: 'it',
        text: '“The deck changed at 11:40 last night, sir. Three slides moved. Saravanan said you’ll be taking the Q3-midreview.”',
      },
    ],
  },
  {
    time: '13:00',
    lines: [
      {
        kind: 'it',
        text: '“You had cereal at seven, sir, so you owe yourself lunch with some protein. Shall I get your usual burrito bowl, or maybe a salad?”',
      },
      { kind: 'you', text: '“I\'m craving some Mutton biryani.”' },
      {
        kind: 'it',
        text: '“ha ha . . . Mutton biryani does pack protein. I\'ll order your regular from Meghana’s?”',
      },
    ],
  },
  {
    time: '15:30',
    lines: [
      { kind: 'stage', text: 'A man walks into your office. You have no idea.' },
      {
        kind: 'it',
        text: '“That’s Rohit, sir, the consultant. Bengaluru offsite, onboarded in March. He owes you a scope review by today EOD, and he’s probably about to ask you for two more weeks.”',
      },
    ],
  },

  {
    time: '19:20',
    lines: [
      {
        kind: 'it',
        text: '“You promised Kumar you’d come by tonight, sir. Your evening’s clear tonight. Shall I pick a shop and a bottle to pick up on your way?”',
      },
    ],
  },
  {
    time: '19:52',
    lines: [
      { kind: 'stage', text: 'The phone rings. It’s Kumar.' },
      { kind: 'you', text: '“So, are you coming over for dinner, or are you still buried in work?”' },
      { kind: 'you', text: '“I just picked up the wine. I\'ll be there in 10 minutes.”' },
    ],
  },
];

const BLOCKS = [
  {
    n: '01',
    title: 'It catches everything.',
    body: 'Said out loud, typed, promised in a corridor. If you committed to it, it’s captured — and it stops living in your head.',
  },
  {
    n: '02',
    title: 'It does what it can.',
    body: 'Reservations, service bookings, reschedules, follow-ups, the intro you keep meaning to make. Handled, then reported.',
  },
  {
    n: '03',
    title: 'It wakes you for nothing.',
    body: 'It decides what deserves your attention and when. Most of what it does for you, you’ll never hear about. That’s the point.',
  },
];

/**
 * The transcript itself.
 *
 * Legible at rest with no JavaScript: nothing is parked at `opacity: 0`.
 * `useReveal` only ever adds the one-time 8px stagger on top, and that is
 * suppressed under `prefers-reduced-motion: reduce`.
 */
function Transcript() {
  const ref = useRef<HTMLUListElement>(null);
  const revealed = useReveal(ref);

  return (
    <ul ref={ref} className="u-transcript" data-revealed={revealed ? 'true' : 'false'}>
      {TRANSCRIPT.map((entry, i) => (
        <li key={entry.time} className="u-transcript-entry" style={{ '--i': i } as CSSProperties}>
          <time className="u-transcript-time" dateTime={entry.time}>
            {entry.time}
          </time>
          <div>
            {entry.lines.map((line, j) => (
              <p key={j} className="u-transcript-line" data-kind={line.kind}>
                <span className="sr-only">{SPEAKER[line.kind]} </span>
                {line.text}
              </p>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function TwoWallsSection() {
  return (
    <SectionShell fitMinScale={0.9}>
      <div className="max-w-[90rem]">
        <Reveal index={0}>
          <Kicker>One Tuesday</Kicker>
        </Reveal>
        <Reveal index={1} className="mt-5">
          <SectionHeading>You’ve never had an assistant this good. Nobody has.</SectionHeading>
        </Reveal>
        <Reveal index={2} as="p" className="u-body u-body-teal mt-6">
          Eight moments from an ordinary day. You asked for none of them.
        </Reveal>

        <Reveal index={3} className="mt-10">
          <Transcript />
        </Reveal>

        <Reveal index={4} className="mt-12" style={{ borderTop: '1px solid var(--hairline)' }}>
          <p className="u-display u-pivot-line" style={{ paddingTop: '3rem' }}>
            That sentence is the entire product.
          </p>
        </Reveal>

        <Reveal index={5} as="p" className="u-body mt-12">
          Because here’s the day you’re living now. There’s a list running behind
          your eyes and it never stops — the deck, the reference call you owe, whether the car got
          serviced, the bottle for tonight, the thing you promised on Sunday and have half-remembered
          four times without doing. It follows you into dinner and into bed. None of it is hard,
          which is exactly what makes it expensive:{' '}
          <strong className="font-medium" style={{ color: 'var(--line-white)' }}>
            you are running the best mind in your company as a background process for errands.
          </strong>{' '}
          Aperture takes the list. Not a copy of it — the list. It books what can be booked, chases
          what needs chasing, comes back with{' '}
          <strong className="font-medium" style={{ color: 'var(--line-white)' }}>
            done
          </strong>{' '}
          instead of a question, and puts whatever’s left in front of you at the one moment you
          can act on it.
        </Reveal>
      </div>

      <div className="mt-12 grid gap-px sm:grid-cols-3">
        {BLOCKS.map((b, i) => (
          <Reveal
            key={b.n}
            index={6 + i}
            className="pt-5"
            style={{ borderTop: '1px solid var(--hairline)' }}
          >
            <h3 className="u-display u-tile-title">
              <span style={{ color: 'var(--accent-red)' }}>{b.n}</span> {b.title}
            </h3>
            <p className="u-body u-body-teal mt-3" style={{ paddingRight: '16px' }}>
              {b.body}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal
        index={9}
        as="p"
        className="u-body u-body-teal mt-10"
        style={{ fontSize: '0.9375rem', maxWidth: '72ch' }}
      >
        It never sends, never speaks for you, and never acts without your thumb. The judgment stays
        yours. Everything underneath it doesn’t have to be.
      </Reveal>
    </SectionShell>
  );
}
