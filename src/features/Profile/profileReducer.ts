import { ThunkAction } from 'redux-thunk'

import { AppStoreType } from '../../app/store'
import { profileAPI, UpdateProfileModelType } from '../Profile/profileApi'

const initialState = {
  // name: '' as string,
  // avatar: '' as string,
  // email: '' as string,
  _id: '' as string,
  created: '' as string,
  email: '' as string,
  name: '' as string,
  publicCardPacksCount: 0 as number,
  avatar: '' as string,
}

type InitialStateType = typeof initialState
type ChangeProfileNameType = ReturnType<typeof changeProfileName>
type GetProfileEmail = ReturnType<typeof getProfileEmail>
export type ProfileActionType = ChangeProfileNameType | GetProfileEmail
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStoreType,
  unknown,
  ProfileActionType
>

export const profileReducer = (
  state: InitialStateType = initialState,
  action: ProfileActionType
): InitialStateType => {
  switch (action.type) {
    case 'profile/CHANGE_NAME':
      return { ...state, name: action.name }
    case 'profile/GET_EMAIL':
      return { ...state, email: action.email }
    default:
      return state
  }
}

export const changeProfileName = (name: string) => ({ type: 'profile/CHANGE_NAME', name } as const)
export const getProfileEmail = (email: string) => ({ type: 'profile/GET_EMAIL', email } as const)

export const changeProfileNameTC =
  (model: UpdateProfileModelType): AppThunk =>
  async dispatch => {
    try {
      const response = await profileAPI.updateProfileData(model)

      dispatch(changeProfileName(model.name))
    } catch (error) {
      console.log('Error')
    }
  }

export const getProfileEmailTC = (): AppThunk => async dispatch => {
  try {
    const response = await profileAPI.getProfileData()

    dispatch(getProfileEmail(response.data.email))
  } catch (error) {
    console.log('Error')
  }
}
