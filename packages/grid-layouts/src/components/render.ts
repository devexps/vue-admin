import { h, VNode } from 'vue'
import { DevexpsIconify } from '@devexps/devexpscmps'

export function renderIcon(icon: string): () => VNode | undefined {
  if (!icon) return () => undefined
  return () => h(DevexpsIconify, { icon })
}
