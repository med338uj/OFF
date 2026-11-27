// Generates atlas/index.html, la-mer/index.html, sahara/index.html and 404.html.
// No dependencies. Run from the site folder:  node tools/build-pages.mjs
//
// The pages reuse the home page's own design: fonts, tokens, atoms, navigation, footer and
// motion kit are copied out of index.html, so a design change there carries over on the next run.
// Their text lives in content/universes.mjs.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { universes, mysteryNote, placesTitle, cta, notFound } from '../content/universes.mjs';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const home = readFileSync(join(site, 'index.html'), 'utf8');

// ---- pieces of the home page -------------------------------------------------------------
const grab = (tag, part) => {
  const match = home.match(new RegExp(`<${tag} data-8b-part="${part}">[\\s\\S]*?</${tag}>`));
  if (!match) throw new Error(`index.html: ${tag}[data-8b-part="${part}"] not found`);
  return match[0];
};
const between = (open, close) => {
  const a = home.indexOf(open), b = home.indexOf(close, a);
  if (a < 0 || b < 0) throw new Error(`index.html: ${open} … ${close} not found`);
  return home.slice(a, b + close.length);
};
const sharedStyles = ['fonts', 'layers', 'tokens', 'base', 'system', 'layout', 'section:navigation', 'section:footer', 'motion', 'offmaps-base'].map(part => grab('style', part)).join('\n');
const gate = grab('script', 'motion-gate');
const header = between('<header id="navigation"', '</header>');
const footer = between('<footer id="footer"', '</footer>');
const scripts = [grab('script', 'section-script:navigation'), grab('script', 'motion-kit')].join('\n');

