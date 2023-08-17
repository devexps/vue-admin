import type { StaticConfig, DynamicConfig } from '@devexps/types'

// github repo url
export const GITHUB_URL = 'https://github.com/devexps/vue-admin'

// vue-devexps-admin-next-doc
export const DOC_URL = 'https://devexps.com/vue-admin/'

// site url
export const SITE_URL = 'https://devexps.com/'

const dynamicConfig: DynamicConfig = {
  __: '',
}

// ! You need to clear the browser cache after the change
const staticConfig: StaticConfig = {
  authType: 'frontend',

  // enable
  enableProgress: true,
}

export const config = { ...staticConfig, ...dynamicConfig }

export const siteSetting = { GITHUB_URL, DOC_URL, SITE_URL }
