// src/App.tsx
import React from 'react';
import ForecastSearch from './features/weather/ForecastSearch';
import WeatherWidget from './features/weather/WeatherWidget';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-800 to-sky-400 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Weather App</h1>
      <ForecastSearch />
      <WeatherWidget />
    </div>
  );
};

export default App;
