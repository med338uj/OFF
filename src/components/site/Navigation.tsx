import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { site } from '@/content/site';
import { motionKit } from '@/motion/motionKit';
import { Wordmark } from './Wordmark';

// navigation: top bar: wordmark, four section links, the enquiry button; phone menu overlay.
// section-script:navigation: the overlay locks page scroll, pauses the smooth wheel and moves
// focus to Close; Close / Escape return focus to the menu button; a menu link closes it and
// lets the anchor scroll. The bar hides on downward scroll past 140px (unless it holds focus)
// and returns on any upward scroll of 4px or more.
export function Navigation() {
  const { nav } = site;
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(false);

  const setMenu = (next: boolean, moveFocus = true) => {
    openRef.current = next;
    flushSync(() => setOpen(next));
    document.documentElement.style.overflow = next ? 'hidden' : '';
    if (next) {
      motionKit.wheel.stop();
      if (moveFocus) closeRef.current?.focus();
    } else {
      motionKit.wheel.start();
      if (moveFocus) toggleRef.current?.focus();
    }
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openRef.current) setMenu(false);
    };
    document.addEventListener('keydown', onKey);
    let last = scrollY;
    let ticking = false;
    let frame = 0;
    const update = () => {
      ticking = false;
      const y = scrollY;
      const delta = y - last;
      if (Math.abs(delta) < 4) return;
      if (delta > 0 && y > 140 && !headerRef.current?.contains(document.activeElement)) setHidden(true);
      else if (delta < 0) setHidden(false);
      last = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        frame = requestAnimationFrame(update);
      }
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('keydown', onKey);
      removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      // Leaving the page with the menu open must not leave the scroll locked or the wheel paused.
      document.documentElement.style.overflow = '';
      motionKit.wheel.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header ref={headerRef} id="navigation" data-8b-section="navigation" data-hidden={hidden ? '' : undefined} onFocus={() => setHidden(false)}>
      <a className="nav__brand" href={site.brand.home}>
        <Wordmark />
      </a>
      <nav aria-label={nav.label}>
        <ul className="nav__links" data-8b-items=":scope > li">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a className="m-link" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a className="m-btn nav__cta" href={nav.cta.href}>
        <span className="m-btn__label">{nav.cta.label}</span>
      </a>
      <button ref={toggleRef} className="m-icon-btn nav__toggle" type="button" aria-label={nav.open} aria-expanded={open} aria-controls="nav-menu" onClick={() => setMenu(true)}>
        <span className="m-icon-btn__bar"></span>
        <span className="m-icon-btn__bar"></span>
      </button>
      <div
        className="nav__menu"
        id="nav-menu"
        hidden={!open}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('a')) setMenu(false, false);
        }}
      >
        <button ref={closeRef} className="m-icon-btn nav__close" type="button" aria-label={nav.close} onClick={() => setMenu(false)}>
          <span className="m-icon-btn__bar"></span>
          <span className="m-icon-btn__bar"></span>
        </button>
        <div className="nav__menu-stripe" aria-hidden="true"></div>
        <ul className="nav__menu-links" data-8b-items=":scope > li">
          {nav.menu.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
