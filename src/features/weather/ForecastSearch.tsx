// src/features/weather/ForecastSearch.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { fetchWeatherByCity } from './WeatherSlice';

const ForecastSearch: React.FC = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  
  // Get loading state from Redux store
  const { loading } = useSelector((state: RootState) => state.weather);

  const handleSearch = () => {
    if (city.trim() !== '') {
      dispatch(fetchWeatherByCity(city));
      setCity('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      {/* Glass-morphic container with gradient border effect */}
      <div className="relative group">
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
        
        {/* Main search container */}
        <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
          {/* Search icon */}
          <div className="pl-4 pr-2">
            <svg className="w-5 h-5 text-white/60 group-hover:text-white/80 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 12.414a6 6 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" />
            </svg>
          </div>
          
          {/* Input field */}
          <input
            type="text"
            placeholder="Search for any city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="flex-1 px-2 py-4 bg-transparent text-white placeholder-white/60 outline-none text-lg font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:placeholder-white/40 transition-all duration-300"
          />
          
          {/* Search button */}
          <button
            onClick={handleSearch}
            disabled={loading || !city.trim()}
            className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                     hover:from-blue-600 hover:to-purple-700 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     transition-all duration-300 flex items-center gap-2 font-semibold
                     hover:shadow-lg active:scale-95"
          >
            {loading ? (
              <>
                {/* Loading spinner */}
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Searching...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden sm:inline">Search</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Optional: Search suggestions or recent searches could go here */}
      {city.length > 0 && !loading && (
        <div className="mt-2 text-center">
          <p className="text-white/50 text-sm">
            Press Enter or click Search to find weather for "{city}"
          </p>
        </div>
      )}
    </div>
  );
};

export default ForecastSearch;