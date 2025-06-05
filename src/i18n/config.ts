import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import thTranslation from './locales/th/translation.json';
import cnTranslation from './locales/cn/translation.json';
import jpTranslation from './locales/jp/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  th: {
    translation: thTranslation,
  },
  cn: {
    translation: cnTranslation,
  },
  jp: {
    translation: jpTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'th', // Default language
  fallbackLng: 'th',
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
