import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers, legacy_createStore, applyMiddleware, AnyAction } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { LoginActionsType, loginReducer } from '../features/login/login-reducer'
import { NewPassActionType, newPassReducer } from '../features/NewPass/newPass-reducer'
import { forgotPasswordReducer } from '../features/PassRecovery/forgotPassword-reducer'
import { ProfileActionType, profileReducer } from '../features/Profile/profile-reducer'
import { RegisterActionsType, registerReducer } from '../features/register/register-reducer'

import { AppActionsType, appReducer } from './app-reducer'

const reducers = combineReducers({
  app: appReducer,
  login: loginReducer,
  register: registerReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  newPass: newPassReducer,
})

export const store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof reducers>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppStoreType = ReturnType<typeof reducers>

type AppRootActionsType =
  | AppActionsType
  | ProfileActionType
  | LoginActionsType
  | NewPassActionType
  | RegisterActionsType

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStoreType,
  unknown,
  AppRootActionsType
>
// @ts-ignore
window.store = store // for dev
