import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import ThemeSwitcher from './ui/ThemeSwitcher';
import Hero from '../pages/Hero';
import Features from '../pages/Features';
import Download from '../pages/Download';
import Privacy from '../pages/Privacy';
import Admin from '../pages/Admin';

const App: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '';

  useEffect(() => {
    // 确保默认主题类应用到body
    document.body.classList.add('indigo-dark-theme', 'dark-mode');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Download />
              <Privacy />
            </>
          } />
        </Routes>
      </main>
      {isHomePage && <Footer />}
      <ThemeSwitcher />
    </div>
  );
};

export default App;