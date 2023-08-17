/**
 * Data processing class, can be configured according to the project
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions, RequestResult } from '@devexps/types'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}

export abstract class AxiosTransform {
  /**
   * @description: Process configuration before request
   */
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions,
  ) => AxiosRequestConfig

  /**
   * @description: Request successfully processed
   */
  transformRequestHook?: (
    res: AxiosResponse<RequestResult>,
    options: RequestOptions,
  ) => any

  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions,
  ) => AxiosRequestConfig

  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  requestInterceptorsCatch?: (error: Error) => void

  responseInterceptorsCatch?: (error: Error) => void
}
