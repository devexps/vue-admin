<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { BASIC_HOME_PATH } from '@devexps/constants'
import { createNamespace, getGlobalConfig } from '@devexps/utils'
import logo from '@/assets/images/logo.png'

const { bem } = createNamespace('app-logo')

const props = defineProps({
  /**
   * Whether to show title
   */
  showTitle: { type: Boolean, default: true },

  /**
   * Click to jump to which path
   */
  homePath: { type: String, default: BASIC_HOME_PATH },
})

const { push } = useRouter()
const { title } = getGlobalConfig(import.meta.env)

function goHome() {
  push(props.homePath)
}
</script>

<template>
  <div :class="bem()" @click="goHome">
    <img :src="logo" alt="logo" />
    <div
      class="ml-2 truncate md:opacity-100"
      :class="bem('title')"
      v-show="showTitle"
    >
      {{ title }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.app-logo {
  display: flex;
  align-items: center;
  padding-left: 7px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 48px;
  background: transparent;
  box-sizing: border-box;

  &__title {
    font-size: 16px;
    font-weight: 700;
    transition: all 0.5s;
    line-height: normal;
  }

  img {
    width: 32px;
  }
}
</style>
