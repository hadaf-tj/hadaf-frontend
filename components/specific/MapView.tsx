'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 1. УДАЛЯЕМ все старые импорты иконок (iconRetinaUrl, iconUrl, shadowUrl)

// 2. СОЗДАЕМ SVG-иконку с вашим фиолетовым цветом
const iconHtml = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="#1e3a8a">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 7 12 7s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
</svg>`;

// 3. Создаем DivIcon
const customIcon = new L.DivIcon({
  html: iconHtml,
  className: '', // Убираем рамку по умолчанию у divIcon
  iconSize: [36, 36], // Размер SVG
  iconAnchor: [18, 36], // Точка "ножки" маркера (середина-низ)
  popupAnchor: [0, -36] // Куда "всплывет" попап
});

interface InstitutionForMap {
  id: string;
  name: string;
  position: [number, number];
}

interface MapViewProps {
  institutions: InstitutionForMap[];
}

const MapView: React.FC<MapViewProps> = ({ institutions }) => {
  const mapCenter: [number, number] = [38.5598, 68.7870];

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
      {/* Используем красивый скин карты */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {institutions.map(inst => (
        // Маркер теперь использует нашу фиолетовую SVG-иконку
        <Marker key={inst.id} position={inst.position} icon={customIcon}>
          <Popup>
            <a href={`/institutions/${inst.id}`} className="font-bold hover:underline">
              {inst.name}
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;