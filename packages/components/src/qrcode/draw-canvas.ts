import type { QRCodeRenderersOptions } from 'qrcode'
import type { RenderQrCodeParams, ContentType } from './typing'
import { cloneDeep } from '@devexps/utils'
import { toCanvas } from 'qrcode'

export const renderQrCode = ({
  canvas,
  content,
  width = 0,
  options: params = {},
}: RenderQrCodeParams) => {
  const options = cloneDeep(params)

  options.errorCorrectionLevel =
    options.errorCorrectionLevel || getErrorCorrectionLevel(content)

  return getOriginWidth(content, options).then((_width: number) => {
    options.scale = width === 0 ? undefined : (width / _width) * 4
    return toCanvas(canvas, content, options)
  })
}

function getOriginWidth(content: ContentType, options: QRCodeRenderersOptions) {
  const _canvas = document.createElement('canvas')
  return toCanvas(_canvas, content, options).then(() => _canvas.width)
}

function getErrorCorrectionLevel(content: ContentType) {
  if (content.length > 36) {
    return 'M'
  } else if (content.length > 16) {
    return 'Q'
  } else {
    return 'H'
  }
}
