<script lang="ts">
export default {
  name: 'Table',
}
</script>
<script lang="ts" setup name="DevexpsTable">
import 'xe-utils'
import 'vxe-table-demonic/styles/index.scss'
import type { DevexpsTableProps } from './type'
import { computed, PropType, ref, unref, useAttrs } from 'vue'
import { isBoolean, isFunction } from '@devexps/utils'
import { VxeGridInstance } from 'vxe-table-demonic'
import { ThemeEnum } from '@devexps/constants'
import { context } from '../../../bridge'
const { useAppStore } = context
const appStore = useAppStore()
import { useInterceptor } from './hooks'

useInterceptor()

/*watch(
  () => appStore.getDarkMode,
  () => {
    if (appStore.getDarkMode == ThemeEnum.DARK) {
      import('./scss/dark.scss')
    }
    if (appStore.getDarkMode === ThemeEnum.LIGHT) {
      import('./scss/light.scss')
      // window.location.reload()
    }
  },
  { immediate: true },
)*/
const attrs = useAttrs()
const emit = defineEmits(['register'])
const titleClass = computed(() => {
  return {
    backgroundColor:
      appStore.getDarkMode === ThemeEnum.DARK ? '#262626' : '#FFF',
  }
})
const props = defineProps({
  options: {
    type: Object as PropType<DevexpsTableProps>,
    default: {},
  },
})
const innerProps = ref<Partial<DevexpsTableProps>>()

const title = ref('')

const getProps = computed(() => {
  const options = innerProps.value || props.options
  title.value = options?.title || ''
  delete options?.title
  getProxyConfig(options)
  getPageConfig(options)
  // console.log(options);
  return {
    ...options,
    ...attrs,
  }
})
const xGrid = ref<VxeGridInstance>()

const reload = () => {
  const g = unref(xGrid)
  g?.commitProxy('query')
}

const getProxyConfig = (options: DevexpsTableProps) => {
  const { api, proxyConfig, data, afterFetch } = options
  if (proxyConfig || data) return
  if (api && isFunction(api)) {
    options.proxyConfig = {
      props: {
        result: 'items',
        total: 'total',
      },
      ajax: {
        query: async ({ page, sorts, filters, form }) => {
          const { currentPage, pageSize } = page
          let res = await api({
            ...options.params,
            page: currentPage,
            pageSize,
          })
          if (afterFetch && isFunction(afterFetch)) {
            res = afterFetch(res)
          }

          return res || []
        },
      },
    }
  }
}
const getPageConfig = (options: DevexpsTableProps) => {
  const { pagination, pagerConfig } = options
  if (pagerConfig) return

  if (pagination) {
    if (isBoolean(pagination)) {
      options.pagerConfig = {
        pageSize: 50,
        pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000],
      }
      return
    }
    options.pagerConfig = pagination
  }
}

const setProps = (prop: Partial<DevexpsTableProps>) => {
  innerProps.value = { ...unref(innerProps), ...prop }
}
defineExpose({ reload, Ref: xGrid })
emit('register', { reload, setProps })
</script>
<template>
  <div class="m-2 p-2" :style="titleClass">
    <div v-if="title" class="flex m-2">
      <div class="ml-2 text-xl">{{ title }}</div>
    </div>

    <VxeGrid v-bind="getProps" ref="xGrid">
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </VxeGrid>
  </div>
</template>
<style lang="scss"></style>
