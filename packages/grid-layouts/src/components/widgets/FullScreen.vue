<script lang="ts" setup>
import TopButtonWrapper from '../comm/TopButtonWrapper.vue'
import { useFullscreen } from '@devexps/utils'
import { computed, unref } from 'vue'
import { useI18n } from '@devexps/locale'

const { t } = useI18n()

/**
 * F11 event cannot be listened to
 */
const { isFullscreen, toggle } = useFullscreen()

const getTitle = computed(() => {
  return unref(isFullscreen)
    ? t('layout.header.tooltipExitFull')
    : t('layout.header.tooltipEntryFull')
})
</script>
<template>
  <DevexpsPopover :title="getTitle" placement="bottom" :duration="500">
    <template #trigger>
      <TopButtonWrapper @click.stop="toggle">
        <DevexpsIconify
          :icon="
            isFullscreen
              ? 'mingcute:fullscreen-exit-line'
              : 'mingcute:fullscreen-line'
          "
        />
      </TopButtonWrapper>
    </template>
    <span>{{ getTitle }}</span>
  </DevexpsPopover>
</template>
