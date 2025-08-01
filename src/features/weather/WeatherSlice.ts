import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { weatherAPI } from '../../api/weatherAPI';
import { WeatherState } from '../../types/weather';
import { parseForecastData } from '../../utils/weatherUtils';

const initialState: WeatherState = {
  currentWeather: null,
  forecast: [],
  hourlyForecast: [],
  airQuality: null,
  loading: false,
  error: null,
  recentSearches: [],
};

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async (city: string) => {
    const [weatherData, forecastData] = await Promise.all([
      weatherAPI.getCurrentWeather(city),
      weatherAPI.getForecast(city),
    ]);

    const { lat, lon } = weatherData.coord;
    const airQualityData = await weatherAPI.getAirQuality(lat, lon);

    return {
      currentWeather: weatherData,
      forecast: parseForecastData(forecastData),
      hourlyForecast: forecastData.list.slice(0, 8),
      airQuality: airQualityData,
    };
  }
);

export const fetchWeatherByCoords = createAsyncThunk(
  'weather/fetchByCoords',
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const [weatherData, forecastData, airQualityData] = await Promise.all([
      weatherAPI.getWeatherByCoords(lat, lon),
      weatherAPI.getForecast(`${lat},${lon}`),
      weatherAPI.getAirQuality(lat, lon),
    ]);

    return {
      currentWeather: weatherData,
      forecast: parseForecastData(forecastData),
      hourlyForecast: forecastData.list.slice(0, 8),
      airQuality: airQualityData,
    };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      const city = action.payload;
      state.recentSearches = [
        city,
        ...state.recentSearches.filter((c) => c !== city),
      ].slice(0, 5);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch by city
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload.currentWeather;
        state.forecast = action.payload.forecast;
        state.hourlyForecast = action.payload.hourlyForecast;
        state.airQuality = action.payload.airQuality;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      })
      // Fetch by coordinates
      .addCase(fetchWeatherByCoords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload.currentWeather;
        state.forecast = action.payload.forecast;
        state.hourlyForecast = action.payload.hourlyForecast;
        state.airQuality = action.payload.airQuality;
        state.error = null;
      })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export const { clearError, addRecentSearch } = weatherSlice.actions;
export default weatherSlice.reducer;