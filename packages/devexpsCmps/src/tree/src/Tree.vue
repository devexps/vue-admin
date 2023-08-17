<script lang="ts" setup name="DevexpsTree">
import { maps } from '#/index'
import { fetchProps, fetch } from '#/fetch'
import { computed, h, ref, watch, watchEffect } from 'vue'
import { NodeButtonGroup } from '../index'
const Tree = maps.get('Tree')
const props = defineProps({
  split: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  data: {
    type: Array,
    default: undefined,
  },
  pattern: {
    type: String,
    default: '',
  },
  onAdd: {
    type: Function,
    default: undefined,
  },
  edit: {
    type: Boolean,
    default: false,
  },
  onEdit: {
    type: Function,
    default: undefined,
  },
  onDelete: {
    type: Function,
    default: undefined,
  },
  dropdownOption: {
    type: [Boolean, Array],
    default: undefined,
  },

  ...fetchProps,
})
const data = ref([])
const isFirstLoad = ref(true)
watchEffect(() => {
  props.immediate && fetch(props, data)
})
watch(
  () => props.params,
  () => {
    !isFirstLoad.value && fetch(props, data)
  },
  { deep: true },
)
const input = ref('')
const option = computed(() => {
  // console.log(props.data || data.value)
  const o = props.data || data.value
  o.map((v) => {
    if (!props.edit) return v
    if (v.edit == false) return v
    if (!v.suffix) {
      v.suffix = () =>
        h(
          NodeButtonGroup,
          {
            onDelete: () => props.onDelete && props.onDelete(v),
            onEdit: () => props.onEdit && props.onEdit(v),
            key: v.key,
          },
          {
            default: () => 'delete or not' + v.label + '???',
          },
        )
    }
    return v
  })
  return o
})

const handleSelect = (key, o) => {
  o.action && o.action()
  // switch (key) {
  //   case 'add':
  //     props.onAdd && props.onAdd()
  //     return
  // }
}
const emit = defineEmits(['update:pattern'])
</script>
<template>
  <div>
    <DevexpsSpace
      justify="space-between"
      align="center"
      class="m-1 p-1 b-b"
      v-if="title || $slots.extra || $slots.title"
    >
      <slot name="title"
        ><DevexpsText type="primary"> {{ title }} </DevexpsText>
      </slot>
      <slot name="extra"
        ><DevexpsInputGroup
          ><DevexpsInput
            size="tiny"
            :value="pattern"
            @update:value="emit('update:pattern', pattern)"
          >
          </DevexpsInput>
          <DevexpsButton size="tiny">Search</DevexpsButton>
          <DevexpsDropdown
            v-if="dropdownOption"
            size="small"
            :options="dropdownOption"
            @select="handleSelect"
          >
            <DevexpsButton size="tiny"
              ><DevexpsIconify icon="carbon:overflow-menu-vertical"
            /></DevexpsButton>
          </DevexpsDropdown> </DevexpsInputGroup
      ></slot>
    </DevexpsSpace>

    <Tree
      v-bind="$attrs"
      :data="option"
      :show-irrelevant-nodes="false"
      :pattern="pattern"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot> </template
    ></Tree>
  </div>
</template>

<style scoped></style>
