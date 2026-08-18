/**
 * Helper za radno vrijeme stanice.
 *
 * Čista funkcija bez zavisnosti od browsera — vrijeme se računa u zoni
 * `Europe/Sarajevo` preko `Intl.DateTimeFormat`. Prima `now` kao argument
 * (default je trenutni trenutak) da bi bila lako testabilna i deterministična.
 */

export interface RadnoVrijeme {
  /** Ponedjeljak-petak, npr. "07:30-15:30" ili "zatvoreno". */
  ponPet: string;
  /** Subota. */
  subota: string;
  /** Nedjelja. */
  nedjelja: string;
}

export interface SljedecaPromjena {
  /** Da li se stanica sljedeći put otvara ili zatvara. */
  tip: 'otvara' | 'zatvara';
  /** Oznaka dana: "danas", "sutra" ili naziv dana ("ponedjeljak" ...). */
  dan: string;
  /** Vrijeme promjene, npr. "07:30". */
  vrijeme: string;
}

export interface StatusStanice {
  /** Da li je stanica trenutno otvorena. */
  otvorena: boolean;
  /** Kada se sljedeći put mijenja status; `null` ako nema radnog vremena. */
  sljedecaPromjena: SljedecaPromjena | null;
}

const VREMENSKA_ZONA = 'Europe/Sarajevo';

/** JS indeks dana (0 = nedjelja ... 6 = subota) po kratkoj engleskoj oznaci. */
const DAN_PO_OZNACI: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const NAZIV_DANA = [
  'nedjelja',
  'ponedjeljak',
  'utorak',
  'srijeda',
  'četvrtak',
  'petak',
  'subota',
];

interface Interval {
  /** Minute od ponoći kada se otvara. */
  otvara: number;
  /** Minute od ponoći kada se zatvara. */
  zatvara: number;
}

/** Parsira "HH:MM-HH:MM"; vraća `null` za "zatvoreno" ili nevažeći format. */
function parsirajInterval(vrijednost: string): Interval | null {
  const m = vrijednost.match(/^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})$/);
  if (!m) return null;
  const otvara = Number(m[1]) * 60 + Number(m[2]);
  const zatvara = Number(m[3]) * 60 + Number(m[4]);
  if (zatvara <= otvara) return null;
  return { otvara, zatvara };
}

/** Vraća interval za dati JS indeks dana. */
function intervalZaDan(rv: RadnoVrijeme, dan: number): Interval | null {
  if (dan === 0) return parsirajInterval(rv.nedjelja);
  if (dan === 6) return parsirajInterval(rv.subota);
  return parsirajInterval(rv.ponPet);
}

/** Minute od ponoći → "HH:MM". */
function uVrijeme(minute: number): string {
  const h = Math.floor(minute / 60);
  const m = minute % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** Trenutni dan/sat/minuta u zoni Europe/Sarajevo, neovisno o lokalnoj zoni. */
function trenutakUSarajevu(now: Date): { dan: number; minute: number } {
  const dijelovi = new Intl.DateTimeFormat('en-GB', {
    timeZone: VREMENSKA_ZONA,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const oznakaDana = dijelovi.find((d) => d.type === 'weekday')?.value ?? 'Mon';
  let sat = Number(dijelovi.find((d) => d.type === 'hour')?.value ?? '0');
  const minuta = Number(dijelovi.find((d) => d.type === 'minute')?.value ?? '0');
  if (sat === 24) sat = 0; // rubni slučaj ponoći kod nekih runtime-a

  return { dan: DAN_PO_OZNACI[oznakaDana] ?? 1, minute: sat * 60 + minuta };
}

/**
 * Vraća da li je stanica trenutno otvorena i kada se sljedeći put mijenja
 * status (otvara/zatvara).
 */
export function statusStanice(
  radnoVrijeme: RadnoVrijeme,
  now: Date = new Date(),
): StatusStanice {
  const { dan, minute } = trenutakUSarajevu(now);
  const danas = intervalZaDan(radnoVrijeme, dan);

  // Trenutno otvorena → sljedeća promjena je zatvaranje danas.
  if (danas && minute >= danas.otvara && minute < danas.zatvara) {
    return {
      otvorena: true,
      sljedecaPromjena: { tip: 'zatvara', dan: 'danas', vrijeme: uVrijeme(danas.zatvara) },
    };
  }

  // Zatvorena, ali se otvara kasnije danas.
  if (danas && minute < danas.otvara) {
    return {
      otvorena: false,
      sljedecaPromjena: { tip: 'otvara', dan: 'danas', vrijeme: uVrijeme(danas.otvara) },
    };
  }

  // Traži prvi naredni dan koji ima radno vrijeme (do 7 dana unaprijed).
  for (let pomak = 1; pomak <= 7; pomak++) {
    const sljedeciDan = (dan + pomak) % 7;
    const interval = intervalZaDan(radnoVrijeme, sljedeciDan);
    if (interval) {
      const oznaka = pomak === 1 ? 'sutra' : NAZIV_DANA[sljedeciDan];
      return {
        otvorena: false,
        sljedecaPromjena: { tip: 'otvara', dan: oznaka, vrijeme: uVrijeme(interval.otvara) },
      };
    }
  }

  // Nema definisanog radnog vremena ni u jednom danu.
  return { otvorena: false, sljedecaPromjena: null };
}
