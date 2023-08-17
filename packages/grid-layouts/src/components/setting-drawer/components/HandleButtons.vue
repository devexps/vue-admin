<script lang="ts" setup>
import { useI18n } from '@devexps/locale'
import { useAppConfig } from '@devexps/hooks'

const { t } = useI18n()

const { copyConfigs, resetAllConfig, clearAndRedo } = useAppConfig()
</script>
<template>
  <DevexpsSpace vertical>
    <DevexpsButton type="info" block @click="copyConfigs">
      <template #icon>
        <DevexpsIconify icon="ant-design:snippets-twotone" />
      </template>
      {{ t('layout.setting.copyBtn') }}
    </DevexpsButton>
    <DevexpsButton type="warning" @click="resetAllConfig" block>
      <template #icon>
        <DevexpsIconify icon="ant-design:reload-outlined" />
      </template>
      {{ t('common.resetText') }}
    </DevexpsButton>
    <DevexpsButton type="error" block @click="clearAndRedo">
      <template #icon>
        <DevexpsIconify icon="ant-design:redo-outlined" />
      </template>
      {{ t('layout.setting.clearBtn') }}
    </DevexpsButton>
  </DevexpsSpace>
</template>
