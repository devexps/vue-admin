<script lang="ts" setup>
import LayoutHeader from './components/header.vue'
import LayoutMenu from './components/menu/index.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { useComosables } from './useComosables'
import { context } from '../bridge'
const { headerRef, footerRef, contentStyle, mainStyle } = useComosables()
const { useRootSetting } = context
const { getShowFooter } = useRootSetting()
</script>
<template>
  <DevexpsLayout class="h-full">
    <DevexpsLayoutHeader ref="headerRef">
      <slot name="header">
        <LayoutHeader ref="headerRef">
          <template #menu>
            <LayoutMenu mode="horizontal" />
          </template>
        </LayoutHeader>
      </slot>
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
</template>
