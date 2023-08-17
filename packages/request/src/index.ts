// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import type { AxiosResponse } from 'axios'
import type { RequestOptions, RequestResult } from '@devexps/types'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'

import { VAxios } from './Axios'
import { checkStatus } from './checkStatus'
import { context } from '../bridge'
import { useI18n } from '@devexps/locale'
import {
  isString,
  isFunction,
  clone,
  deepMerge,
  appendUrlParams,
} from '@devexps/utils'
import { RequestEnum, ResultEnum, ContentTypeEnum } from './constants'
import { joinTimestamp, formatRequestDate } from './helper'


const transform: AxiosTransform = {
  transformRequestHook: (
    res: AxiosResponse<RequestResult>,
    options: RequestOptions,
  ) => {
    const { isTransformResponse, isReturnNativeResponse } = options
    if (isReturnNativeResponse) {
      return res
    }
    const { t } = useI18n()

    if (!isTransformResponse) {
      return res.data
    }

    const { data } = res
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error(t('sys.api.apiRequestFailed'))
    }
    const { code, result, message } = data

    const hasSuccess =
      data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS

    if (hasSuccess) {
      if (message) {
        context.noticeFunction /*&&
          context.noticeFunction.success({
            content: 'content',
            meta: message,
            duration: 2500,
            keepAliveOnHover: true,
          })*/
      }

      return result
    }

    // @ts-ignore
    context.msgFunction.error(message)
    throw new Error(message)

    let timeoutMsg = ''
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = t('sys.api.timeoutMessage')
        context.timeoutFunction?.()
        break
      default:
        if (message) {
          timeoutMsg = message
        }
    }

    if (options.errorMessageMode === 'modal') {
      context.errorModalFunction({
        title: t('sys.api.errorTip'),
        content: timeoutMsg,
      })
    } else if (options.errorMessageMode === 'message') {
      // @ts-ignore
      context.msgFunction.error(timeoutMsg)
    }

    throw new Error(timeoutMsg || t('sys.api.apiRequestFailed'))
  },

  beforeRequestHook: (config, options) => {
    const { apiUrl, joinParamsToUrl, formatDate, joinTime = true } = options

    if (apiUrl) {
      const _apuUrl = isString(apiUrl)
        ? apiUrl
        : isFunction(apiUrl)
        ? apiUrl?.()
        : ''
      config.url = `${_apuUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        config.params = Object.assign(
          params || {},
          joinTimestamp(joinTime, false),
        )
      } else {
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          Object.keys(config.data).length > 0
        ) {
          config.data = data
          config.params = params
        } else {
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = appendUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          )
        }
      } else {
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  requestInterceptors: (config, options) => {
    const token = context.getTokenFunction?.()
    if (
      token &&
      (config as Recordable<any>)?.requestOptions?.withToken !== false
    ) {
      // jwt token
      ;(config as Recordable<any>).headers.Authorization =
        options.authenticationScheme
          ? `${options.authenticationScheme} ${token}`
          : token
    }
    return config
  },

  responseInterceptors: (res: AxiosResponse<any>) => {
    return res
  },

  responseInterceptorsCatch: (error: any) => {
    const { t } = useI18n()
    const { response, code, message, config } = error || {}
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
    const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''
    let errMessage = ''

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = t('sys.api.apiTimeoutMessage')
      }
      if (err?.includes('Network Error')) {
        errMessage = t('sys.api.networkExceptionMsg')
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          context.errorModalFunction({
            title: t('sys.api.errorTip'),
            content: errMessage,
          })
        } else if (errorMessageMode === 'message') {
          context.errorFunction(errMessage)
        }
        return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error as unknown as string)
    }

    checkStatus(error?.response?.status, msg, errorMessageMode)
    return Promise.reject(error)
  },
}

export const createAxios = (opt?: Partial<CreateAxiosOptions>) => {
  return new VAxios(
    deepMerge(
      {
        authenticationScheme: 'Bearer',
        // authenticationScheme: '',
        timeout: 10 * 1000,
        // baseURL: globSetting.apiUrl,

        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        transform: clone(transform),
        requestOptions: {
          isReturnNativeResponse: false,
          isTransformResponse: true,
          joinParamsToUrl: false,
          formatDate: true,
          errorMessageMode: 'message',
          apiUrl: () => context.apiUrl,
          joinTime: true,
          ignoreCancelToken: true,
          withToken: true,
        },
      },
      opt || {},
    ),
  )
}

export const request = createAxios()

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//   },
// });
