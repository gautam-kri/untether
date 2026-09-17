/**
 * Landing hero — brand direction 3e, per the saved design canvas.
 *
 * A centred stack over a centred product shot: the glasses sit behind the
 * headline at 0.45 and blend `lighten` into the page, with a vertical scrim
 * that is clear through the headline band and ramps to solid below. The
 * headline sits inside a four-corner accent frame and carries the design
 * kit's "Spider-Verse" glitch — chromatic split, slice skews and halftone
 * pops for ~1.4s in every 6s, first burst held 2s; off under reduced motion. The
 * eyebrow carries an accent rule on both sides. There is no wordmark here —
 * the brand lives in the navbar alone, so the headline opens the page.
 *
 * Background treatment lives in `index.css` under `.u-hero-glasses-box` /
 * `.u-hero-scrim`; the frame and glitch in `styles/design-import.css`
 * under `.u-frame` / `.u-glitch`.
 *
 * @module HeroSection
 */
import SectionShell from '../components/SectionShell';
import Kicker from '../components/Kicker';
import Button from '../components/Button';
import HeroGlasses from '../components/HeroGlasses';
import HeroTexture from '../components/HeroTexture';
// import DemoVideo from '../components/DemoVideo'; // paired with the commented <DemoVideo /> below
import { Reveal } from '../lib/reveal';

const HEADLINE = 'The AI that actually delivers';

export default function HeroSection() {
  return (
    <SectionShell
      fitMinScale={0.85}
      center
      bg={
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {/* T6 sits under everything; the glasses and scrim stack above it. */}
          <HeroTexture />
          <HeroGlasses />
          <div className="u-hero-scrim" />
        </div>
      }
    >
      <div className="relative mx-auto flex max-w-[64rem] flex-col items-center">
        <Reveal index={1} className="flex w-full justify-center">
          <Kicker flank>PRIVATE · PROACTIVE · YOURS</Kicker>
        </Reveal>

        {/* 20ch lets Anton break after "The AI that" on its own, rather than
            hard-coding a <br> that would strand a word on narrow screens. It
            MUST sit on the h1, not the wrapper: `ch` resolves against the
            element's own font, and the wrapper is body-face at 1rem.
            The wrapper shrink-wraps the h1 so the two absolute overlays —
            the red/teal split copies the glitch reveals in clipped slices —
            get exactly the h1's box and wrap on the same words. Decorative,
            hidden from AT. */}
        <Reveal index={2} className="u-frame mt-5 max-w-full">
          <span className="u-corner" data-pos="tl" aria-hidden="true" />
          <span className="u-corner" data-pos="tr" aria-hidden="true" />
          <span className="u-corner" data-pos="bl" aria-hidden="true" />
          <span className="u-corner" data-pos="br" aria-hidden="true" />
          <div className="u-glitch">
            <h1 className="u-display u-hero-heading u-glitch-base">
              {HEADLINE}
              <span style={{ color: 'var(--accent-red)' }}>.</span>
            </h1>
            <div className="u-display u-hero-heading u-glitch-r" aria-hidden="true">
              {HEADLINE}.
            </div>
            <div className="u-display u-hero-heading u-glitch-t" aria-hidden="true">
              {HEADLINE}.
            </div>
            {/* Halftone / hatch patches: text-shaped copies whose pattern is clipped to
                the glyphs, so they only ever appear INSIDE the letters (kit V2) */}
            <div className="u-display u-hero-heading u-glitch-pop" data-p="1" aria-hidden="true">
              {HEADLINE}.
            </div>
            <div className="u-display u-hero-heading u-glitch-pop" data-p="2" aria-hidden="true">
              {HEADLINE}.
            </div>
            <div className="u-display u-hero-heading u-glitch-pop" data-p="3" aria-hidden="true">
              {HEADLINE}.
            </div>
            <div className="u-display u-hero-heading u-glitch-pop" data-p="4" aria-hidden="true">
              {HEADLINE}.
            </div>
            <div className="u-display u-hero-heading u-glitch-pop" data-p="5" aria-hidden="true">
              {HEADLINE}.
            </div>
          </div>
        </Reveal>

        <Reveal
          index={3}
          as="p"
          className="u-body u-body-teal mx-auto mt-6"
          style={{ maxWidth: '68ch' }}
        >
          Untether is the second brain you wish you had, that hears and sees everything from your
          emails and your messages to the conversations you had in the hallway, actively guiding you
          every step of the way. It's built on a memory system that actually knows you, and runs
          purely on hardware you own, so it can be trusted with everything.
        </Reveal>

        <Reveal index={4} className="mt-8 mb-9 flex flex-wrap items-center justify-center gap-4">
          <Button to="/partners" variant="primary">
            Join the Waitlist
          </Button>
          <Button to="/memory" variant="secondary">
            Get in Touch
          </Button>
        </Reveal>

        {/*<Reveal index={6} className="mt-7">
          <DemoVideo />
        </Reveal>*/}
      </div>

      {/* Scroll indicator — desktop only */}
      <div
        className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 max-[899px]:hidden"
        aria-hidden="true"
      >
        <span className="u-annotation">SCROLL</span>
        <span className="u-scroll-line" />
      </div>
    </SectionShell>
  );
}
