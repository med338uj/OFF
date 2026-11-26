import { site } from '@/content/site';
import { Img } from './Img';

// neighbours: three testimonials on blocks at stepped heights, with one photo
// (motion: data-8b-motion step / resolve, run by the motion kit's enter-on-scroll).
export function Neighbours() {
  const n = site.neighbours;
  const blocks = ['m-block', 'm-block-2', 'm-block-3'];
  return (
    <section id="neighbours" data-8b-section="neighbours" aria-labelledby="nb-title">
      <div className="nb__inner">
        <h2 className="m-text-3 nb__title" id="nb-title">
          {n.title}
        </h2>
        <div className="nb__quotes" data-8b-motion="step" data-8b-items=":scope > figure">
          {n.quotes.map((quote, i) => (
            <figure key={quote.name} className={`${blocks[i % 3]} nb__quote`}>
              <blockquote>
                <p>{quote.text}</p>
              </blockquote>
              <figcaption>
                <strong className="m-text-6">{quote.name}</strong>
                <span>{quote.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="m-photo nb__photo" data-8b-motion="resolve">
          <Img className="m-photo__img" photo={n.photo} />
        </div>
        <div className="nb__floor" aria-hidden="true"></div>
      </div>
    </section>
  );
}
