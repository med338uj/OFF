import { site } from '@/content/site';

// colours: six full-width colour bands, each with a name, a sentence and where it is used
// (animation: scene:colours, pure CSS). Band colours come from the tokens via co__band--<key>.
export function Colours() {
  const c = site.colours;
  return (
    <section id="colours" data-8b-section="colours" aria-labelledby="co-title">
      <div className="co__head">
        <h2 className="m-text-3" id="co-title">
          {c.title}
        </h2>
        <p className="m-text-5">{c.lead}</p>
      </div>
      <ol className="co__bands" data-8b-items=":scope > li">
        {c.bands.map((band) => (
          <li key={band.key} className={`co__band co__band--${band.key}`}>
            <div className="co__fill" aria-hidden="true"></div>
            <div className="co__label">
              <h3 className="m-text-6">{band.name}</h3>
              <p>{band.text}</p>
              <p className="m-text-4">{band.use}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
