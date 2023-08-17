<script lang="ts" setup>
import { computed, ref } from 'vue'
import { tabListData, ListItem } from './data'
import NoticeList from './NoticeList.vue'

const listData = ref(tabListData)

function onNoticeClick(record: ListItem) {
  console.log('You clicked the notification, ID=' + record.id)
  record.titleDelete = !record.titleDelete
}

const props = defineProps({
  isDark: { type: Boolean, default: false },
})

const iconColor = computed(() =>
  props.isDark ? 'rgb(213,213,214)' : 'rgb(51, 54, 57)',
)
</script>

<template>
  <div>
    <DevexpsPopover title="" trigger="click">
      <template #trigger>
        <DevexpsBadge dot>
          <DevexpsIconify
            icon="mdi:bell-outline"
            hoverPointer
            hoverColor="rgb(208,58,82)"
            :color="iconColor"
          />
        </DevexpsBadge>
      </template>
      <DevexpsTabs
        class="w-60"
        animated
        type="line"
        justify-content="space-evenly"
      >
        <DevexpsTabPane
          v-for="item in listData"
          :key="item.key"
          :name="item.key"
          :tab="`${item.name}(${item.list.length})`"
        >
          <NoticeList :list="item.list" @title-click="onNoticeClick" />
        </DevexpsTabPane>
      </DevexpsTabs>
    </DevexpsPopover>
  </div>
</template>

<style lang="less">
.devexps-header-notify {
  padding: 0 10px;
}
</style>
