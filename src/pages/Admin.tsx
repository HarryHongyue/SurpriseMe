import React from 'react';
import LanguageManager, { TranslationManager } from '../components/admin/LanguageManager';
import { useLanguage } from '../i18n/LanguageProvider';


/**
 * Admin page component
 * Contains administrative tools like language management
 */
const Admin: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="admin-page">
      <div className="container">
        <h1>{t('admin.title', 'Admin Dashboard')}</h1>
        
        <div className="admin-section">
          <h2>{t('admin.languageManager', 'Language Management')}</h2>
          <LanguageManager />
        </div>
        
        <div className="admin-section">
          <h2>{t('admin.translationTools')}</h2>
          <TranslationManager />
        </div>
      </div>

      <style>{`
        .admin-page {
          padding: 100px 0;
          min-height: 100vh;
          background: var(--bg-primary);
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        h1 {
          color: var(--text-color);
          margin-bottom: 30px;
          text-align: center;
        }

        h2 {
          color: var(--text-color);
          margin-bottom: 20px;
          font-size: 1.5rem;
        }
        
        .admin-section {
          background: var(--card-bg);
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 30px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .admin-page {
            padding: 60px 0;
          }
          
          .container {
            padding: 0 15px;
          }
          
          .admin-section {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Admin;