import { useEffect, useState } from 'react';
import PageShell from '../components/PageShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { Reveal } from '../lib/reveal';
import { SEATS_FILLED, TOTAL_SEATS, PARTNER_PRICE } from '../config';

type Field = 'name' | 'email' | 'company' | 'role' | 'city' | 'leaks';

const FIELDS: { id: Field; label: string; textarea?: boolean; placeholder?: string }[] = [
  { id: 'name', label: 'NAME' },
  { id: 'email', label: 'EMAIL' },
  { id: 'company', label: 'COMPANY' },
  { id: 'role', label: 'ROLE' },
  { id: 'city', label: 'CITY' },
  {
    id: 'leaks',
    label: 'WHAT LEAKS WOULD HURT MOST?',
    textarea: true,
    placeholder: 'Fundraise terms, an acquisition, board conversations, IP…',
  },
];

const BENEFITS = [
  ['TEN SEATS', 'A cohort of ten San Francisco founders. That is the whole first class.'],
  ['HAND-INSTALLED', 'We come to you, set it up, and you name your assistant. It is yours, not our mascot.'],
  ['WEEKLY ITERATION', 'Direct line to the founders and a weekly loop that shapes what gets built next.'],
  ['FOUNDING-PRICE LOCK', `${PARTNER_PRICE} from day one, locked for as long as you stay. Cancel anytime.`],
];

export default function Partners() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const empty: Record<Field, string> = { name: '', email: '', company: '', role: '', city: '', leaks: '' };
  const [values, setValues] = useState<Record<Field, string>>(empty);
  const [errors, setErrors] = useState<Record<Field, boolean>>({
    name: false,
    email: false,
    company: false,
    role: false,
    city: false,
    leaks: false,
  });
  const [sent, setSent] = useState(false);

  const set = (field: Field, v: string) => {
    setValues((s) => ({ ...s, [field]: v }));
    if (errors[field] && v.trim()) setErrors((s) => ({ ...s, [field]: false }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // "leaks" is optional context; the rest are required.
    const required: Field[] = ['name', 'email', 'company', 'role', 'city'];
    const next = { ...errors };
    required.forEach((f) => (next[f] = !values[f].trim()));
    setErrors(next);
    if (required.every((f) => values[f].trim())) {
      // TODO: POST the lead to the backend (store name/email/company/role/city/leaks).
      setSent(true);
    }
  };

  const pct = Math.max(0, Math.min(100, (SEATS_FILLED / TOTAL_SEATS) * 100));

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
        <Reveal index={0}>
          <Kicker>DESIGN PARTNERS</Kicker>
        </Reveal>
        <Reveal index={1} className="mt-5">
          <SectionHeading as="h1">Ten seats. Hand-installed. Paid, on purpose.</SectionHeading>
        </Reveal>
        <Reveal index={2} as="p" className="u-body u-body-teal mt-6 max-w-[46rem]">
          We're building Untether with a cohort of ten San Francisco founders. {PARTNER_PRICE} from
          day one — because a paying partner tells us the truth. We install it, you name your
          assistant, and we iterate weekly. Founding price locks for as long as you stay; cancel
          anytime.
        </Reveal>

        {/* Seat counter */}
        <Reveal index={3} className="mt-8 max-w-[40rem]">
          <p className="u-annotation">
            {SEATS_FILLED} OF {TOTAL_SEATS} SEATS FILLED
          </p>
          <div className="mt-3 h-px w-full" style={{ background: 'var(--hairline)' }} aria-hidden="true">
            <div style={{ height: '2px', marginTop: '-1px', width: `${pct}%`, background: 'var(--accent-red)' }} />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 min-[900px]:grid-cols-[55%_45%]">
          <div>
            {sent ? (
              <div className="flex flex-col items-start">
                <h2 className="u-display u-tile-title">Seat request received.</h2>
                <p className="u-body u-body-teal mt-4">
                  We read every application ourselves. If your context fits the first cohort, you'll
                  hear from a founder — not a form — within a few days.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                {FIELDS.map((f) => (
                  <div key={f.id} className="mb-8">
                    <label htmlFor={f.id} className="u-annotation mb-2 block">
                      {f.label}
                    </label>
                    {f.textarea ? (
                      <textarea
                        id={f.id}
                        rows={4}
                        placeholder={f.placeholder}
                        value={values[f.id]}
                        onChange={(e) => set(f.id, e.target.value)}
                        className={`u-field resize-none ${errors[f.id] ? 'is-invalid' : ''}`}
                        aria-invalid={errors[f.id]}
                      />
                    ) : (
                      <input
                        id={f.id}
                        type="text"
                        value={values[f.id]}
                        onChange={(e) => set(f.id, e.target.value)}
                        className={`u-field ${errors[f.id] ? 'is-invalid' : ''}`}
                        aria-invalid={errors[f.id]}
                      />
                    )}
                    {errors[f.id] && (
                      <p className="u-annotation mt-2" style={{ color: 'var(--accent-red)', fontWeight: 700 }}>
                        REQUIRED
                      </p>
                    )}
                  </div>
                ))}

                <Button type="submit" variant="primary">
                  BECOME A DESIGN PARTNER
                </Button>
                <p className="u-annotation mt-6" style={{ lineHeight: 1.7 }}>
                  This form is the only data we collect, and Plausible is our only analytics.
                </p>
              </form>
            )}
          </div>

          <aside>
            {BENEFITS.map(([title, body]) => (
              <div key={title} className="pt-5" style={{ borderTop: '1px solid var(--hairline)' }}>
                <p className="u-annotation" style={{ color: 'var(--accent-red)', fontWeight: 700 }}>
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
