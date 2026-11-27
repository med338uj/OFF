// Copies the finished site into dist/ for hosts that expect a build step (Vercel's Vite preset: `npm run build` -> dist).
// Nothing is transformed: the site is plain static files. No dependencies.  Run:  npm run build

import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(site, 'dist');
const publish = ['index.html', '404.html', 'atlas', 'la-mer', 'sahara', 'images', 'fonts', 'favicon.svg', 'og-image.png', 'LICENSE', 'CREDITS.md'];

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
for (const entry of publish) cpSync(join(site, entry), join(dist, entry), { recursive: true });
console.log(`dist/ ready: ${publish.join(', ')}`);
