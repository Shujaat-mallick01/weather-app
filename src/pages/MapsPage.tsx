import React from 'react';
import WeatherMap from '../features/weather/components/WeatherMap';
import { Map } from 'lucide-react';

const MapsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Map className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Weather Maps</h1>
          </div>
          <p className="text-white/70">Interactive weather maps and patterns</p>
        </div>
        
        <WeatherMap />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-3">Map Layers</h3>
            <p className="text-white/70">
              Switch between different weather layers including precipitation, temperature, 
              wind speed, and cloud coverage to get comprehensive weather insights.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-3">Real-time Data</h3>
            <p className="text-white/70">
              All map data is updated in real-time, providing you with the most current 
              weather conditions and forecasts available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsPage;