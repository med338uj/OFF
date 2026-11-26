import { useState, type FormEvent } from 'react';
import { site } from '@/content/site';
import { Img } from './Img';

// contact: enquiry form between two street-photo slabs, then address, phone, email and hours
// (animation: scene:contact, pure CSS). section-script:contact: the form sends nothing. On
// submit it checks name, email (and its format) and plot, then shows the matching status line
// (data-sent-text / data-error-text, role=status).
export function Contact() {
  const c = site.contact;
  const f = c.form;
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const field = (name: string) => form.elements.namedItem(name) as HTMLInputElement;
    const ok = ['name', 'email', 'plot'].every((name) => field(name).value.trim()) && field('email').checkValidity();
    setStatus(ok ? 'sent' : 'error');
    if (ok && f.resetOnSuccess) form.reset();
  };

  return (
    <section id="contact" data-8b-section="contact" data-tone="dark" aria-labelledby="ct-title">
      <div className="ct__stage">
        <div className="ct__slab ct__slab--l" aria-hidden="true">
          <Img photo={c.slab} lazy={false} />
        </div>
        <form data-8b-placeholder="form" className="m-block ct__form" action="#" method="post" noValidate onSubmit={onSubmit}>
          <h2 className="m-text-3" id="ct-title">
            {c.title}
          </h2>
          <p className="m-text-5">{c.lead}</p>
          <div className="ct__fields">
            <label className="m-field">
              <span className="m-field__label">{f.name}</span>
              <input className="m-field__input" name="name" type="text" autoComplete="name" required />
            </label>
            <label className="m-field">
              <span className="m-field__label">{f.email}</span>
              <input className="m-field__input" name="email" type="email" autoComplete="email" required />
            </label>
            <label className="m-field ct__wide">
              <span className="m-field__label">{f.plot}</span>
              <input className="m-field__input" name="plot" type="text" autoComplete="street-address" required />
            </label>
            <label className="m-field">
              <span className="m-field__label">{f.width}</span>
              <input className="m-field__input" name="width" type="number" inputMode="decimal" min="1" max="30" step="0.1" />
            </label>
            <label className="m-field">
              <span className="m-field__label">{f.role}</span>
              <select className="m-field__input" name="role">
                {f.roles.map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
            </label>
            <label className="m-field ct__wide">
              <span className="m-field__label">{f.message}</span>
              <textarea className="m-field__input" name="message" rows={4}></textarea>
            </label>
          </div>
          <p>
            <button className="m-btn" type="submit">
              <span className="m-btn__label">{f.submit}</span>
            </button>
          </p>
          <p className="ct__status" role="status" hidden={status === 'idle'} data-sent-text={f.sent} data-error-text={f.error} data-state={status === 'idle' ? undefined : status}>
            {status === 'sent' ? f.sent : status === 'error' ? f.error : ''}
          </p>
        </form>
        <div className="ct__slab ct__slab--r" aria-hidden="true">
          <Img photo={c.slab} lazy={false} />
        </div>
      </div>
      <dl className="ct__details">
        <div>
          <dt className="m-text-4">{c.labels.studio}</dt>
          <dd>
            {c.address[0]}
            <br />
            {c.address[1]}
          </dd>
        </div>
        <div>
          <dt className="m-text-4">{c.labels.phone}</dt>
          <dd>
            <a data-8b-placeholder="phone" className="m-link" href={c.phone.href}>
              {c.phone.label}
            </a>
          </dd>
        </div>
        <div>
          <dt className="m-text-4">{c.labels.email}</dt>
          <dd>
            <a data-8b-placeholder="email" className="m-link" href={c.email.href}>
              {c.email.label}
            </a>
          </dd>
        </div>
        <div>
          <dt className="m-text-4">{c.labels.hours}</dt>
          <dd>{c.hours}</dd>
        </div>
      </dl>
    </section>
  );
}
