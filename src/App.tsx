import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './app/store';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import HomePage from './pages/HomePage';
import ForecastPage from './pages/ForecastPage';
import MapsPage from './pages/MapsPage';
import RadarPage from './pages/RadarPage';
import AlertsPage from './pages/AlertsPage';
import AboutPage from './pages/About';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/forecast" element={<ForecastPage />} />
              <Route path="/maps" element={<MapsPage />} />
              <Route path="/radar" element={<RadarPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;