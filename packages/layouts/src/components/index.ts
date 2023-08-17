import { h } from 'vue'
import { DevexpsIconify } from '@devexps/devexpscmps'

export const renderIcon = (icon: string) => {
  if (!icon) return undefined
  return () => h(DevexpsIconify, { icon })
}
