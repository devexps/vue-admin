<script lang="ts" setup name="SwitchItem">
import { PropType } from 'vue'
import { HandlerSettingEnum } from '@devexps/constants'
import { useAppConfig } from '@devexps/hooks'

const props = defineProps({
  title: { type: String, default: '' },
  def: {
    type: Boolean as PropType<boolean>,
  },
  event: {
    type: Number as PropType<HandlerSettingEnum>,
  },
  disabled: {
    type: Boolean,
  },
})

const { baseHandler } = useAppConfig()
const onChange = (value) => {
  baseHandler(props.event, value)
}
</script>
<template>
  <DevexpsSpace justify="space-between" align="center">
    <span>{{ title }}</span>
    <DevexpsSwitch :value="def" :disabled="disabled" @update:value="onChange">
      <template #checked-icon>
        <DevexpsIconify icon="ant-design:check-outlined" color="#18A058" />
      </template>
      <template #unchecked-icon>
        <DevexpsIconify icon="ant-design:close-outlined" color="#BEBEBE" />
      </template>
    </DevexpsSwitch>
  </DevexpsSpace>
</template>
