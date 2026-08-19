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

/**
 * Telefon → međunarodni oblik za tel: link.
 * "061 473 515" → "+38761473515" (vodeća 0 se zamjenjuje s +387).
 */
export function telefonHref(t: string): string {
  const cifre = t.replace(/\D/g, '');
  if (cifre.startsWith('0')) return `+387${cifre.slice(1)}`;
  if (cifre.startsWith('387')) return `+${cifre}`;
  return `+${cifre}`;
}
