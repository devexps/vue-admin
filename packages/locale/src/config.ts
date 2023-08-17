import type { LocaleConfig, LocaleType } from '@devexps/types'

export const LOCALE: { [key: string]: LocaleType } = {
  en: 'en',
  vi: 'vi_VN',
}

export const localeSetting: LocaleConfig = {
  // Locale
  locale: LOCALE.en,
  // Default locale
  fallback: LOCALE.en,
  // available Locales
  availableLocales: [LOCALE.en, LOCALE.vi],
}

// locale list
export const localeList: any[] = [
  {
    text: 'English',
    event: LOCALE.en,
  },
  {
    text: 'Vietnamese',
    event: LOCALE.vi,
  },
]
