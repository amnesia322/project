import { instance } from '../../app/api'

export const registerAPI = {
  register(payload: registerPayloadType) {
    return instance.post('auth/register', payload)
  },
}

export type registerPayloadType = {
  email: string
  password: string
}
