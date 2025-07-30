// src/api/weatherAPI.ts
import axios from 'axios';

const API_KEY = '14f8fd92c249981fa1f05b4e53fe6214';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const fetchWeather = async (city: string) => {
  const response = await axios.get(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
  return response.data;
};
