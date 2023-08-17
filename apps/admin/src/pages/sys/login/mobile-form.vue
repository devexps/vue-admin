<script lang="ts" setup>
import { reactive, ref, computed, unref } from 'vue'
import { CountDownInput } from '@devexps/components'
import { useI18n } from '@devexps/locale'
import {
  useLoginState,
  useFormRules,
  useFormValid,
  LoginStateEnum,
} from './use-login'
import LoginFormTitle from './login-form-title.vue'

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formRef = ref()
const loading = ref(false)

const formData = reactive({
  mobile: '',
  sms: '',
})

const { validForm } = useFormValid(formRef)

const show = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE)

async function handleLogin() {
  const data = await validForm()
  if (!data) return
  console.log(data)
}
</script>
<template>
  <template v-if="show">
    <login-form-title class="enter-x" />
    <devexps-form
      class="rd-2"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
    >
      <devexps-form-item
        name="mobile"
        class="enter-x"
        inline
        :show-label="false"
      >
        <devexps-input
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </devexps-form-item>
      <devexps-form-item name="sms" class="enter-x" inline :show-label="false">
        <count-down-input
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </devexps-form-item>

      <div class="enter-x">
        <devexps-button
          type="primary"
          size="large"
          block
          @click="handleLogin"
          :loading="loading"
        >
          {{ t('sys.login.loginButton') }}
        </devexps-button>
        <devexps-button block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </devexps-button>
      </div>
    </devexps-form>
  </template>
</template>
