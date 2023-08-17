<script lang="ts" setup>
import { useLocale } from '@devexps/locale'
import { useAppTheme, useWebTitle } from '@devexps/hooks'

import { REDIRECT_NAME } from '@devexps/constants'
import { getGlobalConfig, computedAsync } from '@devexps/utils'
import AppProvider from '@/layout/components/app/AppProvider'
import { dateEnUS, dateViVN, enUS, viVN } from 'naive-ui'
import { unref, watch } from 'vue'
// Support Multi-language
const { getLocale } = useLocale()
// Listening to page changes and dynamically changing site titles
const { title } = getGlobalConfig(import.meta.env)
useWebTitle(title, (route) => route.name !== REDIRECT_NAME)
const { isDark } = useAppTheme()

watch(
  () => unref(isDark),
  (v) => {
    document.getElementsByTagName('html')[0].className = v ? 'dark' : ''
  },
  { immediate: true },
)

// Dynamic switch component library language
const dateLocale = computedAsync(async () => {
  const message = {
    vi_VN: () => {
      return dateViVN
    },
    en_US: () => {
      return dateEnUS
    },
  }
  const mod = await message[getLocale.value]()

  return mod?.default ?? mod
})
// Dynamic switch component library language
const locale = computedAsync(async () => {
  const message = {
    vi_VN: () => {
      import('dayjs/locale/vi')
      return viVN
    },
    en_US: () => {
      import('dayjs/locale/en')
      return enUS
    },
  }
  const mod = await message[getLocale.value]()

  return mod?.default ?? mod
})
</script>

<template>
  <DevexpsConfig :locale="locale" :date-locale="dateLocale">
    <DevexpsNotificationProvider>
      <DevexpsMessageProvider>
        <AppProvider>
          <router-view />
        </AppProvider>
      </DevexpsMessageProvider>
    </DevexpsNotificationProvider>
  </DevexpsConfig>
</template>
