import type { Photo } from '@/content/site';

type Props = { photo: Photo; className?: string; lazy?: boolean; priority?: boolean };

// One photo slot: src, alt, intrinsic size for the ratio, optional object-position.
export function Img({ photo, className, lazy = true, priority = false }: Props) {
  return (
    <img
      className={className}
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading={lazy ? 'lazy' : undefined}
      // React 18 does not know fetchPriority as a camel-cased prop; pass the HTML attribute.
      {...(priority ? { fetchpriority: 'high' } : {})}
      style={photo.position ? { objectPosition: photo.position } : undefined}
    />
  );
}