// Links and files on the home page are written relative to the site root; `root` re-bases them.
const rebase = (html, root) => html
  .replaceAll('href="#opening"', `href="${root}"`)
  .replace(/href="#/g, `href="${root}#`)
  .replace(/href="(atlas|la-mer|sahara)\/"/g, `href="${root}$1/"`)
  .replace(/url\(fonts\//g, `url(${root}fonts/`);

// ---- French typography ---------------------------------------------------------------------
const NB = ' ';
const typo = text => text
  .replaceAll("'", '’')
  .replace(/ ([:;?!])/g, `${NB}$1`)
  .replaceAll('« ', `«${NB}`).replaceAll(' »', `${NB}»`)
  .replace(/(\d) (\d{3})\b/g, `$1${NB}$2`).replace(/(\d) m\b/g, `$1${NB}m`);
const esc = text => typo(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

// ---- styles of the new pages (same tokens and atoms as the home page) --------------------------
const pageStyles = `<style data-8b-part="section:universe">
@layer sections {
  /* universe hero: name on stepped blocks beside one photo, on the same sky as the first screen */
  #universe { position: relative; background: linear-gradient(to bottom, var(--color-11), var(--color-1) 62%); padding-top: calc(72px + clamp(28px, 5vw, 72px)); overflow-x: clip; }
  #universe .un__grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 20px; align-items: end; width: min(100% - 2 * var(--space-1), 1400px); margin-inline: auto; }
  #universe .un__copy { grid-column: 1 / span 7; display: grid; justify-items: start; padding-bottom: clamp(28px, 5vw, 72px); }
  #universe .un__block--a { width: 86%; padding-top: clamp(26px, 3vw, 44px); display: grid; gap: 18px; }
  #universe .un__block--b { width: 90%; justify-self: end; }
  #universe .un__tagline { color: var(--color-10); }
  #universe .un__title { font-family: var(--font-1); font-weight: 700; font-stretch: 75%; font-size: clamp(76px, 12.5vw, 196px); line-height: .82; letter-spacing: -.01em; }
  #universe .un__photo { grid-column: 9 / span 4; height: min(74svh, 760px); min-height: 380px; }
  #universe .un__pavement { height: 18px; background: linear-gradient(to bottom, var(--color-2) 0 34%, var(--color-5) 34% 67%, var(--color-6) 67% 100%); }

  /* the towns and places of the universe */
  #places { background: var(--color-9); padding: var(--space-2) var(--space-1); overflow-x: clip; }
  #places .pl__inner { max-width: 1360px; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 40px 5vw; align-items: start; }
  #places .pl__head { display: grid; gap: 22px; justify-items: start; }
  #places .pl__stripes { display: grid; gap: 4px; width: 100%; }
  #places .pl__stripes span { display: block; transform-origin: 50% 0; }
  #places .pl__stripes span:nth-child(1) { height: 12px; background: var(--color-5); }
  #places .pl__stripes span:nth-child(2) { height: 7px; background: var(--color-4); }
  #places .pl__stripes span:nth-child(3) { height: 4px; background: var(--color-6); }
  #places .pl__list { border-top: 3px solid var(--color-2); }
  #places .pl__item { display: grid; grid-template-columns: 84px minmax(0, 1fr); gap: 10px 24px; padding: 26px 0 30px; border-bottom: 1px solid var(--color-10); }
  #places .pl__num { grid-row: 1 / span 2; padding-top: 9px; color: var(--color-10); }
  #places .pl__item h3, #places .pl__item p:last-child { grid-column: 2; }
  #places .pl__item p:last-child { max-width: 60ch; }

  /* the mystery note, then the booking call */
  #mystery { background: var(--color-1); padding: var(--space-2) var(--space-1); overflow-x: clip; }
  #mystery .my__inner { max-width: 1360px; margin: 0 auto; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 20px; }
  #mystery .my__note { grid-column: 1 / span 9; display: grid; grid-template-columns: auto minmax(0, 1fr); gap: clamp(20px, 3vw, 44px); align-items: start; border-top: 6px solid var(--color-8); }
  #mystery .my__seal { position: relative; width: clamp(56px, 6vw, 84px); aspect-ratio: 1; border: 3px dashed var(--color-3); }
  #mystery .my__seal::after { content: ""; position: absolute; inset: 34%; background: var(--color-8); }
  #mystery .my__note p { max-width: 46ch; }
  #mystery .my__cta { grid-column: 6 / span 7; display: flex; flex-wrap: wrap; align-items: center; gap: 14px 30px; background: var(--color-5); }

  /* 404 */
  #lost { min-height: 100svh; display: grid; align-content: center; background: linear-gradient(to bottom, var(--color-11), var(--color-1) 62%); padding: calc(72px + var(--space-2)) var(--space-1) var(--space-2); overflow-x: clip; }
  #lost .lo__copy { width: min(100%, 660px); margin: 0 auto; display: grid; justify-items: start; }
  #lost .lo__block--a { width: 100%; padding-top: clamp(26px, 3vw, 44px); }
  #lost .lo__block--b { width: 86%; justify-self: end; }
  #lost .lo__block--c { width: 74%; background: var(--color-5); }

  @media (max-width: 900px) {
    #universe { padding-top: calc(64px + 24px); }
    #universe .un__grid { grid-template-columns: minmax(0, 1fr); }
    #universe .un__copy, #universe .un__photo { grid-column: 1; }
    #universe .un__copy { padding-bottom: 0; }
    #universe .un__block--a { width: 94%; }
    #universe .un__block--b { width: 92%; }
    #universe .un__photo { width: 84%; justify-self: end; height: 52svh; min-height: 300px; }
    #places .pl__inner { grid-template-columns: minmax(0, 1fr); }
    #places .pl__item { grid-template-columns: minmax(0, 1fr); gap: 8px; }
    #places .pl__num { grid-row: auto; padding-top: 0; }
    #places .pl__item h3, #places .pl__item p:last-child { grid-column: 1; }
    #mystery .my__inner { grid-template-columns: minmax(0, 1fr); }
    #mystery .my__note { grid-column: 1; grid-template-columns: minmax(0, 1fr); margin-right: 6%; }
    #mystery .my__cta { grid-column: 1; margin-left: 10%; }
    #lost .lo__block--b { width: 92%; }
    #lost .lo__block--c { width: 100%; }
  }
}
</style>`;

// ---- page shell ------------------------------------------------------------------------------
const shell = ({ root, title, description, image, robots, main }) => `<!doctype html>
<!--
  OFFmaps — voyage mystère au Maroc. Built on the free website template by 8B: https://8b.com/templates/midblock/
  MIT License (code) https://8b.com/ · Photos: Unsplash License, see CREDITS.md · Fonts: Google Fonts (OFL)
  Generated by tools/build-pages.mjs from index.html and content/universes.mjs: edit those, not this file.
-->
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="generator" content="8B Templates">${robots ? `\n<meta name="robots" content="${robots}">` : ''}
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${root}favicon.svg" type="image/svg+xml">${image ? `\n<link rel="preload" as="image" href="${root}${image}" type="image/webp" fetchpriority="high">` : ''}
${rebase(sharedStyles, root)}
${pageStyles}
${gate}
</head>
<body class="m-text">
${rebase(header, root)}
<main>
${main}
</main>
${rebase(footer, root)}
${scripts}
</body>
</html>
`;

// ---- universe pages ------------------------------------------------------------------------------
const universePage = (u, root) => shell({
  root,
  title: u.meta.title,
  description: u.meta.description,
  image: u.photo.src,
  main: `<!-- universe: name and tagline on stepped blocks, the intro, one photo of the theme -->
<section id="universe" data-8b-section="universe" aria-labelledby="un-title">
  <div class="un__grid">
    <div class="un__copy" data-8b-motion="step">
      <div class="m-block un__block un__block--a"><p class="m-text-4 un__tagline">${esc(u.tagline)}</p><h1 class="un__title" id="un-title">${esc(u.name)}</h1></div>
      <div class="m-block-2 un__block un__block--b"><p class="m-text-5">${esc(u.intro)}</p></div>
    </div>
    <div class="m-photo un__photo" data-8b-motion="resolve"><img class="m-photo__img" src="${root}${u.photo.src}" alt="${esc(u.photo.alt)}" width="${u.photo.width}" height="${u.photo.height}" fetchpriority="high" style="object-position: ${u.photo.position}"></div>
  </div>
  <div class="un__pavement" aria-hidden="true"></div>
</section>

<!-- places: the towns and places of this universe -->
<section id="places" data-8b-section="places" aria-labelledby="pl-title">
  <div class="pl__inner">
    <div class="pl__head" data-8b-motion="step">
      <div class="pl__stripes" aria-hidden="true"><span data-8b-motion="band"></span><span data-8b-motion="band"></span><span data-8b-motion="band"></span></div>
      <h2 class="m-text-3" id="pl-title">${esc(placesTitle)}</h2>
    </div>
    <ol class="pl__list" data-8b-items=":scope > li">
${u.places.map((place, index) => `      <li class="pl__item"><p class="m-text-4 pl__num" aria-hidden="true">${String(index + 1).padStart(2, '0')}</p><h3 class="m-text-6">${esc(place.name)}</h3><p>${esc(place.text)}</p></li>`).join('\n')}
    </ol>
  </div>
</section>

<!-- mystery: the note that keeps the destination sealed, then the booking call -->
<section id="mystery" data-8b-section="mystery">
  <div class="my__inner">
    <aside class="m-block-3 my__note" data-tone="dark" aria-label="Le mystère">
      <div class="my__seal" aria-hidden="true"></div>
      <p class="m-text-6">${esc(mysteryNote)}</p>
    </aside>
    <div class="m-block my__cta"><a class="m-btn" href="${root}#contact"><span class="m-btn__label">${esc(cta.book)}</span></a><a class="m-link" href="${root}">${esc(cta.home)}</a></div>
  </div>
</section>`,
});

for (const u of universes) {
  mkdirSync(join(site, u.slug), { recursive: true });
  writeFileSync(join(site, u.slug, 'index.html'), universePage(u, '../'));
  console.log(`${u.slug}/index.html`);
}

// ---- 404 (served at any depth, so its links start from the domain root) ---------------------------
writeFileSync(join(site, '404.html'), shell({
  root: '/',
  title: notFound.metaTitle,
  description: notFound.text,
  robots: 'noindex',
  main: `<!-- lost: the page that missed the departure -->
<section id="lost" data-8b-section="lost" aria-labelledby="lo-title">
  <div class="lo__copy" data-8b-motion="step">
    <div class="m-block lo__block--a"><h1 class="m-text-2" id="lo-title">${esc(notFound.title)}</h1></div>
    <div class="m-block-2 lo__block--b"><p class="m-text-5">${esc(notFound.text)}</p></div>
    <div class="m-block lo__block--c"><a class="m-btn" href="/"><span class="m-btn__label">${esc(notFound.button)}</span></a></div>
  </div>
</section>`,
}));
console.log('404.html');
