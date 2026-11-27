# AGENTS.md: OFFmaps site

French site for OFFmaps, a Moroccan mystery-travel agency: travellers pick one universe (Atlas, Sahara, La Mer) and the crew plans a sealed trip. Built on the 8B "Midblock" architecture template: the home page is one file, `index.html`, with inline CSS and scripts and no JavaScript libraries. The scroll motion is CSS scroll-driven animation plus a small inline motion kit. No build step for the home page.

## Files
- `index.html`: the home page and the source of the shared design (fonts, tokens, atoms, navigation, footer, motion kit).
- `content/universes.mjs`: text of the three universe pages and of the 404 page.
- `tools/build-pages.mjs`: writes `atlas/index.html`, `la-mer/index.html`, `sahara/index.html` and `404.html` from the two files above. Run `node tools/build-pages.mjs` after editing either; never edit the generated files.
- `tools/serve.mjs`: local preview on http://localhost:4173 (`node tools/serve.mjs`), with folder URLs and the 404 page.
- `images/offmaps/`, `fonts/`, `favicon.svg`, `og-image.png`: assets, all local. Links between pages are relative; only `404.html` uses root-absolute links.

## Writing rules
- Everything is in French except the brand `OFFmaps` (exact spelling, never "OFF MAPS" or "OffMaps") and the hero title `We SEE you VISION`.
- The home page never promises a precise destination: the mystery is the product. Only the three universe pages name towns, and each repeats the mystery note.
- Typography: curly apostrophes (’), non-breaking spaces before `: ; ? !` and inside « ». `tools/build-pages.mjs` applies this to `content/universes.mjs`; in `index.html` type them directly.
- No emoji. Tone: confident, sensory, short sentences. Brand words: univers, ticket, scellé, enveloppe, départ, crew, tableau des départs.

## Keep (from the template)
- Every `id`, `data-8b-section`, `data-8b-motion` and `data-8b-part` (`section:<id>` styles, `scene:<id>` animation). Section ids are the template's: `#buildings` is the universes, `#scan` how a ticket works, `#register` the departures board, `#colours`, `#neighbours` testimonials, `#floors` the ticket layer by layer, `#studio` the crew.
- The motion parts `motion-gate`, `motion-kit` and `motion`, and every other `data-8b-*` attribute (`data-8b-items`, `data-8b-off`, `data-8b-enter`, `data-8b-fixed`).
- Selectors the scripts use:
  - `section-script:navigation`: `.nav__toggle` `.nav__menu` `.nav__close`
  - `section-script:contact`: `.ct__form` `.ct__status` `data-sent-text` `data-error-text`, fields `name`, `email`, `plot` (the universe)
  - `scene-script:buildings`: `.bl__pin` `.bl__track` `.bl__item` `.bl__shift` `.bl__img`
  - `scene-script:scan`: `.sc__frame` `.sc__line` `.sc__steps` `.sc__step` `.sc__tick`
  - `scene-script:floors`: `.fl__frame` `.fl__list` `.fl__slice` `.fl__floor`
- Universe card widths and heights come from the inline `style="--plot: N; --h: N"` on each card (4.1/60, 6.2/50, 7.8/44, 5.5/56, 9/48): they calibrate the sideways walk, do not recompute them.
- The first screen and the booking form use one photo, `images/offmaps/opening-stage.webp`, in eight opening layers and two contact slabs: replace the file, not the markup. The ticket section uses `ticket-couches.webp` for all seven slices; its cut lines (22/34/46/58/70/82 %) match the CSS.
- The footer wordmark's `--len` is 8.2 for `OFFmaps` (seven letters, wide capitals): raise it if the name overflows, lower it if it leaves a gap.
- Colours and fonts are variables in `:root` (`data-8b-part="tokens"`); body text needs 4.5:1 contrast. With reduced motion the page must read in full.
- Keep the header comment, `<meta name="generator">` and the "Design : 8B" footer link (MIT licence of the template).

## OFFmaps additions (in `index.html`)
- `data-8b-part="offmaps-base"`: smooth anchor scrolling and cross-page fade, both off with reduced motion.
- `data-8b-part="section:offmaps"`: universe cards as links (`.bl__item--link`, `.bl__go`, `.bl__more`), first-screen tightening on short screens, one-line cells in the departures board.
- `data-8b-part="section-script:arrival"`: lands on `/#section` links coming from other pages once the scenes have measured themselves.

## Still placeholders (never invent, ask the owner)
- Marked `data-8b-placeholder`: the form (sends nothing), the phone `+212 5 24 00 00 00` and the email `hello@offmaps.travel`. Real value in, attribute out.
- Address "Le bureau OFFmaps, Marrakech", hours, the five crew names and stock portraits, the three testimonials, the ticket numbers and statuses of the departures board.
- Official logo file (not supplied: the brand is set as text) and the absolute `og:image` URL once the domain is known.
- Form wiring. Formspree: `action="https://formspree.io/f/<id>"` and `fetch` POST `new FormData(form)` in `section-script:contact`. Netlify: `data-netlify="true"` and a hidden `form-name`. Update the two status messages when it sends for real.

## Check
375 and 1440 px, a short laptop (1366 x 650), reduced motion on, a browser without scroll-driven animations (Firefox: the finished static layout), console clean, `node tools/build-pages.mjs` run after any change to `index.html`.
