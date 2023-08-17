<script lang="ts" setup>
import { useI18n } from '@devexps/locale'
import { ref } from 'vue'
import AppSearchModal from './AppSearchModal.vue'

const { t } = useI18n()
const showModal = ref(false)

function changeModal(show: boolean) {
  showModal.value = show
}
</script>

<template>
  <div class="flex items-center" @click="changeModal(true)">
    <DevexpsPopover placement="bottom">
      <template #trigger>
        <DevexpsIconify icon="ant-design:search-outlined" hoverPointer />
      </template>
      {{ t('common.searchText') }}
    </DevexpsPopover>
    <AppSearchModal @close="changeModal(false)" :visible="showModal" />
  </div>
</template>
