<script lang="ts" setup>
import DarkModeToggle from './DarkModeToggle.vue'
import NavigationBarPicker from './NavigationBarPicker.vue'
import ThemeColorPicker from './ThemeColorPicker.vue'
import Features from './Features.vue'
import Content from './Content.vue'
import Transitions from './Transitions.vue'
import FooterButtons from './FooterButtons.vue'
import { baseHandler } from '../handler'
import {
  APP_PRESET_COLOR_LIST,
  HEADER_PRESET_BG_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST,
  HandlerSettingEnum,
} from '@devexps/constants'
import { context } from '../../../../bridge'
import { navigationBarTypeList } from '../constant'
import { useI18n } from '@devexps/locale'

const { t } = useI18n()

const { useMenuSetting, useHeaderSetting, useRootSetting } = context

const { getShowDarkModeToggle, getThemeColor } = useRootSetting()
const { getIsHorizontal, getMenuType, getMenuBgColor } = useMenuSetting()
const { getHeaderBgColor } = useHeaderSetting()

defineProps({
  visible: { type: Boolean, default: false },
})
const emit = defineEmits(['update:visible'])
const onVisible = (show: boolean) => {
  emit('update:visible', show)
}
</script>

<template>
  <DevexpsDrawer :show="visible" @update:show="onVisible" :width="330">
    <DevexpsDrawerContent closable>
      <template #header>{{ t('layout.setting.drawerTitle') }}</template>
      <template v-if="getShowDarkModeToggle">
        <DevexpsDivider title-placement="left">{{
          t('layout.setting.darkMode')
        }}</DevexpsDivider>
        <DarkModeToggle />
      </template>
      <DevexpsDivider title-placement="left">{{
        t('layout.setting.navMode')
      }}</DevexpsDivider>
      <NavigationBarPicker
        :def="getMenuType"
        :type-list="navigationBarTypeList"
        @handler="
          (item) => {
            baseHandler(HandlerSettingEnum.CHANGE_LAYOUT, {
              mode: item.mode,
              type: item.type,
              split: getIsHorizontal ? false : undefined,
            })
          }
        "
      />
      <DevexpsDivider title-placement="left">{{
        t('layout.setting.sysTheme')
      }}</DevexpsDivider>
      <ThemeColorPicker
        :def="getThemeColor"
        :event="HandlerSettingEnum.CHANGE_THEME_COLOR"
        :color-list="APP_PRESET_COLOR_LIST"
      />
      <DevexpsDivider title-placement="left">{{
        t('layout.setting.headerTheme')
      }}</DevexpsDivider>
      <ThemeColorPicker
        :def="getHeaderBgColor"
        :event="HandlerSettingEnum.HEADER_THEME"
        :color-list="HEADER_PRESET_BG_COLOR_LIST"
      />
      <DevexpsDivider title-placement="left">{{
        t('layout.setting.sidebarTheme')
      }}</DevexpsDivider>
      <ThemeColorPicker
        :def="getMenuBgColor"
        :event="HandlerSettingEnum.MENU_THEME"
        :color-list="SIDE_BAR_BG_COLOR_LIST"
      />
      <DevexpsDivider title-placement="left"
        >{{ t('layout.setting.interfaceFunction') }}
      </DevexpsDivider>
      <Features />
      <DevexpsDivider title-placement="left">{{
        t('layout.setting.interfaceDisplay')
      }}</DevexpsDivider>
      <Content />
      <DevexpsDivider title-placement="left">{{
        t('layout.setting.animation')
      }}</DevexpsDivider>
      <Transitions />
      <DevexpsDivider />
      <FooterButtons />
    </DevexpsDrawerContent>
  </DevexpsDrawer>
</template>
