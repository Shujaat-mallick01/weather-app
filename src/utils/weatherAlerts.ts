import { WeatherAlert } from '../types/weather';

export const weatherAlerts = {
  getAlertsForLocation: (location: string): WeatherAlert[] => {
    // Mock alerts for demonstration
    // In production, this would fetch from a real API
    const mockAlerts: WeatherAlert[] = [
      {
        id: '1',
        title: 'Heat Advisory',
        description: 'Temperatures expected to reach 38°C. Stay hydrated and avoid prolonged outdoor activities.',
        severity: 'moderate',
        issued: new Date().toLocaleString(),
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString(),
      },
    ];

    // Randomly return alerts for demonstration
    return Math.random() > 0.5 ? mockAlerts : [];
  },

  formatAlertTime: (timestamp: string): string => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  },

  getAlertIcon: (severity: string) => {
    switch (severity) {
      case 'severe':
        return '🚨';
      case 'moderate':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  },
};