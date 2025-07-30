// src/features/weather/WeatherWidget.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import ReactAnimatedWeather from 'react-animated-weather';

const WeatherWidget: React.FC = () => {
  const { data, loading, error } = useSelector((state: RootState) => state.weather);

  const iconMap: Record<string, string> = {
    Clear: 'CLEAR_DAY',
    Clouds: 'CLOUDY',
    Rain: 'RAIN',
    Snow: 'SNOW',
    Drizzle: 'SLEET',
    Thunderstorm: 'RAIN',
    Fog: 'FOG',
    Smoke: 'FOG',
    Dust: 'WIND',
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p className="text-white">No data</p>;

  return (
    <div className="text-white text-center">
      <h2 className="text-2xl font-semibold mb-2">{data.name}, {data.sys.country}</h2>
      <ReactAnimatedWeather
        icon={iconMap[data.weather[0].main] || 'CLEAR_DAY'}
        color="white"
        size={64}
        animate={true}
      />
      <p className="text-xl mt-2">{Math.round(data.main.temp)}°C - {data.weather[0].description}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind: {data.wind.speed} km/h</p>
    </div>
  );
};

export default WeatherWidget;
