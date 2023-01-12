import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setAppStatusAC } from '../../app/app-reducer'
import { errorUtils } from '../../common/utils/error-utils'

import { FormikValueType } from './Login'
import { loginApi } from './login-api'

const initialState = {
  isLogged: false,
}

export const loginReducer = (state: InitialStateType = initialState, action: LoginActionsType) => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED': {
      return { ...state, isLogged: action.payload.value }
    }
    default:
      return state
  }
}

export const setIsLoggedInAC = (value: boolean) => {
  return {
    type: 'login/SET-IS-LOGGED',
    payload: {
      value,
    },
  } as const
}

export const LoginTC = (data: FormikValueType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  loginApi
    .login(data)
    .then(() => {
      dispatch(setIsLoggedInAC(true))
      dispatch(setAppStatusAC('succeeded'))
      console.log('YO! It is OK')
    })
    .catch((e: AxiosError<{ error: string }>) => {
      const error = e as Error | AxiosError<{ error: string }>

      errorUtils(error, dispatch)
      console.log('error', error)
    })
    .finally(() => {
      dispatch(setAppStatusAC('idle'))
    })
}

type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = typeof initialState
export type LoginActionsType = setIsLoggedInACType
