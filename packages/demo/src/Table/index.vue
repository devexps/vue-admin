<script lang="ts" setup>
import { ref } from 'vue'
import { DevexpsColumns, useTable } from '../../../devexpsCmps/src/table'
import { getTableData } from '../apis/table'
const columns: DevexpsColumns = [
  { field: 'userId', title: 'id', width: 100 },
  { field: 'username', title: 'userName', width: 150 },
  {
    field: 'desc',
    title: 'desc',
    width: 150,
    slots: {
      default: 'desc_default',
    },
  },
]
const Ref = ref(null)
const [registerTable, { reload }] = useTable({
  title: 'Role list',
  border: true,
  api: getTableData,
  params: {
    i: 'role',
    a: 'list',
  },
  stripe: true,
  pagination: true,
  align: 'center',
  columns,
})
</script>
<template>
  <div class="p-2">
    <DevexpsTable @register="registerTable">
      <template #desc_default="{ row, rowIndex }">
        {{ row.desc }}
      </template>
    </DevexpsTable>
  </div>
</template>
