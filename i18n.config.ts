import zhHant from './i18n/locales/zh-Hant.json'
import zhHans from './i18n/locales/zh-Hans.json'
import en from './i18n/locales/en.json'
import ja from './i18n/locales/ja.json'

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'zh-Hant',
  messages: {
    'zh-Hant': zhHant,
    'zh-Hans': zhHans,
    'en': en,
    'ja': ja,
  },
}))
