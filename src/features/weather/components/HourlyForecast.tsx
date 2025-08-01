import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Clock, Thermometer, Droplets } from 'lucide-react';
import { formatHour } from '../../../utils/weatherUtils';

const HourlyForecast: React.FC = () => {
  const { hourlyForecast, loading } = useSelector((state: RootState) => state.weather);

  if (loading || !hourlyForecast || hourlyForecast.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto mb-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
        <div className="flex items-center space-x-2 mb-6">
          <Clock className="w-6 h-6 text-blue-400" />
          <h3 className="text-2xl font-bold text-white">Hourly Forecast</h3>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {hourlyForecast.map((hour, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 min-w-[120px]"
            >
              <p className="text-white font-semibold text-center mb-2">
                {index === 0 ? 'Now' : formatHour(hour.dt)}
              </p>
              
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt={hour.weather[0].description}
                className="w-12 h-12 mx-auto mb-2"
              />
              
              <div className="text-center">
                <div className="flex items-center justify-center text-white font-semibold mb-1">
                  <Thermometer className="w-4 h-4 mr-1 text-red-400" />
                  {Math.round(hour.main.temp)}°
                </div>
                
                {hour.pop > 0 && (
                  <div className="flex items-center justify-center text-white/60 text-sm">
                    <Droplets className="w-3 h-3 mr-1 text-blue-400" />
                    {Math.round(hour.pop * 100)}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;