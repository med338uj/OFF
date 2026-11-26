import { site } from '@/content/site';

// register: a static table of plots with status badges (demo content; no search, no online
// submission). "Add a plot" is an anchor to the enquiry form. On phones each row becomes a
// card whose field labels come from data-label.
export function Register() {
  const r = site.register;
  const [, wLabel, dLabel, fLabel] = r.columns;
  return (
    <section id="register" data-8b-section="register" aria-labelledby="rg-title">
      <div className="rg__inner">
        <div className="rg__head" data-8b-motion="step">
          <div className="rg__stripes" aria-hidden="true">
            <span data-8b-motion="band"></span>
            <span data-8b-motion="band"></span>
            <span data-8b-motion="band"></span>
          </div>
          <h2 className="m-text-3" id="rg-title">
            {r.title}
          </h2>
          <p className="m-text-5">{r.lead}</p>
          <a className="m-btn" href={r.cta.href}>
            <span className="m-btn__label">{r.cta.label}</span>
          </a>
        </div>
        <table className="rg__table">
          <caption className="sr-only">{r.caption}</caption>
          <thead>
            <tr>
              {r.columns.map((column) => (
                <th key={column} className="m-text-4" scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody data-8b-items=":scope > tr">
            {r.rows.map((row) => (
              <tr key={row.plot}>
                <td>{row.plot}</td>
                <td data-label={wLabel}>{row.width}</td>
                <td data-label={dLabel}>{row.depth}</td>
                <td data-label={fLabel}>{row.faces}</td>
                <td>
                  <span className={row.built ? 'm-badge-2' : 'm-badge'}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="rg__note">{r.note}</p>
      </div>
    </section>
  );
}
