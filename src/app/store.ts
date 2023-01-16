import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AuthActionsType, authReducer } from '../features/auth/auth-reducer'
import { CardsActionType, cardsReducer } from '../features/packsList/cards/cards-reducer'
import { PacksActionType, packsReducer } from '../features/packsList/packs-reducer'
import { ProfileActionType, profileReducer } from '../features/Profile/profile-reducer'

import { AppActionsType, appReducer } from './app-reducer'

const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  // allCardPacks: packsReducer,
  // allCardQuestions: cardsReducer,
  packs: packsReducer,
  cards: cardsReducer,
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
  | AuthActionsType
  | PacksActionType
  | CardsActionType

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStoreType,
  unknown,
  AppRootActionsType
>
// @ts-ignore
window.store = store // for dev
