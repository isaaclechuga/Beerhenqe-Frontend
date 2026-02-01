import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// the translations
// (tip move them in a JSON file and import them)
import translationEN from "../../resources/locale-en_US.json";
import translationES from "../../resources/locale-es_MX.json";
const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    debug: false,
    fallbackLng: "en",
    // ... other options
    react: {
      bindI18n: "languageChanged loaded",
      bindI18nStore: "added removed",
    },

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });

export default i18n;
