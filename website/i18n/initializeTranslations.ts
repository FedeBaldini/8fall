import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import it from "./translations/it";

export function initializeTranslations() {
  return i18n.use(initReactI18next).init({
    resources: {
      it: {
        translation: it,
      },
    },
    lng: "it",
    fallbackLng: "it",

    interpolation: {
      escapeValue: false,
    },
  });
}