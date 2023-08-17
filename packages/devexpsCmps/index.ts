import type { App } from 'vue'
export { initComp } from './bridge'
import VXETable from 'vxe-table-demonic'
export { DevexpsIconify } from './src/iconify'

import { i18n } from '@devexps/locale/src/setup-i18n'

import { maps, components } from './src'
export { setNotice, setMessage, notice, msg, useNotice, useMsg } from './src'
export function initDevexpsComponent(app: App, comp: Object, global = true) {
  Object.keys(comp).forEach((k) => {
    maps.set(k, comp[k])
  })
  VXETable.setup({
    i18n: (key, args) => i18n.global.t(key, args)
  })
  app.use(VXETable)
  app.use(components)
  if (!global) return
}

export { useTable } from '#/table'
export { useForm } from '#/form'
