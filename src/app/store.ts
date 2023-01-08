import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers, legacy_createStore, applyMiddleware, AnyAction } from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'

import { loginReducer } from '../features/login/login-reducer'
import { registerReducer } from '../features/register/register-reducer'

const reducers = combineReducers({
  loading: loginReducer,
  register: registerReducer,
})

export const store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof reducers>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
