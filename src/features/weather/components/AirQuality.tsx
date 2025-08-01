import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Wind, AlertCircle } from 'lucide-react';
import { getAQIInfo } from '../../../utils/weatherUtils';

const AirQuality: React.FC = () => {
  const { airQuality, loading } = useSelector((state: RootState) => state.weather);

  if (loading || !airQuality) return null;

  const aqi = airQuality.list[0].main.aqi;
  const aqiInfo = getAQIInfo(aqi);
  const components = airQuality.list[0].components;

  return (
    <div className="w-full max-w-6xl mx-auto mb-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
        <div className="flex items-center space-x-2 mb-6">
          <Wind className="w-6 h-6 text-blue-400" />
          <h3 className="text-2xl font-bold text-white">Air Quality</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AQI Index */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white/60 text-sm mb-1">Air Quality Index</p>
                <p className="text-4xl font-bold text-white">{aqi}</p>
                <p className={`text-lg font-semibold ${aqiInfo.color}`}>
                  {aqiInfo.label}
                </p>
              </div>
              <div className={`p-4 rounded-full ${aqiInfo.bgColor}`}>
                <AlertCircle className={`w-8 h-8 ${aqiInfo.color}`} />
              </div>
            </div>
            <p className="text-white/70 text-sm">{aqiInfo.description}</p>
          </div>

          {/* Pollutants */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-white/60 text-xs mb-1">PM2.5</p>
              <p className="text-xl font-semibold text-white">
                {components.pm2_5.toFixed(1)}
              </p>
              <p className="text-white/50 text-xs">μg/m³</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-white/60 text-xs mb-1">PM10</p>
              <p className="text-xl font-semibold text-white">
                {components.pm10.toFixed(1)}
              </p>
              <p className="text-white/50 text-xs">μg/m³</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-white/60 text-xs mb-1">O₃</p>
              <p className="text-xl font-semibold text-white">
                {components.o3.toFixed(1)}
              </p>
              <p className="text-white/50 text-xs">μg/m³</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-white/60 text-xs mb-1">NO₂</p>
              <p className="text-xl font-semibold text-white">
                {components.no2.toFixed(1)}
              </p>
              <p className="text-white/50 text-xs">μg/m³</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQuality;