/**
 * Podaci o firmi (sjedište). Sjedište NIJE stanica tehničkog pregleda —
 * koristi se u footeru, kontaktu i Organization schemi.
 * Fax i brojevi bankovnih računa se NE prikazuju na sajtu.
 */
export const firma = {
  /** Kratki naziv za prikaz. */
  naziv: 'REMIS d.o.o. Visoko',
  /** Puni pravni naziv (memorandum). */
  puniNaziv:
    '"REMIS" Društvo za trgovinu na veliko i malo i usluge d.o.o. Visoko',
  adresa: 'Kakanjska bb',
  postanskiBroj: '71300',
  grad: 'Visoko',
  telefon: '032 730 300',
  email: 'info@remis.ba',
  web: 'www.remis.ba',
  /** Registarski podaci (memorandum). */
  sud: 'Kantonalni sud u Zenici',
  maticniBroj: '43-01-0121-10',
  idBroj: '4218273470000',
  /** Godina osnivanja. */
  osnovana: 1990,
  /** Približan broj zaposlenih. */
  zaposleni: 55,
} as const;
