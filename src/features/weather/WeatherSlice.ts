// src/features/weather/WeatherSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWeather } from '../../api/weatherAPI';
import type { WeatherState } from '../../types/weather';
import axios from 'axios';


export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchByCity',
  async (city: string, thunkAPI) => {
    try {
      const data = await fetchWeather(city);
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 404) {
          return thunkAPI.rejectWithValue('City not found');
        }
        return thunkAPI.rejectWithValue(error.response.data.message || 'API Error');
      }
      return thunkAPI.rejectWithValue('Failed to fetch weather');
    }
  }
);

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default weatherSlice.reducer;