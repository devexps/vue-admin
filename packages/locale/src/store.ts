import type { LocaleType } from '@devexps/types'
import { computed } from 'vue'
import { LOCALE_KEY } from '@devexps/constants'
import { useLocalStorage } from '@devexps/utils'
import { localeSetting } from './config'

const store = useLocalStorage(LOCALE_KEY, localeSetting)

export function setLocale(locale: LocaleType) {
  store.value.locale = locale
}

export const getLocale = computed(() => store.value.locale)
