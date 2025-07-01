import React, { useEffect } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import ThemeSwitcher from './ui/ThemeSwitcher';
import Hero from '../pages/Hero';
import Features from '../pages/Features';
import Download from '../pages/Download';
import Privacy from '../pages/Privacy';

const App: React.FC = () => {
  useEffect(() => {
    // 确保默认主题类应用到body
    document.body.classList.add('indigo-dark-theme', 'dark-mode');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Download />
        <Privacy />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
};

export default App;