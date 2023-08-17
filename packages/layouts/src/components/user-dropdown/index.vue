<script lang="ts" setup>
import { h, ref, unref } from 'vue'
import { context } from '../../../bridge'
const { useUserStore } = context
import { useI18n } from '@devexps/locale'
import { openWindow } from '@devexps/utils'
import { DevexpsIconify } from '@devexps/devexpscmps'
import LockModal from '../lock/LockModal.vue'

const userStore = useUserStore()

const { t } = useI18n()

import UserInfo from './user-info.vue'
const renderIcon = (props, children?: any) => {
  return () => {
    return h(DevexpsIconify, props, children)
  }
}

const options = ref([
  {
    label: t('Document'),
    key: 'doc',
    icon: renderIcon({
      icon: 'carbon:document',
    }),
  },
  {
    key: 'header-divider',
    type: 'divider',
  },
  {
    label: t('Lock'),
    key: 'lock',
    icon: renderIcon({
      icon: 'ant-design:lock-outlined',
    }),
  },
  {
    label: t('Logout'),
    key: 'logout',
    icon: renderIcon({
      icon: 'ri:shut-down-line',
    }),
  },
])

const showLockModal = ref(false)

const handleSelect = (key) => {
  switch (key) {
    case 'logout':
      handleLoginOut()
      break
    case 'doc':
      openDoc()
      break
    case 'lock':
      handleLock()
      break
  }
}

const handleLoginOut = () => {
  userStore.logout(true)
}

const openDoc = () => {
  // openWindow(DOC_URL)
}

const handleLock = () => {
  showLockModal.value = !unref(showLockModal)
}
</script>

<template>
  <DevexpsDropdown trigger="hover" :options="options" @select="handleSelect">
    <UserInfo />
  </DevexpsDropdown>
  <LockModal v-model:show="showLockModal" />
</template>
