<script lang="ts" setup>
import { useI18n } from '@devexps/locale'
import { navigationBarTypeList } from '../constant'
import {
  HandlerSettingEnum,
  APP_PRESET_COLOR_LIST,
  HEADER_PRESET_BG_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST,
} from '@devexps/constants'

import DarkModeToggle from './components/DarkModeToggle.vue'
import NavigationBarPicker from './components/NavigationBarPicker.vue'
import ThemeColorPicker from './components/ThemeColorPicker.vue'
import Transitions from './components/Transitions.vue'
import InterfaceFunction from './components/InterfaceFunction.vue'
import InterfaceDisplay from './components/InterfaceDisplay.vue'
import HandleButtons from './components/HandleButtons.vue'
import { useAppConfig } from '@devexps/hooks'
const { baseHandler } = useAppConfig()

const { t } = useI18n()
const {
  openSettingDrawer,
  toggleOpenSettingDrawer,
  isHorizontal,
  navBarMode,
  themeColor,
  header,
  sidebar,
} = useAppConfig()
</script>

<template>
  <DevexpsDrawer
    :show="openSettingDrawer"
    @update:show="toggleOpenSettingDrawer"
    :width="330"
  >
    <DevexpsDrawerContent closable>
      <template #header>{{ t('layout.setting.drawerTitle') }}</template>

      <DevexpsDivider title-placement="left">
        {{ t('layout.setting.darkMode') }}
      </DevexpsDivider>
      <DarkModeToggle />
      <DevexpsDivider title-placement="left">
        {{ t('layout.setting.navMode') }}
      </DevexpsDivider>
      <NavigationBarPicker
        :def="navBarMode"
        :type-list="navigationBarTypeList"
        @handler="
          (item) => {
            baseHandler(HandlerSettingEnum.CHANGE_LAYOUT, {
              mode: item.mode,
              type: item.type,
              split: isHorizontal ? false : undefined,
            })
          }
        "
      />

      <template v-if="false">
        <DevexpsDivider title-placement="left">
          {{ t('layout.setting.sysTheme') }}
        </DevexpsDivider>
        <ThemeColorPicker
          :def="themeColor"
          :event="HandlerSettingEnum.CHANGE_THEME_COLOR"
          :color-list="APP_PRESET_COLOR_LIST"
        />
      </template>

      <DevexpsDivider title-placement="left">
        {{ t('layout.setting.headerTheme') }}
      </DevexpsDivider>
      <ThemeColorPicker
        :def="header.bgColor"
        :event="HandlerSettingEnum.HEADER_THEME"
        :color-list="HEADER_PRESET_BG_COLOR_LIST"
      />
      <DevexpsDivider title-placement="left">{{
        t('layout.setting.sidebarTheme')
      }}</DevexpsDivider>

      <ThemeColorPicker
        :def="sidebar.bgColor"
        :event="HandlerSettingEnum.MENU_THEME"
        :color-list="SIDE_BAR_BG_COLOR_LIST"
      />

      <DevexpsDivider title-placement="left">
        {{ t('layout.setting.interfaceFunction') }}
      </DevexpsDivider>
      <InterfaceFunction />

      <DevexpsDivider title-placement="left">
        {{ t('layout.setting.interfaceDisplay') }}
      </DevexpsDivider>
      <InterfaceDisplay />

      <DevexpsDivider title-placement="left">
        {{ t('layout.setting.animation') }}
      </DevexpsDivider>
      <Transitions />
      <DevexpsDivider />

      <HandleButtons />
    </DevexpsDrawerContent>
  </DevexpsDrawer>
</template>
<style lang="scss" scoped></style>
