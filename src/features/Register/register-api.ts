import { instance } from '../../app/api'

export const registerAPI = {
  register(payload: registerPayloadType) {
    return instance.post<ResponseRegisterType>('auth/register', payload)
  },
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
