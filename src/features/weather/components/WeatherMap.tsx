// src/components/WeatherMap.tsx
import { useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { WeatherMapProps } from '../../../types/weather';

const WeatherMap: React.FC<WeatherMapProps> = ({ lat, lon, layer, onLayerChange }) => {
  const [mapError, setMapError] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const MAP_BASE_URL = import.meta.env.VITE_MAP_BASE_URL;

  const handleMapError = () => {
    setMapError(true);
  };

  const tileUrl = `${MAP_BASE_URL}${layer}/{z}/{x}/{y}.png?appid=${API_KEY}&opacity=0.5`;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-white text-lg font-semibold">Weather Radar</h3>
        <div className="flex gap-2">
          {['clouds_new', 'precipitation_new', 'pressure_new', 'wind_new', 'temp_new'].map((layerType) => (
            <button
              key={layerType}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                layer === layerType ? 'bg-blue-500 text-white' : 'bg-white/20 text-white/70 hover:bg-white/30'
              }`}
              onClick={() => onLayerChange(layerType)}
              aria-label={`Switch to ${layerType.replace('_new', '')} layer`}
            >
              {layerType.replace('_new', '').charAt(0).toUpperCase() + layerType.replace('_new', '').slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-64 rounded-xl overflow-hidden bg-slate-800/50">
        {!mapError ? (
          <MapContainer
            center={[lat, lon]}
            zoom={8}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              url={tileUrl}
              attribution='&copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
              eventHandlers={{ error: handleMapError }}
            />
            <ZoomControl position="bottomright" />
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-white/70">
            <div className="text-center">
              <svg
                className="w-12 h-12 mx-auto mb-2 text-white/50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <p>Map temporarily unavailable</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherMap;