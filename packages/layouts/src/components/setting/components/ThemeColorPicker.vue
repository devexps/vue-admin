<script lang="ts" setup name="ThemeColorPicker">
import { PropType } from 'vue'
import { HandlerSettingEnum } from '@devexps/constants'
import { baseHandler } from '../handler'

const props = defineProps({
  colorList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  event: {
    type: Number as PropType<HandlerSettingEnum>,
  },
  def: {
    type: String,
    default: '',
  },
})
const handleClick = (color) => {
  baseHandler(props.event, color)
}
</script>
<template>
  <div class="theme-color-picker">
    <DevexpsSpace justify="space-between" :size="0" :wrap="false">
      <template v-for="color in colorList" :key="color">
        <span
          @click="handleClick(color)"
          class="h-20px w-20px cursor-pointer border rounded-sm box-border border-gray-300 inline-block color-item"
          :class="{ active: def == color }"
          :style="{ background: color }"
        >
          <DevexpsSpace v-if="def == color" justify="center">
            <DevexpsIconify
              icon="ant-design:check-outlined"
              color="#D1D5DB"
              hover-color="#D1D5DB"
            />
          </DevexpsSpace>
        </span>
      </template>
    </DevexpsSpace>
  </div>
</template>
<style lang="less" scoped>
.color-item {
  &:hover,
  &.active {
    border-color: rgba(6, 96, 189, 1);
  }
}
</style>
