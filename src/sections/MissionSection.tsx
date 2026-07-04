import SectionShell from '../components/SectionShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import MemoryGraphIllustration from '../illustrations/MemoryGraphIllustration';
import { Reveal } from '../lib/reveal';

export default function MissionSection() {
  return (
    <SectionShell
      fitMinScale={0.95}
      bg={
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-[70%] max-w-[720px]"
          style={{ opacity: 0.35 }}
          aria-hidden="true"
        >
          <MemoryGraphIllustration decorative />
        </div>
      }
    >
      <div className="mx-auto max-w-[46rem] text-center">
        <Reveal index={0} className="flex justify-center">
          <Kicker>THE MISSION</Kicker>
        </Reveal>
        <Reveal index={1} className="mt-5">
          <SectionHeading>Intelligence should be owned, not rented.</SectionHeading>
        </Reveal>

        <Reveal index={2} as="p" className="u-body mx-auto mt-6 text-left">
          Every assistant you have ever used forgets you the moment the session ends — and remembers
          you forever on someone else's servers. We think that is exactly backwards.
        </Reveal>
        <Reveal index={3} as="p" className="u-body mx-auto mt-4 text-left">
          Untether exists to put long-term intelligence in private hands. Your assistant should run on
          hardware you own, learn from a life only you can see, and build a memory that compounds for
          decades — structured, auditable, and yours to inspect or erase.
        </Reveal>
        <Reveal index={4} as="p" className="u-body mx-auto mt-4 text-left">
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
    </SectionShell>
  );
}
