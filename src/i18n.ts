import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language resources
import enTranslation from './locales/en.json';
import ruTranslation from './locales/ru.json';
import kgTranslation from './locales/kg.json';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ru: { translation: ruTranslation },
      kg: { translation: kgTranslation },
    },
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;