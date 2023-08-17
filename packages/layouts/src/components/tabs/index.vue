<script lang="ts" setup>
import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
import { Sortable } from '@devexps/utils'
import { useRouter } from 'vue-router'
import { computed, nextTick, ref, unref } from 'vue'
import { useI18n } from '@devexps/locale'
import { REDIRECT_NAME } from '@devexps/constants'
import { useGo, useTabs } from '@devexps/hooks'
import TabRedo from './components/TabRedo.vue'
import TabDropdown from './components/TabDropdown.vue'
import { context } from '../../../bridge'
import TabQuick from './components/TabQuick.vue'
import FoldButton from './components/FoldButton.vue'
import { useMultipleTab, storeToRefs } from '@devexps/stores'
import { listenerRouteChange } from '@devexps/router'
const { useUserStore, useMultipleTabSetting } = context
const { getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting()
const { close } = useTabs()
const { t } = useI18n()
const multipleTabStore = useMultipleTab()
const { getTabList } = storeToRefs(multipleTabStore)
const router = useRouter()
const userStore = useUserStore()
const go = useGo()
const tabDropdownRef = ref<HTMLElement | null>(null)

const activeTabName = ref<string>('')

const tabList = computed(() => {
  return unref(getTabList).filter(
    (item) => !item.meta?.hideTab && router.hasRoute(item.name),
  )
})

listenerRouteChange((route) => {
  const { name } = route
  if (name === REDIRECT_NAME || !route || !userStore.getAccessToken) {
    return
  }

  const { path, fullPath, meta = {} } = route
  const { currentActiveMenu, hideTab } = meta as RouteMeta
  const isHide = !hideTab ? null : currentActiveMenu
  const p = isHide || fullPath || path
  if (activeTabName.value !== p) {
    activeTabName.value = p as string
  }

  if (isHide) {
    const findParentRoute = router
      .getRoutes()
      .find((item) => item.path === currentActiveMenu)

    findParentRoute &&
      multipleTabStore.checkTab(
        findParentRoute as unknown as RouteLocationNormalized,
      )
  } else {
    multipleTabStore.checkTab(unref(route))
  }
})
const handleChange = (value: string) => {
  go(value, false)
}

nextTick(() => {
  const selection = document.querySelector(
    '#drag > div > div > div > div > div.n-tabs-wrapper',
  )
  Sortable.create(selection)
})

const handleContextMenu = (
  e: PointerEvent,
  tabItem: RouteLocationNormalized,
) => {
  e.preventDefault()
  if (!tabItem) return
  // @ts-ignore
  unref(tabDropdownRef)?.openDropdown(e, tabItem)
}

const handleClose = (e: PointerEvent, route: RouteLocationNormalized) => {
  e.stopPropagation()
  close(route)
}
</script>

<template>
  <div>
    <DevexpsTabs
      v-model:value="activeTabName"
      type="card"
      id="drag"
      :tabs-padding="8"
      animated
      @update:value="handleChange"
    >
      <DevexpsTab
        v-for="(item, index) in tabList"
        :key="item.query ? item.fullPath : item.path"
        :name="item.fullPath"
        style="--n-tab-padding: 0"
      >
        <div
          class="group py-4px pl-12px hover:text-[var(--n-tab-text-color-active)]"
          :class="[index == 0 ? 'pr-12px' : 'pr-18px']"
          @contextmenu="handleContextMenu($event, item)"
        >
          <span>{{ t(item.meta.title) }}</span>
          <DevexpsIconify
            v-if="index != 0"
            class="absolute !transition-all top-1/2 ml-2px mt--6px hover:!text-14px hover:nt--7px group-hover:!inline-flex"
            :class="{ ['!hidden']: activeTabName !== item.fullPath }"
            size="12"
            icon="ep:close-bold"
            @click="handleClose($event, item)"
          />
        </div>
      </DevexpsTab>
      <template #suffix>
        <TabRedo v-if="getShowRedo" />
        <TabQuick :tabItem="$route" v-if="getShowQuick" />
        <FoldButton v-if="getShowFold" />
      </template>
    </DevexpsTabs>
    <TabDropdown ref="tabDropdownRef" />
  </div>
</template>
