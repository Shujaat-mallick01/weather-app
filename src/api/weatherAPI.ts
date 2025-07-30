// src/api/weatherAPI.ts
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchWeather = async (city: string) => {
  // Step 1: Get current weather data
  const currentResponse = await axios.get(`${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`);
  const currentData = currentResponse.data;

  // Step 2: Get 5-day / 3-hour forecast data
  const forecastResponse = await axios.get(`${BASE_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`);
  const forecastData = forecastResponse.data;

  return {
    ...currentData,
    forecast: forecastData.list, // add forecast as a separate property
  };
};
