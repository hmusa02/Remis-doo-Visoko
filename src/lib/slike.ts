import type { ImageMetadata } from 'astro';

/**
 * Helper za slike stanica.
 *
 * Slike stoje u `src/assets/stanice/stp-{slug}/`. Preko `import.meta.glob`
 * (eager) učitavamo SVE slike odjednom — ne navodi se ručno svaki fajl.
 * Vraćene su `ImageMetadata` vrijednosti koje se dalje optimizuju kroz Astro
 * image pipeline (`<Image />`): WebP, responsive srcset, width/height.
 *
 * Prva slika po abecedi je hero, ostale idu u galeriju. Ako folder ne postoji
 * ili je prazan, `hero` je `null` i pozivalac prikazuje neutralan placeholder.
 */

const sveSlike = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/stanice/**/*.{jpg,JPG,jpeg,JPEG,png,PNG}',
  { eager: true },
);

export interface SlikeStanice {
  /** Hero slika (prva po abecedi) ili `null` ako ih nema. */
  hero: ImageMetadata | null;
  /** Preostale slike za galeriju (bez hero). */
  galerija: ImageMetadata[];
  /** Sve slike stanice (hero + galerija). */
  sve: ImageMetadata[];
}

/** Vraća slike za dati slug stanice (folder `stp-{slug}`). */
export function slikeStanice(slug: string): SlikeStanice {
  const prefiks = `/stp-${slug}/`;

  const sve = Object.entries(sveSlike)
    .filter(([putanja]) => putanja.includes(prefiks))
    .sort(([a], [b]) => a.localeCompare(b, 'bs'))
    .map(([, modul]) => modul.default);

  return {
    hero: sve[0] ?? null,
    galerija: sve.slice(1),
    sve,
  };
}
