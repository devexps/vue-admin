<script lang="ts" setup>
defineProps({
  icon: String,
})
</script>

<template>
  <span :class="$attrs.class">
    <DevexpsIconify :icon="icon" />
  </span>
</template>
