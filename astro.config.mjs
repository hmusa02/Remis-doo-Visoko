// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mis.ba',
  integrations: [
    sitemap({
      // /demo je interni pregled dizajn sistema — van sitemapa.
      filter: (page) => !page.includes('/demo'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // MapLibre GL je velik, ali se učitava lijeno (ne blokira prvi paint).
      chunkSizeWarningLimit: 1500,
    },
  },
});
