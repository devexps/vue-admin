import { VNode } from 'vue'
import { RouteLocationNormalized } from 'vue-router'

export interface ContextOptions {
  useRootSetting: () => unknown
  useAppStore: () => unknown
  useConfigStore: () => unknown
  useHeaderSetting: () => unknown
  useTabs: () => unknown
  useUserStore: () => unknown
  useAppInject: () => unknown
  useMenuSetting: () => unknown
  useMultipleTabSetting: () => unknown
  useMultipleTabStore: () => unknown
  useTransitionSetting: () => unknown
  useLockStore: () => unknown
  useLockScreen: () => unknown
  listenerRouteChange: (
    callback: (route: RouteLocationNormalized) => void,
    immediate?: boolean,
  ) => unknown
  usePromise: (fn: Function, config?: unknown) => unknown
  useDesign: (scope: string) => unknown
  getMenus: () => Promise<any>
  getCurrentParentPath: (currentPath: string) => Promise<any>
  getShallowMenus: () => Promise<any>
  getChildrenMenus: (parentPath: string) => Promise<any>
  getAllParentPath: (menu, path) => string[]
  siteSetting: Record<string, string>
  Logo: VNode | null
}

export let context: ContextOptions = {
  useRootSetting: () => undefined,
  useAppStore: () => undefined,
  useConfigStore: () => undefined,
  useUserStore: () => undefined,
  useHeaderSetting: () => undefined,
  useMenuSetting: () => undefined,
  useMultipleTabSetting: () => undefined,
  useTransitionSetting: () => undefined,
  useLockStore: () => undefined,
  useLockScreen: () => undefined,
  useAppInject: () => undefined,
  useMultipleTabStore: () => undefined,
  listenerRouteChange: (_listenerRouteChange: (route) => void, _immediate?) =>
    true,
  usePromise: (_fn: Function, _config) => undefined,
  useTabs: () => undefined,
  useDesign: (_scope: string) => undefined,
  getMenus: async () => ({}),
  getCurrentParentPath: async (_currentPath: string) => ({}),
  getShallowMenus: async () => ({}),
  getChildrenMenus: async (_parentPath: string) => ({}),
  getAllParentPath: (_menu, _path) => [],
  siteSetting: {},
  Logo: null,
}

export const initLayout = async (func: AnyFunction<any>) => {
  context = func()
}
