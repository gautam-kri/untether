import SectionShell from '../components/SectionShell';
import Kicker from '../components/Kicker';
import Button from '../components/Button';
import Logo from '../components/Logo';
import RisingLetters from '../components/RisingLetters';
import CircuitIllustration from '../illustrations/CircuitIllustration';
import HeroGlasses from '../components/HeroGlasses';
// import DemoVideo from '../components/DemoVideo'; // paired with the commented <DemoVideo /> below
import { Reveal } from '../lib/reveal';

export default function HeroSection() {
  return (
    <SectionShell
      fitMinScale={0.85}
      bg={
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <CircuitIllustration opacity={0.12} />
          <HeroGlasses />
          <div className="u-hero-scrim" />
        </div>
      }
    >
      <div className="relative">
        <div className="max-w-[46rem]">
          <div className="u-brand-lockup u-hero-brand">
            <Logo className="u-brand-logo" animate title="Untether" />
            <div
              className="u-display u-brand-text"
              role="text"
              aria-label="UNTETHER"
            >
              <RisingLetters text="UNTETHER" />
            </div>
          </div>

          <Reveal index={1} className="mt-8">
            <Kicker>PRIVATE · PROACTIVE · YOURS</Kicker>
          </Reveal>

          <Reveal index={2} as="h1" className="u-display u-section-heading mt-5">
            The AI that actually delivers
            <span style={{ color: 'var(--accent-red)' }}>.</span>
          </Reveal>

          <Reveal index={3} as="p" className="u-body mt-6">
            Untether is the second brain you wish you had, that hears and sees everything from your emails and
            your messages to the conversations you had in the hallway, actively guiding you every step of the way.
            It's built on a memory system that actually knows you,
            and runs purely on hardware you own, so it can be trusted with
            everything.
          </Reveal>

          <Reveal index={4} className="mt-8 mb-9 flex flex-wrap items-center gap-4">
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
      </div>

      {/* Scroll indicator — desktop only */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 max-[899px]:hidden"
        aria-hidden="true"
      >
        <span className="u-annotation">SCROLL</span>
        <span className="u-scroll-line" />
      </div>
    </SectionShell>
  );
}
