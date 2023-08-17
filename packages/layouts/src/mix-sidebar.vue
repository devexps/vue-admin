<script lang="ts" setup>
import { useComosables } from './useComosables'
import LayoutMixMenu from './components/mixSideBar/Menu.vue'
import LayoutHeader from './components/header.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { context } from '../bridge'
import { computed, unref } from 'vue'
import {
  SIDE_BAR_MINI_WIDTH,
  SIDE_BAR_SHOW_TIT_MINI_WIDTH,
} from '@devexps/constants'
const { useMenuSetting, useRootSetting } = context
const { headerRef, contentStyle, mainStyle, footerRef } = useComosables()

const { getCollapsed, getMenuWidth, getMixSideFixed, getShowSidebar } =
  useMenuSetting()
const { getShowFooter } = useRootSetting()

const getMixSidebarWidth = computed(() => {
  return unref(getCollapsed)
    ? SIDE_BAR_MINI_WIDTH
    : SIDE_BAR_SHOW_TIT_MINI_WIDTH
})
const getContainerStyle = computed(() => {
  return {
    paddingLeft: (unref(getMixSideFixed) ? unref(getMenuWidth) : 0) + 'px',
  }
})
</script>
<template>
  <DevexpsLayout has-sider class="h-full">
    <DevexpsLayoutSider
      v-if="getShowSidebar"
      bordered
      :collapsed-width="getMixSidebarWidth"
      collapse-mode="width"
      :collapsed="true"
    >
      <slot name="sider">
        <LayoutMixMenu :mix-sidebar-width="getMixSidebarWidth" />
      </slot>
    </DevexpsLayoutSider>
    <DevexpsLayout :style="getContainerStyle" class="transition-all">
      <DevexpsLayoutHeader ref="headerRef">
        <slot name="header"><LayoutHeader /></slot>
      </DevexpsLayoutHeader>
      <DevexpsLayout :content-style="contentStyle">
        <DevexpsLayoutContent :content-style="mainStyle">
          <LayoutMain>
            <slot name="main"></slot>
          </LayoutMain>
        </DevexpsLayoutContent>
        <DevexpsLayoutFooter v-if="getShowFooter" ref="footerRef">
          <slot name="footer">
            <LayoutFooter />
          </slot>
        </DevexpsLayoutFooter>
      </DevexpsLayout>
    </DevexpsLayout>
  </DevexpsLayout>
</template>
