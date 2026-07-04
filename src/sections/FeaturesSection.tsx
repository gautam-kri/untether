import SectionShell from '../components/SectionShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import FeatureTile from '../components/FeatureTile';
import type { GlyphName } from '../illustrations/FeatureGlyph';
import { Reveal } from '../lib/reveal';

const FEATURES: { glyph: GlyphName; title: string; body: string }[] = [
  {
    glyph: 'lock',
    title: 'LOCAL BY DEFAULT',
    body: "Sight and sound are processed entirely on hardware you own. Nothing streams to a cloud you can't see.",
  },
  {
    glyph: 'doc-check',
    title: 'MEMORY WITH RECEIPTS',
    body: 'Every belief links back to timestamped evidence. Nothing is invented, and nothing is promoted without proof.',
  },
  {
    glyph: 'radio',
    title: 'ANSWERS BEFORE YOU ASK',
    body: 'A living model of your life surfaces reminders, context, and insight in real time — unprompted.',
  },
  {
    glyph: 'swap',
    title: 'MODEL-AGNOSTIC CORE',
    body: 'Swap in better perception or reasoning models as they arrive without losing a day of memory.',
  },
  {
    glyph: 'wrench',
    title: 'BUILT TO OUTLIVE UPGRADES',
    body: 'Repairable, expandable hardware designed for decades of service, not a two-year trade-in loop.',
  },
  {
    glyph: 'grid',
    title: 'NOTHING HIDDEN',
    body: 'Open foundations and full access to every table your memory lives in. Audit the machine that knows you.',
  },
];

export default function FeaturesSection() {
  return (
    <SectionShell>
      <Reveal index={0}>
        <Kicker>DISTINCT FEATURES</Kicker>
      </Reveal>
      <Reveal index={1} className="mt-5">
        <SectionHeading>Built different, on purpose.</SectionHeading>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} index={2 + i} className="h-full">
            <FeatureTile glyph={f.glyph} title={f.title}>
              {f.body}
            </FeatureTile>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
