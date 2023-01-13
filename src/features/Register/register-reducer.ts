import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { registerAPI, registerPayloadType } from './register-api'

const initState = {
  isRegister: false,
}

type InitStateType = typeof initState

export const registerReducer = (state = initState, action: RegisterActionsType): InitStateType => {
  switch (action.type) {
    case 'REGISTER': {
      return { ...state, isRegister: action.isRegister }
    }
    default:
      return state
  }
}

export type RegisterActionsType = ReturnType<typeof registerAC>

export const registerAC = (isRegister: boolean) =>
  ({
    type: 'REGISTER',
    isRegister,
  } as const)

export const registerTC =
  (payload: registerPayloadType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const response = await registerAPI.register(payload)

      dispatch(registerAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }
