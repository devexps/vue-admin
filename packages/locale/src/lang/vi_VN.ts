import { genMessage } from '../helper'

const modules = import.meta.globEager('./vi-VN/**/*.ts')

export default {
  message: genMessage(modules, 'vi-VN'),
}
