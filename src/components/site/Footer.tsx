import type { CSSProperties } from 'react';
import { site } from '@/content/site';

// footer: colour bands, the width-filling wordmark (--len = characters in the line), links,
// address, copyright and the "Design: 8B" credit (kept: MIT template credit).
export function Footer() {
  const f = site.footer;
  return (
    <footer id="footer" data-8b-section="footer" data-tone="dark">
      <div className="ft__bands" aria-hidden="true">
        <span data-8b-motion="band"></span>
        <span data-8b-motion="band"></span>
        <span data-8b-motion="band"></span>
        <span data-8b-motion="band"></span>
      </div>
      <p className="ft__mark" style={{ '--len': f.mark.length } as CSSProperties}>
        {f.mark}
      </p>
      <div className="ft__grid">
        <p className="m-text-5">{f.about}</p>
        <div>
          <h2 className="m-text-4">{f.pagesTitle}</h2>
          <ul data-8b-items=":scope > li">
            {f.pages.map((link) => (
              <li key={link.href}>
                <a className="m-link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="m-text-4">{f.studioTitle}</h2>
          <p>
            {f.address[0]}
            <br />
            {f.address[1]}
          </p>
        </div>
        <div>
          <h2 className="m-text-4">{f.writeTitle}</h2>
          <ul data-8b-items=":scope > li">
            <li>
              <a data-8b-placeholder="email" className="m-link" href={f.email.href}>
                {f.email.label}
              </a>
            </li>
            <li>
              <a data-8b-placeholder="phone" className="m-link" href={f.phone.href}>
                {f.phone.label}
              </a>
            </li>
            <li>
              <a className="m-link" href={f.cta.href}>
                {f.cta.label}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="ft__legal">
        {f.legal} · Design:{' '}
        <a href={f.credit.href} style={{ color: 'inherit' }} data-8b-credit="">
          {f.credit.label}
        </a>
      </p>
    </footer>
  );
}
