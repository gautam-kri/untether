import { Link } from 'react-router-dom';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import Footer from '../components/Footer';
import CircuitIllustration from '../illustrations/CircuitIllustration';
import ShutterEyeIllustration from '../illustrations/ShutterEyeIllustration';
import { Reveal } from '../lib/reveal';
import FitScale from '../components/FitScale';

export default function CtaSection() {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden"
      style={{ paddingTop: 'var(--nav-total)' }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <CircuitIllustration opacity={0.2} />
      </div>

      <FitScale className="relative min-h-0 flex-1" minScale={0.95}>
      <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
        <Reveal index={0} aria-hidden="true">
          <div className="w-[180px]" style={{ height: '120px' }}>
            <ShutterEyeIllustration />
          </div>
        </Reveal>
        <Reveal index={1} className="mt-6 flex justify-center">
          <Kicker>EARLY ACCESS</Kicker>
        </Reveal>
        <Reveal index={2} className="mt-5">
          <SectionHeading>The first thousand.</SectionHeading>
        </Reveal>
        <Reveal index={3} as="p" className="u-body mx-auto mt-6 max-w-[40rem]">
          We are building the first run of Untether hardware with a small circle of founding users —
          engineers, researchers, and the privacy-obsessed. Join the list and help decide what a
          privately owned mind should be.
        </Reveal>
        <Reveal index={4} className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <Button to="/contact" variant="primary">
            REQUEST AN INVITATION
          </Button>
          <Link
            to="/team"
            className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent"
            data-cursor="link"
          >
            MEET THE TEAM →
          </Link>
        </Reveal>
      </div>
      </FitScale>

      <Footer />
    </div>
  );
}
