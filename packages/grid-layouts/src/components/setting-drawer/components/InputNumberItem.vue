<script lang="ts" setup name="InputNumberItem">
import { PropType } from 'vue'
import { HandlerSettingEnum } from '@devexps/constants'
import { useAppConfig } from '@devexps/hooks'

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
  suffix: { type: String, default: '' },
})

const { baseHandler } = useAppConfig()
const onChange = (value) => {
  baseHandler(props.event, value)
}
</script>
<template>
  <DevexpsSpace justify="space-between" align="center">
    <span>{{ title }}</span>
    <DevexpsInputNumber
      class="w-130px"
      size="small"
      v-bind="$attrs"
      :value="def"
      :disabled="disabled"
      @update:value="onChange"
    >
      <template #suffix>
        {{ suffix }}
      </template>
    </DevexpsInputNumber>
  </DevexpsSpace>
</template>
