<script lang="ts" setup>
import { useComosables } from './useComosables'
import LayoutMenu from './components/menu/index.vue'
import LayoutHeader from './components/header.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { useAppConfig } from '@devexps/hooks'
const { headerRef, contentStyle, mainStyle, footerRef } = useComosables()
const { toggleCollapse, sidebar, footer } = useAppConfig()
</script>
<template>
  <DevexpsLayout has-sider class="h-full">
    <DevexpsLayoutSider
      v-if="sidebar.show"
      show-trigger
      bordered
      :collapsed-width="sidebar.collapsedWidth"
      :width="sidebar.width"
      collapse-mode="width"
      :collapsed="sidebar.collapsed"
      @update:collapsed="toggleCollapse"
    >
      <slot name="sider">
        <LayoutMenu />
      </slot>
    </DevexpsLayoutSider>
    <DevexpsLayout>
      <DevexpsLayoutHeader ref="headerRef">
        <slot name="header"><LayoutHeader /></slot>
      </DevexpsLayoutHeader>
      <DevexpsLayout :content-style="contentStyle">
        <DevexpsLayoutContent :content-style="mainStyle">
          <LayoutMain>
            <slot name="main"></slot>
          </LayoutMain>
        </DevexpsLayoutContent>
        <DevexpsLayoutFooter v-if="footer.show" ref="footerRef">
          <slot name="footer">
            <LayoutFooter />
          </slot>
        </DevexpsLayoutFooter>
      </DevexpsLayout>
    </DevexpsLayout>
  </DevexpsLayout>
</template>

<style scoped></style>
