/**
 * Landing page — full-viewport wipe-through experience.
 *
 * Assembles the five landing sections (Hero, Product, Memory, Tiers,
 * Mission) into a `WipeContainer` that presents them as full-screen
 * panels navigated by wheel, swipe, keyboard, or the `ProgressNav`
 * dot navigator on the right edge.
 *
 * This is the only page that uses the wipe container; all other routes
 * are standard scrolling pages wrapped in `PageShell`.
 *
 * @module Landing
 */
import WipeContainer from '../components/WipeContainer';
import ProgressNav from '../components/ProgressNav';
import HeroSection from '../sections/HeroSection';
import TwoWallsSection from '../sections/TwoWallsSection';
import MemorySection from '../sections/MemorySection';
import TiersSection from '../sections/TiersSection';
import MissionSection from '../sections/MissionSection';
import { SECTIONS } from '../lib/sections';
import TrustSection from '../sections/TrustSection';

const CONTENT = [
  <HeroSection key="hero" />,
  <TwoWallsSection key="two-walls" />,
  <MemorySection key="memory-receipts" />,
  <TrustSection key="trust" />,
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
