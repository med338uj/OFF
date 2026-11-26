import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
// The template's own cascade layers. Tailwind's index.css (preflight) is not loaded:
// its unlayered resets would override every layered rule of the design.
import './styles/site/index.css';
import './styles/not-found.css';
import './styles/brand.css';

// Frontend-only: render without waiting for FuncSea runtime configuration.
const root = document.getElementById('root')!;
const prerenderedHome = document.querySelector(
  'meta[name="prerender-static-page"][content="home"]',
);

if (prerenderedHome && root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
