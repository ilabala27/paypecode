import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./lang/en";
import tn from "./lang/tn";

const resources = {
  en: {
    translation: en
  },
  tn: {
    translation: tn
  }
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;



/**
 * For changing to other lang
 * 
 * const changeLanguage = (lng) => {
 *   i18n.changeLanguage(lng);
 * }
 * 
 * 
 */