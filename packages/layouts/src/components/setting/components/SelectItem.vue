<script lang="ts" setup name="SelectItem">
import { PropType, h } from 'vue'
import { HandlerSettingEnum } from '@devexps/constants'
import { baseHandler } from '../handler'
import { useI18n } from '@devexps/locale'

const { t } = useI18n()

const props = defineProps({
  title: { type: String, default: '' },
  def: {
    type: [String, Number] as PropType<string | number>,
  },
  event: {
    type: Number as PropType<HandlerSettingEnum>,
  },
  disabled: {
    type: Boolean,
  },
  options: { type: Array, default: () => [] },
})
const onChange = (value) => {
  baseHandler(props.event, value)
}

function renderLabel(option: { label: string; value: string | number }) {
  return h('span', {}, t(option.label))
}
</script>
<template>
  <div class="switch-item">
    <DevexpsSpace justify="space-between" align="center">
      <span>{{ title }}</span>
      <DevexpsSelect
        class="w-130px"
        size="small"
        :value="def"
        :options="options"
        :disabled="disabled"
        @update:value="onChange"
        :render-label="renderLabel"
      />
    </DevexpsSpace>
  </div>
</template>
<style lang="less" scoped></style>
