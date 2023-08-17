import { useAppConfig } from '../config'
import { HandlerSettingEnum, ThemeEnum } from '@devexps/constants'
import { useEventListener } from '@devexps/utils'
import { computed, unref } from 'vue'

export function createMediaPrefersColorSchemeListen() {
  const { setAppConfig } = useAppConfig()
  useEventListener(
    window.matchMedia('(prefers-color-scheme: dark)'),
    'change',
    (e: Event) => {
      // @ts-ignore
      setAppConfig({ theme: e.matches ? ThemeEnum.DARK : ThemeEnum.LIGHT })
    },
  )
}

export const useAppTheme = () => {
  const { theme, baseHandler } = useAppConfig()

  const isDark = computed(() => {
    return unref(theme) === ThemeEnum.DARK
  })
  const toggleTheme = (v) => {
    baseHandler(HandlerSettingEnum.CHANGE_THEME, v)
  }
  return { isDark, theme, toggleTheme }
}
