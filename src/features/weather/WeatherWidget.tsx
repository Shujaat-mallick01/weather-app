import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { 
  Thermometer, Wind, Droplets, Eye, Gauge, 
  Sunrise, Sunset, Cloud, Navigation, Sun
} from 'lucide-react';
import { formatTime, getWindDirection } from '../../utils/weatherUtils';

const WeatherWidget: React.FC = () => {
  const { currentWeather, loading } = useSelector((state: RootState) => state.weather);

  if (loading || !currentWeather) return null;

  const weather = currentWeather;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-6 border border-white/20 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Current Weather */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-white mb-2">
              {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-white/70 text-lg mb-6 capitalize">
              {weather.weather[0].description}
            </p>
            
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt={weather.weather[0].description}
                className="w-32 h-32"
              />
              <div>
                <div className="text-6xl font-bold text-white">
                  {Math.round(weather.main.temp)}°
                </div>
                <div className="text-white/60 text-sm">
                  Feels like {Math.round(weather.main.feels_like)}°
                </div>
              </div>
            </div>

            <div className="flex space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-5 h-5" />
                <span>H: {Math.round(weather.main.temp_max)}°</span>
              </div>
              <div className="flex items-center space-x-2">
                <Thermometer className="w-5 h-5 rotate-180" />
                <span>L: {Math.round(weather.main.temp_min)}°</span>
              </div>
            </div>
          </div>

          {/* Right Side - Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Wind */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Wind className="w-5 h-5 text-blue-400" />
                <span className="text-white/60 text-sm">Wind</span>
              </div>
              <div className="text-2xl font-semibold text-white">
                {weather.wind.speed} m/s
              </div>
              <div className="flex items-center text-white/60 text-sm mt-1">
                <Navigation 
                  className="w-4 h-4 mr-1" 
                  style={{ transform: `rotate(${weather.wind.deg}deg)` }}
                />
                {getWindDirection(weather.wind.deg)}
              </div>
            </div>

            {/* Humidity */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Droplets className="w-5 h-5 text-blue-400" />
                <span className="text-white/60 text-sm">Humidity</span>
              </div>
              <div className="text-2xl font-semibold text-white">
                {weather.main.humidity}%
              </div>
            </div>

            {/* Visibility */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="w-5 h-5 text-blue-400" />
                <span className="text-white/60 text-sm">Visibility</span>
              </div>
              <div className="text-2xl font-semibold text-white">
                {(weather.visibility / 1000).toFixed(1)} km
              </div>
            </div>

            {/* Pressure */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Gauge className="w-5 h-5 text-blue-400" />
                <span className="text-white/60 text-sm">Pressure</span>
              </div>
              <div className="text-2xl font-semibold text-white">
                {weather.main.pressure} hPa
              </div>
            </div>

            {/* Cloudiness */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Cloud className="w-5 h-5 text-blue-400" />
                <span className="text-white/60 text-sm">Cloudiness</span>
              </div>
              <div className="text-2xl font-semibold text-white">
                {weather.clouds.all}%
              </div>
            </div>

            {/* UV Index */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Sun className="w-5 h-5 text-blue-400" />
                <span className="text-white/60 text-sm">UV Index</span>
              </div>
              <div className="text-2xl font-semibold text-white">
                5
              </div>
              <div className="text-white/60 text-sm">Moderate</div>
            </div>
          </div>
        </div>

        {/* Sunrise/Sunset Bar */}
        <div className="mt-8 bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Sunrise className="w-6 h-6 text-orange-400" />
              <div>
                <div className="text-white/60 text-sm">Sunrise</div>
                <div className="text-white font-semibold">
                  {formatTime(weather.sys.sunrise)}
                </div>
              </div>
            </div>
            
            <div className="flex-1 mx-8">
              <div className="h-2 bg-white/10 rounded-full relative overflow-hidden">
                <div 
                  className="absolute h-full bg-gradient-to-r from-orange-400 to-purple-600 rounded-full"
                  style={{ width: '65%' }}
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-white/60 text-sm">Sunset</div>
                <div className="text-white font-semibold">
                  {formatTime(weather.sys.sunset)}
                </div>
              </div>
              <Sunset className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;