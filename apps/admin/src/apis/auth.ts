import type { ErrorMessageMode } from '@devexps/types'
import { request } from '@devexps/request'

export interface RoleInfo {
  name: string
  value: string
}

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResultModel {
  userId: string | number
  accessToken: string
  role: RoleInfo
}

export interface UserInfoModel {
  roles: RoleInfo[]
  userId: string | number
  username: string
  realName?: string
  avatar: string
  desc?: string
}

export function doLoginApi(
  params: LoginParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<LoginResultModel>(
    {
      url: '/login',
      params,
    },
    {
      errorMessageMode: mode,
    },
  )
}

export function getUserInfoApi() {
  return request.get<UserInfoModel>(
    { url: '/getUserInfo' },
    { errorMessageMode: 'none' },
  )
}

export function getPermCode() {
  return request.get<string[]>({ url: '/getPermCode' })
}

export function doLogoutApi() {
  return request.get({ url: '/logout' })
}
