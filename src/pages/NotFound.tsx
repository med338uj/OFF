import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { site } from '@/content/site';

// In-app page for unknown paths (not part of the one-page template).
export default function NotFound() {
  useEffect(() => {
    document.title = `${site.notFound.title} — ${site.brand.name}`;
  }, []);

  return (
    <main className="not-found">
      <p className="m-text-2">404</p>
      <h1 className="m-text-3">{site.notFound.title}</h1>
      <p className="m-text">{site.notFound.text}</p>
      <Link className="m-btn" to="/">
        <span className="m-btn__label">{site.notFound.back}</span>
      </Link>
    </main>
  );
}
