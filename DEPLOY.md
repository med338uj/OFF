# Déployer le site OFF MAPS sur GitHub + Vercel

Le site est un site statique Vite + React. Le build a été testé : `npm run build`
fonctionne (pages `/` et `/blog/` pré-rendues). Vercel reconstruit le site
lui-même à chaque `git push` — aucun serveur ni base de données nécessaires.

## Étape 1 — Créer le dépôt GitHub (compte gratuit)

1. Allez sur **github.com** → connectez-vous (ou créez un compte).
2. En haut à droite : **« + » → New repository**.
3. Nom du dépôt : `offmaps` — visibilité **Private** ou **Public**, peu importe.
4. **Ne cochez rien** d'autre (pas de README, pas de .gitignore : le projet en
   contient déjà un) → **Create repository**.

## Étape 2a — Envoyer les fichiers (sans terminal)

1. Décompressez `offmaps-github.zip` : vous obtenez un dossier `offmaps/`.
2. Sur la page de votre nouveau dépôt vide, cliquez
   **« uploading an existing file »**.
3. Glissez-déposez **tout le contenu du dossier `offmaps/`** (fichiers + les
   dossiers `src`, `public`, `plugins`, `prerender` — jamais `node_modules`,
   il n'est pas dans le zip) → **Commit changes**.

## Étape 2b — Envoyer les fichiers (avec le terminal)

```bash
cd offmaps
git init
git add .
git commit -m "OFF MAPS site"
git remote add origin https://github.com/VOTRE-COMPTE/offmaps.git
git branch -M main
git push -u origin main
```

Remplacez `VOTRE-COMPTE` par votre nom d'utilisateur GitHub. GitHub demandera
de vous connecter au premier push (navigateur ou token).

## Étape 3 — Déployer sur Vercel

1. Allez sur **vercel.com** → **Sign Up with GitHub** (compte gratuit).
2. Dashboard : **Add New… → Project** → **Import** le dépôt `offmaps`.
3. Vercel détecte Vite automatiquement. Vérifiez si besoin :
   - Framework Preset : **Vite**
   - Build Command : `npm run build`
   - Output Directory : `dist`
4. Cliquez **Deploy** — en ~1 minute vous obtenez une URL permanente du type
   `https://offmaps.vercel.app` (HTTPS inclus).

Le fichier `vercel.json` (déjà inclus) sert `index.html` pour les URLs
inconnues : la page 404 « This page missed the departure » s'affiche
correctement et `/blog/` reste servi tel quel.

## Mettre le site à jour

Modifiez les fichiers (par ex. `src/content/site.ts`), puis :

```bash
git add . && git commit -m "Mise à jour" && git push
```

Vercel redéploie automatiquement à chaque push.

## Option alternative — Vercel en ligne de commande

```bash
npm install -g vercel
cd offmaps
vercel login      # s'ouvre dans le navigateur
vercel --prod     # défauts OK, framework Vite
```

## Rappel des emplacements d'images

Les photos à remplacer sont listées dans `IMAGE-SLOTS.md`. Les originaux sont
dans `public/images/offmaps/originals/` ; après modification d'une image dans
`public/images/offmaps/`, le prochain `git push` suffit (Vercel relance le
build).
