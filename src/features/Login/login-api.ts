import { AxiosResponse } from 'axios'

import { instance } from '../../app/api'

import { FormikValueType } from './Login'

export const loginApi = {
  login(data: FormikValueType) {
    return instance.post<'', AxiosResponse<ResponseType>, FormikValueType>('auth/login', data)
  },
}

export type ResponseType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
}
