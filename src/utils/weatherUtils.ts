import { ForecastData } from '../types/weather';

export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatHour = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });
};

export const getDayName = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export const parseForecastData = (data: any): ForecastData[] => {
  const dailyData: { [key: string]: any[] } = {};
  
  // Group forecast data by day
  data.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(item);
  });

  // Convert to forecast format
  return Object.entries(dailyData).slice(0, 5).map(([date, items]) => {
    const temps = items.map(item => item.main.temp);
    const pops = items.map(item => item.pop || 0);
    
    return {
      date: new Date(date).toISOString().split('T')[0],
      temp: {
        min: Math.min(...temps),
        max: Math.max(...temps),
      },
      weather: {
        main: items[0].weather[0].main,
        description: items[0].weather[0].description,
        icon: items[0].weather[0].icon.replace('n', 'd'), // Use day icon
      },
      humidity: Math.round(
        items.reduce((sum, item) => sum + item.main.humidity, 0) / items.length
      ),
      wind: Math.round(
        items.reduce((sum, item) => sum + item.wind.speed, 0) / items.length
      ),
      pop: Math.max(...pops),
    };
  });
};

export const getAQIInfo = (aqi: number): {
  label: string;
  color: string;
  bgColor: string;
  description: string;
} => {
  const aqiLevels = [
    {
      max: 1,
      label: 'Good',
      color: 'text-green-400',
      bgColor: 'bg-green-400/20',
      description: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    },
    {
      max: 2,
      label: 'Fair',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/20',
      description: 'Air quality is acceptable. However, there may be a risk for some people.',
    },
    {
      max: 3,
      label: 'Moderate',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/20',
      description: 'Members of sensitive groups may experience health effects.',
    },
    {
      max: 4,
      label: 'Poor',
      color: 'text-red-400',
      bgColor: 'bg-red-400/20',
      description: 'Everyone may begin to experience health effects.',
    },
    {
      max: 5,
      label: 'Very Poor',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/20',
      description: 'Health warnings of emergency conditions.',
    },
  ];

  return aqiLevels.find(level => aqi <= level.max) || aqiLevels[4];
};

export const getUVInfo = (uvIndex: number): {
  label: string;
  color: string;
  description: string;
  protection: string;
} => {
  const uvLevels = [
    {
      max: 2,
      label: 'Low',
      color: 'text-green-400',
      description: 'No protection needed.',
      protection: 'You can safely stay outside.',
    },
    {
      max: 5,
      label: 'Moderate',
      color: 'text-yellow-400',
      description: 'Some protection needed.',
      protection: 'Wear sunglasses and use SPF 30+ sunscreen.',
    },
    {
      max: 7,
      label: 'High',
      color: 'text-orange-400',
      description: 'Protection essential.',
      protection: 'Wear a hat, sunglasses, and use SPF 30+ sunscreen.',
    },
    {
      max: 10,
      label: 'Very High',
      color: 'text-red-400',
      description: 'Extra protection needed.',
      protection: 'Avoid being outside during midday hours.',
    },
    {
      max: 20,
      label: 'Extreme',
      color: 'text-purple-400',
      description: 'Stay inside during midday.',
      protection: 'Take all precautions: avoid being outside during midday hours.',
    },
  ];

  return uvLevels.find(level => uvIndex <= level.max) || uvLevels[4];
};

export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return (fahrenheit - 32) * 5/9;
};

export const metersPerSecToMph = (mps: number): number => {
  return mps * 2.237;
};

export const metersPerSecToKmh = (mps: number): number => {
  return mps * 3.6;
};