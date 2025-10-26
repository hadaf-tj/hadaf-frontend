'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- ГАРАНТИРОВАННОЕ РЕШЕНИЕ: Прямые URL из папки /public ---
// УДАЛЯЕМ все импорты изображений (import iconUrl from '...')

// Создаем объект иконки, указывая прямые пути к файлам в /public
const customIcon = new L.Icon({
  iconUrl: '/leaflet/images/marker-icon.png',
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
// --- Конец решения ---

interface InstitutionForMap {
  id: string;
  name: string;
  position: [number, number];
}

interface MapViewProps {
  institutions: InstitutionForMap[];
}

const MapView: React.FC<MapViewProps> = ({ institutions }) => {
  const mapCenter: [number, number] = [38.5598, 68.7870]; // Центр Душанбе

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {institutions.map(inst => (
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