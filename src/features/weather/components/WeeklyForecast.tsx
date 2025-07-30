import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather'; // Add this import
import { iconMap } from '../../../utils/weatherUtils';

interface WeeklyForecastProps {
  dailyData: Array<{
    dt: number;
    temp: { min: number; max: number };
    weather: Array<{ main: string; description: string; icon: string }>;
    pop: number;
    humidity: number;
    wind_speed: number;
    uvi: number;
  }>;
}

export const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ dailyData }) => {
  const getDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h3 className="text-white text-xl font-semibold mb-4">7-Day Forecast</h3>
      <div className="space-y-3">
        {dailyData.map((day) => (
          <div key={day.dt} className="flex items-center justify-between bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-200">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-16 text-white font-medium">
                {getDayName(day.dt)}
              </div>
              <div className="flex items-center gap-3">
                <ReactAnimatedWeather
                  icon={iconMap[day.weather[0].main] || 'CLEAR_DAY'}
                  color="white"
                  size={40}
                  animate={true}
                />
                <div>
                  <p className="text-white/90 capitalize text-sm">{day.weather[0].description}</p>
                  {day.pop > 0.1 && (
                    <p className="text-blue-300 text-xs">💧 {Math.round(day.pop * 100)}%</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-white/60 text-xs">UV</p>
                <p className="text-orange-300 text-sm font-medium">{Math.round(day.uvi)}</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs">Wind</p>
                <p className="text-green-300 text-sm font-medium">{Math.round(day.wind_speed)} m/s</p>
              </div>
              <div className="text-right">
                <div className="flex gap-2 items-center">
                  <span className="text-white text-lg font-semibold">{Math.round(day.temp.max)}°</span>
                  <span className="text-white/60 text-lg">{Math.round(day.temp.min)}°</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};