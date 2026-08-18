/**
 * Koliko dugo važi rješenje (registracija) ovisno o starosti vozila.
 * Izvor: važeći propisi o registraciji vozila u FBiH.
 */

export interface VazenjeRjesenja {
  /** Opis kategorije vozila prema starosti. */
  opis: string;
  /** Trajanje kao tekst za prikaz, npr. "5 godina". */
  trajanje: string;
  /** Trajanje u godinama (za eventualni izračun). */
  godine: number;
}

export const vazenjeRjesenja: VazenjeRjesenja[] = [
  { opis: 'Novoproizvedeno vozilo', trajanje: '5 godina', godine: 5 },
  { opis: 'Vozilo staro 1-2 godine', trajanje: '4 godine', godine: 4 },
  { opis: 'Vozilo staro 2-8 godina', trajanje: '3 godine', godine: 3 },
  { opis: 'Vozilo staro 8-10 godina', trajanje: '2 godine', godine: 2 },
  { opis: 'Vozilo starije od 10 godina', trajanje: '1 godina', godine: 1 },
];
