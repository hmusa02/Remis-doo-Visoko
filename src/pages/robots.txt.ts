import type { APIRoute } from 'astro';

/**
 * Dinamički robots.txt.
 * Dok je sajt noindex (podrazumijevano, ili PUBLIC_NOINDEX != "false"),
 * blokira se cijeli sajt. Za produkciju postavi PUBLIC_NOINDEX=false.
 */
export const GET: APIRoute = ({ site }) => {
  const indeksiranjeDozvoljeno = import.meta.env.PUBLIC_NOINDEX === 'false';

  const body = !indeksiranjeDozvoljeno
    ? `# Privremeno zatvoreno za indeksiranje (pages.dev / staging)\nUser-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\nDisallow: /demo\n\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
