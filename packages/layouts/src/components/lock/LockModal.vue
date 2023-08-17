<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from '@devexps/locale'
import { useForm } from '@devexps/devexpscmps'
import { context } from '../../../bridge'
import headerImg from '@/assets/images/header.jpg'

const { t } = useI18n()

const props = defineProps({
  show: {
    type: Boolean,
  },
})

const { useUserStore, useLockStore } = context
const userStore = useUserStore()
const lockStore = useLockStore()
const getUserInfo = computed(() => {
  const {
    realName = 'Devexps Admin',
    avatar,
    desc,
  } = userStore.getUserInfo || {}

  return { realName, avatar: avatar || headerImg, desc }
})
const emits = defineEmits(['update:show'])

const showModal = computed({
  get: () => props.show,
  set: (val) => {
    emits('update:show', val)
  },
})

const formRef = ref(undefined)
const [register, { getFieldValue, validate }] = useForm({
  schemas: [
    {
      gridItemProps: {
        span: 24,
      },
      field: 'password',
      label: t('layout.header.lockScreenPassword'),
      component: 'InputPassword',
      componentProps: {
        placeholder: t('layout.header.lockScreenPassword'),
        showPasswordOn: 'mousedown',
      },
      rule: {
        required: true,
        message: t('layout.header.lockScreenPassword'),
        trigger: ['input', 'blur'],
      },
    },
  ],
})

const formModel = ref({
  password: '',
})

const handleLock = async () => {
  await validate((errors) => {
    if (!errors) {
      const { password } = getFieldValue()
      lockStore.setLockInfo({
        isLock: true,
        pwd: password,
      })
    }
  })
}
</script>

<template>
  <DevexpsModal
    v-model:show="showModal"
    :title="t('layout.header.lockScreen')"
    preset="card"
  >
    <DevexpsSpace vertical align="center">
      <DevexpsAvatar round :size="64" :src="getUserInfo.avatar" />
      <DevexpsH5>{{ getUserInfo.realName }}</DevexpsH5>
    </DevexpsSpace>
    <DevexpsForm
      @register="register"
      ref="formRef"
      v-model:model="formModel"
      label-placement="left"
    />
    <DevexpsButton type="info" block @click="handleLock">
      {{ t('layout.header.lockScreenBtn') }}
    </DevexpsButton>
  </DevexpsModal>
</template>

<style lang="less" scoped></style>
