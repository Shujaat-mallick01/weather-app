// src/features/weather/components/UVIndex.tsx
import React from 'react';
import { getUVIndexColor } from '../../../utils/weatherUtils';

interface UVIndexProps {
  uvIndex: number;
  uvForecast?: Array<{ dt: number; uvi: number }>;
}

export const UVIndex: React.FC<UVIndexProps> = ({ uvIndex, uvForecast }) => {
  const uvInfo = getUVIndexColor(uvIndex); // Use imported utility function

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h3 className="text-white text-xl font-semibold mb-4">UV Index</h3>

      {/* Current UV Index */}
      <div className={`${uvInfo.color} rounded-xl p-4 mb-4 border border-current/30`}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-3xl font-bold">{uvIndex}</span>
            <span className="ml-3 text-lg font-medium">{uvInfo.level}</span>
          </div>
          <span className="text-3xl">{uvInfo.icon}</span>
        </div>
        <p className="text-sm opacity-90">{uvInfo.advice}</p>
      </div>

      {/* UV Scale */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-white/60 mb-1">
          <span>0</span>
          <span>5</span>
          <span>10+</span>
        </div>
        <div className="w-full h-3 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full">
          <div
            className="w-2 h-5 bg-white rounded-full shadow-lg transform -translate-y-1 transition-all duration-500"
            style={{ marginLeft: `${Math.min((uvIndex / 11) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* UV Forecast */}
      {uvForecast && (
        <div>
          <h4 className="text-white/80 text-sm font-medium mb-2">Today's UV Forecast</h4>
          <div className="flex gap-2 overflow-x-auto">
            {uvForecast.slice(0, 8).map((forecast) => (
              <div key={forecast.dt} className="flex-shrink-0 bg-white/5 rounded-lg p-2 text-center min-w-[60px]">
                <p className="text-white/60 text-xs mb-1">
                  {new Date(forecast.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' })}
                </p>
                <p className="text-white text-sm font-semibold">{Math.round(forecast.uvi)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};