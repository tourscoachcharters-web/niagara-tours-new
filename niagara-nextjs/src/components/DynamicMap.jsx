"use client";

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Interactive map for the Checkout Page
export const LocationMarkerMap = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onLocationSelect(`Map Pin: ${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`);
      },
    });
    return position === null ? null : (
      <Marker position={position}><Popup>Your Pickup Location</Popup></Marker>
    );
  };

  return (
    <MapContainer center={[43.655, -79.385]} zoom={11} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
};

// Static map for the Tour Details Page
export const StaticPointsMap = ({ points }) => {
  return (
    <MapContainer center={[43.655, -79.385]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', zIndex: 0 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {points.map((p, i) => (
        <Marker key={i} position={[p.lat, p.lng]}>
          <Popup><strong className="block">{p.name}</strong>{p.time}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};