import React, { useState } from 'react';
import { Map, Layers, CloudRain, Thermometer, Wind } from 'lucide-react';

const WeatherMap: React.FC = () => {
  const [mapLayer, setMapLayer] = useState('precipitation');

  const layers = [
    { id: 'precipitation', name: 'Precipitation', icon: CloudRain },
    { id: 'temperature', name: 'Temperature', icon: Thermometer },
    { id: 'wind', name: 'Wind', icon: Wind },
    { id: 'clouds', name: 'Clouds', icon: Layers },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Map className="w-6 h-6 text-blue-400" />
          <h3 className="text-2xl font-bold text-white">Weather Map</h3>
        </div>

        {/* Layer selector */}
        <div className="flex space-x-2">
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <button
                key={layer.id}
                onClick={() => setMapLayer(layer.id)}
                className={`px-3 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                  mapLayer === layer.id
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{layer.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map placeholder */}
      <div className="relative h-96 bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Map className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/50">Interactive weather map</p>
            <p className="text-white/30 text-sm mt-2">
              Integrate with OpenWeatherMap layers API
            </p>
          </div>
        </div>
      </div>

      {/* Map controls */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <span className="text-white/60">+</span>
          </button>
          <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <span className="text-white/60">-</span>
          </button>
        </div>
        <p className="text-white/50 text-sm">
          Layer: {layers.find(l => l.id === mapLayer)?.name}
        </p>
      </div>
    </div>
  );
};

export default WeatherMap;