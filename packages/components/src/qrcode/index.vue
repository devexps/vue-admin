<script setup lang="ts">
import type {
  QrcodeDoneEventParams,
  QRCodeRenderersOptions,
  LogoType,
} from './typing'
import { watch, ref, unref, onMounted } from 'vue'
import { toCanvas } from './to-canvas'
import { toDataURL } from 'qrcode'
import { downloadByUrl } from '@devexps/utils'

const props = defineProps({
  value: {
    type: [String, Array] as PropType<string | any[]>,
    default: null,
  },

  options: {
    type: Object as PropType<QRCodeRenderersOptions>,
    default: null,
  },

  width: {
    type: Number as PropType<number>,
    default: 200,
  },

  logo: {
    type: [String, Object] as PropType<Partial<LogoType> | string>,
    default: '',
  },

  tag: {
    type: String as PropType<'canvas' | 'img'>,
    default: 'canvas',
    validator: (v: string) => ['canvas', 'img'].includes(v),
  },
})

const emit = defineEmits({
  done: (data: QrcodeDoneEventParams) => !!data,
  error: (error: any) => !!error,
})

const wrapRef = ref<HTMLCanvasElement | HTMLImageElement | null>(null)
async function createQrcode() {
  try {
    const { tag, value, options = {}, width, logo } = props
    const renderValue = String(value)
    const wrapEl = unref(wrapRef)

    if (!wrapEl) return

    if (tag === 'canvas') {
      const url: string = await toCanvas({
        canvas: wrapEl,
        width,
        logo: logo as any,
        content: renderValue,
        options: options || {},
      })
      emit('done', {
        url,
        ctx: (wrapEl as HTMLCanvasElement).getContext('2d'),
      })
      return
    }

    if (tag === 'img') {
      const url = await toDataURL(renderValue, {
        errorCorrectionLevel: 'H',
        width,
        ...options,
      })
      const wrap = unref(wrapRef) as HTMLImageElement
      wrap.src = url
      emit('done', { url })
    }
  } catch (error) {
    emit('error', error)
  }
}
/**
 * file download
 */
function download(fileName?: string) {
  let url = ''
  const wrapEl = unref(wrapRef)
  if (wrapEl instanceof HTMLCanvasElement) {
    url = wrapEl.toDataURL()
  } else if (wrapEl instanceof HTMLImageElement) {
    url = wrapEl.src
  }
  if (!url) return
  downloadByUrl({
    url,
    fileName,
  })
}

onMounted(createQrcode)


watch(
  props,
  () => {
    createQrcode()
  },
  {
    deep: true,
  },
)

defineExpose({ download })
</script>
<template>
  <div>
    <component :is="tag" ref="wrapRef" />
  </div>
</template>
