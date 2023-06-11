import { getLocales } from 'react-native-localize';
import I18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tn from '@config/locales/tn';
import en from '@config/locales/en';


I18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: getLocales()[0]?.languageCode,
    fallbackLng: 'en',
    resources: {
        en: { translation: en },
        tn: { translation: tn },
    },
    interpolation: {
        escapeValue: false
    },
    react: {
        useSuspense: false
    },
});

export default I18n;

// export const t = (key: string) => {
//     const { t } = useTranslation();
//     return t(key)
// }

/**
 * Ref1: Import on root file same like below
 * import '@config/lang.config';
 * 
 * Ref2: For changing lang
 * const { i18n } = useTranslation();
 * i18n.changeLanguage('tn')
 */