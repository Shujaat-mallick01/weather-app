// src/components/WeatherWidget.tsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import type { WeatherState } from '../../types/weather';
import ReactAnimatedWeather from 'react-animated-weather';
import { HourlyForecast } from './components/HourlyForecast';
import { WeeklyForecast } from './components/WeeklyForecast';
import { AirQuality } from './components/AirQuality';
import { UVIndex } from './components/UVIndex';
import { getWeatherAlerts } from '../../utils/weatherAlerts';
import { iconMap } from '../../utils/weatherUtils';
import WeatherMap from './components/WeatherMap';

const WeatherWidget: React.FC = () => {
  const { data, loading, error } = useSelector((state: RootState) => state.weather as WeatherState);
  const [selectedMapLayer, setSelectedMapLayer] = useState('clouds_new');
  const [showHourlyForecast, setShowHourlyForecast] = useState(false);

  // Helper functions (unchanged)
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  const getRainIntensity = (rain: number) => {
    if (rain === 0) return { text: 'No Rain', color: 'text-gray-400', intensity: 0 };
    if (rain < 2.5) return { text: 'Light Rain', color: 'text-blue-300', intensity: 25 };
    if (rain < 10) return { text: 'Moderate Rain', color: 'text-blue-400', intensity: 50 };
    if (rain < 50) return { text: 'Heavy Rain', color: 'text-blue-500', intensity: 75 };
    return { text: 'Extreme Rain', color: 'text-blue-600', intensity: 100 };
  };

  const getCloudCoverage = (clouds: number) => {
    if (clouds < 25) return { text: 'Clear', icon: '☀️' };
    if (clouds < 50) return { text: 'Partly Cloudy', icon: '⛅' };
    if (clouds < 75) return { text: 'Mostly Cloudy', icon: '☁️' };
    return { text: 'Overcast', icon: '☁️' };
  };

  // Loading, Error, No Data States (unchanged)
  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative mb-8">
              <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-blue-400 rounded-full animate-spin animate-reverse"></div>
            </div>
            <div className="text-center">
              <h3 className="text-white text-2xl font-semibold mb-2 animate-pulse">Fetching Weather Data</h3>
              <p className="text-white/70 text-lg">Please wait while we get the latest information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-red-500/20 backdrop-blur-md rounded-3xl p-8 border border-red-400/30 text-center shadow-2xl">
          <div className="text-8xl mb-6 animate-bounce">⚠️</div>
          <h3 className="text-white text-3xl font-bold mb-4">Oops! Something went wrong</h3>
          <div className="bg-red-400/20 rounded-2xl p-4 mb-6">
            <p className="text-red-100 text-lg font-medium">{error}</p>
          </div>
          <p className="text-red-200">Please try searching for another city or check your connection.</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10 text-center shadow-xl">
          <div className="text-9xl mb-8 animate-bounce">🌍</div>
          <h3 className="text-white text-4xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            Welcome to Weather App
          </h3>
          <p className="text-white/70 text-xl">Search for any city to get detailed weather information!</p>
          <div className="mt-8 flex justify-center space-x-4">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  const cloudInfo = getCloudCoverage(data.clouds?.all ?? 0);
  const rainInfo = getRainIntensity(data.rain?.['1h'] ?? 0);
  const alerts = getWeatherAlerts(data);

  // Main Weather Display
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Weather Alerts */}
      {alerts.length > 0 && (
        <div className="bg-red-500/20 backdrop-blur-md rounded-2xl p-6 border border-red-400/30">
          <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            Weather Alerts
          </h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`rounded-lg p-3 ${alert.level === 'warning' ? 'bg-red-400/20' : 'bg-yellow-400/20'}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{alert.icon}</span>
                  <p className="text-white/90 text-sm">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Weather Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-500 hover:scale-[1.02]">
        <div className="text-center mb-8">
          {/* Location */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 12.414a6 6 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z"
              />
            </svg>
            <h2 className="text-white text-4xl font-bold">{data.name || 'Unknown'}</h2>
            {data.sys?.country && (
              <span className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-sm font-semibold">
                {data.sys.country}
              </span>
            )}
          </div>

          {/* Weather Icon and Temperature */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-white/10 rounded-full p-6 border border-white/20">
                <ReactAnimatedWeather
                  icon={iconMap[data.weather[0]?.main] ?? 'CLEAR_DAY'}
                  color="white"
                  size={120}
                  animate={true}
                />
              </div>
            </div>

            <div className="text-center lg:text-left">
              <div className="flex items-baseline justify-center lg:justify-start gap-2 mb-2">
                <span className="text-8xl font-light text-white">{Math.round(data.main.temp)}</span>
                <span className="text-3xl font-light text-white/80">°C</span>
              </div>
              <p className="text-white/90 text-2xl capitalize font-medium mb-2">
                {data.weather[0]?.description ?? 'Unknown'}
              </p>
              <p className="text-white/70 text-lg">Feels like {Math.round(data.main.feels_like)}°C</p>

              <div className="flex gap-4 justify-center lg:justify-start mt-4">
                <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
                  <span className="text-lg">{cloudInfo.icon}</span>
                  <span className="text-white/80 text-sm">{cloudInfo.text}</span>
                </div>
                {data.rain?.['1h'] && (
                  <div className="flex items-center gap-2 bg-blue-500/20 rounded-lg px-3 py-1">
                    <span className="text-lg">🌧️</span>
                    <span className={`text-sm ${rainInfo.color}`}>{rainInfo.text}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-12 mb-8">
            <div className="text-center">
              <div className="bg-orange-500/20 rounded-2xl p-4 mb-2 border border-orange-400/30">
                <svg
                  className="w-6 h-6 text-orange-300 mx-auto mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                <p className="text-orange-200 text-sm font-medium">High</p>
              </div>
              <p className="text-white text-2xl font-bold">{Math.round(data.main.temp_max)}°</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500/20 rounded-2xl p-4 mb-2 border border-blue-400/30">
                <svg
                  className="w-6 h-6 text-blue-300 mx-auto mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 13l-5 5m0 0l-5-5m5 5V6"
                  />
                </svg>
                <p className="text-blue-200 text-sm font-medium">Low</p>
              </div>
              <p className="text-white text-2xl font-bold">{Math.round(data.main.temp_min)}°</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle for Hourly Forecast */}
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-blue-500/20 text-white rounded-lg hover:bg-blue-500/30 transition-all"
          onClick={() => setShowHourlyForecast(!showHourlyForecast)}
        >
          {showHourlyForecast ? 'Hide Hourly Forecast' : 'Show Hourly Forecast'}
        </button>
      </div>

      {/* Hourly Forecast */}
      {showHourlyForecast && data.hourly && <HourlyForecast hourlyData={data.hourly} />}

      {/* Weather Map, Air Quality, and UV Index Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {data.coord ? (
            <WeatherMap
              lat={data.coord.lat}
              lon={data.coord.lon}
              layer={selectedMapLayer}
              onLayerChange={setSelectedMapLayer}
            />
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-center h-64 text-white/70">
                <p>Map unavailable: Coordinates not provided</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {data.air_quality && <AirQuality airQuality={data.air_quality} />}
          {data.daily && data.daily[0]?.uvi && (
            <UVIndex uvIndex={data.daily[0].uvi} uvForecast={data.uv_forecast} />
          )}
        </div>
      </div>

      {/* Weekly Forecast */}
      {data.daily && <WeeklyForecast dailyData={data.daily} />}

      {/* Enhanced Weather Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-500/20 backdrop-blur-md rounded-2xl p-6 border border-blue-400/30 hover:bg-blue-500/25 transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-400/30 rounded-xl">
              <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-blue-200 text-sm font-medium">Humidity</p>
              <p className="text-white text-2xl font-bold">{data.main.humidity}%</p>
              <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                <div
                  className="bg-blue-400 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${data.main.humidity}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-500/20 backdrop-blur-md rounded-2xl p-6 border border-green-400/30 hover:bg-green-500/25 transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-400/30 rounded-xl">
              <svg className="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m4 0V1a1 1 0 00-1-1h-4a1 1 0 00-1 1v1"
                />
              </svg>
            </div>
            <div>
              <p className="text-green-200 text-sm font-medium">Wind Speed</p>
              <p className="text-white text-2xl font-bold">{data.wind.speed} m/s</p>
              {data.wind.deg !== undefined && (
                <p className="text-green-200 text-xs flex items-center gap-1">
                  <span>Direction: {getWindDirection(data.wind.deg)}</span>
                  <span className="inline-block transform" style={{ rotate: `${data.wind.deg}deg` }}>
                    ↑
                  </span>
                </p>
              )}
              {data.wind.gust !== undefined && (
                <p className="text-green-200 text-xs">Gusts: {data.wind.gust} m/s</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-purple-500/20 backdrop-blur-md rounded-2xl p-6 border border-purple-400/30 hover:bg-purple-500/25 transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-400/30 rounded-xl">
              <svg className="w-6 h-6 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-purple-200 text-sm font-medium">Pressure</p>
              <p className="text-white text-2xl font-bold">{data.main.pressure}</p>
              <p className="text-purple-200 text-xs">hPa</p>
              {data.main.sea_level !== undefined && (
                <p className="text-purple-200 text-xs">Sea Level: {data.main.sea_level} hPa</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-400/30 hover:bg-yellow-500/25 transition-all duration-300 hover:scale-105">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-400/30 rounded-xl">
              <svg className="w-6 h-6 text-yellow-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-yellow-200 text-sm font-medium">Visibility</p>
              <p className="text-white text-2xl font-bold">
                {data.visibility !== undefined ? Math.round(data.visibility / 1000) : 'N/A'}
              </p>
              <p className="text-yellow-200 text-xs">km</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sun Times */}
      {data.sys.sunrise && data.sys.sunset && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-400/30 hover:from-orange-500/25 hover:to-yellow-500/25 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-400/30 rounded-xl">
                <svg className="w-8 h-8 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-orange-200 text-sm font-medium">Sunrise</p>
                <p className="text-white text-3xl font-bold">{formatTime(data.sys.sunrise)}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-6 border border-indigo-400/30 hover:from-indigo-500/25 hover:to-purple-500/25 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-400/30 rounded-xl">
                <svg className="w-8 h-8 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-indigo-200 text-sm font-medium">Sunset</p>
                <p className="text-white text-3xl font-bold">{formatTime(data.sys.sunset)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;