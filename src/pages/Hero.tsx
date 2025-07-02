import React from 'react';
import { FaDownload, FaCode } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageProvider';

const Hero: React.FC = () => {
  // Get translation function
  const { t } = useLanguage();
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Surprise<span className="text-primary">Me</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto text-justify">
          {t('hero.description')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="#download" 
            className="hero-download-btn px-8 py-3 rounded-md transition-all duration-300 flex items-center gap-2"
            style={{
              backgroundColor: 'var(--primary-color)',
              color: 'var(--button-text)',
            }}
          >
            <FaDownload style={{ color: 'var(--button-text)' }} /> 
            <span style={{ color: 'var(--button-text)' }}>{t('hero.getStarted', 'Download Now')}</span>
          </a>
          <a 
            href="https://github.com/HarryHongyue/SurpriseMe" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <FaCode /> {t('hero.learnMore', 'View Source')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;