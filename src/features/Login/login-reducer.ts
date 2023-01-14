import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunkDispatch } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { FormikValueType } from './Login'
import { loginApi } from './login-api'

const initialState = {
  isLogged: false,
}

export const loginReducer = (
  state: InitialStateType = initialState,
  action: LoginActionsType
): InitialStateType => {
  switch (action.type) {
    case 'Login/SET-IS-LOGGED': {
      return { ...state, isLogged: action.payload.value }
    }
    default:
      return state
  }
}

export const setIsLoggedInAC = (value: boolean) => {
  return {
    type: 'Login/SET-IS-LOGGED',
    payload: {
      value,
    },
  } as const
}

export const LoginTC = (data: FormikValueType) => (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  loginApi
    .login(data)
    .then(() => {
      dispatch(setIsLoggedInAC(true))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch(error => {
      errorUtils(error, dispatch)
    })
    .finally(() => {
      dispatch(setAppStatusAC('idle'))
    })
}

type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = typeof initialState
export type LoginActionsType = setIsLoggedInACType
