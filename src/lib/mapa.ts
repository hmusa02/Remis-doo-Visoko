import 'maplibre-gl/dist/maplibre-gl.css';
import type { Map as MLMap, Marker as MLMarker, StyleSpecification } from 'maplibre-gl';

/**
 * MapLibre GL helper. OpenStreetMap raster pločice — bez API ključa.
 * MapLibre se učitava dinamički (`await import`) tek kad se mapa treba
 * inicijalizirati, da ne blokira prvi paint.
 */

export interface MarkerPodatak {
  slug: string;
  naziv: string;
  lng: number;
  lat: number;
}

const OSM_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© OpenStreetMap suradnici',
    },
  },
  layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
};

export interface MapaRezultat {
  map: MLMap;
  markeri: Record<string, MLMarker>;
}

export interface MapaOpcije {
  zoom?: number;
  onMarkerClick?: (slug: string) => void;
  /** Ako je zadano, marker dobija popup s ovim HTML-om. */
  popupHtml?: (m: MarkerPodatak) => string;
}

/** Inicijalizira mapu s markerima. Vraća `null` ako nema markera. */
export async function inicijalizirajMapu(
  kontejner: HTMLElement,
  markeri: MarkerPodatak[],
  opcije: MapaOpcije = {},
): Promise<MapaRezultat | null> {
  if (markeri.length === 0) return null;

  const maplibre = await import('maplibre-gl');

  const map = new maplibre.Map({
    container: kontejner,
    style: OSM_STYLE,
    center: [markeri[0]!.lng, markeri[0]!.lat],
    zoom: opcije.zoom ?? 13,
    attributionControl: { compact: true },
  });
  map.addControl(new maplibre.NavigationControl({ showCompass: false }), 'top-right');

  const refs: Record<string, MLMarker> = {};
  const bounds = new maplibre.LngLatBounds();

  for (const m of markeri) {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'mapa-marker';
    el.setAttribute('aria-label', m.naziv);

    const marker = new maplibre.Marker({ element: el })
      .setLngLat([m.lng, m.lat])
      .addTo(map);

    if (opcije.popupHtml) {
      marker.setPopup(
        new maplibre.Popup({ offset: 16, closeButton: false }).setHTML(opcije.popupHtml(m)),
      );
    }
    if (opcije.onMarkerClick) {
      el.addEventListener('click', () => opcije.onMarkerClick!(m.slug));
    }

    refs[m.slug] = marker;
    bounds.extend([m.lng, m.lat]);
  }

  if (markeri.length > 1) {
    map.fitBounds(bounds, { padding: 56, maxZoom: 12, duration: 0 });
  }

  return { map, markeri: refs };
}
