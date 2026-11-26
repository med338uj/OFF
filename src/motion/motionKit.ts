// Port of the template's inline "motion-kit" script. The CSS scroll scenes only run when
// the head gate script (index.html, data-8b-part="motion-gate") has set data-8b-live on
// <html>: scroll-driven animation support and no reduced-motion preference.
// Components register measurements with measure() and scroll trackers with track();
// start() wires the shared layer (item numbering, enter-on-scroll, smooth wheel, paused
// off-screen loops; 8bsite/architecture-website-template @7ec5c2f) once the page has rendered. Every piece returns a cleanup, so the
// page can unmount and mount again without leftover listeners or stylesheets.

type Box = { x: number; y: number; w: number; h: number };
type Cleanup = () => void;

const live = typeof document !== 'undefined' && document.documentElement.hasAttribute('data-8b-live');
const measures = new Set<() => void>();
let queued = false;
let wheelPaused = false;

const run = (fn: () => void) => {
  try {
    fn();
  } catch (error) {
    console.error('[motion-kit] measure failed', error);
  }
};

const realign = () =>
  document.getAnimations().forEach((animation) => {
    if (animation.timeline && animation.timeline !== document.timeline && animation.playState === 'running') {
      animation.pause();
      animation.play();
    }
  });

const remeasure = () => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    measures.forEach(run);
    realign();
  });
};

function box(element: Element): Box {
  if (!(element instanceof HTMLElement)) {
    const r = element.getBoundingClientRect();
    return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height };
  }
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = element;
  while (node) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y, w: element.offsetWidth, h: element.offsetHeight };
}

function set(element: HTMLElement | SVGElement, vars: Record<string, string | number>) {
  for (const [name, value] of Object.entries(vars)) element.style.setProperty(name, String(value));
}

/** Registers a layout measurement; returns a cleanup that unregisters it. */
function measure(fn: () => void): Cleanup {
  if (!live) return () => {};
  measures.add(fn);
  run(fn);
  return () => measures.delete(fn);
}

/** Runs a scene setup; a failing scene leaves its section in the static layout. */
function scene(id: string, fn: () => Cleanup | void): Cleanup {
  if (!live) return () => {};
  try {
    return fn() || (() => {});
  } catch (error) {
    console.error(`[motion-kit] scene ${id} failed; its section stays static`, error);
    // The template switches the scene's <style> off; here the scene CSS is bundled, so the
    // section is flagged (data-8b-static) and the error logged.
    document.getElementById(id)?.setAttribute('data-8b-static', '');
    return () => {};
  }
}

const named: Record<string, number> = { top: 0, center: 0.5, bottom: 1 };
const point = (text: string) => text.trim().split(/\s+/).map((word) => named[word] ?? parseFloat(word) / 100);

/**
 * Calls fn with 0..1 progress while the element moves from `start` to `end`
 * ("<element edge> <viewport edge>", e.g. "top 80%"). Returns its cleanup.
 */
