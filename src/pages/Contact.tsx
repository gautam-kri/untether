import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import Kicker from '../components/Kicker';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import ShutterEyeIllustration from '../illustrations/ShutterEyeIllustration';
import { Reveal } from '../lib/reveal';
import { CONTACT_EMAIL } from '../config';

type Field = 'name' | 'email' | 'message';

const ASIDE: { label: string; value: ReactNode }[] = [
  { label: 'GENERAL', value: CONTACT_EMAIL },
  {
    label: 'EARLY ACCESS',
    value: (
      <>
        We're hand-installing with a cohort of ten design partners.{' '}
        <Link
          to="/partners"
          className="text-accent underline underline-offset-4"
          data-cursor="link"
        >
          Become a design partner →
        </Link>
      </>
    ),
  },
  { label: 'BASED IN', value: 'CHENNAI, INDIA · BUILT LOCALLY' },
];

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<Field, boolean>>({
    name: false,
    email: false,
    message: false,
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
      message: !values.message.trim(),
    };
    setErrors(next);
    if (!next.name && !next.email && !next.message) setSent(true);
  };

  const fields: { id: Field; label: string; textarea?: boolean }[] = [
    { id: 'name', label: 'NAME' },
    { id: 'email', label: 'EMAIL' },
    { id: 'message', label: 'MESSAGE', textarea: true },
  ];

  return (
    <PageShell>
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
        <Reveal index={0}>
          <Kicker>CONTACT</Kicker>
        </Reveal>
        <Reveal index={1} className="mt-5">
          <SectionHeading as="h1">Start a conversation.</SectionHeading>
        </Reveal>

        <div className="mt-14 grid gap-12 min-[900px]:grid-cols-[55%_45%]">
          {/* Form / confirmation */}
          <div>
            {sent ? (
              <div className="flex flex-col items-start">
                <div style={{ width: '120px', height: '80px' }} className="text-body">
                  <ShutterEyeIllustration />
                </div>
                <p className="u-body mt-6">
                  Message received. We read everything ourselves — expect a reply from a human.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                {fields.map((f) => (
                  <div key={f.id} className="mb-8">
                    <label htmlFor={f.id} className="u-annotation mb-2 block">
                      {f.label}
                    </label>
                    {f.textarea ? (
                      <textarea
                        id={f.id}
                        rows={6}
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
                      <p
                        className="u-annotation mt-2"
                        style={{ color: 'var(--accent-red)', fontWeight: 700 }}
                      >
                        REQUIRED
                      </p>
                    )}
                  </div>
                ))}
                <Button type="submit" variant="primary">
                  SEND MESSAGE
                </Button>
              </form>
            )}
          </div>

          {/* Aside */}
          <aside>
            {ASIDE.map((row) => (
              <div key={row.label} className="pt-5" style={{ borderTop: '1px solid var(--hairline)' }}>
                <p className="u-annotation">{row.label}</p>
                <p className="u-body mt-2">{row.value}</p>
                <div className="mb-6" />
              </div>
            ))}
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
