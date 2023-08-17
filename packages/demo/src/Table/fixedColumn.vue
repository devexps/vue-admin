<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { DevexpsCellClick } from '../../../devexpsCmps/src/table'
import { getTableData } from '../apis/table'
import { fixedColumns, innerColumns, innerLabels } from './schemas'
import type { Data } from './schemas'

const border = ref<boolean>(false)
const loading = ref<boolean>(false)
const striped = ref<boolean>(false)

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

const showDetails = ref<boolean>(false)
let detailData = reactive<any[]>([])
const cellClickEvent: DevexpsCellClick = ({ row }) => {
  detailData = innerLabels.map((field) => {
    return { label: field, value: row[field] }
  })
  showDetails.value = true
}
</script>
<template>
  <div class="p-2 h-full">
    <DevexpsTable
      :options="{
        title: 'Example of fixed column and click row display details',
        pagination: true,
        border: border,
        loading: loading,
        stripe: striped,
      }"
      :columns="fixedColumns"
      :data="data.table.items"
      @cell-click="cellClickEvent"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </DevexpsTable>
    <DevexpsModal v-model:show="showDetails" title="check the details" preset="card">
      <template #default>
        <DevexpsTable
          border="inner"
          :sync-resize="showDetails"
          :row-config="{ isHover: true }"
          :data="detailData"
          :columns="innerColumns"
        />
      </template>
    </DevexpsModal>
  </div>
</template>
