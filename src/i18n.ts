import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Define available languages
export const languages = {
  en: { nativeName: 'English', dir: 'ltr' },
  ar: { nativeName: 'العربية', dir: 'rtl' }
};

// Function to update document direction
export const setDocumentDirection = (language: string) => {
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = language;
};

// Initialize i18next
i18n
  // Load translations from a backend (can be removed if using static imports)
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    supportedLngs: Object.keys(languages),
    
    // Define namespaces for better organization (optional)
    ns: ['translation'],
    defaultNS: 'translation',
    
    // Backend configuration for loading translations
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // Detection options
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18next',
      caches: ['localStorage', 'cookie'],
    },
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Set initial document direction based on detected/stored language
setDocumentDirection(i18n.language);

// Listen for language changes and update direction
i18n.on('languageChanged', (lng) => {
  setDocumentDirection(lng);
});

export default i18n; 