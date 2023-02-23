import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'
import { profileAPI } from '../profile/profile-api'
import { setProfileData } from '../profile/profile-reducer'

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
const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLogged: boolean }>) {
      state.isLogged = action.payload.isLogged
    },
    registerAC(state, action: PayloadAction<{ isRegister: boolean }>) {
      state.isRegister = action.payload.isRegister
    },
    setIsSendEmailAC(state, action: PayloadAction<{ isSendEmail: boolean }>) {
      state.forgotPassword.isSendEmail = action.payload.isSendEmail
    },
    setEmailForLinkAC(state, action: PayloadAction<{ emailForLink: string }>) {
      state.forgotPassword.emailForLink = action.payload.emailForLink
    },
    setNewPassAC(state, action: PayloadAction<{ isNewPassSet: boolean }>) {
      state.forgotPassword.isNewPassSet = action.payload.isNewPassSet
    },
  },
})

export const { setIsLoggedInAC, registerAC, setIsSendEmailAC, setEmailForLinkAC, setNewPassAC } =
  slice.actions
export const authReducer = slice.reducer
// export const authReducer = (
//   state: InitialStateType = initialState,
//   action: AuthActionsType
// ): InitialStateType => {
//   switch (action.type) {
//     case 'auth/SET-IS-LOGGED': {
//       return { ...state, isLogged: action.payload.value }
//     }
//     case 'auth/REGISTER': {
//       return { ...state, isRegister: action.isRegister }
//     }
//     case 'auth/FORGOT-PASSWORD/SET-IS-SEND-EMAIL': {
//       return {
//         ...state,
//         forgotPassword: { ...state.forgotPassword, isSendEmail: action.payload.value },
//       }
//     }
//     case 'auth/FORGOT-PASSWORD/SET-EMAIL': {
//       return {
//         ...state,
//         forgotPassword: { ...state.forgotPassword, emailForLink: action.payload.value },
//       }
//     }
//     case 'auth/FORGOT-PASSWORD/SET_NEW_PASS':
//       return {
//         ...state,
//         forgotPassword: { ...state.forgotPassword, isNewPassSet: action.isNewPassSet },
//       }
//     default:
//       return state
//   }
// }
//
// export const setIsLoggedInAC = (value: boolean) => {
//   return {
//     type: 'auth/SET-IS-LOGGED',
//     payload: {
//       value,
//     },
//   } as const
// }
//
// export const registerAC = (isRegister: boolean) =>
//   ({
//     type: 'auth/REGISTER',
//     isRegister,
//   } as const)
//
// export const setIsSendEmailAC = (value: boolean) => {
//   return {
//     type: 'auth/FORGOT-PASSWORD/SET-IS-SEND-EMAIL',
//     payload: {
//       value,
//     },
//   } as const
// }
// export const setEmailForLinkAC = (value: string) => {
//   return {
//     type: 'auth/FORGOT-PASSWORD/SET-EMAIL',
//     payload: {
//       value,
//     },
//   } as const
// }
//
// export const setNewPassAC = (isNewPassSet: boolean) =>
//   ({ type: 'auth/FORGOT-PASSWORD/SET_NEW_PASS', isNewPassSet } as const)

export const loginTC =
  (data: FormikValueType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      await authAPI.login(data)
      const userData = await profileAPI.getProfileData()

      dispatch(setProfileData({ user: userData.data }))
      dispatch(setIsLoggedInAC({ isLogged: true }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC({ status: 'idle' }))
    }
  }

export const registerTC =
  (payload: registerPayloadType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      await authAPI.register(payload)

      dispatch(registerAC({ isRegister: true }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC({ status: 'idle' }))
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
              <a href='https://amnesia322.github.io/project/#/new_pass/$token$'>
              link</a>
              </div>`, // хтмп-письмо, вместо $token$ бэк вставит токен
    }

    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      await authAPI.forgot(dataForRequest)

      dispatch(setIsSendEmailAC({ isSendEmail: true }))
      dispatch(setEmailForLinkAC({ emailForLink: data.email }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC({ status: 'idle' }))
    }
  }

export const setNewPassTC =
  (data: NewPassDataType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      await authAPI.setNewPass(data)

      dispatch(setNewPassAC({ isNewPassSet: true }))
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC({ status: 'idle' }))
    }
  }

// type InitialStateType = typeof initialState
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
