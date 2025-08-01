import React from 'react';
import { Cloud, Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Cloud className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-white">WeatherPro</span>
            </div>
            <p className="text-white/60 text-sm">
              Your trusted source for accurate weather forecasts and real-time updates.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/forecast" className="text-white/60 hover:text-white text-sm transition-colors">
                  Extended Forecast
                </a>
              </li>
              <li>
                <a href="/maps" className="text-white/60 hover:text-white text-sm transition-colors">
                  Weather Maps
                </a>
              </li>
              <li>
                <a href="/radar" className="text-white/60 hover:text-white text-sm transition-colors">
                  Live Radar
                </a>
              </li>
              <li>
                <a href="/alerts" className="text-white/60 hover:text-white text-sm transition-colors">
                  Weather Alerts
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                  Weather Glossary
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact@weatherpro.com" 
                className="text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm flex items-center justify-center">
            © {currentYear} WeatherPro. Made with{' '}
            <Heart className="w-4 h-4 text-red-500 mx-1" fill="currentColor" />{' '}
            using OpenWeather API
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;