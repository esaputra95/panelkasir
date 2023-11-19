import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Indonesia, English } from './utils/dictionary'

i18n.use(initReactI18next).init({
    lng: window.sessionStorage.getItem('language') ?? 'id',
    fallbackLng: window.sessionStorage.getItem('language') ?? 'id',
    interpolation: {
        escapeValue: false,
    },
    resources: {
        id: {
            translation: {
                ...Indonesia
            }
        },
        en: {
            translation: {
                ...English
            }
        }
    },
  });;

export default i18n;