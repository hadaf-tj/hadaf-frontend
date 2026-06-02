// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors

/* FILE: components/specific/MapView.tsx */
"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: string;
  needsCount: number;
}

// Next.js Leaflet icon workaround
const iconUrl = "https:////unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
const iconRetinaUrl =
  "https:////unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png";
const shadowUrl =
  "https:////unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";

// Map pin styling
const customIcon = L.icon({
  iconUrl: iconUrl,
  iconRetinaUrl: iconRetinaUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CENTER_POS: [number, number] = [38.5598, 68.787];

interface MapViewProps {
  locations: MapLocation[];
}

const MapView: React.FC<MapViewProps> = ({ locations }) => {
  return (
    <MapContainer
      center={CENTER_POS}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false} // Custom map zoom controls setup
    >
      {/* Слой карты (Бесплатный OpenStreetMap) */}
      <TileLayer
        attribution='&copy; <a href="https:////www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Кнопки зума справа внизу */}
      <ZoomControl position="bottomright" />

      {/* Рендеринг маркеров */}
      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
          <Popup className="custom-popup">
            <div className="p-1 min-w-[200px]">
              <div className="text-xs font-bold text-gray-400 uppercase mb-1">
                {loc.type === "children"
                  ? "Детский дом"
                  : loc.type === "elderly"
                    ? "Дом престарелых"
                    : "Спец. центр"}
              </div>
              <h3 className="font-bold text-[#1e3a8a] text-lg mb-1">
                {loc.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {loc.needsCount} открытых нужд
              </p>
              <Link
                href={`/institutions/${loc.id}`}
                className="flex items-center justify-between text-sm font-bold text-white bg-[#1e3a8a] px-3 py-2 rounded-lg hover:bg-[#2a4ec2] transition-colors"
              >
                Помочь
                <ArrowRight size={14} />
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
