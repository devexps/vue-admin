<script lang="ts" setup>
import { reactive, ref, unref, computed } from 'vue'
import {
  GithubFilled,
  WechatFilled,
  AlipayCircleFilled,
  GoogleCircleFilled,
  TwitterCircleFilled,
} from '@ant-design/icons-vue'
import { useI18n } from '@devexps/locale'
import { notice } from '@devexps/devexpscmps'
import { useUserStore } from '@/store/user'
import {
  LoginStateEnum,
  useLoginState,
  useFormRules,
  useFormValid,
} from './use-login'
import LoginFormTitle from './login-form-title.vue'

const formRef = ref()
const loading = ref(false)
const rememberMe = ref(false)

const { t } = useI18n()
const userStore = useUserStore()
const { setLoginState, getLoginState } = useLoginState()
const { getFormRules } = useFormRules()

const formData = reactive({
  account: 'devexps',
  password: '123456',
})

const { validForm } = useFormValid(formRef)
//onKeyStroke('Enter', handleLogin);

const show = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

async function handleLogin() {
  // const data = await validForm()
  // if (!data) return
  try {
    loading.value = true
    const userInfo = await userStore.login({
      password: formData.password,
      username: formData.account,
      mode: 'none',
    })

    if (userInfo) {
      notice.success({
        content: t('sys.login.loginSuccessTitle'),
        meta: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
        duration: 3000,
      })
    }
  } catch (error) {
    // dialog.error({
    //   title: t('sys.api.errorTip'),
    //   content:
    //     (error as unknown as Error).message || t('sys.api.networkExceptionMsg')
    // });
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <login-form-title v-show="show" class="enter-x" />
  <devexps-form
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="show"
    @keypress.enter="handleLogin"
  >
    <devexps-form-item class="enter-x" inline :show-label="false">
      <devexps-input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </devexps-form-item>
    <devexps-form-item class="enter-x" inline :show-label="false">
      <devexps-input
        type="password"
        show-password-on="click"
        size="large"
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </devexps-form-item>

    <devexps-grid class="enter-x">
      <devexps-grid-item :span="12">
        <devexps-form-item inline :show-label="false">
          <!-- No logic, you need to deal with it yourself -->
          <devexps-checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </devexps-checkbox>
        </devexps-form-item>
      </devexps-grid-item>
      <devexps-grid-item :span="12">
        <devexps-form-item inline :show-label="false" class="justify-items-end">
          <!-- No logic, you need to deal with it yourself -->
          <devexps-button
            text
            tag="a"
            type="primary"
            size="small"
            @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
          >
            {{ t('sys.login.forgetPassword') }}
          </devexps-button>
        </devexps-form-item>
      </devexps-grid-item>
    </devexps-grid>

    <devexps-form-item class="enter-x" inline :show-label="false">
      <devexps-button
        type="primary"
        size="large"
        block
        @click="handleLogin"
        :loading="loading"
      >
        {{ t('sys.login.loginButton') }}
      </devexps-button>
    </devexps-form-item>

    <devexps-grid class="enter-x" :cols="3">
      <devexps-grid-item :md="8" :xs="24">
        <devexps-button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </devexps-button>
      </devexps-grid-item>
      <devexps-grid-item
        :md="8"
        :xs="24"
        class="!my-2 md:!my-0 xs:mx-0 md:mx-2"
      >
        <devexps-button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </devexps-button>
      </devexps-grid-item>
      <devexps-grid-item :md="7" :xs="24">
        <devexps-button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </devexps-button>
      </devexps-grid-item>
    </devexps-grid>

    <devexps-divider class="enter-x">{{
      t('sys.login.otherSignIn')
    }}</devexps-divider>

    <div class="flex justify-evenly enter-x" :class="`sign-in-way`">
      <github-filled />
      <wechat-filled />
      <alipay-circle-filled />
      <google-circle-filled />
      <twitter-circle-filled />
    </div>
  </devexps-form>
</template>
