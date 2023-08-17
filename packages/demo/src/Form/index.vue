<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useForm } from '@devexps/devexpscmps'

import { transferFormilySchemas } from '@devexps/devexpscmps/src/form'
import { FormilyProps, BasicProps, selectParams } from './schemas'

const Ref = ref(null)

const [register, { getFieldValue, validate }] = useForm({
  actions: true,
  actionsProps: {
    span: 12,
    submitText: 'OK',
  },
  // xGap: 30,
  rules: {
    number: [
      {
        required: true,
        trigger: ['input', 'blur'],
      },
    ],
  },
  schemas: BasicProps,
  title: 'Form demo',
  submitFunc: (FormRef) => {
    console.log(FormRef.validate())
    console.log(FormRef.getFieldValue())
  },
})
const changeSelectParams = () => {
  selectParams.value = { id: 2 }
}
const model = ref({
  haha: '11',
  user: {
    age: '22',
    name: '',
  },
})
const value = ref()

function getValue() {
  validate()
  console.log(getFieldValue())
}
</script>
<template>
  <div class="p-2">
    <div>Form data：{{ model }}</div>

    <DevexpsButton @click="changeSelectParams">Change select box parameters</DevexpsButton>
    <DevexpsButton @click="getValue">retrieve data</DevexpsButton>
    <DevexpsForm @register="register" ref="Ref" v-model:model="model" />
  </div>
</template>
