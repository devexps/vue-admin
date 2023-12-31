<script lang="ts" setup name="DevexpsForm">
import { maps } from '#/index'
import { computed, onMounted, ref, unref, useAttrs, watch } from 'vue'
import { GridItemProps, DevexpsFormProps } from './type'
import { set } from '@devexps/utils'
const emit = defineEmits(['register', 'update:model'])
const innerProps = ref<Partial<DevexpsFormProps>>()
const Form = maps.get('Form')
const formRef = ref(null)
const props = defineProps({
  schemas: [],
  rules: {
    type: Object || Array,
    default: {},
  },
})
const attrs = useAttrs()
const getRules = computed(() => innerProps.value?.rules || props.rules)
const setProps = (prop: Partial<DevexpsFormProps>) => {
  prop.schemas?.forEach((v) => {
    if (v.defaultValue) {
      fieldValue.value[v.field] = v.defaultValue
    }
    if (v.required || !v.rule) {
      v.rule = {
        required: true,
      }
    }
  })

  innerProps.value = {
    actions: false,
    ...prop,
    ...unref(innerProps),
  }
}
const fieldValue = ref({})
watch(
  () => attrs.model,
  () => {
    const m = JSON.parse(JSON.stringify(attrs.model))
    sObject(m)
  },
  { deep: true, immediate: true },
)
watch(
  () => fieldValue,
  () => {
    emit('update:model', getFieldValue())
  },
  { deep: true },
)
function sObject(m, key?) {
  Object.keys(m).forEach((k) => {
    const tempKey = key ? key + '.' + k : k
    if (typeof m[k] == 'object') {
      sObject(m[k], tempKey)
      return
    }
    fieldValue.value[tempKey] = m[k]
  })
}
function getFieldValue() {
  const m = JSON.parse(JSON.stringify(fieldValue.value))
  Object.keys(m).forEach((k) => {
    if (k.indexOf('.') != -1) {
      const v = m[k]
      delete m[k]
      set(m, k, v)
    }
  })
  return m
}

const getGridItemProps = (p) => {
  return { span: getGridProps.value.span, ...p }
}

const getFormItemProps = (p) => {
  const { labelProps } = p

  return { ...labelProps }
}

const getGridProps = computed(() => {
  return {
    cols: 24,
    span: 8,
    xGap: 12,
    yGap: 0,
    ...innerProps.value?.gridProps,
  }
})

const FormMethod = ref({})

onMounted(() => {
  FormMethod.value = {
    setProps,
    getFieldValue,
    validate: formRef.value?.validate,
    restoreValidation: formRef.value?.restoreValidation,
    updateSchemas: (schemas) => {
      innerProps.value.schemas = schemas
    },
  }
  emit('register', unref(FormMethod))
})
</script>
<template>
  <div>
    <!--    {{ $attrs }}-->
    <Form ref="formRef" v-bind="$attrs" :rules="getRules">
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
      <DevexpsGrid v-bind="getGridProps">
        <DevexpsGridItem
          v-bind="getGridItemProps(schema.gridItemProps)"
          v-for="(schema, key) in innerProps?.schemas"
          :key="key"
          :path="schema.field"
        >
          <DevexpsFormItem
            :label="schema.label"
            :path="schema.field"
            :showRequireMark="schema.required"
            :rule="schema.rule"
            v-bind="getFormItemProps(schema)"
          >
            <slot
              :name="schema.slot"
              v-if="schema.slot"
              v-bind="{ m: fieldValue, field: schema.field }"
            ></slot>
            <component
              v-if="
                (schema.component !== 'InputPassword' ||
                  schema.component !== 'InputTextArea') &&
                !schema.slot
              "
              :is="`Devexps${schema.component}`"
              v-bind="schema.componentProps"
              v-model:value="fieldValue[schema.field]"
            />
            <DevexpsInput
              type="password"
              v-if="schema.component === 'InputPassword'"
              v-bind="schema.componentProps"
              v-model:value="fieldValue[schema.field]"
            />
            <DevexpsInput
              type="textarea"
              v-if="schema.component === 'InputTextArea'"
              v-bind="schema.componentProps"
              v-model:value="fieldValue[schema.field]"
            />
          </DevexpsFormItem>
        </DevexpsGridItem>
        <DevexpsGridItem
          v-if="innerProps?.schemas.length > 0 && innerProps.actions"
          v-bind="innerProps.actionsProps"
        >
          <slot name="actions-prefix" v-bind="FormMethod || {}"></slot>
          <slot name="actions" v-bind="FormMethod || {}">
            <DevexpsButtonGroup
              ><DevexpsButton type="error" @click="formRef.restoreValidation">{{
                innerProps.actionsProps.cancelText || 'Reset'
              }}</DevexpsButton>
              <DevexpsButton
                type="primary"
                @click="innerProps.submitFunc(FormMethod)"
                >{{
                  innerProps.actionsProps.submitText || 'Submit'
                }}</DevexpsButton
              ></DevexpsButtonGroup
            >
          </slot>
          <slot name="actions-suffix" v-bind="FormMethod || {}"></slot>
        </DevexpsGridItem>
      </DevexpsGrid>
    </Form>
  </div>
</template>

<style scoped></style>
