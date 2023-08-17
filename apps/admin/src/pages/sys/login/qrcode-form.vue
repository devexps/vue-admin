<script lang="ts" setup>
import { computed, unref } from 'vue'
import { QrCode } from '@devexps/components'
import { useI18n } from '@devexps/locale'
import { useLoginState, LoginStateEnum } from './use-login'
import LoginFormTitle from './login-form-title.vue'

const testQrCodeUrl = 'https://vue-admin.devexps.com/next/login'

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()
const show = computed(() => unref(getLoginState) === LoginStateEnum.QR_CODE)
</script>

<template>
  <template v-if="show">
    <login-form-title class="enter-x" />
    <div class="enter-x min-w-64 min-h-64">
      <qr-code
        :value="testQrCodeUrl"
        class="flex flex-col justify-center items-center enter-x xl:justify-start"
        :width="280"
      />
      <devexps-divider class="enter-x">{{
        t('sys.login.scanSign')
      }}</devexps-divider>
      <devexps-button
        size="large"
        block
        class="mt-4 enter-x"
        @click="handleBackLogin"
      >
        {{ t('sys.login.backSignIn') }}
      </devexps-button>
    </div>
  </template>
</template>
