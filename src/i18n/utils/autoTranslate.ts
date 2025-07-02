/**
 * Auto-translation utility for adding new languages
 * 
 * This utility provides functions to automatically translate content
 * from a base language (usually English) to a target language.
 * 
 * Note: In a production environment, you would typically use a
 * translation service API like Google Translate, DeepL, or Microsoft Translator.
 * This example uses a mock implementation for demonstration purposes.
 */

import { addLanguage } from '../i18n';
import enTranslation from '../locales/en/translation.json';

// Type for translation object (nested structure)
type TranslationObject = {
  [key: string]: string | TranslationObject;
};

/**
 * Flattens a nested translation object into key-value pairs
 * @param obj - The nested translation object
 * @param prefix - Current key prefix
 * @returns Flattened object with dot notation keys
 */
const flattenTranslations = (
  obj: TranslationObject, 
  prefix: string = ''
): Record<string, string> => {
  return Object.keys(obj).reduce((acc: Record<string, string>, key: string) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    
    if (typeof value === 'string') {
      acc[prefixedKey] = value;
    } else {
      const flattened = flattenTranslations(value as TranslationObject, prefixedKey);
      Object.assign(acc, flattened);
    }
    
    return acc;
  }, {});
};

/**
 * Unflattens a flat object with dot notation keys back into a nested structure
 * @param obj - Flattened object with dot notation keys
 * @returns Nested translation object
 */
const unflattenTranslations = (obj: Record<string, string>): TranslationObject => {
  const result: TranslationObject = {};
  
  Object.keys(obj).forEach(key => {
    const parts = key.split('.');
    let current: any = result;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;
      
      if (isLast) {
        current[part] = obj[key];
      } else {
        current[part] = current[part] || {};
        current = current[part];
      }
    }
  });
  
  return result;
};

/**
 * Translation function using LibreTranslate API
 * @param text - Text to translate
 * @param targetLang - Target language code
 * @returns Translated text
 */
const translateText = async (text: string, targetLang: string): Promise<string> => {
  try {
    // For development/demo purposes, we'll use the public LibreTranslate API
    // In production, you should use a paid service with proper API key
    const API_URL = 'https://libretranslate.de/translate';
    
    // Map our language codes to LibreTranslate codes if needed
    const langMap: Record<string, string> = {
      'en': 'en',
      'zh': 'zh',
      'nl': 'nl',
      // Add more mappings as needed
    };
    
    const targetLangCode = langMap[targetLang] || targetLang;
    
    // Fallback to mock translation if text is empty or for development
    if (!text.trim() || process.env.NODE_ENV === 'development') {
      console.log(`Development mode: Mock translating "${text}" to ${targetLang}`);
      return `[${targetLang}] ${text}`;
    }
    
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        source: 'en', // Source language is English
        target: targetLangCode,
        format: 'text'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.translatedText || `[${targetLang}] ${text}`;
  } catch (error) {
    console.error('Translation error:', error);
    // Fallback to mock translation in case of error
    return `[${targetLang}] ${text}`;
  }
};

/**
 * Translates all strings in a flattened translation object
 * @param flatTranslations - Flattened translation object
 * @param targetLang - Target language code
 * @returns Translated flattened object
 */
const translateAllStrings = async (
  flatTranslations: Record<string, string>,
  targetLang: string
): Promise<Record<string, string>> => {
  const result: Record<string, string> = {};
  const entries = Object.entries(flatTranslations);
  
  // Process translations in batches to avoid rate limits
  const batchSize = 10;
  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    const promises = batch.map(async ([key, value]) => {
      const translated = await translateText(value, targetLang);
      return [key, translated];
    });
    
    const translatedBatch = await Promise.all(promises);
    translatedBatch.forEach(([key, value]) => {
      result[key] = value;
    });
  }
  
  return result;
};

/**
 * Automatically translates and adds a new language
 * @param targetLang - Target language code
 * @returns Promise that resolves when translation is complete
 */
export const autoAddLanguage = async (targetLang: string): Promise<void> => {
  try {
    console.log(`Adding new language: ${targetLang}`);
    
    // Flatten English translations (source)
    const flatEnglish = flattenTranslations(enTranslation);
    
    // Translate all strings
    const flatTranslated = await translateAllStrings(flatEnglish, targetLang);
    
    // Unflatten back to nested structure
    const translatedObject = unflattenTranslations(flatTranslated);
    
    // Add to i18next
    addLanguage(targetLang, translatedObject as Record<string, string>);
    
    console.log(`Successfully added language: ${targetLang}`);
  } catch (error) {
    console.error(`Failed to add language ${targetLang}:`, error);
    throw error;
  }
};

/**
 * Checks if a language is supported by comparing its keys with the base language
 * @param langData - Language translation data to check
 * @returns Object with missing keys and completion percentage
 */
export const checkLanguageCompleteness = (langData: TranslationObject): {
  missingKeys: string[];
  completionPercentage: number;
} => {
  const flatEnglish = flattenTranslations(enTranslation);
  const flatLang = flattenTranslations(langData);
  
  const englishKeys = Object.keys(flatEnglish);
  const langKeys = Object.keys(flatLang);
  
  const missingKeys = englishKeys.filter(key => !langKeys.includes(key));
  const completionPercentage = ((englishKeys.length - missingKeys.length) / englishKeys.length) * 100;
  
  return {
    missingKeys,
    completionPercentage: Math.round(completionPercentage * 100) / 100
  };
};

export default {
  autoAddLanguage,
  checkLanguageCompleteness
};

export const autoTranslateMissingKeys = async (targetLangs: string[] = ['zh', 'nl']): Promise<void> => {
  try {
    // Get English translations as source
    const flatEnglish = flattenTranslations(enTranslation);
    const englishKeys = Object.keys(flatEnglish);
    
    for (const lang of targetLangs) {
      try {
        console.log(`Updating missing translations for: ${lang}`);
        
        // Skip English as it's our source
        if (lang === 'en') continue;
        
        // Import the target language file
        const langModule = await import(`../locales/${lang}/translation.json`);
        const currentTranslations = langModule.default || langModule;
        const flatCurrent = flattenTranslations(currentTranslations);
        
        // Find missing keys
        const missingKeys = englishKeys.filter(key => !(key in flatCurrent));
        
        if (missingKeys.length === 0) {
          console.log(`No missing translations found for ${lang}`);
          continue;
        }
        
        console.log(`Found ${missingKeys.length} missing translations for ${lang}`);
        
        // Create object with missing keys and their English values
        const missingTranslations: Record<string, string> = {};
        for (const key of missingKeys) {
          missingTranslations[key] = flatEnglish[key];
        }
        
        // Translate all missing keys
        const translated = await translateAllStrings(missingTranslations, lang);
        
        // Merge with existing translations
        const updatedTranslations = {
          ...currentTranslations,
          ...unflattenTranslations(translated)
        };
        
        // Log the updated translations
        console.log(`Successfully translated ${Object.keys(translated).length} keys for ${lang}`);
        console.log('Updated translations:', updatedTranslations);
        
        // Log the JSON that should be saved to the file
        console.log(`\n=== Updated ${lang} translations ===`);
        console.log(JSON.stringify(updatedTranslations, null, 2));
        
      } catch (error) {
        console.error(`Error updating translations for ${lang}:`, error);
      }
    }
    
  } catch (error) {
    console.error('Error in autoTranslateMissingKeys:', error);
    throw error;
  }
};
