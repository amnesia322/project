import { AppThunk } from '../../app/store'

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
    try {
      await newPassAPI.setNewPass(data)

      dispatch(setNewPass(true))
    } catch (error) {
      console.log(error)
    }
  }

type InitialStateType = typeof initialState
type SetNewPassType = ReturnType<typeof setNewPass>

export type NewPassActionType = SetNewPassType
