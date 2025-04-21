import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";
import th from "./th.json";
import zh from "./zh.json";
import ja from "./ja.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      th: { translation: th },
      zh: { translation: zh },
      ja: { translation: ja },
    },
    fallbackLng: "th",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
