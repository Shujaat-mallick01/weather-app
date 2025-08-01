import React from 'react';
import { Info, Cloud, Users, Heart, Github } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Info className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">About WeatherPro</h1>
          </div>
          <p className="text-white/70">Learn more about our weather forecasting service</p>
        </div>

        <div className="space-y-8">
          {/* Mission */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <Cloud className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-white/80 leading-relaxed">
              WeatherPro is dedicated to providing accurate, real-time weather information 
              to help you plan your day with confidence. We leverage the power of the 
              OpenWeatherMap API to deliver comprehensive weather data including current 
              conditions, forecasts, air quality, and weather alerts.
            </p>
          </div>

          {/* Features */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">🌤️ Current Weather</h3>
                <p className="text-white/70">
                  Real-time weather conditions with detailed metrics including temperature, 
                  humidity, wind speed, and more.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">📅 5-Day Forecast</h3>
                <p className="text-white/70">
                  Extended weather predictions to help you plan ahead with confidence.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">🗺️ Weather Maps</h3>
                <p className="text-white/70">
                  Interactive maps showing precipitation, temperature, and weather patterns.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">🌬️ Air Quality</h3>
                <p className="text-white/70">
                  Monitor air quality index and pollution levels in your area.
                </p>
              </div>
            </div>
          </div>

          {/* Technology */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">Built With</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-white/10 rounded-xl p-4 mb-2">
                  <span className="text-2xl">⚛️</span>
                </div>
                <p className="text-white/80 font-medium">React</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-xl p-4 mb-2">
                  <span className="text-2xl">🔷</span>
                </div>
                <p className="text-white/80 font-medium">TypeScript</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-xl p-4 mb-2">
                  <span className="text-2xl">🎨</span>
                </div>
                <p className="text-white/80 font-medium">Tailwind CSS</p>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-xl p-4 mb-2">
                  <span className="text-2xl">🌐</span>
                </div>
                <p className="text-white/80 font-medium">OpenWeather API</p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Our Team</h2>
            </div>
            <p className="text-white/80 mb-6">
              WeatherPro is built and maintained by a passionate team of developers 
              committed to delivering the best weather forecasting experience.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
              >
                <Github className="w-5 h-5 text-white" />
                <span className="text-white">View on GitHub</span>
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-8">
            <p className="text-white/60 flex items-center justify-center">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" fill="currentColor" /> 
              for weather enthusiasts everywhere
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;