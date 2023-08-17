<script lang="ts" setup name="DevexpsH3">
import { maps } from '#/index'
const H3 = maps.get('H3')
</script>
<template>
  <H3 v-bind="$attrs"> <slot></slot> </H3>
</template>

<style scoped></style>
