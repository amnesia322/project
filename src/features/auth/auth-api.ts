import { AxiosResponse } from 'axios'

import { instance, instanceHeroku } from '../../app/api'

import { FormikValueType } from './Login/Login'

export const authAPI = {
  login(data: FormikValueType) {
    return instance.post<'', AxiosResponse<LoginResponseType>, FormikValueType>('auth/login', data)
  },
  logOut() {
    return instance.delete('auth/me', {})
  },
  register(payload: registerPayloadType) {
    return instance.post<ResponseRegisterType>('auth/register', payload)
  },
  forgot(data: ForgotPasswordParamsType) {
    return instanceHeroku.post<ForgotPasswordParamsType, AxiosResponse<ForgotPassResponseType>>(
      'auth/forgot',
      data
    )
  },
  setNewPass(data: NewPassDataType) {
    return instance.post('auth/set-new-password/', data)
  },
}

export type LoginResponseType = {
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

export type registerPayloadType = {
  email: string
  password: string
}

export type ResponseRegisterType = {
  created: string
  email: string
  isAdmin: boolean
  name: string
  publicCardPacksCount: number
  rememberMe: boolean
  updated: string
  verified: boolean
  __v: number
  _id: string
}

export type ForgotPassResponseType = {
  answer: string
  html: boolean
  info: string
  success: boolean
  error?: string
}

export type ForgotPasswordParamsType = {
  email: string
  from: string
  message: string
}

export type NewPassDataType = {
  password: string
  resetPasswordToken: string
}
