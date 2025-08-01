import React from 'react';
import { Cloud } from 'lucide-react';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <Cloud className="w-16 h-16 text-blue-400 animate-float" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
      <p className="text-white/70 text-lg mt-4">{message}</p>
    </div>
  );
};

export default Loader;