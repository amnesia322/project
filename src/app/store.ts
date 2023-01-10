import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers, legacy_createStore, applyMiddleware, AnyAction } from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'

import { loginReducer } from '../features/login/login-reducer'
import { forgotPasswordReducer } from '../features/PassRecovery/forgotPassword-reducer'
import { profileReducer } from '../features/Profile/profileReducer'
import { registerReducer } from '../features/register/register-reducer'

import { loadingReducer } from './appReducer'

const reducers = combineReducers({
  loading: loadingReducer,
  login: loginReducer,
  register: registerReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
})

export const store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof reducers>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
