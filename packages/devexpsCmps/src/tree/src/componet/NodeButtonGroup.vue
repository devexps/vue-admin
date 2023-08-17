<script lang="ts">
export default {
  name: 'NodeButtonGroup',
}
</script>
<script lang="ts" setup>
const props = defineProps(['onDelete', 'onEdit', 'key'])
</script>
<template>
  <DevexpsSpace align="center"
    ><DevexpsIconify icon="ep:edit" @click="onEdit" />
    <DevexpsPopconfirm @PositiveClick="onDelete">
      <slot></slot>
      <template #trigger
        ><DevexpsIconify icon="ep:delete"></DevexpsIconify
      ></template> </DevexpsPopconfirm
  ></DevexpsSpace>
</template>
