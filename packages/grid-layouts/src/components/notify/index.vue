<script lang="ts" setup>
import TopButtonWrapper from '../comm/TopButtonWrapper.vue'
import { tabListData, ListItem } from './data'
import NoticeList from './NoticeList.vue'
import { ref } from 'vue'

const listData = ref(tabListData)

function onNoticeClick(record: ListItem) {
  console.log('You clicked the notification, ID=' + record.id)
  record.titleDelete = !record.titleDelete
}
</script>
<template>
  <DevexpsPopover title="" trigger="click">
    <template #trigger>
      <TopButtonWrapper>
        <!--    <DevexpsIconify icon="system-uicons:bell-ringing" />-->
        <DevexpsIconify icon="system-uicons:bell-snooze" />
      </TopButtonWrapper>
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
</template>
