<script lang="ts" setup>
import { context } from '../../../../bridge'
import { useI18n } from '@devexps/locale'
import { writeTextToClipboard } from '@devexps/hooks'
import { unref } from 'vue'

const { t } = useI18n()
const { useAppStore, useConfigStore, useMultipleTabStore, useUserStore } =
  context
const appStore = useAppStore()
const tabStore = useMultipleTabStore()
const userStore = useUserStore()
const configStore = useConfigStore()

const handleCopy = () => {
  writeTextToClipboard(
    JSON.stringify(unref(configStore.getProjectConfig), null, 2),
  )
  // const { isSuccessRef } = useCopyToClipboard(
  //   JSON.stringify(unref(configStore.getProjectConfig), null, 2),
  // );
  // unref(isSuccessRef) &&
  // createSuccessModal({
  //   title: t('layout.setting.operatingTitle'),
  //   content: t('layout.setting.operatingContent'),
  // });
}

const handleReset = () => {
  try {
    configStore.resetProjectConfig()
    // const { colorWeak, grayMode } = defaultSetting;
    // updateTheme(themeColor);
    // updateColorWeak(colorWeak);
    // updateGrayMode(grayMode);
    // createMessage.success(t('layout.setting.resetSuccess'));
  } catch (error: any) {
    // createMessage.error(error);
  }
}

const handleClearAndRedo = () => {
  localStorage.clear()
  appStore.resetAllState()
  // permissionStore.resetState()
  tabStore.resetState()
  userStore.resetState()
  location.reload()
}
</script>
<template>
  <DevexpsSpace vertical>
    <DevexpsButton type="info" block @click="handleCopy">
      <template #icon>
        <DevexpsIconify icon="ant-design:snippets-twotone" />
      </template>
      {{ t('layout.setting.copyBtn') }}
    </DevexpsButton>
    <DevexpsButton type="warning" @click="handleReset" block>
      <template #icon>
        <DevexpsIconify icon="ant-design:reload-outlined" />
      </template>
      {{ t('common.resetText') }}
    </DevexpsButton>
    <DevexpsButton type="error" block @click="handleClearAndRedo">
      <template #icon>
        <DevexpsIconify icon="ant-design:redo-outlined" />
      </template>
      {{ t('layout.setting.clearBtn') }}
    </DevexpsButton>
  </DevexpsSpace>
</template>
