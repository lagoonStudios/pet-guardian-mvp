import { getLocales } from 'expo-localization';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import enAuth from '@/src/locales/en/auth.json';
import enCommon from '@/src/locales/en/common.json';
import enErrors from '@/src/locales/en/errors.json';
import esAuth from '@/src/locales/es/auth.json';
import esCommon from '@/src/locales/es/common.json';
import esErrors from '@/src/locales/es/errors.json';

const fallbackLanguage = 'en';
const supportedLanguages = ['en', 'es'] as const;
const i18n = createInstance();

type SupportedLanguage = (typeof supportedLanguages)[number];

const resolveLanguage = (): SupportedLanguage => {
  const locales = getLocales();
  const languageCode = locales[0]?.languageCode?.toLowerCase();

  if (languageCode && supportedLanguages.includes(languageCode as SupportedLanguage)) {
    return languageCode as SupportedLanguage;
  }

  return fallbackLanguage;
};

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    lng: resolveLanguage(),
    fallbackLng: fallbackLanguage,
    supportedLngs: [...supportedLanguages],
    defaultNS: 'common',
    ns: ['auth', 'common', 'errors'],
    resources: {
      en: {
        auth: enAuth,
        common: enCommon,
        errors: enErrors,
      },
      es: {
        auth: esAuth,
        common: esCommon,
        errors: esErrors,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });
}

export { i18n };
