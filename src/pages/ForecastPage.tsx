import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import ForecastSearch from '../features/weather/ForecastSearch';
import WeeklyForecast from '../features/weather/components/WeeklyForecast';
import HourlyForecast from '../features/weather/components/HourlyForecast';
import { Calendar } from 'lucide-react';

const ForecastPage: React.FC = () => {
  const { currentWeather } = useSelector((state: RootState) => state.weather);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Calendar className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Extended Forecast</h1>
          </div>
          <p className="text-white/70">Detailed weather predictions for the week ahead</p>
        </div>

        <ForecastSearch />

        {currentWeather ? (
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-2">
                {currentWeather.name}, {currentWeather.sys.country}
              </h2>
              <p className="text-white/70">
                Current: {Math.round(currentWeather.main.temp)}°C - {currentWeather.weather[0].description}
              </p>
            </div>

            <HourlyForecast />
            <WeeklyForecast />
          </div>
        ) : (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/50 text-lg">
              Search for a city to see the extended forecast
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForecastPage;