import { Link } from 'react-router-dom';
import SectionShell from '../components/SectionShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import MemoryPipelineIllustration from '../illustrations/MemoryPipelineIllustration';
import { Reveal } from '../lib/reveal';

export default function MemorySection() {
  return (
    <SectionShell>
      <div className="max-w-[46rem]">
        <Reveal index={0}>
          <Kicker>MEMORY WITH RECEIPTS</Kicker>
        </Reveal>
        <Reveal index={1} className="mt-5">
          <SectionHeading>Every memory, backed by evidence.</SectionHeading>
        </Reveal>
      </div>

      <Reveal index={2} className="mt-10 w-full overflow-x-auto">
        <div className="min-w-[720px]">
          <MemoryPipelineIllustration />
        </div>
      </Reveal>

      <div className="mt-10 grid gap-8 min-[900px]:grid-cols-[1fr_auto] min-[900px]:items-end">
        <Reveal index={3} as="p" className="u-body u-body-teal" style={{ maxWidth: '46rem' }}>
          Nothing is believed without proof. Every claim links to timestamped evidence; contradictions
          are resolved by weight, not recency; queries traverse a structured graph, not a haystack.
          Models are plug-ins — the memory is the machine.
        </Reveal>
        <Reveal index={4}>
          <Link
            to="/memory"
            className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent"
            data-cursor="link"
          >
            GO DEEPER →
          </Link>
        </Reveal>
      </div>
    </SectionShell>
  );
}
