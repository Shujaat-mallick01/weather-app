import React from "react";


// src/features/weather/components/AirQuality.tsx
interface AirQualityProps {
  airQuality: {
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
}

export const AirQuality: React.FC<AirQualityProps> = ({ airQuality }) => {
  const getAQIInfo = (aqi: number) => {
    if (aqi === 1) return { text: 'Good', color: 'text-green-400 bg-green-500/20', description: 'Air quality is good' };
    if (aqi === 2) return { text: 'Fair', color: 'text-yellow-400 bg-yellow-500/20', description: 'Air quality is acceptable' };
    if (aqi === 3) return { text: 'Moderate', color: 'text-orange-400 bg-orange-500/20', description: 'Air quality is moderate' };
    if (aqi === 4) return { text: 'Poor', color: 'text-red-400 bg-red-500/20', description: 'Air quality is poor' };
    return { text: 'Very Poor', color: 'text-purple-400 bg-purple-500/20', description: 'Air quality is very poor' };
  };

  const aqiInfo = getAQIInfo(airQuality.aqi);

  const pollutants = [
    { name: 'PM2.5', value: airQuality.components.pm2_5, unit: 'μg/m³', max: 25 },
    { name: 'PM10', value: airQuality.components.pm10, unit: 'μg/m³', max: 50 },
    { name: 'O₃', value: airQuality.components.o3, unit: 'μg/m³', max: 120 },
    { name: 'NO₂', value: airQuality.components.no2, unit: 'μg/m³', max: 40 },
    { name: 'SO₂', value: airQuality.components.so2, unit: 'μg/m³', max: 20 },
    { name: 'CO', value: airQuality.components.co, unit: 'μg/m³', max: 10000 },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h3 className="text-white text-xl font-semibold mb-4">Air Quality Index</h3>
      
      {/* Main AQI Display */}
      <div className={`${aqiInfo.color} rounded-xl p-4 mb-4 border border-current/30`}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-2xl font-bold">{airQuality.aqi}</span>
            <span className="ml-2 text-lg font-medium">{aqiInfo.text}</span>
          </div>
          <div className="text-2xl">
            {airQuality.aqi <= 2 ? '😊' : airQuality.aqi === 3 ? '😐' : '😷'}
          </div>
        </div>
        <p className="text-sm opacity-90">{aqiInfo.description}</p>
      </div>

      {/* Pollutant Details */}
      <div className="grid grid-cols-2 gap-3">
        {pollutants.map((pollutant) => (
          <div key={pollutant.name} className="bg-white/5 rounded-lg p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white/80 text-sm font-medium">{pollutant.name}</span>
              <span className="text-white text-sm">{pollutant.value.toFixed(1)} {pollutant.unit}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  pollutant.value > pollutant.max ? 'bg-red-400' : 
                  pollutant.value > pollutant.max * 0.7 ? 'bg-orange-400' : 'bg-green-400'
                }`}
                style={{ width: `${Math.min((pollutant.value / pollutant.max) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};