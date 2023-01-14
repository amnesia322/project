import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { authAPI, NewPassDataType, registerPayloadType } from './auth-api'
import { FormikValueTypeForgotPassword } from './ForgotPassword/ForgotPassword'
import { FormikValueType } from './Login/Login'

const initialState = {
  isLogged: false,
  isRegister: false,
  forgotPassword: {
    isSendEmail: false,
    emailForLink: ' ',
    isNewPassSet: false,
  },
}

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case 'AUTH/SET-IS-LOGGED': {
      return { ...state, isLogged: action.payload.value }
    }
    case 'AUTH/REGISTER': {
      return { ...state, isRegister: action.isRegister }
    }
    case 'AUTH/FORGOT-PASSWORD/SET-IS-SEND-EMAIL': {
      return {
        ...state,
        forgotPassword: { ...state.forgotPassword, isSendEmail: action.payload.value },
      }
    }
    case 'AUTH/FORGOT-PASSWORD/SET-EMAIL': {
      return {
        ...state,
        forgotPassword: { ...state.forgotPassword, emailForLink: action.payload.value },
      }
    }
    case 'AUTH/FORGOT-PASSWORD/SET_NEW_PASS':
      return {
        ...state,
        forgotPassword: { ...state.forgotPassword, isNewPassSet: action.isNewPassSet },
      }
    default:
      return state
  }
}

export const setIsLoggedInAC = (value: boolean) => {
  return {
    type: 'AUTH/SET-IS-LOGGED',
    payload: {
      value,
    },
  } as const
}

export const registerAC = (isRegister: boolean) =>
  ({
    type: 'AUTH/REGISTER',
    isRegister,
  } as const)

export const setIsSendEmailAC = (value: boolean) => {
  return {
    type: 'AUTH/FORGOT-PASSWORD/SET-IS-SEND-EMAIL',
    payload: {
      value,
    },
  } as const
}
export const setEmailForLinkAC = (value: string) => {
  return {
    type: 'AUTH/FORGOT-PASSWORD/SET-EMAIL',
    payload: {
      value,
    },
  } as const
}

export const setNewPassAC = (isNewPassSet: boolean) =>
  ({ type: 'AUTH/FORGOT-PASSWORD/SET_NEW_PASS', isNewPassSet } as const)

export const loginTC =
  (data: FormikValueType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      await authAPI.login(data)
      dispatch(setIsLoggedInAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const registerTC =
  (payload: registerPayloadType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      await authAPI.register(payload)

      dispatch(registerAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const forgotPasswordTC =
  (data: FormikValueTypeForgotPassword): AppThunk =>
  async dispatch => {
    const dataForRequest = {
      email: data.email,
      from: 'test-front-admin <ai73a@yandex.by>',
      message: `<div style="background-color: grey; padding: 15px">
              password recovery link: 
              <a href='http://localhost:3000/#/new_pass/$token$'>
              link</a>
              </div>`, // хтмп-письмо, вместо $token$ бэк вставит токен
    }

    dispatch(setAppStatusAC('loading'))
    try {
      await authAPI.forgot(dataForRequest)

      dispatch(setIsSendEmailAC(true))
      dispatch(setEmailForLinkAC(data.email))
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const setNewPassTC =
  (data: NewPassDataType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      await authAPI.setNewPass(data)

      dispatch(setNewPassAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

type InitialStateType = typeof initialState
type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
type RegisterACType = ReturnType<typeof registerAC>
type SetIsSendEmailACType = ReturnType<typeof setIsSendEmailAC>
type SetEmailForLinkACType = ReturnType<typeof setEmailForLinkAC>
type SetNewPassType = ReturnType<typeof setNewPassAC>
export type AuthActionsType =
  | SetIsLoggedInACType
  | RegisterACType
  | SetIsSendEmailACType
  | SetEmailForLinkACType
  | SetNewPassType
