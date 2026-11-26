import { useEffect, useRef } from 'react';
import { site } from '@/content/site';
import { motionKit } from '@/motion/motionKit';
import { Img } from './Img';

// scan: method in four steps beside a photo crossed by a red scan line (animation: scene:scan).
// scene-script:scan: reading down the steps lights one step and the time ticks up to it.
export function Scan() {
  const s = site.scan;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(
    () =>
      motionKit.scene('scan', () => {
        const section = sectionRef.current!;
        const frame = section.querySelector<HTMLElement>('.sc__frame')!;
        const line = section.querySelector<HTMLElement>('.sc__line')!;
        const list = section.querySelector<HTMLElement>('.sc__steps')!;
        const steps = [...section.querySelectorAll<HTMLElement>('.sc__step')];
        const ticks = [...section.querySelectorAll<HTMLElement>('.sc__tick')];
        let started = false;
        const stopMeasure = motionKit.measure(() => motionKit.set(line, { '--scan-frame-w': frame.clientWidth + 'px' }));
        const stopTrack = motionKit.track(list, 'top 70%', 'bottom 55%', (progress) => {
          if (!started && progress <= 0) return;
          started = true;
          const lit = Math.min(steps.length - 1, Math.floor(Math.min(progress / 0.8, 0.999) * steps.length));
          steps.forEach((step, index) => step.toggleAttribute('data-lit', index === lit));
          ticks.forEach((tick, index) => tick.toggleAttribute('data-lit', index <= lit));
        });
        return () => {
          stopMeasure();
          stopTrack();
        };
      }),
    [],
  );

  return (
    <section ref={sectionRef} id="scan" data-8b-section="scan" data-tone="dark" aria-labelledby="sc-title">
      <div className="sc__grid">
        <div className="sc__head">
          <h2 className="m-text-3" id="sc-title">
            {s.title}
          </h2>
          <p className="m-text-5">{s.lead}</p>
        </div>
        <div className="sc__stage">
          <div className="sc__frame">
            <div className="m-photo sc__photo">
              <Img className="m-photo__img" photo={s.photo} />
            </div>
            <div className="sc__smear" aria-hidden="true">
              <Img photo={s.smear} />
            </div>
            <div className="sc__line" aria-hidden="true"></div>
            <ol className="sc__axis" aria-hidden="true">
              {s.ticks.map((tick) => (
                <li key={tick} className="m-text-4 sc__tick">
                  {tick}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <ol className="sc__steps" data-8b-items=":scope > li" data-8b-fixed="4">
          {s.steps.map((step) => (
            <li key={step.title} className="sc__step">
              <h3 className="m-text-6">{step.title}</h3>
              <p className="m-text-4 sc__time">{step.time}</p>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
