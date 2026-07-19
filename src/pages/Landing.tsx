import WipeContainer from '../components/WipeContainer';
import ProgressNav from '../components/ProgressNav';
import HeroSection from '../sections/HeroSection';
import TwoWallsSection from '../sections/TwoWallsSection';
import MemorySection from '../sections/MemorySection';
import TiersSection from '../sections/TiersSection';
import MissionSection from '../sections/MissionSection';
import { SECTIONS } from '../lib/sections';

const CONTENT = [
  <HeroSection key="hero" />,
  <TwoWallsSection key="two-walls" />,
  <MemorySection key="memory-receipts" />,
  <TiersSection key="tiers" />,
  <MissionSection key="mission" />,
];

export default function Landing() {
  const sections = SECTIONS.map((s, i) => ({ id: s.id, content: CONTENT[i] }));
  return (
    <>
      <WipeContainer sections={sections} />
      <ProgressNav />
    </>
  );
}
