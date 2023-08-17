<script lang="ts" setup>
import { ref, h, onMounted, unref, nextTick, computed } from 'vue'
import { createNamespace, mapTree } from '@devexps/utils'
import { context } from '../../../bridge'
import {
  RouteLocationNormalizedLoaded,
  RouterLink,
  useRouter,
} from 'vue-router'
import { useI18n } from '@devexps/locale'
import { REDIRECT_NAME } from '@devexps/constants'
import { renderIcon } from '../index'
const { Logo, useMenuSetting, useAppInject } = context
import { getMenus, listenerRouteChange } from '@devexps/router'
import { useAppConfig } from '@devexps/hooks'
// const { getAccordion } = useMenuSetting()
// const {  getMenuShowLogo } = useMenuSetting()
const { getIsMobile } = useAppInject()
const { menu, isMixSidebar, getCollapsedShowTitle, sidebar, isSidebar } =
  useAppConfig()
const showSidebarLogo = computed(() => {
  return unref(isSidebar) || unref(isMixSidebar)
})
const props = defineProps({
  mode: {
    type: String,
    default: () => 'vertical',
  },
})
const { bem } = createNamespace('layout-menu')
const { t } = useI18n()
const { currentRoute } = useRouter()

const menuRef = ref(null)
const menuList = ref([])
const activeKey = ref()

const getMenuCollapsed = computed(() => {
  if (unref(isMixSidebar)) return true
  return unref(sidebar).collapsed
})

const showOption = () => {
  nextTick(() => {
    if (!menuRef.value) return
    menuRef.value.Ref.showOption()
  })
}

onMounted(async () => {
  const menus = await getMenus()
  menuList.value = mapTree(menus, { conversion: (menu) => routerToMenu(menu) })
  showOption()
})

listenerRouteChange((route) => {
  if (route.name === REDIRECT_NAME) return

  const currentActiveMenu = route.meta?.currentActiveMenu as string
  handleMenuChange(route)

  if (currentActiveMenu) {
    activeKey.value = currentActiveMenu
  }
  showOption()
})

async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
  const menu = route || unref(currentRoute)
  activeKey.value = menu.name
}

const routerToMenu = (item: RouteRecordItem) => {
  const { name, children, meta, icon } = item
  const title = t(meta.title as string)
  return {
    label: () => {
      if (children) {
        return title
      }
      return h(
        RouterLink,
        {
          to: {
            name,
          },
        },
        { default: () => title },
      )
    },
    key: name,
    icon: renderIcon(icon),
  }
}
</script>

<template>
  <div :class="bem()">
    <logo
      :class="bem('logo')"
      v-if="showSidebarLogo || getIsMobile"
      :showTitle="getCollapsedShowTitle"
    />

    <DevexpsScrollbar :class="bem('scrollbar')">
      <DevexpsMenu
        v-model:value="activeKey"
        :options="menuList"
        :collapsed="getMenuCollapsed"
        :collapsed-width="48"
        :collapsed-icon-size="22"
        :indent="18"
        :root-indent="18"
        ref="menuRef"
        :mode="props.mode"
        :accordion="menu.accordion"
      />
    </DevexpsScrollbar>
  </div>
</template>

<style lang="less" scoped>
.layout-menu {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__logo {
    flex-shrink: 0;
  }

  &__scrollbar {
    flex: 1;
    flex-basis: auto;
  }
}
</style>
