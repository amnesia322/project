import { setIsLoggedInAC } from '../features/Login/login-reducer'
import { profileAPI } from '../features/Profile/profile-api'

import { AppThunk } from './store'

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
): InitialStateType => {
  switch (action.type) {
    case 'app/SET_STATUS':
      return { ...state, status: action.status }
    case 'app/SET_ERROR':
      return { ...state, error: action.error }
    case 'app/SET_INITIALIZED':
      return { ...state, isInitialized: action.value }
    default:
      return { ...state }
  }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервером
  status: RequestStatusType
  // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
  error: string | null
  // true, когда приложение проинициализаировалось
  isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({ type: 'app/SET_ERROR', error } as const)
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'app/SET_STATUS', status } as const)
export const setAppInitializedAC = (value: boolean) =>
  ({ type: 'app/SET_INITIALIZED', value } as const)

export const initializeAppTC = (): AppThunk => async dispatch => {
  try {
    const response = await profileAPI.getProfileData()

    if (response.data._id) {
      dispatch(setIsLoggedInAC(true))
      dispatch(setAppInitializedAC(true))
    }
  } catch (error) {
    dispatch(setIsLoggedInAC(false))
  } finally {
    dispatch(setAppInitializedAC(true))
  }
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>

export type AppActionsType =
  | SetAppErrorActionType
  | SetAppStatusActionType
  | SetAppInitializedActionType
