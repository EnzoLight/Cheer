import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import markerIcon2xUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

const DEFAULT_CENTER = [-23.55052, -46.633308];
const DEFAULT_ZOOM = 12;

const markerIcon = new L.Icon({
  iconUrl: markerIconUrl,
  iconRetinaUrl: markerIcon2xUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

function formatAddress(evento) {
  const address = evento?.endereco ?? {};
  const street = address.rua || evento?.rua || "";
  const number = address.numero || evento?.numero || "";
  const neighborhood = address.bairro || evento?.bairro || "";
  const city = address.cidade || evento?.cidade || "";
  const state = address.uf || evento?.uf || "";

  const streetLine = [street, number].filter(Boolean).join(", ");
  const cityLine = [city, state].filter(Boolean).join(" - ");

  return [streetLine, neighborhood, cityLine].filter(Boolean).join(" • ");
}

function formatMapLabel(evento) {
  const address = formatAddress(evento);

  if (address) {
    return address;
  }

  return [evento?.cidade, evento?.uf].filter(Boolean).join(" - ") || "Local não informado";
}

function MapViewport({ markers, center }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length === 0) {
      map.setView(center ?? DEFAULT_CENTER, DEFAULT_ZOOM);
      return;
    }

    const bounds = L.latLngBounds(markers.map((marker) => marker.position));

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [32, 32], maxZoom: 15 });
    }
  }, [center, map, markers]);

  return null;
}

export default function Mapa({ eventos = [], center = null }) {
  const markers = useMemo(() => {
    return eventos
      .map((evento, index) => {
        const lat = Number(evento?.lat);
        const lng = Number(evento?.lng);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          return null;
        }

        return {
          key: evento?.id ?? `${lat}-${lng}-${index}`,
          position: [lat, lng],
          evento,
        };
      })
      .filter(Boolean);
  }, [eventos]);

  const initialCenter = center ?? markers[0]?.position ?? DEFAULT_CENTER;
  const initialZoom = markers.length > 1 ? 11 : 13;

  return (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      className="w-100 h-100"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution="&copy; Supimpa"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapViewport markers={markers} center={initialCenter} />
      {markers.map(({ key, position, evento }) => (
        <Marker key={key} position={position} icon={markerIcon}>
          <Popup>
            <strong className="d-block mb-1">{evento?.titulo || "Evento"}</strong>
            {evento?.instituicao && <span className="d-block mb-1">{evento.instituicao}</span>}
            <span className="d-block">{formatMapLabel(evento)}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
