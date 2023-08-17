<script lang="ts" setup>
import BasicMenu from './components/BasicMenu.vue'
import { MenuModeEnum } from '@devexps/constants'
import { useAppConfig } from '@devexps/hooks'
import MixSubMenu from './components/MixSubMenu.vue'

const { isSidebar, isMix, menu } = useAppConfig()
</script>
<template>
  <DevexpsScrollbar>
    <BasicMenu
      v-if="isSidebar || (isMix && !menu.split)"
      :mode="MenuModeEnum.VERTICAL"
    />
    <MixSubMenu v-if="isMix && menu.split" />
  </DevexpsScrollbar>
</template>
