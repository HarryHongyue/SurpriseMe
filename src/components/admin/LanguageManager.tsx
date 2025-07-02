import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageProvider';
import { autoAddLanguage, checkLanguageCompleteness } from '../../i18n/utils/autoTranslate';
import { autoTranslateMissingKeys } from '../../i18n/utils/autoTranslate';  


/**
 * Language Manager Component
 * 
 * This component provides an admin interface to:
 * 1. View all available languages
 * 2. Add new languages via auto-translation
 * 3. Check language completeness
 */
const LanguageManager: React.FC = () => {
  const { languages, currentLanguage, t } = useLanguage();
  const [newLanguageCode, setNewLanguageCode] = useState<string>('');
  const [newLanguageName, setNewLanguageName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' | '' }>({
    text: '',
    type: ''
  });

  // Common language codes for easy selection
  const commonLanguages = [
    { code: 'fr', name: t('languages.french') },
    { code: 'de', name: t('languages.german') },
    { code: 'es', name: t('languages.spanish') },
    { code: 'it', name: t('languages.italian') },
    { code: 'ja', name: t('languages.japanese') },
    { code: 'ko', name: t('languages.korean') },
    { code: 'pt', name: t('languages.portuguese') },
    { code: 'ru', name: t('languages.russian') }
  ];

  // Filter out already added languages
  const availableLanguages = commonLanguages.filter(
    lang => !languages.some(existing => existing.code === lang.code)
  );

  // Handle adding a new language
  const handleAddLanguage = async () => {
    if (!newLanguageCode || !newLanguageName) {
      setMessage({
        text: t('admin.languageManager.pleaseProvideCodeAndName'),
        type: 'error'
      });
      return;
    }

    // Check if language already exists
    if (languages.some(lang => lang.code === newLanguageCode)) {
      setMessage({
        text: t('admin.languageManager.languageAlreadyExists', { code: newLanguageCode }),
        type: 'error'
      });
      return;
    }

    setIsLoading(true);
    setMessage({ text: t('admin.languageManager.addingLanguage', { name: newLanguageName }), type: 'info' });

    try {
      await autoAddLanguage(newLanguageCode);
      
      // Add language to the list with name
      // Note: The actual language addition to i18next happens in autoAddLanguage
      
      setMessage({
        text: t('admin.languageManager.successfullyAdded', { name: newLanguageName, code: newLanguageCode }),
        type: 'success'
      });
      
      // Reset form
      setNewLanguageCode('');
      setNewLanguageName('');
      
      // Refresh page to see changes
      window.location.reload();
    } catch (error) {
      console.error('Failed to add language:', error);
      setMessage({
        text: t('admin.languageManager.failedToAdd', { error: error instanceof Error ? error.message : String(error) }),
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle selecting a common language
  const handleSelectCommonLanguage = (code: string, name: string) => {
    setNewLanguageCode(code);
    setNewLanguageName(name);
  };

  return (
    <div className="language-manager">
      <h2>{t('admin.languageManager.title', 'Language Manager')}</h2>
      
      {/* Current languages */}
      <div className="language-section">
        <h3>{t('admin.languageManager.currentLanguages', 'Current Languages')}</h3>
        <div className="language-grid">
          {languages.map(lang => (
            <div 
              key={lang.code} 
              className={`language-card ${currentLanguage === lang.code ? 'active' : ''}`}
            >
              <div className="language-code">{lang.code.toUpperCase()}</div>
              <div className="language-name">{lang.name}</div>
              {currentLanguage === lang.code && (
                <div className="active-indicator">✓</div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Add new language */}
      <div className="language-section">
        <h3>{t('admin.languageManager.addLanguage', 'Add New Language')}</h3>
        <div className="add-language-form">
          <div className="form-row">
            <input
              type="text"
              placeholder={t('admin.languageManager.languageCodePlaceholder')}
              value={newLanguageCode}
              onChange={(e) => setNewLanguageCode(e.target.value.toLowerCase())}
              disabled={isLoading}
            />
            <input
              type="text"
              placeholder={t('admin.languageManager.languageNamePlaceholder')}
              value={newLanguageName}
              onChange={(e) => setNewLanguageName(e.target.value)}
              disabled={isLoading}
            />
            <button 
              onClick={handleAddLanguage}
              disabled={isLoading || !newLanguageCode || !newLanguageName}
            >
              {isLoading ? t('admin.languageManager.adding') : t('admin.languageManager.addLanguage')}
            </button>
          </div>
          
          {/* Common languages quick select */}
          {availableLanguages.length > 0 && (
            <div className="common-languages">
              <p>{t('admin.languageManager.quickAdd', 'Quick Add:')}</p>
              <div className="language-pills">
                {availableLanguages.map(lang => (
                  <button
                    key={lang.code}
                    className="language-pill"
                    onClick={() => handleSelectCommonLanguage(lang.code, lang.name)}
                    disabled={isLoading}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Status message */}
          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>

      

      
      {/* Styling */}
      <style>{`
        .language-manager {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .language-section {
          margin-bottom: 30px;
          background: var(--card-bg);
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        h2 {
          color: var(--text-color);
          margin-bottom: 20px;
          text-align: center;
        }
        
        h3 {
          color: var(--text-color);
          margin-bottom: 15px;
          font-size: 1.2rem;
        }
        
        .language-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 15px;
        }
        
        .language-card {
          background: var(--bg-secondary);
          border-radius: 8px;
          padding: 15px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          border: 2px solid transparent;
        }
        
        .language-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .language-card.active {
          border-color: var(--primary-color);
          background: var(--bg-primary);
        }
        
        .language-code {
          font-weight: bold;
          font-size: 1.2rem;
          color: var(--primary-color);
        }
        
        .language-name {
          margin-top: 5px;
          color: var(--body-text);
        }
        
        .active-indicator {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--primary-color);
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }
        
        .add-language-form {
          margin-top: 15px;
        }
        
        .form-row {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        input {
          flex: 1;
          padding: 10px 15px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
          color: var(--body-text);
        }
        
        button {
          padding: 10px 20px;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        button:hover:not(:disabled) {
          background: var(--accent-color);
        }
        
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .common-languages {
          margin-top: 15px;
        }
        
        .language-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        
        .language-pill {
          padding: 5px 12px;
          background: var(--bg-tertiary);
          color: var(--body-text);
          border-radius: 20px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .language-pill:hover:not(:disabled) {
          background: var(--primary-color);
          color: white;
        }
        
        .message {
          margin-top: 15px;
          padding: 10px 15px;
          border-radius: 6px;
          font-size: 0.9rem;
        }
        
        .message.success {
          background: #d1fae5;
          color: #065f46;
        }
        
        .message.error {
          background: #fee2e2;
          color: #b91c1c;
        }
        
        .message.info {
          background: #dbeafe;
          color: #1e40af;
        }
        
        @media (max-width: 600px) {
          .form-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export const TranslationManager: React.FC = () => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [status, setStatus] = useState<string>('');
  const { languages, t } = useLanguage();

  const handleAutoTranslate = async () => {
    if (window.confirm(t('admin.languageManager.confirmAutoTranslate'))) {
      try {
        setIsTranslating(true);
        setStatus(t('admin.languageManager.translatingKeys'));
        
        // Get all language codes except English
        const targetLangs = languages
          .filter(lang => lang.code !== 'en')
          .map(lang => lang.code);
        
        await autoTranslateMissingKeys(targetLangs);
        setStatus(t('admin.languageManager.translationComplete'));
      } catch (error) {
        console.error('Translation failed:', error);
        setStatus(t('admin.languageManager.translationFailed'));
      } finally {
        setIsTranslating(false);
      }
    }
  };

  return (
    <div className="translation-manager" style={{ 
      padding: '20px', 
      backgroundColor: 'var(--card-bg)',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      margin: '20px 0'
    }}>
      <h3 style={{ marginTop: 0 }}>{t('admin.translationManager.title')}</h3>
      <p>{t('admin.translationManager.description')}</p>
      
      <button 
        onClick={handleAutoTranslate} 
        disabled={isTranslating}
        style={{
          padding: '10px 15px',
          backgroundColor: isTranslating ? '#ccc' : 'var(--primary-color)',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isTranslating ? 'not-allowed' : 'pointer',
          fontSize: '14px'
        }}
      >
        {isTranslating ? t('admin.translationManager.translating') : t('admin.translationManager.autoTranslateButton')}
      </button>
      
      {status && (
        <p style={{ 
          marginTop: '15px', 
          padding: '10px',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: '4px'
        }}>
          {status}
        </p>
      )}
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p><strong>{t('admin.translationManager.note')}:</strong> {t('admin.translationManager.noteDescription')}</p>
        <p>{t('admin.translationManager.consoleInstruction')}</p>
      </div>
    </div>
  );
};

export default LanguageManager;
