<script lang="ts" setup>
import { reactive, ref } from 'vue'
// import { DevexpsColumns } from '../../../devexpsCmps/src/table'
import { getTableData } from '../apis/table'
import { Data, baseColumns } from './schemas'

const border = ref(false)
const loading = ref(false)
const striped = ref(false)

const data = reactive<Data>({
  table: {
    items: [],
    total: 0,
  },
})
getTableData().then((res) => {
  console.log(res)
  for (let i = 0; i < 4; i++) {
    res.items = res.items.concat(res.items)
  }
  console.log(res)
  data.table = res
})
const toggleBorder = () => {
  border.value = !border.value
}

const toggleLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
function toggleStriped() {
  striped.value = !striped.value
}
</script>
<template>
  <div class="p-2 h-full">
    <DevexpsTable
      :options="{
        title: 'Basic demo',
        pagination: true,
        border: border,
        loading: loading,
        stripe: striped,
      }"
      :columns="baseColumns"
      :data="data.table.items"
    >
      <template #toolbar>
        <div class="pb-2">
          <DevexpsButton type="primary" @click="toggleBorder">
            {{ !border ? 'Show border' : 'Hide border' }}
          </DevexpsButton>
          <DevexpsButton class="ml-2" type="primary" @click="toggleLoading">
            Toggle loading</DevexpsButton
          >
          <DevexpsButton class="ml-2" type="primary" @click="toggleStriped">
            {{ !striped ? 'Show Stripe' : 'Hide Stripe' }}
          </DevexpsButton>
        </div>
      </template>
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </DevexpsTable>
  </div>
</template>
