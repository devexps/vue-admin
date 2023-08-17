import {
  StoreGeneric,
  storeToRefs,
  useSiteGeneral as siteGeneralStore,
} from '@devexps/stores'

import { _merge } from '@devexps/utils'
import { DefineSiteGeneralOptions } from '@devexps/types'

export const useSiteGeneral = () => {
  const useSiteGeneralStore = siteGeneralStore()
  const siteGeneral = storeToRefs(
    useSiteGeneralStore as StoreGeneric,
  ) as unknown as DefineSiteGeneralOptions
  const initSiteGeneralConfig = (
    configs: DeepPartial<DefineSiteGeneralOptions>,
  ) => {
    useSiteGeneralStore.$patch((state) => {
      _merge(state, configs)
    })
  }
  return {
    ...siteGeneral,
    initSiteGeneralConfig,
  }
}
