// src/types/weather.d.ts
export interface WeatherState {
  data: {
    coord: {
      lat: number;
      lon: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level?: number;
    };
    wind: {
      speed: number;
      deg?: number;
      gust?: number;
    };
    clouds: {
      all: number;
    };
    rain?: {
      '1h'?: number;
    };
    snow?: {
      '1h'?: number;
    };
    visibility?: number;
    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    };
    name: string;
    hourly?: Array<{
      dt: number;
      temp: number;
      weather: Array<{ main: string; description: string; icon: string }>;
      pop: number;
      rain?: { '1h': number };
      wind_speed: number;
    }>;
    daily?: Array<{
      dt: number;
      temp: { min: number; max: number };
      weather: Array<{ main: string; description: string; icon: string }>;
      pop: number;
      humidity: number;
      wind_speed: number;
      uvi: number;
    }>;
    air_quality?: {
      aqi: number;
      components: {
        co: number;
        no: number;
        no2: number;
        o3: number;
        so2: number;
        pm2_5: number;
        pm10: number;
        nh3: number;
      };
    };
    forecast: Array<{
      dt: number;
      main: { temp: number; feels_like: number; humidity: number };
      weather: Array<{ main: string; description: string; icon: string }>;
      dt_txt: string;
    }>;
    uv_forecast?: Array<{ dt: number; uvi: number }>;
    alerts?: Array<{
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}>;

  } | null;
  loading: boolean;
  error: string | null;
}

export interface WeatherMapProps {
  lat: number;
  lon: number;
  layer: string;
  onLayerChange: (layer: string) => void;
}