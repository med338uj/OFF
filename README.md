# OFFmaps — voyage mystère au Maroc

Site officiel d'OFFmaps, en français : une page d'accueil animée au scroll et trois pages univers (`/atlas`, `/la-mer`, `/sahara`), plus une page 404. Construit sur le template MIT « Midblock » de [8B](https://8b.com/) ; aucun framework, aucune librairie, aucune étape de build pour la page d'accueil.

## Voir le site en local

```bash
node tools/serve.mjs
```

Puis ouvrir http://localhost:4173. (Un double-clic sur `index.html` fonctionne aussi, mais les adresses `/atlas` et la page 404 ont besoin du petit serveur.)

## Où modifier quoi

| Quoi | Où |
|---|---|
| Textes, liens et photos de la page d'accueil | `index.html` (chaque section est annoncée par un commentaire) |
| Textes des pages Atlas / La Mer / Sahara et de la 404 | `content/universes.mjs`, puis `node tools/build-pages.mjs` |
| Design des pages univers | `tools/build-pages.mjs` (bloc `section:universe`), puis relancer la commande |
| Photos | `images/offmaps/` : remplacer un fichier en gardant son nom, aucun code à toucher |
| Polices | `fonts/` (Mozilla Headline et Mozilla Text, auto-hébergées) |
| Favicon, image de partage | `favicon.svg`, `og-image.png` |

Les fichiers `atlas/index.html`, `la-mer/index.html`, `sahara/index.html` et `404.html` sont générés : ne pas les éditer à la main. Après un changement de navigation, de footer ou de couleurs dans `index.html`, relancer `node tools/build-pages.mjs` pour le reporter sur ces pages.

## Avant la mise en ligne

Données provisoires à remplacer par les vraies : l'email `hello@offmaps.travel`, le téléphone `+212 5 24 00 00 00`, l'adresse, les cinq noms et portraits de l'équipe (photos de stock), les trois témoignages, les numéros et statuts du tableau des départs.

- Le formulaire **n'envoie rien** : il vérifie les champs et affiche un message. Pour recevoir les demandes, le brancher sur Formspree ou Netlify Forms (voir `AGENTS.md`).
- Le logo officiel n'a pas été fourni : la marque est écrite en texte (`OFFmaps`) avec le pictogramme en barres du template.
- `og:image` pointe vers `/og-image.png` : le remplacer par l'adresse complète (`https://votre-domaine/og-image.png`) une fois le domaine connu.
- Aperçu en ligne : https://offmaps-ashy.vercel.app (projet Vercel `offmaps`, équipe Branchup digital). Pour le mettre à jour : `npx vercel deploy --prod` depuis ce dossier.
- Sur Vercel (ou tout hébergeur qui attend un build) : `npm run build` régénère les pages et copie le site dans `dist/`. Aucune dépendance à installer.
- Mettre en ligne le dossier tel quel sur n'importe quel hébergeur statique (Vercel, Netlify, GitHub Pages…). `tools/`, `content/` et les fichiers `.md` ne sont pas nécessaires en ligne.

## Licences

Code : MIT (`LICENSE`), crédit « Design : 8B » conservé dans le footer. Photos et polices : voir `CREDITS.md`.
