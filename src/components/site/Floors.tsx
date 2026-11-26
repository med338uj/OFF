import { useEffect, useRef } from 'react';
import { site } from '@/content/site';
import { motionKit } from '@/motion/motionKit';
import { Img } from './Img';

// floors: one project floor by floor: a building photo cut into seven slices beside a list of
// seven levels (animation: scene:floors). scene-script:floors: reading down the levels slides
// the slices apart and back; the slice for the level being read sits nearest to aligned.
export function Floors() {
  const f = site.floors;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(
    () =>
      motionKit.scene('floors', () => {
        const section = sectionRef.current!;
        const frame = section.querySelector<HTMLElement>('.fl__frame')!;
        const list = section.querySelector<HTMLElement>('.fl__list')!;
        const slices = [...section.querySelectorAll<HTMLElement>('.fl__slice')];
        const floors = [...section.querySelectorAll<HTMLElement>('.fl__floor')];
        const last = slices.length - 1;
        let amplitude = 0;
        const stopMeasure = motionKit.measure(() => {
          amplitude = Math.min(64, frame.clientWidth * 0.16);
        });
        const stopTrack = motionKit.track(list, 'top 62%', 'bottom 62%', (progress) => {
          const reading = progress * last;
          const envelope = Math.sin(Math.PI * progress);
          slices.forEach((slice, index) =>
            motionKit.set(slice, { translate: `${(envelope * amplitude * Math.min(1, Math.abs(index - reading)) * (index % 2 ? 1 : -1)).toFixed(2)}px 0` }),
          );
          const active = Math.round(reading);
          floors.forEach((floor, index) => floor.toggleAttribute('data-active', index === active));
        });
        return () => {
          stopMeasure();
          stopTrack();
        };
      }),
    [],
  );

  return (
    <section ref={sectionRef} id="floors" data-8b-section="floors" data-tone="dark" aria-labelledby="fl-title">
      <div className="fl__grid">
        <div className="fl__head">
          <h2 className="m-text-3" id="fl-title">
            {f.title}
          </h2>
          <p className="m-text-5">{f.lead}</p>
        </div>
        <div className="fl__stage">
          <div className="fl__frame" role="img" aria-label={f.frameLabel}>
            {f.levels.map((_, i) => (
              <div key={i} className="fl__slice">
                <Img photo={f.photo} />
              </div>
            ))}
          </div>
        </div>
        <ol className="fl__list" data-8b-items=":scope > li" data-8b-fixed="7">
          {f.levels.map((level) => (
            <li key={level.level} className="fl__floor">
              <h3 className="m-text-6">{level.title}</h3>
              <p className="m-text-4 fl__level">{level.level}</p>
              <p>{level.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
