import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Calendar, Thermometer, Droplets, Wind } from 'lucide-react';
import { getDayName } from '../../../utils/weatherUtils';

const WeeklyForecast: React.FC = () => {
  const { forecast, loading } = useSelector((state: RootState) => state.weather);

  if (loading || !forecast || forecast.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="w-6 h-6 text-blue-400" />
          <h3 className="text-2xl font-bold text-white">5-Day Forecast</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-center">
                <p className="text-white font-semibold text-lg mb-2">
                  {index === 0 ? 'Today' : getDayName(day.date)}
                </p>
                
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                  alt={day.weather.description}
                  className="w-16 h-16 mx-auto"
                />
                
                <p className="text-white/70 text-sm mb-3 capitalize">
                  {day.weather.description}
                </p>

                <div className="flex justify-center space-x-3 mb-3">
                  <div className="flex items-center">
                    <Thermometer className="w-4 h-4 text-red-400 mr-1" />
                    <span className="text-white font-semibold">
                      {Math.round(day.temp.max)}°
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Thermometer className="w-4 h-4 text-blue-400 mr-1 rotate-180" />
                    <span className="text-white/70">
                      {Math.round(day.temp.min)}°
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  {day.pop > 0 && (
                    <div className="flex items-center justify-center text-white/60">
                      <Droplets className="w-4 h-4 mr-1 text-blue-400" />
                      <span>{Math.round(day.pop * 100)}%</span>
                    </div>
                  )}
                  <div className="flex items-center justify-center text-white/60">
                    <Wind className="w-4 h-4 mr-1" />
                    <span>{day.wind} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyForecast;