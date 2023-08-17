<script lang="ts" setup>
import LayoutMenu from './components/menu/index.vue'
import LayoutHeader from './components/header.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { context } from '../bridge'
import { onMounted, ref, unref } from 'vue'
import { useComosables } from './useComosables'
const { useMenuSetting, Logo, useRootSetting } = context

const { getMenuWidth } = useMenuSetting()
const { getShowFooter } = useRootSetting()

const { headerRef, footerRef, contentStyle, mainStyle } = useComosables()

const active = ref(false)
onMounted(() => {
  active.value = true
})
const activeTrigger = () => {
  active.value = !unref(active)
}
</script>
<template>
  <DevexpsLayout class="h-full min-w-375px">
    <DevexpsDrawer v-model:show="active" placement="left" :width="getMenuWidth">
      <DevexpsDrawerContent :body-content-style="{ padding: 0 }">
        <LayoutMenu />
      </DevexpsDrawerContent>
    </DevexpsDrawer>
    <DevexpsLayoutHeader ref="headerRef">
      <slot name="header">
        <LayoutHeader>
          <template #logo>
            <DevexpsSpace align="center" :wrap-item="false">
              <Logo :show-title="false" />
              <DevexpsIconify
                @click="activeTrigger"
                :icon="
                  active
                    ? 'menu-fold-outlined'
                    : 'ant-design:menu-unfold-outlined'
                "
                size="24"
                hoverPointer
              />
            </DevexpsSpace>
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

<style scoped></style>
