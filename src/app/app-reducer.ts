import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { setIsLoggedInAC } from '../features/auth/auth-reducer'
import { profileAPI } from '../features/profile/profile-api'
import { setProfileData } from '../features/profile/profile-reducer'

import { AppThunk } from './store'

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
}
const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppInitializedAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer
// export const appReducer = (
//   state: InitialStateType = initialState,
//   action: AppActionsType
// ): InitialStateType => {
//   switch (action.type) {
//     case 'app/SET_STATUS':
//       return { ...state, status: action.status }
//     case 'app/SET_ERROR':
//       return { ...state, error: action.error }
//     case 'app/SET_INITIALIZED':
//       return { ...state, isInitialized: action.value }
//     default:
//       return state
//   }
// }

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
}

export const { setAppErrorAC, setAppStatusAC, setAppInitializedAC } = slice.actions //(error: string | null) => ({ type: 'app/SET_ERROR', error } as const)
// export const setAppStatusAC = slice.actions.setAppStatusAC //(status: RequestStatusType) =>
//   // ({ type: 'app/SET_STATUS', status } as const)
// export const setAppInitializedAC = slice.actions.setAppInitializedAC
// (value: boolean) =>
// ({ type: 'app/SET_INITIALIZED', value } as const)

export const initializeAppTC = (): AppThunk => async dispatch => {
  try {
    const response = await profileAPI.getProfileData()

    dispatch(setProfileData({ user: response.data }))

    if (response.data._id) {
      dispatch(setIsLoggedInAC({ isLogged: true }))
    }
  } catch (error) {
    dispatch(setIsLoggedInAC({ isLogged: false }))
  } finally {
    dispatch(setAppInitializedAC({ isInitialized: true }))
  }
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>

export type AppActionsType =
  | SetAppErrorActionType
  | SetAppStatusActionType
  | SetAppInitializedActionType
