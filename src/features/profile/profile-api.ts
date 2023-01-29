import { AxiosResponse } from 'axios'

import { instance } from '../../app/api'

export const profileAPI = {
  getProfileData() {
    return instance.post<ProfileDataType>('auth/me', {})
  },
  updateProfileData(model: UpdateProfileModelType) {
    return instance.put<'', AxiosResponse<ResponseType>, UpdateProfileModelType>('/auth/me', model)
  },
}

export type ProfileDataType = {
  _id: string
  created: string
  email: string
  name: string
  publicCardPacksCount: number
  avatar?: string
}

export type UpdateProfileModelType = {
  name?: string
  avatar?: string
}

export type ResponseType = {
  updatedUser: ProfileDataType

  error?: string
}
