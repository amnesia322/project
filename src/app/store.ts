import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers, legacy_createStore, applyMiddleware, AnyAction } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { LoginActionsType, loginReducer } from '../features/login/login-reducer'
import { ProfileActionType, profileReducer } from '../features/Profile/profile-reducer'
import { registerReducer } from '../features/register/register-reducer'

import { loadingReducer } from './appReducer'

const reducers = combineReducers({
  loading: loadingReducer,
  login: loginReducer,
  register: registerReducer,
  profile: profileReducer,
})

export const store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof reducers>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppStoreType = ReturnType<typeof reducers>

type AppActionsType = ProfileActionType | LoginActionsType

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStoreType,
  unknown,
  AppActionsType
>
// @ts-ignore
window.store = store // for dev
