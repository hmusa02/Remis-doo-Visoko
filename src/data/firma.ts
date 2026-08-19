/**
 * Podaci o firmi (sjedište). Sjedište NIJE stanica tehničkog pregleda —
 * koristi se u footeru i kontakt podacima, ne u listi stanica.
 */
export const firma = {
  naziv: 'REMIS d.o.o. Visoko',
  adresa: 'Kakanjska bb',
  postanskiBroj: '71300',
  grad: 'Visoko',
  telefon: '032/730-300',
  email: 'info@remis.ba',
  /** Godina osnivanja. */
  osnovana: 1990,
  /** Približan broj zaposlenih. */
  zaposleni: 55,
} as const;
