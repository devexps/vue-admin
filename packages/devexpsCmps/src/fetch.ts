import { isFunction } from '@devexps/utils'
import { error } from '#/index'
export interface FetchProps {
  api?: Function
  params?: Object
  afterFetch?: Function
  immediate?: boolean
  value?: object
  options?: Array<any>
  resultField?: String
}

export const fetchProps = {
  api: {
    type: Function,
    default: null,
  },
  params: {
    type: Object,
    default: {},
  },
  immediate: {
    type: Boolean,
    default: true,
  },
  options: {
    type: Array,
    default: undefined,
  },
  value: {
    type: String,
    default: '',
  },
  afterFetch: {
    type: Function,
    default: null,
  },
  resultField: {
    type: String,
    default: 'options',
  },
}

export async function fetch(props, o) {
  const { api, params, options, afterFetch, resultField } = props
  if (options) {
    o.value = options
    return
  }
  if (!api) return
  if (!isFunction(api)) {
    error('api is not a function')
    return
  }
  let res = await api(params)
  if (afterFetch && isFunction(afterFetch)) {
    res = afterFetch(res)
  }
  if (resultField) {
    res = res[resultField]
  }
  o.value = res
}
