<script lang="ts" setup>
import { useAppTheme } from '@devexps/hooks'
const { isDark, toggleTheme } = useAppTheme()
</script>

<template>
  <DevexpsSpace justify="center">
    <DevexpsSwitch :value="isDark" @update:value="toggleTheme">
      <template #checked-icon>
        <DevexpsIconify icon="emojione:crescent-moon" hoverPointer />
      </template>
      <template #unchecked-icon>
        <DevexpsIconify icon="emojione:sun-with-face" hoverPointer />
      </template>
    </DevexpsSwitch>
  </DevexpsSpace>
</template>
