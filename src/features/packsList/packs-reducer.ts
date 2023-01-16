import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { packsAPI } from './packs-api'

const initialState = {
  cardPacks: [] as Array<PacksType>,
  page: 0,
  pageCount: 0,
  cardPacksTotalCount: 0,
  minCardsCount: 0,
  maxCardsCount: 0,
  toke: '',
  tokenDeathTime: 0,
}

export const packsReducer = (
  state: InitialStateTypeForPacks = initialState,
  action: PacksActionType
): InitialStateTypeForPacks => {
  switch (action.type) {
    case 'packs/SET_PACKS':
      return { ...state, ...action.payload.packs }
    default:
      return state
  }
}

export const setPacksData = (packs: InitialStateTypeForPacks) =>
  ({ type: 'packs/SET_PACKS', payload: { packs } } as const)

export const getPacksTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const response = await packsAPI.getPacks()

    dispatch(setPacksData(response.data))
    dispatch(setAppStatusAC('succeeded'))
  } catch (error) {
    const err = error as Error | AxiosError<{ error: string }>

    errorUtils(err, dispatch)
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}

export type InitialStateTypeForPacks = {
  cardPacks: Array<PacksType>
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  toke: string
  tokenDeathTime: number
}

export type PacksType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

type SetPacksDataType = ReturnType<typeof setPacksData>
export type PacksActionType = SetPacksDataType
