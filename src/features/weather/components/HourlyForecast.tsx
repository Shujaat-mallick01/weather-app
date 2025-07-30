// src/features/weather/components/HourlyForecast.tsx
import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';


interface HourlyForecastProps {
  hourlyData: Array<{
    dt: number;
    temp: number;
    weather: Array<{ main: string; description: string; icon: string }>;
    pop: number; // Probability of precipitation
    rain?: { '1h': number };
    wind_speed: number;
  }>;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  const iconMap: Record<string, string> = {
    Clear: 'CLEAR_DAY',
    Clouds: 'CLOUDY',
    Rain: 'RAIN',
    Snow: 'SNOW',
    Drizzle: 'SLEET',
    Thunderstorm: 'RAIN',
    Fog: 'FOG',
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h3 className="text-white text-xl font-semibold mb-4">24-Hour Forecast</h3>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {hourlyData.slice(0, 24).map((hour, index) => (
          <div key={hour.dt} className="flex-shrink-0 bg-white/10 rounded-xl p-4 text-center min-w-[100px]">
            <p className="text-white/70 text-sm mb-2">
              {index === 0 ? 'Now' : new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' })}
            </p>
            <div className="mb-2">
              <ReactAnimatedWeather
                icon={iconMap[hour.weather[0].main] || 'CLEAR_DAY'}
                color="white"
                size={32}
                animate={true}
              />
            </div>
            <p className="text-white text-lg font-semibold mb-1">{Math.round(hour.temp)}°</p>
            {hour.pop > 0.1 && (
              <div className="flex items-center justify-center gap-1 text-blue-300 text-xs">
                <span>💧</span>
                <span>{Math.round(hour.pop * 100)}%</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};