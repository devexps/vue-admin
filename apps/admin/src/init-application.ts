import { initRequest } from '@devexps/request'
import { useUserStoreWithout, useUserStore } from '@/store/user'
import { useI18n, useLocale } from '@devexps/locale'
import { deepMerge, getGlobalConfig } from '@devexps/utils'
import { useConfigStoreWithOut, useConfigStore } from '@/store/config'
import { projectSetting } from './setting'
import { initComp } from '@devexps/devexpscmps'
import { initLayout } from '@devexps/layouts'
import { localeList } from '@devexps/locale/src/config'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import {
  getAllParentPath,
  getChildrenMenus,
  getCurrentParentPath,
  getMenus,
  getShallowMenus,
} from '@devexps/router'
import { useDesign } from '@/hooks/web/useDesign'
import { useAppInject } from '@/hooks/web/use-app-inject'
import { useTabs } from '@/hooks/useTabs'
import { usePromise } from '@devexps/hooks'
import { useMultipleTabStore } from '@/store/multipleTab'
import { listenerRouteChange } from '@/logics/mitt/routeChange'
import { useAppStore } from '@/store/modules/app'
import Logo from '@/layout/components/logo.vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useLockStore } from '@/store/lock'
import { unref } from 'vue'
import { useLockScreen } from '@/hooks/web/useLockScreen'
import { siteSetting } from '@/config'
import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'
// To decouple the modules below `packages/*`, they no longer depend on each other
// If the modules are heavily dependent on each other, you need to provide a decoupling method, and the caller will pass the parameters
// Each module needs to provide `bridge` file as a decoupling method

async function initPackages() {
  const _initRequest = async () => {
    const { apiUrl } = getGlobalConfig(import.meta.env)
    const { t } = useI18n()
    await initRequest(() => {
      return {
        apiUrl,
        getTokenFunction: () => {
          const userStore = useUserStoreWithout()
          return userStore.getAccessToken
        },
        errorFunction: null,
        noticeFunction: null,
        errorModalFunction: null,
        timeoutFunction: () => {
          const userStore = useUserStoreWithout()
          userStore.setAccessToken(undefined)
          userStore.logout(true)
        },
        unauthorizedFunction: (msg?: string) => {
          const userStore = useUserStoreWithout()
          userStore.setAccessToken(undefined)
          userStore.logout(true)
          return msg || t('sys.api.errMsg401')
        },
        handleErrorFunction: (msg, mode) => {
          if (mode === 'modal') {
            Modal.error({ title: t('sys.api.errorTip'), content: msg })
          } else if (mode === 'message') {
            message.error(msg)
          }
        },
      }
    })
  }

  const _initComp = async () => {
    await initComp(() => {
      return {
        useLocale,
        localeList,
        useAppStore,
        useConfigStore,
      }
    })
  }
  const _initLayout = async () => {
    await initLayout(() => {
      return {
        useRootSetting,
        getMenus,
        getCurrentParentPath,
        getShallowMenus,
        getChildrenMenus,
        getAllParentPath,
        useHeaderSetting,
        useDesign,
        useAppInject,
        useTabs,
        usePromise,
        useMultipleTabStore,
        listenerRouteChange,
        useUserStore,
        useAppStore,
        useConfigStore,
        Logo,
        useMenuSetting,
        useMultipleTabSetting,
        useTransitionSetting,
        useLockStore,
        useLockScreen,
        siteSetting,
      }
    })
  }

  await Promise.all([_initRequest(), _initComp(), _initLayout()])
}

// Initial project configuration
function initAppConfigStore() {
  const configStore = useConfigStoreWithOut()
  const projectConfig = unref(configStore.getProjectConfig)
  const projCfg = deepMerge(projectSetting, projectConfig || {})
  configStore.setProjectConfig(projCfg)
}

export async function initApplication() {
  // ! Need to pay attention to the timing of execution
  await initPackages()

  // Initialize internal system configuration
  initAppConfigStore()
}
