import { useEffect, useRef, type CSSProperties } from 'react';
import { site } from '@/content/site';
import { motionKit } from '@/motion/motionKit';
import { Img } from './Img';

// buildings: projects walked sideways: five buildings at their relative plot widths (--plot,
// metres) and photo heights (--h), each with a plate (animation: scene:buildings).
// scene-script:buildings measures the track and gives every building its depth/resolve span.
export function Buildings() {
  const b = site.buildings;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(
    () =>
      motionKit.scene('buildings', () => {
        const section = sectionRef.current!;
        const pin = section.querySelector<HTMLElement>('.bl__pin')!;
        const track = section.querySelector<HTMLElement>('.bl__track')!;
        const items = [...track.querySelectorAll<HTMLElement>('.bl__item')].filter((item) => item.querySelector('.bl__shift > .bl__img'));
        const span = (name: string, a: number, b2: number, d: number) => {
          const start = Math.min(Math.max(a, 0), d);
          const end = Math.max(Math.min(Math.max(b2, 0), d), start + 1);
          return {
            [`--buildings-${name}-a`]: start.toFixed(1) + 'px',
            [`--buildings-${name}-b`]: end.toFixed(1) + 'px',
            [`--buildings-${name}-from`]: Math.min(1, Math.max(0, (start - a) / (b2 - a))).toFixed(4),
            [`--buildings-${name}-to`]: Math.min(1, Math.max(0, (Math.min(end, d) - a) / (b2 - a))).toFixed(4),
          };
        };
        return motionKit.measure(() => {
          const d = Math.max(0, track.scrollWidth - pin.clientWidth);
          const view = innerWidth;
          const row = track.getBoundingClientRect().left;
          motionKit.set(section, { '--buildings-d': d + 'px' });
          items.forEach((item) => {
            const box = item.getBoundingClientRect();
            const left = track.offsetLeft + box.left - row;
            const w = box.width;
            motionKit.set(item, { ...span('depth', left - view, left + w, d), ...span('resolve', left - view * 1.02, left - view * 0.58, d) });
          });
        });
      }),
    [],
  );

  return (
    <section ref={sectionRef} id="buildings" data-8b-section="buildings" aria-labelledby="bl-title">
      <div className="bl__pin">
        <div className="bl__track" data-8b-items=":scope > .bl__item:not(.bl__item--head):not(.bl__item--end)">
          <div className="m-block-3 bl__item bl__item--head">
            <h2 className="m-text-3" id="bl-title">
              {b.title}
            </h2>
            <p className="m-text-5">{b.lead}</p>
          </div>
          {b.items.map((item) => (
            <article key={item.name} className="bl__item" style={{ '--plot': item.plot, '--h': item.h } as CSSProperties}>
              <div className="bl__photo">
                <div className="bl__shift">
                  <Img className="bl__img" photo={item.photo} />
                </div>
              </div>
              <div className="bl__plate">
                <h3 className="m-text-6">{item.name}</h3>
                <p className="m-text-4">{item.facts}</p>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
          <div className="m-block bl__item bl__item--end">
            <p className="m-text-6">{b.end}</p>
            <p>
              <a className="m-link" href={b.endLink.href}>
                {b.endLink.label}
              </a>
            </p>
          </div>
        </div>
        <div className="bl__pavement" aria-hidden="true"></div>
      </div>
    </section>
  );
}
