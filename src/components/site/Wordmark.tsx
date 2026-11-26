import { site } from '@/content/site';

// The top-bar wordmark: the official OFF MAPS ticket logo (transparent PNG, brand asset in
// public/brand/). It replaces the template's CSS bar mark at the same slot in the brand row.
export function Wordmark() {
  return (
    <img
      src="/brand/offmaps-logo.png"
      alt={site.brand.name}
      style={{ height: 40, width: 'auto', display: 'block' }}
      decoding="async"
    />
  );
}
