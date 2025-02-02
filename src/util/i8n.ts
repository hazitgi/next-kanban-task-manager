import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LangaugeDetector from "i18next-browser-languagedetector";

import translationEn from "../locales/en/translation.json";

const resources = {
  en: {
    translation: translationEn,
  },
};

i18n
  .use(LangaugeDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
