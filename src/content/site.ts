// All page copy, links and photo slots of the one-page site, in page order.
// Section ids and the DOM structure the CSS and motion read live in the components.
// OFF MAPS — mystery travel across Morocco. The visual system, section order and
// motion parameters of the original template are untouched; only the copy, links
// and photo slots below carry the OFF MAPS brand.

export type Photo = { src: string; alt: string; width: number; height: number; position?: string };
type Link = { label: string; href: string };

const img = '/images/offmaps';
const openingStage: Photo = { src: `${img}/opening-stage.webp`, alt: '', width: 1536, height: 1024 };
const scanPhoto = { src: `${img}/scan-photo.webp`, width: 1536, height: 1024 };
const layersPhoto = { src: `${img}/ticket-layers.webp`, width: 1024, height: 1792 };

const sections: Link[] = [
  { label: 'Universes', href: '#buildings' },
  { label: 'How it works', href: '#scan' },
  { label: 'Departures', href: '#register' },
  { label: 'Crew', href: '#studio' },
];

const email = { label: 'hello@offmaps.travel', href: 'mailto:hello@offmaps.travel' };
const phone = { label: '+212 5 24 00 00 00', href: 'tel:+212524000000' };
const address = ['The OFF MAPS desk', 'Marrakech, Morocco'];

