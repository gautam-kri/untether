import { useEffect, useState } from 'react';
import PageShell from '../components/PageShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { Reveal } from '../lib/reveal';
import { RESERVED_COUNT, TOTAL_PLACES, RESERVE_PRICE } from '../config';

type Field = 'name' | 'email' | 'city' | 'profession';

const PROFESSIONS = ['engineer', 'founder', 'doctor', 'lawyer', 'researcher', 'other'];

const BENEFITS = [
  ['FOUNDING PRICE LOCK', 'Your reservation locks the founding bundle price, whatever it becomes.'],
  ['BUILD-LOG ACCESS', 'A private feed of hardware, firmware, and memory-engine progress as it ships.'],
  ['PRIORITY DELIVERY', 'The first thousand units go to reservation holders, in order, before anyone else.'],
  ['REFUNDABLE ANYTIME', 'One click returns your ₹999 in full — no questions, no forms, no waiting.'],
];

export default function Reserve() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [values, setValues] = useState<Record<Field, string>>({
    name: '',
    email: '',
    city: '',
    profession: '',
  });
  const [errors, setErrors] = useState<Record<Field, boolean>>({
    name: false,
    email: false,
    city: false,
    profession: false,
  });
  const [sent, setSent] = useState(false);

  const set = (field: Field, v: string) => {
    setValues((s) => ({ ...s, [field]: v }));
    if (errors[field] && v.trim()) setErrors((s) => ({ ...s, [field]: false }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<Field, boolean> = {
      name: !values.name.trim(),
      email: !values.email.trim(),
      city: !values.city.trim(),
      profession: !values.profession.trim(),
    };
    setErrors(next);
    if (Object.values(next).every((v) => !v)) {
      // TODO: integrate Razorpay ₹999 checkout. For now, capture the lead and
      // email a payment link manually.
      setSent(true);
    }
  };

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
        <Reveal index={0}>
          <Kicker>THE FIRST THOUSAND</Kicker>
        </Reveal>
        <Reveal index={1} className="mt-5">
          <SectionHeading as="h1">Reserve your place.</SectionHeading>
        </Reveal>

        {/* Counter */}
        <Reveal index={2} className="mt-8 max-w-[40rem]">
          <p className="u-annotation">
            {RESERVED_COUNT} OF {TOTAL_PLACES.toLocaleString('en-IN')} PLACES RESERVED
          </p>
          <div
            className="mt-3 h-px w-full"
            style={{ background: 'var(--hairline)' }}
            aria-hidden="true"
          >
            <div
              style={{
                height: '2px',
                marginTop: '-1px',
                width: `${Math.max(0, Math.min(100, (RESERVED_COUNT / TOTAL_PLACES) * 100))}%`,
                background: 'var(--accent-red)',
              }}
            />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 min-[900px]:grid-cols-[55%_45%]">
          {/* Form / confirmation */}
          <div>
            {sent ? (
              <div className="flex flex-col items-start">
                <h2 className="u-display u-tile-title">You're on the list.</h2>
                <p className="u-body u-body-teal mt-4">
                  Reservation request received. We'll email you a secure {RESERVE_PRICE} payment link
                  within a few hours — it's fully refundable with one click, any time.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="mb-8">
                  <label htmlFor="name" className="u-annotation mb-2 block">
                    NAME
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={values.name}
                    onChange={(e) => set('name', e.target.value)}
                    className={`u-field ${errors.name ? 'is-invalid' : ''}`}
                    aria-invalid={errors.name}
                  />
                  {errors.name && <Required />}
                </div>
                <div className="mb-8">
                  <label htmlFor="email" className="u-annotation mb-2 block">
                    EMAIL
                  </label>
                  <input
                    id="email"
                    type="text"
                    value={values.email}
                    onChange={(e) => set('email', e.target.value)}
                    className={`u-field ${errors.email ? 'is-invalid' : ''}`}
                    aria-invalid={errors.email}
                  />
                  {errors.email && <Required />}
                </div>
                <div className="mb-8">
                  <label htmlFor="city" className="u-annotation mb-2 block">
                    CITY
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={values.city}
                    onChange={(e) => set('city', e.target.value)}
                    className={`u-field ${errors.city ? 'is-invalid' : ''}`}
                    aria-invalid={errors.city}
                  />
                  {errors.city && <Required />}
                </div>
                <div className="mb-8">
                  <label htmlFor="profession" className="u-annotation mb-2 block">
                    PROFESSION
                  </label>
                  <select
                    id="profession"
                    value={values.profession}
                    onChange={(e) => set('profession', e.target.value)}
                    className={`u-field ${errors.profession ? 'is-invalid' : ''}`}
                    aria-invalid={errors.profession}
                  >
                    <option value="">Select…</option>
                    {PROFESSIONS.map((p) => (
                      <option key={p} value={p}>
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </option>
                    ))}
                  </select>
                  {errors.profession && <Required />}
                </div>

                <Button type="submit" variant="primary">
                  RESERVE — {RESERVE_PRICE}
                </Button>
                <p className="u-annotation mt-6" style={{ lineHeight: 1.7 }}>
                  This form is the only data we collect, and Plausible is our only analytics.
                </p>
              </form>
            )}
          </div>

          {/* Benefits */}
          <aside>
            {BENEFITS.map(([title, body]) => (
              <div
                key={title}
                className="pt-5"
                style={{ borderTop: '1px solid var(--hairline)' }}
              >
                <p
                  className="u-annotation"
                  style={{ color: 'var(--accent-red)', fontWeight: 700 }}
                >
                  {title}
                </p>
                <p className="u-body u-body-teal mt-2">{body}</p>
                <div className="mb-6" />
              </div>
            ))}
          </aside>
        </div>
      </div>
    </PageShell>
  );
}

function Required() {
  return (
    <p className="u-annotation mt-2" style={{ color: 'var(--accent-red)', fontWeight: 700 }}>
      REQUIRED
    </p>
  );
}