function track(element: Element, start: string, end: string, fn: (progress: number) => void): Cleanup {
  if (!live) return () => {};
  const [s0, v0] = point(start);
  const [s1, v1] = point(end);
  let waiting = false;
  let frame = 0;
  const update = () => {
    waiting = false;
    const r = element.getBoundingClientRect();
    const vh = innerHeight;
    const d0 = r.top + r.height * s0 - vh * v0;
    const d1 = r.top + r.height * s1 - vh * v1;
    fn(d1 === d0 ? (d0 <= 0 ? 1 : 0) : Math.min(1, Math.max(0, -d0 / (d1 - d0))));
  };
  const onScroll = () => {
    if (!waiting) {
      waiting = true;
      frame = requestAnimationFrame(update);
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  const stopMeasure = measure(update);
  return () => {
    removeEventListener('scroll', onScroll);
    cancelAnimationFrame(frame);
    stopMeasure();
  };
}

const wheel = {
  stop() {
    wheelPaused = true;
  },
  start() {
    wheelPaused = false;
  },
};

function numberItems() {
  document.querySelectorAll<HTMLElement>('[data-8b-items]').forEach((group) => {
    let items: HTMLElement[];
    try {
      items = [...group.querySelectorAll<HTMLElement>(group.getAttribute('data-8b-items') || '')];
    } catch {
      return;
    }
    items.forEach((item, index) => {
      item.style.setProperty('--i', String(index));
      item.style.setProperty('--n', String(items.length));
    });
  });
}

function smoothWheel(): Cleanup {
  if (!matchMedia('(pointer: fine)').matches) return () => {};
  let target = scrollY;
  let current = scrollY;
  let last = 0;
  let running = false;
  let frame = 0;
  const inner = (start: EventTarget | null, dy: number) => {
    for (let node = start as HTMLElement | null; node && node !== document.body && node !== document.documentElement; node = node.parentElement) {
      if (!/(auto|scroll)/.test(getComputedStyle(node).overflowY) || node.scrollHeight <= node.clientHeight) continue;
      if (dy > 0 ? node.scrollTop + node.clientHeight < node.scrollHeight - 1 : node.scrollTop > 0) return true;
    }
    return false;
  };
  const step = (now: number) => {
    current += (target - current) * (1 - Math.exp(-5.3 * Math.min(0.05, (now - last) / 1000)));
    last = now;
    if (Math.abs(target - current) < 0.5) current = target;
    scrollTo({ top: current, behavior: 'instant' as ScrollBehavior });
    if (current !== target) frame = requestAnimationFrame(step);
    else running = false;
  };
  const onWheel = (event: WheelEvent) => {
    if (wheelPaused || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || inner(event.target, event.deltaY)) return;
    event.preventDefault();
    if (!running) target = current = scrollY;
    const unit = event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? innerHeight : 1;
    target = Math.max(0, Math.min(document.documentElement.scrollHeight - innerHeight, target + event.deltaY * unit * 0.95));
    if (!running) {
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(step);
    }
  };
  addEventListener('wheel', onWheel, { passive: false });
  return () => {
    removeEventListener('wheel', onWheel);
    cancelAnimationFrame(frame);
    running = false;
  };
}

function enterOnScroll(): Cleanup {
  const at = (element: Element) => {
    const own = /^(\d{1,3}(?:\.\d+)?)%$/.exec((element.getAttribute('data-8b-enter') || '').trim());
    return own && +own[1] <= 100 ? +own[1] / 100 : 0.88;
  };
  let pending = [...document.querySelectorAll('[data-8b-motion]')].map((element) => ({ element, y: 0, at: at(element) }));
  let waiting = false;
  let frame = 0;
  const check = () => {
    waiting = false;
    pending = pending.filter((item) => {
      if (item.y > scrollY + innerHeight * item.at) return true;
      item.element.classList.add('is-in');
      return false;
    });
  };
  const queue = () => {
    if (!waiting) {
      waiting = true;
      frame = requestAnimationFrame(check);
    }
  };
  const stopMeasure = measure(() => {
    pending.forEach((item) => {
      item.y = box(item.element).y;
    });
    queue();
  });
  addEventListener('scroll', queue, { passive: true });
  return () => {
    stopMeasure();
    cancelAnimationFrame(frame);
    removeEventListener('scroll', queue);
  };
}

function pauseOffscreenLoops(): Cleanup {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync('[data-8b-off],[data-8b-off]::before,[data-8b-off]::after{animation-play-state:paused!important}');
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  const watch = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.toggleAttribute('data-8b-off', !entry.isIntersecting)));
  const watched = new Set<Element>();
  const scan = () =>
    document.getAnimations().forEach((animation) => {
      const effect = animation.effect as KeyframeEffect | null;
      const element = effect?.target;
      if (!element || watched.has(element) || effect.getTiming().iterations !== Infinity || animation.timeline !== document.timeline) return;
      watched.add(element);
      watch.observe(element);
    });
  scan();
  addEventListener('load', scan);
  document.addEventListener('animationstart', scan, true);
  return () => {
    watch.disconnect();
    watched.forEach((element) => element.removeAttribute('data-8b-off'));
    removeEventListener('load', scan);
    document.removeEventListener('animationstart', scan, true);
    document.adoptedStyleSheets = document.adoptedStyleSheets.filter((s) => s !== sheet);
  };
}

/** Starts the shared motion layer for the rendered page; returns its cleanup. */
function start(): Cleanup {
  if (!live) return () => {};
  numberItems();
  measures.add(numberItems);
  const frame = requestAnimationFrame(realign);
  const resize = new ResizeObserver(remeasure);
  resize.observe(document.body);
  let alive = true;
  document.fonts?.ready.then(() => alive && remeasure());
  addEventListener('load', remeasure);
  const stops = [smoothWheel(), enterOnScroll(), pauseOffscreenLoops()];
  return () => {
    alive = false;
    cancelAnimationFrame(frame);
    resize.disconnect();
    removeEventListener('load', remeasure);
    measures.delete(numberItems);
    stops.forEach((stop) => stop());
  };
}

export const motionKit = { live, box, set, measure, scene, track, wheel, start, remeasure };
