import axios from 'axios'

export const newPassAPI = {
  setNewPass(data: NewPassDataType) {
    return axios.post('https://neko-back.herokuapp.com/2.0/auth/set-new-password/', data)
  },
}

export type NewPassDataType = {
  password: string
  resetPasswordToken: string
}
