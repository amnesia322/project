import { AxiosError } from 'axios'

import { setAppInitializedAC, setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'
import { authAPI } from '../auth/auth-api'
import { setIsLoggedInAC } from '../auth/auth-reducer'

import { profileAPI, ProfileDataType, UpdateProfileModelType } from './profile-api'

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
      return { ...state, user: { ...action.user } }
    default:
      return state
  }
}

export const setProfileData = (user: ProfileDataType) =>
  ({ type: 'profile/SET_PROFILE_DATA', user } as const)

export const getProfileDataTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const response = await profileAPI.getProfileData()

    dispatch(setIsLoggedInAC(true))
    dispatch(setProfileData(response.data))
    dispatch(setAppStatusAC('succeeded'))
  } catch (error) {
    dispatch(setIsLoggedInAC(false))
  } finally {
    dispatch(setAppInitializedAC(true))
  }
}

export const updateProfileDataTC =
  (model: UpdateProfileModelType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const response = await profileAPI.updateProfileData(model)

      dispatch(setProfileData(response.data.updatedUser))
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    await authAPI.logOut()
    dispatch(setIsLoggedInAC(false))
    dispatch(setAppStatusAC('succeeded'))
  } catch (error) {
    const err = error as Error | AxiosError<{ error: string }>

    errorUtils(err, dispatch)
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}

type InitialStateType = typeof initialState
type SetProfileDataType = ReturnType<typeof setProfileData>

export type ProfileActionType = SetProfileDataType
