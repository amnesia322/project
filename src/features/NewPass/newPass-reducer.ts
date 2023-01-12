import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { newPassAPI, NewPassDataType } from './newPass-api'

const initialState = {
  isNewPassSet: false,
}

export const newPassReducer = (
  state: InitialStateType = initialState,
  action: SetNewPassType
): InitialStateType => {
  switch (action.type) {
    case 'newPass/SET_NEW_PASS':
      return { ...state, isNewPassSet: action.isNewPassSet }
    default:
      return state
  }
}

export const setNewPass = (isNewPassSet: boolean) =>
  ({ type: 'newPass/SET_NEW_PASS', isNewPassSet } as const)

export const setNewPassTC =
  (data: NewPassDataType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      await newPassAPI.setNewPass(data)

      dispatch(setNewPass(true))
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

type InitialStateType = typeof initialState
type SetNewPassType = ReturnType<typeof setNewPass>

export type NewPassActionType = SetNewPassType
