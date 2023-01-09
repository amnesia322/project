import { ThunkAction } from 'redux-thunk'

import { AppStoreType } from '../../app/store'

import { LoginDataType, profileAPI, ProfileDataType, UpdateProfileModelType } from './profile-api'

const initialState = {
  user: {
    _id: '' as string,
    created: '' as string,
    email: '' as string,
    name: 'UserName' as string,
    publicCardPacksCount: 0 as number,
    avatar: '' as string,
  } as ProfileDataType,
}

export const profileReducer = (
  state: InitialStateType = initialState,
  action: ProfileActionType
): InitialStateType => {
  switch (action.type) {
    case 'profile/SET_PROFILE_DATA':
      return { ...state, user: action.user }
    default:
      return state
  }
}

export const setProfileData = (user: ProfileDataType) =>
  ({ type: 'profile/SET_PROFILE_DATA', user } as const)

export const getProfileDataTC = (): AppThunk => async dispatch => {
  try {
    const response = await profileAPI.getProfileData()

    dispatch(setProfileData(response.data))
    console.log('getProfileDataTC')
  } catch (error) {
    console.log('Error')
  }
}

export const updateProfileDataTC =
  (model: UpdateProfileModelType): AppThunk =>
  async dispatch => {
    try {
      const response = await profileAPI.updateProfileData(model)

      dispatch(setProfileData(response.data.updatedUser))
      console.log('updateProfileDataTC')
    } catch (error) {
      console.log('Error')
    }
  }

export const logoutTC = (): AppThunk => async dispatch => {
  try {
    const response = await profileAPI.logOut()

    dispatch(setProfileData(initialState.user))
  } catch (error) {
    console.log(error)
  }
}

export const loginTC =
  (data: LoginDataType): AppThunk =>
  async dispatch => {
    try {
      const response = await profileAPI.login(data)

      console.log('loginTC')
    } catch (error) {
      console.log(error)
    }
  }

type InitialStateType = typeof initialState
type SetProfileDataType = ReturnType<typeof setProfileData>

export type ProfileActionType = SetProfileDataType

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStoreType,
  unknown,
  ProfileActionType
>
