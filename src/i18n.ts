import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "@/locales/en/translation.json";
import thTranslation from "@/locales/th/translation.json";
import zhTranslation from "@/locales/zh/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    th: {
      translation: thTranslation,
    },
    zh: {
      translation: zhTranslation,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
