import { site } from '@/content/site';
import { Img } from './Img';

// opening: first screen: headline on stepped blocks between slabs of a street photo, then a
// manifesto and three short facts (animation: scene:opening, pure CSS). The stage keeps the
// template's order: sky, six side slabs, the gap slab, the floor slab (:nth-of-type rules).
export function Opening() {
  const o = site.opening;
  const slabs = ['', '', '', '', '', '', ' op__slab--gap'];
  return (
    <section id="opening" data-8b-section="opening" aria-labelledby="op-title">
      <div className="op__stage" role="img" aria-label={o.stageLabel}>
        <div className="op__sky"></div>
        {slabs.map((extra, i) => (
          <div key={i} className={`op__slab${extra}`}>
            <div className="op__rise">
              <Img className="op__img" photo={o.photo} lazy={false} priority={i === 0} />
            </div>
          </div>
        ))}
        <div className="op__floor">
          <div className="op__rise">
            <Img className="op__img" photo={o.photo} lazy={false} />
          </div>
        </div>
      </div>
      <div className="op__first">
        <div className="op__copy">
          <div className="m-block op__block op__block--a">
            <h1 className="m-text-2 op__title" id="op-title">
              {o.title}
            </h1>
          </div>
          <div className="m-block-2 op__block op__block--b">
            <p className="m-text-5">{o.lead}</p>
          </div>
          <div className="m-block op__block op__block--c">
            <a className="m-btn" href={o.primary.href}>
              <span className="m-btn__label">{o.primary.label}</span>
            </a>
            <a className="m-btn-2" href={o.secondary.href}>
              <span className="m-btn__label">{o.secondary.label}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="op__hold"></div>
      <div className="op__second" data-tone="dark">
        <div className="m-block-3 op__manifesto">
          <h2 className="m-text-3">{o.manifestoTitle}</h2>
          <p className="m-text">{o.manifesto}</p>
        </div>
        <dl className="m-block op__facts" data-8b-items=":scope > div">
          {o.facts.map((fact) => (
            <div key={fact.term} className="op__fact">
              <dt className="m-text-4">{fact.term}</dt>
              <dd>{fact.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
