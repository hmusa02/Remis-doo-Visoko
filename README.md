# REMIS d.o.o. — informativni sajt

Statični informativni sajt za **REMIS d.o.o. Visoko** — firmu za tehnički
pregled vozila sa 10 stanica u Federaciji BiH. Sajt je na bosanskom jeziku.

## Stack

- [Astro](https://astro.build/) — statički build (bez CMS-a i bez baze)
- [Tailwind CSS](https://tailwindcss.com/) (v4, preko `@tailwindcss/vite`)
- TypeScript (strict)
- [MapLibre GL](https://maplibre.org/) — mape (OpenStreetMap, bez API ključa)
- [Web3Forms](https://web3forms.com/) — slanje formi (kontakt i prijava)
- Deploy: [Cloudflare Pages](https://pages.cloudflare.com/)

Produkcijski URL: **https://mis.ba**

## Komande

| Komanda           | Radnja                                        |
| ----------------- | --------------------------------------------- |
| `npm install`     | Instalira zavisnosti                          |
| `npm run dev`     | Razvojni server na `localhost:4321`           |
| `npm run build`   | Produkcijski build u `./dist/`                |
| `npm run preview` | Lokalni pregled produkcijskog builda          |

## Okruženje

Kopiraj `.env.example` u `.env` i popuni:

```
PUBLIC_WEB3FORMS_KEY=...   # javni ključ s https://web3forms.com (forme)
```

## Deploy — Cloudflare Pages

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Environment variable:** `PUBLIC_WEB3FORMS_KEY`
- HTTP headeri (cache + sigurnost) su u `public/_headers`.
- Oglasi se skidaju po isteku roka tek na **sljedećem buildu**, pa je
  preporučeno uključiti periodični (npr. dnevni) redeploy.

## Struktura

```
src/
  content/          content collections (stanice, usluge, oglasi)
  components/       Astro/UI komponente
  layouts/          BaseLayout, PageLayout
  pages/            rute (statičke stranice)
  assets/stanice/   slike po stanici, folderi s prefiksom stp-
  data/             cjenovnik, važenje rješenja, podaci firme
  lib/              helperi (radno vrijeme, slike, mapa, format)
public/             statični fajlovi (robots.txt, favicon, og slika, _headers)
```

---

## Održavanje sadržaja

Sav sadržaj je u `src/content/` (JSON) i `src/data/` (TS). Nakon izmjene
pokreni `npm run build` (ili push → Cloudflare rebuild).

### Dodavanje nove stanice

1. Napravi `src/content/stanice/<slug>.json` (npr. `mostar.json`). Polja
   vidi u `src/content.config.ts` — obavezni: `slug, naziv, grad, kanton,
   adresa, postanskiBroj, lat, lng, telefon, radnoVrijeme, redoslijed`.
   Opcionalni: `email, usluge, voditelj, napomena, pravnoLice`.
2. `slug` u fajlu mora biti jednak nazivu fajla.
3. Slike: napravi folder `src/assets/stanice/stp-<slug>/` i ubaci fotografije
   (vidi „Slike stanice"). Folder **mora** imati prefiks `stp-` + isti slug.
4. Stanica se automatski pojavljuje na `/stanice`, u navigaciji, na mapi,
   kontaktu i dobija svoju stranicu `/stanice/<slug>`.

### Slike stanice

- Idu u `src/assets/stanice/stp-<slug>/` — bilo koji broj `.jpg/.jpeg/.png`.
- Ne treba ih nigdje ručno navoditi — `src/lib/slike.ts` ih učita automatski
  (`import.meta.glob`), sortira po nazivu fajla i optimizuje (WebP, responsive).
- Redoslijed u galeriji = abecedni red imena fajlova (npr. `01-ulaz.jpg`).

### Objava / skidanje oglasa za posao

- Fajl: `src/content/oglasi/<slug>.json`. Polja: `slug, pozicija, stanica
  (slug stanice), tipZaposlenja, opis, uslovi[], staNudimo[], datumObjave,
  rokPrijave, aktivan`.
- Oglas je vidljiv na `/karijera` samo ako je `aktivan: true` **i** `rokPrijave`
  nije prošao. Za skidanje: postavi `aktivan: false` ili pusti da rok istekne.
- `tipZaposlenja` za Google Jobs koristi: „Puno radno vrijeme", „Pola radnog
  vremena", „Ugovor", „Sezonski".

### Izmjena cjenovnika

- Fajl: `src/data/cjenovnik.ts`.
- `vaziOd` (datum) mijenja se na vrhu fajla.
- Svaka stavka: `{ kod, kategorija, naziv, vanredni, redovni, varijanta? }`.
- **M1** je namjerno tri odvojena reda (`varijanta`: „bez R.K." / „benzin" /
  „dizel") — ne spajati u jedan red.
- Važenje rješenja je u `src/data/vazenje-rjesenja.ts`.

### Podaci firme (footer, kontakt, o nama)

- `src/data/firma.ts` — naziv, adresa sjedišta, telefon, e-mail, godina
  osnivanja, broj zaposlenih.
