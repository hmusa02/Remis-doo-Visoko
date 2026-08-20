/**
 * Suptilne animacije ulaska — minimalan JS.
 *  - `[data-reveal]`: fade-in + blagi pomak kad element uđe u vidno polje.
 *  - `[data-count]`: brojač se odbroji od nule kad postane vidljiv.
 *
 * Pravila:
 *  - Poštuje `prefers-reduced-motion` — tada se ništa ne animira, sadržaj je
 *    odmah vidljiv.
 *  - Sadržaj je uvijek u DOM-u i prikazan; skriveno početno stanje se dodaje
 *    TEK preko klase `anim-js` (ako JS ne radi, ništa se ne skriva).
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const podrska = 'IntersectionObserver' in window;

// --- Reveal ---------------------------------------------------------------
const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

if (!reduce && podrska) {
  // Skriveno početno stanje aktiviramo tek sada (JS radi) → nema FOUC-a bez JS-a.
  document.documentElement.classList.add('anim-js');

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('vidljivo');
          obs.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('vidljivo'));
}

// --- Count-up -------------------------------------------------------------
const countEls = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));

function odbroji(el: HTMLElement): void {
  const cilj = Number(el.dataset.count ?? '0');
  const trajanje = 300; // ms — ne duže od 300ms
  const pocetak = performance.now();
  function korak(sada: number): void {
    const p = Math.min(1, (sada - pocetak) / trajanje);
    el.textContent = String(Math.round(p * cilj));
    if (p < 1) requestAnimationFrame(korak);
    else el.textContent = String(cilj);
  }
  requestAnimationFrame(korak);
}

if (!reduce && podrska && countEls.length > 0) {
  const io2 = new IntersectionObserver(
    (entries, obs) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          odbroji(e.target as HTMLElement);
          obs.unobserve(e.target);
        }
      }
    },
    { threshold: 0.6 },
  );
  countEls.forEach((el) => io2.observe(el));
}
// Bez JS-a / reduced-motion: brojevi ostaju na finalnoj vrijednosti (već u DOM-u).
