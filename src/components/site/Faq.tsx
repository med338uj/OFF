import { site } from '@/content/site';

// faq: questions and answers (native <details>; the icon turns from plus to minus in CSS).
export function Faq() {
  const q = site.faq;
  return (
    <section id="faq" data-8b-section="faq" aria-labelledby="fq-title">
      <div className="fq__inner">
        <div className="fq__head" data-8b-motion="step">
          <h2 className="m-text-3" id="fq-title">
            {q.title}
          </h2>
          <p className="m-text-5">{q.lead}</p>
        </div>
        <div className="fq__list" data-8b-items=":scope > details">
          {q.items.map((item) => (
            <details key={item.q} className="fq__item">
              <summary>
                <span className="m-text-6">{item.q}</span>
                <span className="fq__icon" aria-hidden="true"></span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
