// src/utils/weatherAlerts.ts
import type { WeatherState } from '../types/weather';

export const getWeatherAlerts = (data: WeatherState['data']) => {
  const alerts: Array<{
    type: string;
    level: 'warning' | 'caution';
    message: string;
    icon: string;
  }> = [];

  if (!data) {
    return alerts; // Return empty array if data is null
  }

  // Temperature alerts
  if (data.main?.temp && data.main.temp > 35) {
    alerts.push({
      type: 'heat',
      level: 'warning',
      message: 'High temperature warning - Stay hydrated and avoid prolonged sun exposure',
      icon: '🌡️',
    });
  }

  if (data.main?.temp && data.main.temp < 0) {
    alerts.push({
      type: 'cold',
      level: 'warning',
      message: 'Freezing temperature - Dress warmly and protect exposed skin',
      icon: '🥶',
    });
  }

  // Wind alerts
  if (data.wind?.speed && data.wind.speed > 10) {
    alerts.push({
      type: 'wind',
      level: 'caution',
      message: 'Strong winds expected - Secure outdoor items',
      icon: '💨',
    });
  }

  // Rain alerts
  if (data.rain && data.rain['1h'] && data.rain['1h'] > 5) {
    alerts.push({
      type: 'rain',
      level: 'caution',
      message: 'Heavy rainfall - Consider indoor activities',
      icon: '🌧️',
    });
  }

  // Visibility alerts
  if (data.visibility && data.visibility < 1000) {
    alerts.push({
      type: 'visibility',
      level: 'warning',
      message: 'Poor visibility conditions - Drive carefully',
      icon: '🌫️',
    });
  }

  return alerts;
};