export const site = {
  meta: {
    title: 'OFF MAPS — mystery travel across Morocco · You pick the vibe, we pick the place',
  },
  brand: { name: 'OFF MAPS', home: '#opening', footerLen: 8 },
  notFound: {
    title: 'This page missed the departure',
    text: 'We walked the whole route and found nothing at this address. The universes, the departures and the booking form are all on the first page.',
    back: 'Back to the first screen',
  },
  nav: {
    label: 'Main',
    links: sections,
    cta: { label: 'Book your ticket', href: '#contact' },
    open: 'Open menu',
    close: 'Close menu',
    menu: [...sections, { label: 'Book your ticket', href: '#contact' }],
  },
  opening: {
    stageLabel: 'Warm Moroccan landscapes — ridges, dunes and ocean — smeared into vertical slabs of colour',
    photo: openingStage,
    title: 'You pick the vibe. We pick the place.',
    lead: 'OFF MAPS sells mystery travel tickets across Morocco. Choose one of three universes — Atlas, Sahara or Coast — and we turn it into a sealed ticket: the place, the departure, the stay and every day in between.',
    primary: { label: 'Choose your universe', href: '#buildings' },
    secondary: { label: 'Book your ticket', href: '#contact' },
    manifestoTitle: 'The best trips are the ones you never planned.',
    manifesto:
      'You tell us one word — mountains, desert or ocean. From there, our crew reads the season, the roads and the quiet places travellers miss, then plans a journey you discover step by step, until the envelope opens on departure day. No itineraries to compare, no choices to second-guess. Just the right place, at the right time, waiting for you.',
    facts: [
      { term: '3 universes', text: 'Atlas, Sahara, Coast: one word is all you choose. The rest is our work.' },
      { term: '0 decisions', text: 'Destination, departure point, stay and activities are planned and sealed by our crew.' },
      { term: 'Sealed until J-2', text: 'Your exact place stays a secret until the envelope opens, two days before departure.' },
    ],
  },
  buildings: {
    title: 'Three universes, one sealed ticket',
    lead: 'Walk the line. Each universe is a family of secret places we keep ready across Morocco — pick the one that sounds like you.',
    items: [
      {
        name: 'Atlas',
        plot: 4.1,
        h: 60,
        facts: 'Mountains · Villages · Lodges',
        text: 'Cold air, walnut groves and trails between traditional villages. Hiking days, cultural nights and lodges where dinner comes from the valley below.',
        photo: { src: `${img}/universe-atlas.webp`, alt: 'A Berber village on a rocky hillside under the snowy peaks of the High Atlas', width: 1024, height: 1536 } as Photo,
      },
      {
        name: 'Sahara',
        plot: 6.2,
        h: 50,
        facts: 'Dunes · Camps · Nomad culture',
        text: 'Sand roads, a traditional camp at the edge of the dunes, tea poured by nomad hosts and one night with more stars than sky.',
        photo: { src: `${img}/universe-sahara.webp`, alt: 'A camel caravan crossing golden dunes in the Moroccan Sahara', width: 1024, height: 1280 } as Photo,
      },
      {
        name: 'Coast',
        plot: 7.8,
        h: 44,
        facts: 'Ocean · Surf · Fishing villages',
        text: 'Salt air, blue boats and whitewashed streets above the Atlantic. Mornings on the water, afternoons between a beach shack and a café terrace.',
        photo: { src: `${img}/universe-coast.webp`, alt: 'Sunset over the Atlantic, waves breaking on a quiet sandy beach', width: 1536, height: 1152 } as Photo,
      },
      {
        name: 'The full mystery',
        plot: 5.5,
        h: 56,
        facts: 'Any universe · Chosen by us',
        text: 'You skip the last choice: we read your dates and your crew, and pick Atlas, Sahara or Coast for you. One ticket, zero hints, maximum surprise.',
        photo: { src: `${img}/universe-mystery.webp`, alt: 'Placeholder illustration of colour bands crossed by a dashed secret route — replaced by your photograph', width: 1024, height: 1536 } as Photo,
      },
      {
        name: 'The private ticket',
        plot: 9,
        h: 48,
        facts: 'Your group · Your universe',
        text: 'A departure just for your people — friends, family or a team. We close the group, set the date with you and seal the destination together.',
        photo: { src: `${img}/universe-private.webp`, alt: 'Placeholder illustration of a winding road crossing open country — replaced by your photograph', width: 1536, height: 1152 } as Photo,
      },
    ],
    end: 'One word is all it takes. The next step is a date.',
    endLink: { label: 'See the departures', href: '#register' },
  },
  scan: {
    title: 'How a mystery ticket works',
    lead: 'Four steps between choosing a vibe and stepping off the bus. The red line is where you are right now — everything after it is our job.',
    photo: { ...scanPhoto, alt: 'Placeholder illustration of a dashed route crossing warm dunes' } as Photo,
    smear: { ...scanPhoto, alt: '' } as Photo,
    ticks: ['Pick', 'Plan', 'Seal', 'Go'],
    steps: [
      { title: 'Pick', time: 'Day 1 · your word', text: 'You choose Atlas, Sahara or Coast, and tell us your dates and how many travellers. That is the only decision you make.' },
      { title: 'Plan', time: 'Week 1 · our scouts', text: 'We match your dates to the season and reserve the stay, the transport and the days around one secret place.' },
      { title: 'Seal', time: 'J-2 · the envelope', text: 'Your ticket is printed and sealed: destination, departure point and packing list. It opens two days before you leave.' },
      { title: 'Go', time: 'J-0 · departure', text: 'You show up at the departure point with a bag packed for one word: mountains, desert or ocean.' },
    ],
  },
  register: {
    title: 'The departure board',
    lead: 'The mystery departures we are filling right now. Each one is a sealed ticket: pick a universe, claim a seat, and we do the rest.',
    cta: { label: 'Book your ticket', href: '#contact' },
    caption: 'Upcoming mystery departures, with universe, length, group size and status',
    columns: ['Departure', 'Universe', 'Days', 'Seats', 'Status'],
    rows: [
      { plot: 'Ticket nº 07 · High trails', width: 'Atlas', depth: '3 days', faces: '12 seats', status: 'Seats open' },
      { plot: 'Ticket nº 08 · Sand roads', width: 'Sahara', depth: '4 days', faces: '10 seats', status: 'Almost full' },
      { plot: 'Ticket nº 09 · Salt and surf', width: 'Coast', depth: '3 days', faces: '12 seats', status: 'Seats open' },
      { plot: 'Ticket nº 10 · Blue gates', width: 'Full mystery', depth: '4 days', faces: '14 seats', status: 'Seats open' },
      { plot: 'Ticket nº 11 · Cedar lodges', width: 'Atlas', depth: '2 days', faces: '8 seats', status: 'Almost full' },
      { plot: 'Ticket nº 12 · Dune camp', width: 'Sahara', depth: '3 days', faces: '12 seats', status: 'Sold out' },
      { plot: 'Ticket nº 13 · Private crew', width: 'Your pick', depth: '5 days', faces: 'Your group', status: 'On request' },
      { plot: 'Ticket nº 14 · The long weekend', width: 'Full mystery', depth: '3 days', faces: '16 seats', status: 'Confirmed', built: true },
    ] as Array<{ plot: string; width: string; depth: string; faces: string; status: string; built?: boolean }>,
    note: 'The board moves as seats sell. A departure is confirmed once the group is complete; the exact destination stays sealed until the ticket opens.',
  },
  colours: {
    title: 'The colour of every ticket',
    lead: 'We never print a ticket without its colour. Each universe carries its own shade — on the envelope, the luggage tag and the stamp on your return.',
    bands: [
      { key: 'sand', name: 'Atlas dawn', text: 'The first hour of light on the high trails, before the valley wakes up.', use: 'Atlas tickets, envelope' },
      { key: 'brick', name: 'Sahara ember', text: 'The last colour the dunes hold after sunset, when the camp lights come on.', use: 'Sahara tickets, envelope' },
      { key: 'door', name: 'Coast swell', text: 'The cold green-blue of the Atlantic when the morning wind picks up.', use: 'Coast tickets, envelope' },
      { key: 'plaster', name: 'Medina lime', text: 'The pale wash on the walls of the old towns every route passes through.', use: 'Luggage tags, every ticket' },
      { key: 'tram', name: 'Road-trip blue', text: 'The deep blue of the highway signs that point somewhere we already know you are going.', use: 'Sealed strip, itinerary card' },
      { key: 'night', name: 'Night bus', text: 'The colour of the last hour of every departure, when the plan finally becomes a place.', use: 'The ticket itself, always' },
    ],
  },
  neighbours: {
    title: 'What travellers said after the reveal',
    quotes: [
      { text: '“I bought an Atlas ticket for my birthday and argued with everyone for three weeks about where we were going. It was better than anywhere we would have picked.”', name: 'Salma B.', role: 'Atlas ticket · spring departure' },
      { text: '“We booked on the Thursday and left on the Saturday. The camp, the transport, sunrise on the dunes — planned to the minute, and it still felt like an adventure.”', name: 'Yassine & Imane', role: 'Sahara ticket · two seats' },
      { text: '“I have lived here for twenty years and never seen the coast the way the ticket showed it to us. I would not change a single day.”', name: 'Camille R.', role: 'Coast ticket · solo traveller' },
    ],
    photo: { src: `${img}/travellers.webp`, alt: 'Placeholder illustration for a group of travellers on the road — replaced by your photograph', width: 1024, height: 1536 } as Photo,
  },
  floors: {
    title: 'One ticket, layer by layer',
    lead: 'A mystery ticket looks thin from the outside. Inside, seven layers are planned, booked and sealed before you ever hold it — sliced open here so you can see.',
    frameLabel: 'A tall sealed ticket with dashed perforations, cut into seven layers',
    photo: { ...layersPhoto, alt: '' } as Photo,
    levels: [
      { title: 'The place, still sealed', level: 'Layer 1', text: 'The destination itself: a town, a valley or a stretch of coast we keep secret until the ticket opens.' },
      { title: 'The departure point', level: 'Layer 2', text: 'The square, station or stop where the trip begins — chosen so the first hour already feels like the trip.' },
      { title: 'The road there', level: 'Layer 3', text: 'Transport for every leg, from the first pickup to the last drop-off, with the window seats reserved.' },
      { title: 'The stay', level: 'Layer 4', text: 'A lodge, a camp or a small hotel we have slept in ourselves, booked for your dates and your group.' },
      { title: 'The days', level: 'Layer 5', text: 'One anchor experience per day — a trail, a dune crossing, a boat — plus the hours we leave deliberately empty.' },
      { title: 'The table', level: 'Layer 6', text: 'Where you eat: village kitchens, camp dinners and one meal we will not describe, because you should taste it first.' },
      { title: 'The return', level: 'Layer 7', text: 'The way back, the photos you did not plan, and the envelope to keep — stamped with where you have been.' },
    ],
  },
  studio: {
    title: 'Five people, one departure board',
    lead: 'We keep the crew small on purpose: every ticket is planned by the person who scouted the route.',
    // `from` / `fromPhone`: the per-portrait start offsets the scene:studio CSS reads.
    people: [
      { name: 'Yasmine El Amrani', role: 'Founder, routes', from: '-34.483%', fromPhone: '-55.619%', photo: { src: `${img}/crew-1.webp`, alt: 'Portrait of Yasmine, founder of OFF MAPS', width: 1024, height: 1536 } as Photo },
      { name: 'Omar Benali', role: 'Field scout, Atlas', from: '36.364%', fromPhone: '58.655%', photo: { src: `${img}/crew-2.webp`, alt: 'Portrait of Omar, field scout for the Atlas universe', width: 1024, height: 1536 } as Photo },
      { name: 'Nadia Berrada', role: 'Stays and hosts', from: '-19.231%', fromPhone: '-31.018%', photo: { src: `${img}/crew-3.webp`, alt: 'Portrait of Nadia, who books the lodges, camps and hotels', width: 1024, height: 1536 } as Photo },
      { name: 'Karim Idrissi', role: 'Field scout, Sahara', from: '61.538%', fromPhone: '99.262%', photo: { src: `${img}/crew-4.webp`, alt: 'Portrait of Karim, field scout for the Sahara universe', width: 1024, height: 1536 } as Photo },
      { name: 'Lucie Marchand', role: 'Traveller support', from: '-31.25%', fromPhone: '-50.405%', photo: { src: `${img}/crew-5.webp`, alt: 'Portrait of Lucie, who supports travellers before and after departure', width: 1024, height: 1536 } as Photo },
    ],
  },
  faq: {
    title: 'Questions at the departure point',
    lead: 'The short answers are here. The long ones we give you over mint tea, once your ticket is booked.',
    items: [
      { q: 'Will I really not know where I am going?', a: 'Not until the envelope opens, two days before departure. You know the universe, the length of the trip and what to pack; the town, the stay and the plan stay sealed.' },
      { q: 'How do you choose my destination?', a: 'Your dates, your group and your universe go through the routes we scout all year. We pick the place that is at its best that week — and that we would travel to ourselves.' },
      { q: 'Can we travel if we chose different universes?', a: 'One ticket, one universe. For mixed groups we either agree on one ticket together, or build a private departure that takes both vibes in a single route.' },
      { q: 'What does a ticket include?', a: 'Everything from the departure point onwards: transport, stays, the daily anchor experiences and two meals a day. You bring the bag and the packing list we send you.' },
      { q: 'What if I have already been to the destination?', a: 'Tell us when you book. We keep a short list of places you have seen and never send you back to one of them — the surprise only works the first time.' },
    ],
  },
  contact: {
    slab: openingStage,
    title: 'Book your ticket',
    lead: 'Choose a universe, give us your dates and your crew, and we reply with the next departure that fits. This page can’t send messages yet: fill in the form to check you have everything, then email it to hello@offmaps.travel or call +212 5 24 00 00 00. We reply within two days, usually with a date and a packing list.',
    form: {
      name: 'Your name',
      email: 'Email',
      plot: 'The universe you choose',
      width: 'How many travellers',
      role: 'You are',
      roles: ['Just me', 'A couple', 'Friends', 'Family', 'A company crew'],
      message: 'Dates and anything we should know',
      submit: 'Request my ticket',
      sent: 'Your details are complete, but nothing has been sent. Please email them to hello@offmaps.travel or call +212 5 24 00 00 00.',
      error: 'Please add your name, a valid email address and the universe you choose.',
      // Nothing is sent, so the fields stay filled after a complete check: the visitor can copy
      // them into the email the status line asks for (washed-after S11).
      resetOnSuccess: false,
    },
    labels: { studio: 'Base', phone: 'Telephone', email: 'Email', hours: 'Hours' },
    address,
    phone,
    email,
    hours: 'Monday to Saturday, 9:00–19:00. Departures leave when the group is complete.',
  },
  footer: {
    mark: 'OFF MAPS',
    about: 'Mystery travel across Morocco. Pick one of three universes — Atlas, Sahara or Coast — and we plan the rest: the place, the departure, the stay and the days, sealed until it opens.',
    pagesTitle: 'Pages',
    pages: sections,
    studioTitle: 'Base',
    address,
    writeTitle: 'Write',
    email,
    phone,
    cta: { label: 'Book your ticket', href: '#contact' },
    legal: '© 2026 OFF MAPS · Mystery travel, Morocco.',
    credit: { label: '8B', href: 'https://8b.com/' },
  },
};
