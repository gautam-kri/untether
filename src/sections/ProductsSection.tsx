import SectionShell from '../components/SectionShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import ProductTile from '../components/ProductTile';
import GlassesIllustration from '../illustrations/GlassesIllustration';
import ServerIllustration from '../illustrations/ServerIllustration';
import LockIllustration from '../illustrations/LockIllustration';
import { Reveal } from '../lib/reveal';

export default function ProductsSection() {
  return (
    <SectionShell>
      <Reveal index={0}>
        <Kicker>PRODUCTS</Kicker>
      </Reveal>
      <Reveal index={1} className="mt-5">
        <SectionHeading>Hardware for a private mind.</SectionHeading>
      </Reveal>

      <div className="mt-10 grid gap-6 min-[900px]:grid-cols-3">
        <Reveal index={2} className="h-full">
          <ProductTile
            illustration={<GlassesIllustration />}
            chip="PERCEPTION · PROTOTYPE"
            title="APERTURE"
          >
            Pure sensors, zero secrets. Camera, microphones, and motion flow over an encrypted link
            to your own server — no long-term onboard storage, only an encrypted transit buffer wiped
            on sync. A hard-wired capture light that physically cannot be bypassed, a physical
            shutter, and answers spoken or on the lens.
          </ProductTile>
        </Reveal>
        <Reveal index={3} className="h-full">
          <ProductTile
            illustration={<ServerIllustration />}
            chip="INTELLIGENCE · IN DEVELOPMENT"
            title="VAULT"
          >
            A machine built to remember. Local GPUs run perception, reasoning, and a deterministic
            memory core inside your home. Upgradable, repairable, and engineered to outlive product
            cycles.
          </ProductTile>
        </Reveal>
        <Reveal index={4} className="h-full">
          <ProductTile
            illustration={<LockIllustration />}
            chip="HOSTED · PLANNED"
            title="SANCTUM"
          >
            Every part of Vault, without the rack. A dedicated server hosted for you alone — your
            keys, hand-delivered updates, and lifetime high-touch support for those who want ownership
            without the hardware.
          </ProductTile>
        </Reveal>
      </div>
    </SectionShell>
  );
}
