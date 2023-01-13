import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true,
})

export const forgotPasswordApi = {
  forgot(data: ForgotPasswordParamsType) {
    return instance.post<ForgotPasswordParamsType, AxiosResponse<ResponseType>>('auth/forgot', data)
  },
}

export type ResponseType = {
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
