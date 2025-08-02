import React, { useState } from 'react';
import { Radio, CloudRain, AlertCircle, Zap, Timer, MapPin, Activity, Wind, Eye } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const RadarPage: React.FC = () => {
  const [radarType, setRadarType] = useState('precipitation');
  const { currentWeather } = useSelector((state: RootState) => state.weather);

  const radarTypes = [
    { id: 'precipitation', name: 'Precipitation', icon: CloudRain, color: 'text-blue-400' },
    { id: 'storm', name: 'Storms', icon: Zap, color: 'text-yellow-400' },
    { id: 'wind', name: 'Wind', icon: Wind, color: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Radio className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Weather Radar</h1>
          </div>
          <p className="text-white/70">Live precipitation and storm tracking</p>
        </div>
        
        {/* Radar Display */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-8">
          {/* Radar Type Selector */}
          <div className="flex justify-center space-x-4 mb-6 gap-4 flex-wrap">
            {radarTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setRadarType(type.id)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                    radarType === type.id
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${type.color}`} />
                  <span className="font-medium">{type.name}</span>
                </button>
              );
            })}
          </div>

          {/* Radar Animation */}
          <div className="relative h-96 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-white/10 overflow-hidden">
            {/* Radar sweep animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-80 h-80">
                {/* Radar circles */}
                <div className="absolute inset-0 border border-white/10 rounded-full"></div>
                <div className="absolute inset-4 border border-white/10 rounded-full"></div>
                <div className="absolute inset-8 border border-white/10 rounded-full"></div>
                <div className="absolute inset-12 border border-white/10 rounded-full"></div>
                
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
                
                {/* Radar sweep */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
                  <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-t from-transparent to-green-400/50 origin-bottom"></div>
                </div>

                {/* Simulated weather data points */}
                {radarType === 'precipitation' && (
                  <>
                    <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-blue-400/30 rounded-full blur-md"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-blue-500/40 rounded-full blur-lg"></div>
                    <div className="absolute top-1/2 right-1/3 w-6 h-6 bg-cyan-400/30 rounded-full blur-sm"></div>
                  </>
                )}
                {radarType === 'storm' && (
                  <>
                    <div className="absolute top-1/3 right-1/4 w-10 h-10 bg-yellow-400/40 rounded-full blur-md animate-pulse"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-orange-400/30 rounded-full blur-sm animate-pulse"></div>
                  </>
                )}
              </div>
            </div>

            {/* Location indicator */}
            {currentWeather && (
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-white text-sm font-medium">{currentWeather.name}</span>
                </div>
              </div>
            )}

            {/* Radar info */}
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-white/70 text-sm">Live - Updated 2 min ago</span>
              </div>
            </div>
          </div>

          {/* Radar legend */}
          <div className="mt-6 flex justify-center">
            <div className="bg-white/5 rounded-xl px-4 py-2 border border-white/10">
              <p className="text-white/60 text-xs mb-2">Intensity Scale</p>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-400/30 rounded"></div>
                <div className="w-4 h-4 bg-yellow-400/40 rounded"></div>
                <div className="w-4 h-4 bg-orange-400/50 rounded"></div>
                <div className="w-4 h-4 bg-red-400/60 rounded"></div>
                <span className="text-white/60 text-xs ml-2">Light → Heavy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <CloudRain className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Precipitation</h3>
            <p className="text-white/70 text-sm">
              Track rain, snow, and other precipitation in real-time with color-coded intensity levels
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <AlertCircle className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Storm Alerts</h3>
            <p className="text-white/70 text-sm">
              Get notified about severe weather and storms approaching your area
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <Timer className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Live Updates</h3>
            <p className="text-white/70 text-sm">
              Radar updates every 5 minutes with the latest weather data
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Understanding Weather Radar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white/80 font-medium mb-2 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-400" />
                How It Works
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Weather radar uses radio waves to detect precipitation. The radar sends out pulses of energy 
                that bounce off raindrops, snowflakes, and other particles in the atmosphere.
              </p>
            </div>
            <div>
              <h4 className="text-white/80 font-medium mb-2 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-green-400" />
                Coverage Area
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Our radar covers a radius of approximately 250 kilometers, providing detailed precipitation 
                data for your local area and surrounding regions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarPage;