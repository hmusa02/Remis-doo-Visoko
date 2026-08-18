import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Kantoni Federacije BiH (kodovi). */
const KANTONI = [
  'USK', // Unsko-sanski
  'PK', // Posavski
  'TK', // Tuzlanski
  'ZE-DO', // Zeničko-dobojski
  'BPK', // Bosansko-podrinjski
  'SBK', // Srednjobosanski
  'HNK', // Hercegovačko-neretvanski
  'ZHK', // Zapadnohercegovački
  'KS', // Kanton Sarajevo
  'K10', // Kanton 10
] as const;

/**
 * Stanice tehničkog pregleda — centralni entitet.
 * `usluge` i `voditelj` su OPCIONALNI: ti podaci stižu u kasnijoj fazi,
 * pa schema mora validirati i bez njih.
 */
const stanice = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/stanice' }),
  schema: z.object({
    slug: z.string(),
    naziv: z.string(),
    grad: z.string(),
    kanton: z.enum(KANTONI),
    adresa: z.string(),
    postanskiBroj: z.string(),
    lat: z.number(),
    lng: z.number(),
    telefon: z.string(),
    email: z.string().email().optional(),
    radnoVrijeme: z.object({
      ponPet: z.string(),
      subota: z.string(),
      nedjelja: z.string(),
    }),
    usluge: z.array(z.string()).optional(),
    voditelj: z
      .object({
        ime: z.string(),
        telefon: z.string(),
      })
      .optional(),
    napomena: z.string().optional(),
    pravnoLice: z.string().optional(),
    redoslijed: z.number(),
  }),
});

/** Usluge koje stanice nude. `potrebniDokumenti` i `trajanje` stižu kasnije. */
const usluge = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/usluge' }),
  schema: z.object({
    slug: z.string(),
    naziv: z.string(),
    kratkiOpis: z.string(),
    opis: z.string(),
    potrebniDokumenti: z.array(z.string()).optional(),
    trajanje: z.string().optional(),
    ikona: z.string(),
    redoslijed: z.number(),
  }),
});

/** Oglasi za posao, vezani za pojedinu stanicu (slug). */
const oglasi = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/oglasi' }),
  schema: z.object({
    slug: z.string(),
    pozicija: z.string(),
    stanica: z.string(),
    tipZaposlenja: z.string(),
    opis: z.string(),
    uslovi: z.array(z.string()),
    staNudimo: z.array(z.string()),
    datumObjave: z.coerce.date(),
    rokPrijave: z.coerce.date(),
    aktivan: z.boolean(),
  }),
});

export const collections = { stanice, usluge, oglasi };
