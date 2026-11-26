import type { CSSProperties } from 'react';
import { site } from '@/content/site';
import { Img } from './Img';

// studio: team: five portraits at stepped heights with names and roles (animation:
// scene:studio, pure CSS; each portrait's start offset is an inline custom property).
export function Studio() {
  const s = site.studio;
  return (
    <section id="studio" data-8b-section="studio" aria-labelledby="st-title">
      <div className="st__head">
        <h2 className="m-text-3" id="st-title">
          {s.title}
        </h2>
        <p className="m-text-5">{s.lead}</p>
      </div>
      <ul className="st__row" data-8b-items=":scope > li" data-8b-fixed="5">
        {s.people.map((person) => (
          <li
            key={person.name}
            className="st__person"
            style={{ '--studio-div-m-photo-translate-from-2': person.from, '--studio-div-m-photo-translate-from-2-m': person.fromPhone } as CSSProperties}
          >
            <div className="m-photo st__frame">
              <Img className="m-photo__img" photo={person.photo} />
            </div>
            <p className="st__name">
              <strong className="m-text-6">{person.name}</strong>
              <span>{person.role}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
