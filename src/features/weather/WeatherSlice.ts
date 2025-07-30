// src/features/weather/WeatherSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { WeatherState } from '../../types/weather';

const API_KEY = '14f8fd92c249981fa1f05b4e53fe6214';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const fetchWeatherByCity = createAsyncThunk(
    'weather/fetchByCity',
    async (city: string, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
                const status = error.response.status;
                if (status === 404) {
                    return thunkAPI.rejectWithValue("City not found");
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
                state.error = action.payload as string || 'Failed to fetch weather';
            });
    },
});

export default weatherSlice.reducer;
