import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translation files
import enTranslation from './locales/en/translation.json';
import zhTranslation from './locales/zh/translation.json';
import nlTranslation from './locales/nl/translation.json';

// Resources object containing all translations
const resources = {
  en: {
    translation: enTranslation
  },
  zh: {
    translation: zhTranslation
  },
  nl: {
    translation: nlTranslation
  }
};

/**
 * i18n configuration
 * - Detects user language
 * - Loads translations
 * - Provides fallback mechanisms
 * - Supports namespace separation
 */
i18n
  // Load translations using http backend
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Default resources for static loading
    resources,
    // Default language
    fallbackLng: 'en',
    lng: 'en', // Force English as default language
    // Debug mode - disable in production
    debug: process.env.NODE_ENV === 'development',
    // Namespace configuration
    defaultNS: 'translation',
    ns: ['translation'],
    // Interpolation configuration
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    // React configuration
    react: {
      useSuspense: true,
    },
    // Detection options
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

/**
 * Helper function to change language
 * @param language - Language code (en, zh, nl)
 */
export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
  // Store language preference
  localStorage.setItem('i18nextLng', language);
  // Dispatch event for components to react
  window.dispatchEvent(new CustomEvent('languageChange', { detail: language }));
};

/**
 * Helper function to get current language
 * @returns Current language code
 */
export const getCurrentLanguage = (): string => {
  return i18n.language || 'en';
};

/**
 * Helper function to add a new language dynamically
 * @param language - Language code
 * @param translations - Translation object
 */
export const addLanguage = (language: string, translations: Record<string, string>) => {
  i18n.addResourceBundle(language, 'translation', translations, true, true);
};

export default i18n;
