<script lang="ts" setup>
import TopButtonWrapper from '../comm/TopButtonWrapper.vue'
import { useAppConfig } from '@devexps/hooks'

const { sidebar, toggleCollapse } = useAppConfig()
</script>
<template>
  <TopButtonWrapper @click.stop="toggleCollapse">
    <DevexpsIconify
      size="22"
      :icon="
        sidebar.collapsed ? 'line-md:menu-fold-right' : 'line-md:menu-fold-left'
      "
    />
  </TopButtonWrapper>
</template>
