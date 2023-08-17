<script lang="ts" setup>
import { ref, h, unref, nextTick, computed } from 'vue'
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

const { listenerRouteChange, useMenuSetting } = context
const { getAccordion } = useMenuSetting()
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
const { bem } = createNamespace('layout-menu')
// const collapsed = ref(false)
const { t } = useI18n()
const { currentRoute } = useRouter()
const menuRef = ref(null)
const activeKey = ref()
const showOption = () => {
  nextTick(() => {
    if (!menuRef.value) return
    menuRef.value.Ref.showOption()
  })
}

const menuList = computed(() => {
  return mapTree(props.list, { conversion: (menu) => routerToMenu(menu) })
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
    <DevexpsScrollbar :class="bem('scrollbar')">
      <DevexpsMenu
        v-model:value="activeKey"
        :options="menuList"
        :collapsed-width="48"
        :collapsed="false"
        :collapsed-icon-size="22"
        :indent="18"
        :root-indent="18"
        ref="menuRef"
        :accordion="getAccordion"
      />
    </DevexpsScrollbar>
  </div>
</template>

<style lang="less" scoped>
.layout-menu {
  display: flex;
  flex-direction: column;
  height: 100%;
  &__scrollbar {
    flex: 1;
    flex-basis: auto;
  }
}
</style>
