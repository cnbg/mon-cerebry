import { createI18n } from 'vue-i18n'
import messages from '@/locale/messages'

const keys = Object.keys(messages)
const kg = {}
const ru = {}
const en = {}
keys.forEach(key => {
  kg[key] = messages[key]['kg']
  ru[key] = messages[key]['ru']
  en[key] = messages[key]['en']
})

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'kg',
  fallbackLocale: 'kg',
  messages: {
    kg: kg,
    ru: ru,
    en: en,
  },
})

export default i18n
