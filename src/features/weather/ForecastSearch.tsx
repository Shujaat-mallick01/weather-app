// src/features/weather/ForecastSearch.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { fetchWeatherByCity } from './WeatherSlice';

const ForecastSearch: React.FC = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    if (city.trim() !== '') {
      dispatch(fetchWeatherByCity(city));
      setCity('');
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        placeholder="Search City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="px-4 py-2 rounded-l border border-gray-300 w-64"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
};

export default ForecastSearch;
