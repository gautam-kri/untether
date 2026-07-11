import SectionShell from '../components/SectionShell';
import Kicker from '../components/Kicker';
import Button from '../components/Button';
import Logo from '../components/Logo';
import RisingLetters from '../components/RisingLetters';
import CircuitIllustration from '../illustrations/CircuitIllustration';
import GlassesIllustration from '../illustrations/GlassesIllustration';
import DemoVideo from '../components/DemoVideo';
import { Reveal } from '../lib/reveal';
import { landingNav } from '../lib/landingNav';

export default function HeroSection() {
  return (
    <SectionShell
      bg={
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <CircuitIllustration opacity={0.25} />
        </div>
      }
    >
      <div className="grid items-center gap-10 lg:grid-cols-[55%_45%]">
        <div className="max-w-[40rem]">
          <div className="u-hero-lockup flex items-center">
            <Logo className="u-hero-logo" animate title="Untether" />
            <div
              className="u-display u-hero-wordmark"
              style={{ lineHeight: 1 }}
              role="text"
              aria-label="UNTETHER"
            >
              <RisingLetters text="UNTETHER" />
            </div>
          </div>

          <Reveal index={1} className="mt-8">
            <Kicker>PRIVATE · LOCAL · PERMANENT</Kicker>
          </Reveal>

          <Reveal index={2} as="h1" className="u-display u-section-heading mt-5">
            Own your intelligence
            <span style={{ color: 'var(--accent-red)' }}>.</span>
          </Reveal>

          <Reveal index={3} as="p" className="u-body mt-6">
            A pair of glasses that see what you see. A server you own that remembers it. Untether
            turns your days into structured, private, permanent memory — and never asks the cloud for
            permission.
          </Reveal>

          <Reveal index={4} className="mt-8 flex flex-wrap items-center gap-4">
            <Button to="/reserve" variant="primary">
              RESERVE YOUR PLACE
            </Button>
            <Button variant="secondary" onClick={() => landingNav.goTo(2)}>
              EXPLORE THE HARDWARE
            </Button>
          </Reveal>
          <Reveal index={5} as="p" className="u-annotation mt-3">
            ₹999 · FULLY REFUNDABLE
          </Reveal>

          <Reveal index={6} className="mt-7">
            <DemoVideo />
          </Reveal>
        </div>

        <div className="hidden lg:block" aria-hidden="true">
          <div className="u-hero-float mx-auto w-full max-w-[520px]">
            <GlassesIllustration />
          </div>
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
