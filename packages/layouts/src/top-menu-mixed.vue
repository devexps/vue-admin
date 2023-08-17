<script lang="ts" setup>
import LayoutMenu from './components/menu/index.vue'
import LayoutHeader from './components/header.vue'
import LayoutTabs from './components/tabs/index.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { context } from '../bridge'
import { useComosables } from './useComosables'
import { computed, unref } from 'vue'
const { useMenuSetting, useRootSetting, useMultipleTabSetting } = context
const { toggleCollapsed, getCollapsed, getMenuWidth, getShowSidebar } =
  useMenuSetting()
const { getShowFooter } = useRootSetting()
const { getShowMultipleTab } = useMultipleTabSetting()

const { headerRef, tabRef, footerRef, headerHeight, contentStyle, mainStyle } =
  useComosables()

const menuHeight = computed(() => `calc(100vh - ${unref(headerHeight)}px)`)
</script>
<template>
  <DevexpsLayout class="h-full">
    <DevexpsLayoutHeader ref="headerRef">
      <slot name="header">
        <LayoutHeader />
      </slot>
    </DevexpsLayoutHeader>
    <DevexpsLayout has-sider :style="{ height: menuHeight }">
      <DevexpsLayoutSider
        v-if="getShowSidebar"
        show-trigger
        bordered
        :collapsed-width="48"
        :width="getMenuWidth"
        collapse-mode="width"
        :collapsed="getCollapsed"
        @update:collapsed="toggleCollapsed"
      >
        <slot name="sider">
          <LayoutMenu />
        </slot>
      </DevexpsLayoutSider>

      <DevexpsLayout>
        <DevexpsLayoutHeader v-if="getShowMultipleTab">
          <slot name="tabs"><LayoutTabs ref="tabRef" /></slot>
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

      <!--      <DevexpsLayoutContent>
        <slot name="tabs"><LayoutTabs ref="tabRef" /></slot>
        <DevexpsScrollbar :style="contentStyle">
          <LayoutMain>
            <slot name="main"></slot>
          </LayoutMain>
        </DevexpsScrollbar>
      </DevexpsLayoutContent>-->
    </DevexpsLayout>
  </DevexpsLayout>
</template>
