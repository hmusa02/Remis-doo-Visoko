# REMIS d.o.o. — informativni sajt

Statični informativni sajt za **REMIS d.o.o. Visoko** — firmu za tehnički
pregled vozila sa 10 stanica u Federaciji BiH. Sajt je na bosanskom jeziku.

## Stack

- [Astro](https://astro.build/) — statički build (bez CMS-a i bez baze)
- [Tailwind CSS](https://tailwindcss.com/) (v4, preko `@tailwindcss/vite`)
- TypeScript (strict)
- [MapLibre GL](https://maplibre.org/) — mape (dodaje se u kasnijoj fazi)
- Deploy: [Cloudflare Pages](https://pages.cloudflare.com/)

Produkcijski URL: **https://mis.ba**

## Komande

Sve komande se pokreću iz korijena projekta:

| Komanda            | Radnja                                              |
| ------------------ | --------------------------------------------------- |
| `npm install`      | Instalira zavisnosti                                |
| `npm run dev`      | Razvojni server na `localhost:4321`                 |
| `npm run build`    | Produkcijski build u `./dist/`                      |
| `npm run preview`  | Lokalni pregled produkcijskog builda                |
| `npm run check`    | Provjera tipova i dijagnostika (`astro check`)      |

## Struktura

```
src/
  content/          content collections (stanice, usluge, oglasi)
  components/       Astro/UI komponente
  layouts/          BaseLayout i ostali layouti
  pages/            rute (statičke stranice)
  assets/stanice/   slike po stanici, folderi s prefiksom stp-
  data/             cjenovnik i statični podaci
  lib/              helperi
public/             statični fajlovi (kopiraju se kao-jesu)
```

## Faze

Radi se u 6 faza. Trenutno: **Faza 1 — skelet** (Astro + Tailwind +
TypeScript, BaseLayout, prazna naslovna, sitemap).
