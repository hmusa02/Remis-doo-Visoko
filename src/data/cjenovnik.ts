/**
 * Cjenovnik tehničkog pregleda. Sve cijene su u KM (bez PDV-a nije naznačeno
 * u izvoru — prikazati kako jeste).
 *
 * Dvije kolone:
 *   - `vanredni`: vanredni / šestomjesečni / preventivni pregled
 *   - `redovni`:  redovni / eksploatacioni pregled
 *
 * Napomena: M1 (putnički automobil) ima TRI zasebna zapisa (bez R.K., benzin,
 * dizel) jer se te tri cijene moraju moći prikazati kao tri odvojena reda.
 */

/** Datum od kojeg cjenovnik važi. TODO: potvrditi tačan datum s firmom. */
export const vaziOd = new Date('2025-01-01');

export type KategorijaVozila =
  | 'Motocikli'
  | 'Putnička'
  | 'Teretna'
  | 'Priključna'
  | 'Traktori';

export interface StavkaCjenovnika {
  /** Šifra kategorije vozila, npr. "M1", "L1-L2". */
  kod: string;
  /** Grupa kojoj stavka pripada. */
  kategorija: KategorijaVozila;
  /** Opis/naziv reda kako se prikazuje korisniku. */
  naziv: string;
  /** Vanredni / šestomjesečni / preventivni pregled (KM). */
  vanredni: number;
  /** Redovni / eksploatacioni pregled (KM). */
  redovni: number;
  /** Varijanta reda (koristi se za M1: "bez R.K.", "benzin", "dizel"). */
  varijanta?: string;
}

export const cjenovnik: StavkaCjenovnika[] = [
  // MOTOCIKLI
  { kod: 'L1-L2', kategorija: 'Motocikli', naziv: 'L1-L2 (do 50 cm³)', vanredni: 12.83, redovni: 31.5 },
  { kod: 'L3-L5', kategorija: 'Motocikli', naziv: 'L3-L5 (preko 50 cm³)', vanredni: 15.17, redovni: 36.16 },
  { kod: 'L6-L7', kategorija: 'Motocikli', naziv: 'L6-L7 (masa do 400 kg)', vanredni: 18.08, redovni: 41.99 },

  // PUTNIČKA — M1 razbijen na tri zasebna reda
  { kod: 'M1', kategorija: 'Putnička', naziv: 'M1 automobil (do 8 sjedišta)', varijanta: 'bez R.K.', vanredni: 27.42, redovni: 76.83 },
  { kod: 'M1', kategorija: 'Putnička', naziv: 'M1 automobil (do 8 sjedišta)', varijanta: 'benzin', vanredni: 27.42, redovni: 86.83 },
  { kod: 'M1', kategorija: 'Putnička', naziv: 'M1 automobil (do 8 sjedišta)', varijanta: 'dizel', vanredni: 27.42, redovni: 90.83 },
  { kod: 'M2', kategorija: 'Putnička', naziv: 'M2 minibus (preko 8 sj., do 5 t)', vanredni: 37.33, redovni: 110.66 },
  { kod: 'M3', kategorija: 'Putnička', naziv: 'M3 autobus (preko 8 sj., preko 5 t)', vanredni: 44.91, redovni: 125.83 },

  // TERETNA
  { kod: 'N1', kategorija: 'Teretna', naziv: 'N1 (do 3,5 t)', vanredni: 32.67, redovni: 101.33 },
  { kod: 'N2', kategorija: 'Teretna', naziv: 'N2 (3,5-12 t)', vanredni: 44.91, redovni: 125.83 },
  { kod: 'N3', kategorija: 'Teretna', naziv: 'N3 (preko 12 t)', vanredni: 49.58, redovni: 135.16 },

  // PRIKLJUČNA
  { kod: 'O1', kategorija: 'Priključna', naziv: 'O1 (do 0,75 t)', vanredni: 9.92, redovni: 19.83 },
  { kod: 'O2', kategorija: 'Priključna', naziv: 'O2 (0,75-3,5 t)', vanredni: 25.08, redovni: 50.16 },
  { kod: 'O3', kategorija: 'Priključna', naziv: 'O3 (3,5-10 t)', vanredni: 35.0, redovni: 70.0 },
  { kod: 'O4', kategorija: 'Priključna', naziv: 'O4 (preko 10 t)', vanredni: 39.66, redovni: 79.33 },

  // TRAKTORI
  { kod: 'T1-T5', kategorija: 'Traktori', naziv: 'T1-T5', vanredni: 25.08, redovni: 50.16 },
];
