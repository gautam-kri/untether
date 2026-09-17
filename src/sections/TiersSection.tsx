/**
 * Landing section 04 — Tiers, per the saved design canvas.
 *
 * Three cards with a hatched header band, a tracked badge, the tier name in
 * the display face, then either a price with its call to action or a
 * status line, and the body. The flagship card carries the accent border,
 * an accent band and a FLAGSHIP tag. All copy and pricing come from
 * `TIERS` in `config.ts`; card styling lives in `styles/design-import.css`
 * under `.u-tier*`.
 *
 * @module TiersSection
 */
import SectionShell from '../components/SectionShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import SectionNumeral from '../components/SectionNumeral';
import CornerOrnament from '../components/CornerOrnament';
import { Reveal } from '../lib/reveal';
import { TIERS } from '../config';

export default function TiersSection() {
  return (
    <SectionShell>
      <SectionNumeral n="04" />
      <CornerOrnament kind="c2" />
      <Reveal index={0}>
        <Kicker>04 / Tiers</Kicker>
      </Reveal>
      <Reveal index={1} className="mt-5">
        <SectionHeading>Choose how close to home it lives.</SectionHeading>
      </Reveal>

      <div className="mt-12 grid gap-6 min-[900px]:grid-cols-3">
        {TIERS.map((t, i) => (
          <Reveal key={t.name} index={2 + i} className="h-full">
            <article className="u-tier" data-flagship={t.flagship ? '' : undefined}>
              {t.flagship && (
                <span className="u-tier-tag" aria-hidden="true">
                  Flagship
                </span>
              )}
              <div className="u-tier-band" aria-hidden="true" />
              <div className="u-tier-body">
                <span className="u-tier-badge">{t.badge}</span>
                <h3 className="u-tier-name">{t.name}</h3>
                {/* A purchasable tier shows amount + CTA; anything else is a status line. */}
                <p className="u-tier-price">
                  {t.sub ? (
                    <>
                      <span className="u-tier-amount">{t.price}</span>
                      <span className="u-tier-cta">{t.sub}</span>
                    </>
                  ) : (
                    <span className="u-tier-soon">{t.price}</span>
                  )}
                </p>
                <p className="u-tier-copy">{t.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal
        index={5}
        as="p"
        className="u-annotation mt-8 pb-16"
        style={{ lineHeight: 1.7, fontWeight: 400, fontSize: '1rem' }}
      >
        Ownership at every level.
      </Reveal>
    </SectionShell>
  );
}
