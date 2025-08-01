import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import ForecastSearch from '../features/weather/ForecastSearch';
import WeatherWidget from '../features/weather/WeatherWidget';
import WeeklyForecast from '../features/weather/components/WeeklyForecast';
import HourlyForecast from '../features/weather/components/HourlyForecast';
import AirQuality from '../features/weather/components/AirQuality';
import Loader from '../components/Loader';
import { MapPin, TrendingUp, Umbrella, Wind } from 'lucide-react';
import { fetchWeatherByCoords } from '../features/weather/WeatherSlice';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentWeather, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    // Get user's location on component mount
    if (navigator.geolocation && !currentWeather) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(fetchWeatherByCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }));
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  }, [dispatch, currentWeather]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            Weather Forecast
          </h1>
          <p className="text-xl text-white/70">
            Get accurate weather updates for any city worldwide
          </p>
        </div>

        {/* Search Component */}
        <ForecastSearch />

        {/* Quick Stats (when no weather data) */}
        {!currentWeather && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center hover:scale-105 transition-transform duration-300">
              <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Location-Based</h3>
              <p className="text-white/60">Get weather for your current location instantly</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center hover:scale-105 transition-transform duration-300">
              <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Accurate Forecasts</h3>
              <p className="text-white/60">Reliable predictions up to 5 days ahead</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center hover:scale-105 transition-transform duration-300">
              <Umbrella className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Weather Alerts</h3>
              <p className="text-white/60">Stay informed about severe weather conditions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center hover:scale-105 transition-transform duration-300">
              <Wind className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Air Quality</h3>
              <p className="text-white/60">Monitor air quality and pollution levels</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && <Loader message="Loading weather data..." />}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 backdrop-blur-lg rounded-2xl p-6 border border-red-500/30 text-center">
            <p className="text-red-300 text-lg">{error}</p>
          </div>
        )}

        {/* Weather Display */}
        {currentWeather && !loading && (
          <div className="space-y-8">
            <WeatherWidget />
            <HourlyForecast />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <WeeklyForecast />
              </div>
              <div className="lg:col-span-1">
                <AirQuality />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;