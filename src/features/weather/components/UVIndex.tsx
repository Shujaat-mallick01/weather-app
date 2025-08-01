import React from 'react';
import { Sun, AlertTriangle } from 'lucide-react';
import { getUVInfo } from '../../../utils/weatherUtils';

interface UVIndexProps {
  uvIndex: number;
}

const UVIndex: React.FC<UVIndexProps> = ({ uvIndex }) => {
  const uvInfo = getUVInfo(uvIndex);

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center space-x-2 mb-4">
        <Sun className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-bold text-white">UV Index</h3>
      </div>

      <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-3xl font-bold text-white">{uvIndex}</p>
            <p className={`text-lg font-semibold ${uvInfo.color}`}>
              {uvInfo.label}
            </p>
          </div>
          {uvIndex >= 6 && (
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
          )}
        </div>

        <div className="space-y-2">
          <p className="text-white/70 text-sm">{uvInfo.description}</p>
          
          {/* UV Scale */}
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="absolute h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" />
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
              style={{ left: `${Math.min((uvIndex / 11) * 100, 100)}%` }}
            />
          </div>

          {/* Protection advice */}
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-white/60 text-xs font-semibold mb-1">Protection:</p>
            <p className="text-white/70 text-sm">{uvInfo.protection}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UVIndex;