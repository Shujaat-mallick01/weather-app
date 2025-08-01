const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const MAP_BASE_URL = import.meta.env.VITE_MAP_BASE_URL;

export const weatherAPI = {
  getCurrentWeather: async (city: string) => {
    const response = await fetch(
      `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error('Weather data not found');
    return response.json();
  },

  getForecast: async (city: string) => {
    const response = await fetch(
      `${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error('Forecast data not found');
    return response.json();
  },

  getWeatherByCoords: async (lat: number, lon: number) => {
    const response = await fetch(
      `${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error('Weather data not found');
    return response.json();
  },

  getForecastByCoords: async (lat: number, lon: number) => {
    const response = await fetch(
      `${BASE_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error('Forecast data not found');
    return response.json();
  },

  getAirQuality: async (lat: number, lon: number) => {
    const response = await fetch(
      `${BASE_URL}air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Air quality data not found');
    return response.json();
  },

  getUVIndex: async (lat: number, lon: number) => {
    const response = await fetch(
      `${BASE_URL}uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('UV index data not found');
    return response.json();
  },

  // Map tile URLs
  getMapTileUrl: (layer: string, z: number, x: number, y: number) => {
    return `${MAP_BASE_URL}${layer}/${z}/${x}/${y}.png?appid=${API_KEY}`;
  },
};

// Map layer types
export const MAP_LAYERS = {
  PRECIPITATION: 'precipitation_new',
  CLOUDS: 'clouds_new',
  TEMPERATURE: 'temp_new',
  WIND: 'wind_new',
  PRESSURE: 'pressure_new',
} as const;

export type MapLayerType = typeof MAP_LAYERS[keyof typeof MAP_LAYERS];