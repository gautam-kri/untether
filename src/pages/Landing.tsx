import WipeContainer from '../components/WipeContainer';
import ProgressNav from '../components/ProgressNav';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ProductsSection from '../sections/ProductsSection';
import FeaturesSection from '../sections/FeaturesSection';
import MissionSection from '../sections/MissionSection';
import CtaSection from '../sections/CtaSection';
import { SECTIONS } from '../lib/sections';

const CONTENT = [
  <HeroSection key="hero" />,
  <AboutSection key="about" />,
  <ProductsSection key="products" />,
  <FeaturesSection key="features" />,
  <MissionSection key="mission" />,
  <CtaSection key="contact-cta" />,
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
