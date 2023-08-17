import { defineStore } from 'pinia'
import { FooterLinkOptions, DefineSiteGeneralOptions } from '@devexps/types'
import { useI18n } from '@devexps/locale'
// @ts-ignore
import defaultLogo from '@/assets/images/logo.png'
// @ts-ignore
import defaultAvatar from '@/assets/images/header.jpg'
import { getGlobalConfig } from '@devexps/utils'

const { t } = useI18n()

// @ts-ignore
const { title } = getGlobalConfig(import.meta.env)

// github repo url
export const GITHUB_URL = 'https://github.com/devexps/vue-admin'

// vue-devexps-admin-next-doc
export const DOC_URL = 'https://devexps.com/vue-admin/'

// site url
export const SITE_URL = 'https://devexps.com/'

const links: FooterLinkOptions[] = [
  {
    label: t('layout.footer.onlinePreview'),
    url: SITE_URL,
  },
  {
    icon: 'uim:github',
    url: GITHUB_URL,
  },
  {
    label: t('layout.footer.onlineDocument'),
    url: DOC_URL,
  },
]

export const useSiteGeneral = defineStore({
  id: 'APP_SITE_GENERAL_OPTIONS',
  state: (): DefineSiteGeneralOptions => ({
    logo: defaultLogo,
    title,
    copyright: '2023 Devexps Admin',
    links: links,
    avatar: defaultAvatar,
    username: 'Devexps Admin',
  }),
})
