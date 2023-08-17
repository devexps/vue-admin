import type { App, Component } from 'vue'
const projectName = 'VueAdmin'
export const components = {
  install: (app: App) => {
    // @ts-ignore
    const comp = import.meta.glob('./**/*.vue', { eager: true })
    Object.keys(comp).forEach((k) => {
      const c = comp[k].default
      switch (c.__name) {
        case 'TabPane':
          c.__TAB_PANE__ = true
          break
        case 'Tab':
          c.__TAB__ = true
          break
        case 'DescriptionsItem':
          c.DESCRIPTION_ITEM_FLAG = true
          break
        case 'FormItemGi':
          c.__GRID_ITEM__ = true
          break
        case 'GridItem':
          c.__GRID_ITEM__ = true
          break
      }
      // console.log(c)
      if (!maps.get(c.__name) && !c.name) {
        warn(c.__name)
        return
      }
      app.component(`Devexps${c.name || c.__name}`, c)
    })
  },
}

export const maps = new Map<String, Component | String>()

export function warn(message: string) {
  console.warn(`[${projectName} warn]:<${message}> components not registered!`)
}

export function error(message: string) {
  throw new Error(`[${projectName} error]:${message}`)
}

//Notification
let registerNotice = () => {}
export let notice
export const setNotice = (func = () => {}) => {
  registerNotice = func
  console.log('useNotice...')
}
export const useNotice = () => {
  notice = registerNotice()
  if (!notice) {
    console.log('Registration failed')
  }
  return notice
}

//Message
let registerMsg = () => {}
export let msg
export const useMsg = () => {
  msg = registerMsg()
  if (!msg) {
    console.log('egistration failed')
  }
  return msg
}

export const setMessage = (func = () => {}) => {
  registerMsg = func
  console.log('useMsg...')
}
