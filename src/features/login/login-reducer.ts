import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { FormikValueType } from './Login'
import { loginApi } from './login-api'

const initialState = {
  isLogged: false,
}

type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>

type InitialStateType = typeof initialState
export type LoginActionsType = setIsLoggedInACType

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

export const LoginTC = (data: FormikValueType) => (dispatch: Dispatch<LoginActionsType>) => {
  loginApi
    .login(data)
    .then(() => {
      dispatch(setIsLoggedInAC(true))
      console.log('YO! It is OK')
    })
    .catch((e: AxiosError<{ error: string }>) => {
      const error = e.response ? e.response.data.error : e.message + ', more details in the console'

      console.log('error', error)
    })
}
