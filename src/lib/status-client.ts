/**
 * Klijentska nadogradnja "live" statusa radnog vremena.
 *
 * Skenira sve elemente s `data-radno` (JSON radnog vremena), računa status
 * preko istog helpera iz faze 2 i osvježava badge + tekst. Radi bez ikakvog
 * skladištenja (nema localStorage/sessionStorage). Osvježava se svake minute.
 *
 * SSR već renderira početni status (fallback bez JS-a); ovo ga samo drži
 * tačnim u realnom vremenu u pregledniku posjetioca.
 */
import { statusStanice, type RadnoVrijeme, type StatusStanice } from './radno-vrijeme';

function opisPromjene(status: StatusStanice): string {
  const p = status.sljedecaPromjena;
  if (!p) return status.otvorena ? 'Otvoreno' : 'Zatvoreno';
  return status.otvorena
    ? `Zatvara ${p.dan} u ${p.vrijeme}`
    : `Otvara ${p.dan} u ${p.vrijeme}`;
}

function osvjezi(): void {
  const elementi = document.querySelectorAll<HTMLElement>('[data-radno]');
  elementi.forEach((el) => {
    let rv: RadnoVrijeme;
    try {
      rv = JSON.parse(el.dataset.radno ?? '');
    } catch {
      return;
    }
    const status = statusStanice(rv, new Date());

    const badge = el.querySelector<HTMLElement>('[data-status-badge]');
    if (badge) {
      badge.dataset.state = status.otvorena ? 'open' : 'closed';
      const labela = badge.querySelector<HTMLElement>('[data-status-label]');
      if (labela) labela.textContent = status.otvorena ? 'Otvoreno' : 'Zatvoreno';
    }

    const tekst = el.querySelector<HTMLElement>('[data-status-text]');
    if (tekst) tekst.textContent = opisPromjene(status);
  });
}

// Guard: modul je singleton, ali za svaki slučaj spriječi dupli interval.
const w = window as unknown as { __statusInit?: boolean };
if (!w.__statusInit) {
  w.__statusInit = true;
  osvjezi();
  document.addEventListener('DOMContentLoaded', osvjezi);
  window.setInterval(osvjezi, 60_000);
}
