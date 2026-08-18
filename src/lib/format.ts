/** Formatiranje za prikaz (KM cijene, datumi). */

/** 27.42 → "27,42 KM" */
export function formatKM(n: number): string {
  return `${n.toFixed(2).replace('.', ',')} KM`;
}

/** Date → "01.01.2025." (koristi UTC jer su ovo datumi bez vremena). */
export function formatDatum(d: Date): string {
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getUTCFullYear()}.`;
}
