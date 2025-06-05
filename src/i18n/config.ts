import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import thTranslation from './locales/th/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  th: {
    translation: thTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'th', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
