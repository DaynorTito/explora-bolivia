import React from 'react';
import { Map as MapIcon } from 'lucide-react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

interface CustomIconDefault extends L.Icon.Default {
  _getIconUrl?: () => void;
}

delete (L.Icon.Default.prototype as CustomIconDefault)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: iconUrl.src,
  iconRetinaUrl: iconRetinaUrl.src,
  shadowUrl: shadowUrl.src,
});

interface DestinationMapProps {
  latitude: number;
  longitude: number;
  title: string;
  location: string;
}

const DestinationMap: React.FC<DestinationMapProps> = ({
  latitude,
  longitude,
  title,
  location
}) => {
  const position: [number, number] = [latitude, longitude];

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <MapIcon className="text-[#618725]" size={24} />
        <h2 className="text-2xl font-semibold">Ubicación</h2>
      </div>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={position}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <div className="font-medium">{title}</div>
              <div className="text-sm text-gray-600">{location}</div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default DestinationMap;
