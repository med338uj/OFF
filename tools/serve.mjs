// Tiny local preview server, no dependencies:  node tools/serve.mjs  →  http://localhost:4173
// Serves the site folder as a static host would: folder URLs open their index.html,
// unknown addresses get 404.html.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT) || 4173;
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8',
};
const hidden = /^(tools|content|node_modules|\.[^/]*)(\/|$)|\.md$/i;

const find = async pathname => {
  const clean = normalize(decodeURIComponent(pathname)).split(sep).join('/').replace(/^\/+/, '');
  if (clean.includes('..') || hidden.test(clean)) return null;
  let file = join(site, clean);
  try {
    const info = await stat(file);
    if (info.isDirectory()) {
      if (!pathname.endsWith('/')) return { redirect: pathname + '/' };
      file = join(file, 'index.html');
      await stat(file);
    }
    return { file };
  } catch { return null; }
};

createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost');
  const hit = await find(url.pathname);
  if (hit?.redirect) { response.writeHead(301, { Location: hit.redirect + url.search }); response.end(); return; }
  const file = hit?.file ?? join(site, '404.html');
  try {
    const body = await readFile(file);
    response.writeHead(hit ? 200 : 404, { 'Content-Type': types[extname(file).toLowerCase()] ?? 'application/octet-stream', 'Cache-Control': 'no-cache' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('404');
  }
}).listen(port, () => console.log(`OFFmaps preview: http://localhost:${port}`));
