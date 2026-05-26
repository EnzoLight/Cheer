import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Mapa() {
  const position = [-23.55052, -46.633308];

  return (
    <MapContainer
      center={position}
      zoom={21}
      className="w-100 h-100"
    >
      <TileLayer
        attribution="&copy; Supimpa"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>São Paulo</Popup>
      </Marker>
    </MapContainer>
  );
}
