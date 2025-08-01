import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { AlertTriangle, Bell, Info, Shield } from 'lucide-react';
import { weatherAlerts } from '../utils/weatherAlerts';

const AlertsPage: React.FC = () => {
  const { currentWeather } = useSelector((state: RootState) => state.weather);
  
  // Mock alerts for demonstration
  const alerts = currentWeather ? weatherAlerts.getAlertsForLocation(currentWeather.name) : [];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <AlertTriangle className="w-10 h-10 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">Weather Alerts</h1>
          </div>
          <p className="text-white/70">Stay informed about severe weather conditions</p>
        </div>

        {currentWeather ? (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-2">
                Active Alerts for {currentWeather.name}
              </h2>
              <p className="text-white/70">
                {alerts.length} active weather {alerts.length === 1 ? 'alert' : 'alerts'}
              </p>
            </div>

            {alerts.length > 0 ? (
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`backdrop-blur-lg rounded-2xl p-6 border ${
                      alert.severity === 'severe'
                        ? 'bg-red-500/20 border-red-500/30'
                        : alert.severity === 'moderate'
                        ? 'bg-yellow-500/20 border-yellow-500/30'
                        : 'bg-blue-500/20 border-blue-500/30'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${
                        alert.severity === 'severe'
                          ? 'bg-red-500/30'
                          : alert.severity === 'moderate'
                          ? 'bg-yellow-500/30'
                          : 'bg-blue-500/30'
                      }`}>
                        <AlertTriangle className={`w-6 h-6 ${
                          alert.severity === 'severe'
                            ? 'text-red-400'
                            : alert.severity === 'moderate'
                            ? 'text-yellow-400'
                            : 'text-blue-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {alert.title}
                        </h3>
                        <p className="text-white/70 mb-3">{alert.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-white/60">
                          <span>Issued: {alert.issued}</span>
                          <span>Expires: {alert.expires}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-green-500/20 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30 text-center">
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-green-300 text-lg">No active weather alerts</p>
                <p className="text-green-300/70 mt-2">
                  Weather conditions are normal for your area
                </p>
              </div>
            )}

            {/* Alert Settings */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Alert Settings</h3>
              </div>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-white/80">Severe weather warnings</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-white/80">Precipitation alerts</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-white/80">Daily weather summary</span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <Info className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/50 text-lg">
              Search for a location to see weather alerts
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;