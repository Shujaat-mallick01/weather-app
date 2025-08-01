import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { fetchWeatherByCity, fetchWeatherByCoords, addRecentSearch } from './WeatherSlice';
import { Search, MapPin, Clock } from 'lucide-react';

const ForecastSearch: React.FC = () => {
  const [city, setCity] = useState('');
  const [showRecent, setShowRecent] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  
  const { loading, recentSearches } = useSelector((state: RootState) => state.weather);

  const handleSearch = () => {
    if (city.trim() !== '') {
      dispatch(fetchWeatherByCity(city));
      dispatch(addRecentSearch(city));
      setCity('');
      setShowRecent(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(fetchWeatherByCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleRecentSearch = (searchCity: string) => {
    dispatch(fetchWeatherByCity(searchCity));
    setShowRecent(false);
    setCity('');
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8 relative">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
        
        <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="pl-4 pr-2">
            <Search className="w-5 h-5 text-white/60 group-hover:text-white/80 transition-colors duration-300" />
          </div>
          
          <input
            type="text"
            placeholder="Search for any city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setShowRecent(true)}
            disabled={loading}
            className="flex-1 px-2 py-4 bg-transparent text-white placeholder-white/60 outline-none text-lg font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:placeholder-white/40 transition-all duration-300"
          />

          <button
            onClick={handleLocationSearch}
            className="p-2 hover:bg-white/10 transition-colors duration-300"
            title="Use current location"
          >
            <MapPin className="w-5 h-5 text-white/60 hover:text-white/80" />
          </button>
          
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
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Search</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Recent Searches Dropdown */}
      {showRecent && recentSearches.length > 0 && !loading && (
        <div className="absolute top-full mt-2 w-full bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden shadow-xl z-10">
          <div className="p-2">
            <p className="text-white/60 text-sm px-3 py-1 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Searches
            </p>
            {recentSearches.map((recentCity, index) => (
              <button
                key={index}
                onClick={() => handleRecentSearch(recentCity)}
                className="w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                {recentCity}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ForecastSearch;