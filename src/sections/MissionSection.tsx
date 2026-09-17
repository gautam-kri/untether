import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import Footer from '../components/Footer';
import FitScale from '../components/FitScale';
import ReticleIllustration from '../illustrations/ReticleIllustration';
import { Reveal } from '../lib/reveal';

export default function MissionSection() {
  return (
    <div
      // Matches SectionShell's nav clearance (24px) on phones; the extra room
      // above the centred column is a desktop-only affordance.
      className="relative flex h-full w-full flex-col overflow-hidden pt-[calc(var(--nav-total)_+_1.5rem)] sm:pt-[calc(var(--nav-total)_+_3.5rem)]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <ReticleIllustration />
      </div>

      {/* The footer lives INSIDE the fit/scroll box: on phones the content
          scrolls and the footer follows it to the bottom of the page; on
          desktop `fill` stretches the column so `mt-auto` pins it to the
          bottom of the panel. */}
      <FitScale className="relative min-h-0 flex-1" minScale={0.8} fill>
        <div className="flex min-h-full flex-col">
          <div className="mx-auto w-full max-w-[46rem] px-6 pb-12 text-center md:px-10">
          <Reveal index={0} className="flex justify-center">
            <Kicker flank>05 / The Mission</Kicker>
          </Reveal>
          <Reveal index={1} className="mt-5">
            <SectionHeading>Intelligence should be owned, not rented.</SectionHeading>
          </Reveal>

          <Reveal index={2} as="p" className="u-body u-body-teal mx-auto mt-6 text-left">
            Every assistant you have ever used forgets you the moment the session ends — and remembers
            you forever on someone else's servers. We think that is exactly backwards.
          </Reveal>
          <Reveal index={3} as="p" className="u-body u-body-teal mx-auto mt-4 text-left">
            Untether exists to put long-term intelligence in private hands. Your chief of staff should
            run on hardware you own, learn from a life only you can see, and build a memory that
            compounds for decades — structured, auditable, and yours to inspect or erase.
          </Reveal>
          <Reveal index={4} as="p" className="u-body u-body-teal mx-auto mt-4 text-left">
            Local-first is not a feature. It is the foundation. When the machine that knows you best
            sits inside your home, privacy stops being a policy and becomes a property of physics.
          </Reveal>

          <Reveal
            index={5}
            as="p"
            className="u-display u-tile-title mt-10"
            style={{ color: 'var(--accent-red)', letterSpacing: '0.12em' }}
          >
            OWN THE MACHINE. OWN THE MEMORY. OWN YOUR INTELLIGENCE.
          </Reveal>
          </div>
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      </FitScale>
    </div>
  );
}
