import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage, getCurrentLanguage } from './i18n';

// Define language context type
interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  t: (key: string, options?: any) => string;
  languages: { code: string; name: string }[];
}

// Available languages
// This will be replaced by dynamic language loading
const getAvailableLanguages = (t: any) => [
  { code: 'en', name: t('languages.english') },
  { code: 'zh', name: t('languages.chinese') },
  { code: 'nl', name: t('languages.dutch') }
];

// Create language context
const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  changeLanguage: () => {},
  t: (key: string) => key,
  languages: []
});

/**
 * Language Provider Component
 * Provides language context to all child components
 */
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get translation function from i18next
  const { t, i18n } = useTranslation();
  
  // State for current language
  const [currentLanguage, setCurrentLanguage] = useState<string>(getCurrentLanguage());

  // Handle language change
  const handleChangeLanguage = (lang: string) => {
    changeLanguage(lang);
    setCurrentLanguage(lang);
  };

  // Listen for language changes from other components
  useEffect(() => {
    const handleLanguageChangeEvent = (event: CustomEvent) => {
      setCurrentLanguage(event.detail || 'en');
    };

    window.addEventListener('languageChange', handleLanguageChangeEvent as EventListener);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChangeEvent as EventListener);
    };
  }, []);

  // Update language when i18n language changes
  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  // Context value
  const contextValue: LanguageContextType = {
    currentLanguage,
    changeLanguage: handleChangeLanguage,
    t,
    languages: getAvailableLanguages(t)
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook to use language context
 * @returns Language context
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};

export default LanguageProvider;
