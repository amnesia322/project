// import { AxiosError } from 'axios'
//
// import { setAppStatusAC } from '../../app/app-reducer'
// import { AppThunk } from '../../app/store'
// import { errorUtils } from '../../common/utils/error-utils'
//
// import { packsAPI } from './packs-api'
//
// const initialState = {
//   cardPacks: [] as Array<PacksType>,
//   page: 0,
//   pageCount: 0,
//   cardPacksTotalCount: 0,
//   minCardsCount: 0,
//   maxCardsCount: 0,
//   toke: '',
//   tokenDeathTime: 0,
// }
//
// export const packsReducer = (
//   state: InitialStateTypeForPacks = initialState,
//   action: PacksActionType
// ): InitialStateTypeForPacks => {
//   switch (action.type) {
//     case 'packs/SET_PACKS':
//       return { ...state, ...action.payload.packs }
//     default:
//       return state
//   }
// }
//
// export const setPacksData = (packs: InitialStateTypeForPacks) =>
//   ({ type: 'packs/SET_PACKS', payload: { packs } } as const)
//
// export const getPacksTC = (): AppThunk => async dispatch => {
//   dispatch(setAppStatusAC('loading'))
//   try {
//     const response = await packsAPI.getPacks()
//
//     dispatch(setPacksData(response.data))
//     dispatch(setAppStatusAC('succeeded'))
//   } catch (error) {
//     const err = error as Error | AxiosError<{ error: string }>
//
//     errorUtils(err, dispatch)
//   } finally {
//     dispatch(setAppStatusAC('idle'))
//   }
// }
//
// export type InitialStateTypeForPacks = {
//   cardPacks: Array<PacksType>
//   page: number
//   pageCount: number
//   cardPacksTotalCount: number
//   minCardsCount: number
//   maxCardsCount: number
//   toke: string
//   tokenDeathTime: number
// }
//
// export type PacksType = {
//   _id: string
//   user_id: string
//   user_name: string
//   private: boolean
//   name: string
//   path: string
//   grade: number
//   shots: number
//   cardsCount: number
//   type: string
//   rating: number
//   created: string
//   updated: string
//   more_id: string
//   __v: number
// }
//
// type SetPacksDataType = ReturnType<typeof setPacksData>
// export type PacksActionType = SetPacksDataType
import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { CreatePackRequestType, packsAPI, PackType, UpdatePackRequestType } from './packs-api'

const initialState = {
  cardPacks: [] as PackType[],
  cardPacksTotalCount: 100, // количество колод
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1, // выбранная страница,
  packsPerPage: 5,
  queryParams: {
    min: 0,
    max: 200,
    pageCount: 5, // количество элементов на странице
    sortPacks: '0updated',
    packName: '',
    user_id: '',
  },
}

export const packsReducer = (
  state: InitialStateType = initialState,
  action: PacksActionType
): InitialStateType => {
  switch (action.type) {
    case 'packs/SET_PACKS':
      return { ...state, ...action.packs }
    case 'packs/SET_PAGE':
      return { ...state, page: action.page }
    case 'PACKS/SET-PACKS-PER-PAGE':
      return { ...state, queryParams: { ...state.queryParams, pageCount: action.packsPerPage } }
    case 'packs/SET_MIN_CARDS_COUNT':
      return { ...state, queryParams: { ...state.queryParams, min: action.min } }
    case 'packs/SET_MAX_CARDS_COUNT':
      return { ...state, queryParams: { ...state.queryParams, max: action.max } }
    case 'packs/SET_SORT_PACKS':
      return { ...state, queryParams: { ...state.queryParams, sortPacks: action.sortPacks } }
    case 'packs/SORT_PACKS_NAME':
      return { ...state, queryParams: { ...state.queryParams, packName: action.packName } }
    case 'packs/SET_USER_PACKS':
      return { ...state, queryParams: { ...state.queryParams, user_id: action.user_id } }

    default:
      return state
  }
}

export const setPacks = (packs: any) => ({ type: 'packs/SET_PACKS', packs } as const)
export const setPacksCurrentPage = (page: number) => ({ type: 'packs/SET_PAGE', page } as const)
export const setPacksPerPage = (pageCount: number) => {
  return {
    type: 'PACKS/SET-PACKS-PER-PAGE',
    packsPerPage: pageCount,
  } as const
}
export const setMin = (min: number) => ({ type: 'packs/SET_MIN_CARDS_COUNT', min } as const)
export const setMax = (max: number) => ({ type: 'packs/SET_MAX_CARDS_COUNT', max } as const)
export const setSortPacks = (sortPacks: string) =>
  ({ type: 'packs/SET_SORT_PACKS', sortPacks } as const)
export const setSortPacksName = (packName: string) =>
  ({ type: 'packs/SORT_PACKS_NAME', packName } as const)
export const setUserPacks = (user_id: string) =>
  ({ type: 'packs/SET_USER_PACKS', user_id } as const)

export const setPacksTC = (): AppThunk => async (dispatch, getState) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const payload = {
      page: getState().packs.page,
      ...getState().packs.queryParams,
    }
    const response = await packsAPI.getPacks(payload)

    dispatch(setPacks(response.data))
    dispatch(setAppStatusAC('succeeded'))
  } catch (error) {
    const err = error as Error | AxiosError<{ error: string }>

    errorUtils(err, dispatch)
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}

export const addPackTC =
  (addPackPayload: CreatePackRequestType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      await packsAPI.createPack(addPackPayload)

      dispatch(setPacksTC())
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const deletePackTC =
  (id: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      await packsAPI.deletePack(id)

      dispatch(setPacksTC())
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const editPackTitleTC =
  (editPackTitlePayload: UpdatePackRequestType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      await packsAPI.updatePack(editPackTitlePayload)

      dispatch(setPacksTC())
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

type InitialStateType = typeof initialState

export type PacksActionType =
  | ReturnType<typeof setPacks>
  | ReturnType<typeof setPacksCurrentPage>
  | ReturnType<typeof setPacksPerPage>
  | ReturnType<typeof setMin>
  | ReturnType<typeof setMax>
  | ReturnType<typeof setSortPacks>
  | ReturnType<typeof setSortPacksName>
  | ReturnType<typeof setUserPacks>
