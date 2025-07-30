// src/utils/weatherUtils.ts
export const iconMap: Record<string, string> = {
  Clear: 'CLEAR_DAY',
  Clouds: 'CLOUDY',
  Rain: 'RAIN',
  Snow: 'SNOW',
  Drizzle: 'SLEET',
  Thunderstorm: 'RAIN',
  Fog: 'FOG',
  Smoke: 'FOG',
  Dust: 'WIND',
  Mist: 'FOG',
  Haze: 'FOG',
};

export const getAirQualityColor = (aqi: number) => {
  if (aqi <= 50) return 'text-green-400 bg-green-500/20 border-green-400/30';
  if (aqi <= 100) return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
  if (aqi <= 150) return 'text-orange-400 bg-orange-500/20 border-orange-400/30';
  if (aqi <= 200) return 'text-red-400 bg-red-500/20 border-red-400/30';
  return 'text-purple-400 bg-purple-500/20 border-purple-400/30';
};

export const getUVIndexColor = (uv: number) => {
  if (uv <= 2) return {
    level: 'Low',
    color: 'text-green-400 bg-green-500/20 border-green-400/30',
    advice: 'No protection needed',
    icon: '☀️',
  };
  if (uv <= 5) return {
    level: 'Moderate',
    color: 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30',
    advice: 'Use sunscreen',
    icon: '🌤️',
  };
  if (uv <= 7) return {
    level: 'High',
    color: 'text-orange-400 bg-orange-500/20 border-orange-400/30',
    advice: 'Protection essential',
    icon: '🌞',
  };
  if (uv <= 10) return {
    level: 'Very High',
    color: 'text-red-400 bg-red-500/20 border-red-400/30',
    advice: 'Extra protection needed',
    icon: '🔆',
  };
  return {
    level: 'Extreme',
    color: 'text-purple-400 bg-purple-500/20 border-purple-400/30',
    advice: 'Avoid sun exposure',
    icon: '🚨',
  };
};