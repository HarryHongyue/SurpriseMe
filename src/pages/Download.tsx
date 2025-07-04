import React from 'react';
import { FaChrome, FaDownload, FaFileArchive, FaFirefox, FaEdge, FaSafari } from 'react-icons/fa';
import { SiOpera, SiVivaldi, SiBrave } from 'react-icons/si';
import ArcBrowserButton from '../components/ui/ArcBrowserButton';
import { useLanguage } from '../i18n/LanguageProvider';

const Download: React.FC = () => {
  // Get translation function
  const { t } = useLanguage();
  return (
    <section id="download" className="py-20 px-4 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {t('download.title', 'Download SurpriseMe')}
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          {t('download.subtitle')}
        </p>
        
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          {/* Main Chrome Extension */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('download.chrome', 'Chrome Extension')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('download.versionInfo')}
              </p>
            </div>
            <a 
              href="https://chromewebstore.google.com/detail/SurpriseMe/badgnmgiefjegajabklbanhekhldbocg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="download-btn-primary px-6 py-3 rounded-md transition-all duration-300 flex items-center gap-2"
              style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--button-text)',
              }}
            >
              <FaChrome style={{ color: 'var(--button-text)' }} /> 
              <span style={{ color: 'var(--button-text)' }}>{t('download.chrome', 'Add to Chrome')}</span>
            </a>
          </div>

          {/* Browser Store Grid */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              {t('download.otherBrowsers', 'Available on Other Browsers')}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {/* Safari */}
              <a 
                href="https://apps.apple.com/app/surpriseme-extension/id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="browser-store-btn flex flex-col items-center p-4 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--body-text)',
                }}
              >
                <FaSafari className="text-3xl mb-2" style={{ color: '#007aff' }} />
                <span className="text-sm font-medium">{t('Safari')}</span>
              </a>

              {/* Firefox */}
              <a 
                href="https://addons.mozilla.org/zh-CN/firefox/addon/surpriseme/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="browser-store-btn flex flex-col items-center p-4 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--body-text)',
                }}
              >
                <FaFirefox className="text-3xl mb-2" style={{ color: '#FF7139' }} />
                <span className="text-sm font-medium">{t('Firefox')}</span>
              </a>

              {/* Microsoft Edge */}
              <a 
                href="https://microsoftedge.microsoft.com/addons/detail/surpriseme" 
                target="_blank" 
                rel="noopener noreferrer"
                className="browser-store-btn flex flex-col items-center p-4 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--body-text)',
                }}
              >
                <FaEdge className="text-3xl mb-2" style={{ color: '#0078D4' }} />
                <span className="text-sm font-medium">{t('Edge')}</span>
              </a>

              {/* Opera */}
              <a 
                href="https://addons.opera.com/extensions/details/surpriseme" 
                target="_blank" 
                rel="noopener noreferrer"
                className="browser-store-btn flex flex-col items-center p-4 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--body-text)',
                }}
              >
                <SiOpera className="text-3xl mb-2" style={{ color: '#FF1B2D' }} />
                <span className="text-sm font-medium">{t('Opera')}</span>
              </a>

              {/* Brave */}
              <a 
                href="https://chromewebstore.google.com/detail/SurpriseMe/badgnmgiefjegajabklbanhekhldbocg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="browser-store-btn flex flex-col items-center p-4 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--body-text)',
                }}
              >
                <SiBrave className="text-3xl mb-2" style={{ color: '#FB542B' }} />
                <span className="text-sm font-medium">{t('Brave')}</span>
              </a>

              {/* Vivaldi */}
              <a 
                href="https://chromewebstore.google.com/detail/SurpriseMe/badgnmgiefjegajabklbanhekhldbocg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="browser-store-btn flex flex-col items-center p-4 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--body-text)',
                }}
              >
                <SiVivaldi className="text-3xl mb-2" style={{ color: '#EF3939' }} />
                <span className="text-sm font-medium">{t('Vivaldi')}</span>
              </a>

              {/* Arc (using Chrome store) */}
              <ArcBrowserButton />
            </div>
          </div>
          
          {/* Manual Download Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-4">
              {t('download.instructions', 'Or download the extension files directly for manual installation:')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="/SurpriseMe.crx" 
                download
                className="download-btn-secondary px-6 py-2 rounded-md transition-all duration-300 inline-flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--body-text)',
                }}
              >
                <FaDownload style={{ color: 'var(--body-text)' }} /> 
                <span style={{ color: 'var(--body-text)' }}>{t('download.crxFile')}</span>
              </a>
              <a 
                href="/SurpriseMe.zip" 
                download
                className="download-btn-secondary px-6 py-2 rounded-md transition-all duration-300 inline-flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--body-text)',
                }}
              >
                <FaFileArchive style={{ color: 'var(--body-text)' }} /> 
                <span style={{ color: 'var(--body-text)' }}>{t('download.zipFile')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;