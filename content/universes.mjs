// Content of the three universe pages (/atlas, /la-mer, /sahara) and of the 404 page.
// Edit the text here, then run:  node tools/build-pages.mjs
// Straight apostrophes and plain spaces are fine: the build turns them into French typography (’ and non-breaking spaces).

export const mysteryNote =
  "Ces villes sont nos territoires — les routes que notre crew éclaire toute l'année. Votre ticket n'en révélera qu'une, ou aucune : si l'endroit parfait pour vos dates est ailleurs, nous y allons. Le mystère reste entier.";

export const placesTitle = "Les villes et lieux que nous éclairons";
export const cta = { book: "Réserver votre ticket", home: "Retour à l'accueil" };

export const universes = [
  {
    slug: "atlas",
    name: "Atlas",
    tagline: "Montagnes · Villages · Lodges",
    intro:
      "L'Atlas, c'est l'air qui se rafraîchit à mesure que la route monte : noyeraies, cèdres, villages de torchis et lodges de vallée. Voici les villes et lieux que notre crew éclaire toute l'année.",
    photo: { src: "images/offmaps/univers-atlas.webp", width: 1024, height: 1536, position: "50% 62%", alt: "Village de l'Atlas et son minaret au pied de sommets enneigés" },
    places: [
      { name: "Imouzzer Kandar", text: "Village de sources et de vergers au pied du Moyen Atlas, tout près d'Ifrane : air pur, neige en hiver, pique-nique au bord de l'eau et premières pistes dans les cèdres." },
      { name: "Ifrane", text: "La « petite Suisse » du Maroc : toits de tuiles rouges, sapinières et cèdres, neige l'hiver. Base idéale des sentiers du parc national, entre macaques de Barbarie et lacs de montagne." },
      { name: "Toubkal", text: "Le toit de l'Afrique du Nord (4 167 m) : vallées du Haut Atlas, villages de torchis, refuges de montagne et, pour les départs qui le veulent, un sommet qui se mérite." },
      { name: "Khénifra", text: "Capitale du tapis amazighe du Moyen Atlas, entre rivière et lacs d'altitude : vallées tranquilles, gorges discrètes et villages où chaque tapis raconte la vallée qui l'a vu naître." },
      { name: "Azrou", text: "Son nom amazigh signifie « le rocher ». Forêts de cèdres centenaires, troupes de macaques, coopératives de tapis et l'un des marchés berbères les plus vivants du Moyen Atlas." },
    ],
    meta: {
      title: "Atlas — univers montagnes, villages et lodges · OFFmaps",
      description: "Les villes et territoires de l'univers Atlas d'OFFmaps : Imouzzer Kandar, Ifrane, Toubkal, Khénifra, Azrou. Choisissez l'ambiance, nous scellons le lieu.",
    },
  },
  {
    slug: "la-mer",
    name: "La Mer",
    tagline: "Océan · Surf · Villages de pêcheurs",
    intro:
      "La Mer, c'est l'Atlantique au quotidien : bateaux bleus, ruelles blanches, matins de surf et après-midis de terrasse. Voici les côtes que nous connaissons par cœur.",
    photo: { src: "images/offmaps/univers-la-mer.webp", width: 1536, height: 1152, position: "42% 60%", alt: "Coucher de soleil sur l'Atlantique, vagues sur une plage tranquille" },
    places: [
      { name: "Essaouira", text: "La cité fortifiée face à l'Atlantique : remparts et bateaux bleus, alizés toute l'année, port de pêche, musique gnaoua. Matins de surf, après-midis de terrasses et de ruelles blanches." },
      { name: "Sidi Kaouki", text: "Le calme à vingt minutes au sud d'Essaouira : une dune, un phare, des cavaliers au galop sur la plage et une ferme perdue pour les déjeuners longs." },
      { name: "Imsouane", text: "La baie aux deux vagues, entre Essaouira et Agadir : des rides tranquilles qui durent des minutes, des cabanes de pêcheurs et des nuits au son des vagues." },
      { name: "Taghazout", text: "Le village de surf devenu légende : points de classe mondiale, cafés de bord de mer où pêcheurs et surfeurs partagent la table, couchers de soleil sur les spots du nord." },
      { name: "Mirleft", text: "Plus au sud, les falaises rouges et les plages sauvages : débuts en surf tranquilles, promenades entre palmiers et océan, couchers de soleil qui font oublier l'heure du retour." },
    ],
    meta: {
      title: "La Mer — univers océan, surf et villages de pêcheurs · OFFmaps",
      description: "Les villes et côtes de l'univers La Mer d'OFFmaps : Essaouira, Sidi Kaouki, Imsouane, Taghazout, Mirleft. Choisissez l'ambiance, nous scellons le lieu.",
    },
  },
  {
    slug: "sahara",
    name: "Sahara",
    tagline: "Dunes · Camps · Culture nomade",
    intro:
      "Le Sahara, c'est le moment où la route s'arrête et que le sable commence : dunes, camps, thé nomade et un ciel qui n'a pas de fin. Voici nos portes du désert.",
    photo: { src: "images/offmaps/univers-sahara.webp", width: 1024, height: 1280, position: "60% 58%", alt: "Caravane de chameaux sur une crête de dunes dorées" },
    places: [
      { name: "Merzouga", text: "Au pied de l'Erg Chebbi, les dunes de l'imaginaire : sable orange, bivouacs au bord des dunes, caravanes au lever du jour et nuits avec plus d'étoiles que de ciel." },
      { name: "Rissani", text: "Héritière de Sijilmassa, la cité caravanière aux dizaines de ksour : son souk — dattes, ânes, épices — est l'un des plus authentiques du sud-est, et les dattes Majhoul y ont leur royaume." },
      { name: "Zagora", text: "Les portes du désert profond : palmeraies de la vallée du Drâa, jardins de dattes, et ce fameux panneau qui annonce Tombouctou à 52 jours. Premier goût du silence." },
      { name: "M'Hamid El Ghizlane", text: "Le bout de la route goudronnée, dernière porte avant le sable infini : caravanes chamelières, bivouacs nomades et l'accès à l'Erg Chigaga par trois heures de piste." },
      { name: "Erg Chigaga", text: "Les grandes dunes sauvages : plus loin que Chebbi, presque personne, des crêtes à perte de vue et des couchers de soleil que les photos n'attrapent pas." },
    ],
    meta: {
      title: "Sahara — univers dunes, camps et culture nomade · OFFmaps",
      description: "Les villes et portes du désert de l'univers Sahara d'OFFmaps : Merzouga, Rissani, Zagora, M'Hamid El Ghizlane, Erg Chigaga. Choisissez l'ambiance, nous scellons le lieu.",
    },
  },
];

export const notFound = {
  metaTitle: "Cette page a raté le départ · OFFmaps",
  title: "Cette page a raté le départ",
  text: "Nous avons marché toute la route et rien trouvé à cette adresse. Les univers, les départs et le formulaire de réservation sont sur la première page.",
  button: "Retour au premier écran",
};
