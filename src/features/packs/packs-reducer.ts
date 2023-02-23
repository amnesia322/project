import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { sortingPacksMethods } from '../../common/constants/sortingMethods'
import { errorUtils } from '../../common/utils/error-utils'

import { CreatePackRequestType, packsAPI, PackType, UpdatePackRequestType } from './packs-api'

const initialState = {
  cardPacks: [] as PackType[],
  cardPacksTotalCount: 100,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  isPacksFetched: false,
  min: 0,
  max: 0,
  queryParams: {
    min: 0,
    max: 1000,
    pageCount: 5,
    sortPacks: sortingPacksMethods.desUpdate,
    packName: '',
    user_id: '',
  },
}

export const emptyQueryParams: InitialStateType['queryParams'] = {
  pageCount: 5,
  sortPacks: sortingPacksMethods.desUpdate,
  user_id: '',
  packName: '',
  min: 0,
  max: 53,
}
const slice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setPacks(state, action: PayloadAction<{ packs: any }>) {
      state = action.payload.packs
    },
    setPacksCurrentPage(state, action: PayloadAction<{ page: number }>) {
      state.page = action.payload.page
    },
    setPacksPerPage(state, action: PayloadAction<{ packsPerPage: number }>) {
      state.queryParams.pageCount = action.payload.packsPerPage
    },
    setSliderValue(state, action: PayloadAction<{ sliderValue: number[] }>) {
      state.queryParams.min = action.payload.sliderValue[0]
      state.queryParams.max = action.payload.sliderValue[1]
    },
    setSortPacks(state, action: PayloadAction<{ sortPacks: sortingPacksMethods }>) {
      state.queryParams.sortPacks = action.payload.sortPacks
    },
    setSortPacksName(state, action: PayloadAction<{ packName: string }>) {
      state.queryParams.packName = action.payload.packName
    },
    setUserPacks(state, action: PayloadAction<{ user_id: string }>) {
      state.queryParams.user_id = action.payload.user_id
    },
    setIsPacksFetched(state, action: PayloadAction<{ value: boolean }>) {
      state.isPacksFetched = action.payload.value
    },
    refreshFilters(state, action: PayloadAction<{ queryParams: InitialStateType['queryParams'] }>) {
      state.queryParams = action.payload.queryParams
    },
  },
})

export const {
  setPacks,
  setPacksCurrentPage,
  setPacksPerPage,
  setSliderValue,
  setSortPacks,
  setUserPacks,
  setSortPacksName,
  setIsPacksFetched,
  refreshFilters,
} = slice.actions
export const packsReducer = slice.reducer
// export const packsReducer = (
//   state: InitialStateType = initialState,
//   action: PacksActionType
// ): InitialStateType => {
//   switch (action.type) {
//     case 'packs/SET_PACKS':
//       return { ...state, ...action.packs }
//     case 'packs/SET_PAGE':
//       return { ...state, page: action.page }
//     case 'packs/SET-PACKS-PER-PAGE':
//       return { ...state, queryParams: { ...state.queryParams, pageCount: action.packsPerPage } }
//     case 'packs/SET-SLIDER-VALUE':
//       return { ...state, queryParams: { ...state.queryParams, min: action.min, max: action.max } }
//     case 'packs/SET_SORT_PACKS':
//       return { ...state, queryParams: { ...state.queryParams, sortPacks: action.sortPacks } }
//     case 'packs/SORT_PACKS_NAME':
//       return { ...state, queryParams: { ...state.queryParams, packName: action.packName } }
//     case 'packs/SET_USER_PACKS':
//       return { ...state, queryParams: { ...state.queryParams, user_id: action.user_id } }
//     case 'packs/SET_IS_FETCHED':
//       return { ...state, isPacksFetched: action.value }
//     case 'packs/REFRESH-FILTERS':
//       return {
//         ...state,
//         minCardsCount: 0,
//         maxCardsCount: 110,
//         queryParams: { ...action.queryParams },
//       }
//     default:
//       return state
//   }
// }

// export const setPacks = (packs: any) => ({ type: 'packs/SET_PACKS', packs } as const)
// export const setPacksCurrentPage = (page: number) => ({ type: 'packs/SET_PAGE', page } as const)
// export const setPacksPerPage = (pageCount: number) =>
//   ({
//     type: 'packs/SET-PACKS-PER-PAGE',
//     packsPerPage: pageCount,
//   } as const)
// export const setSliderValue = (sliderValue: number[]) =>
//   ({
//     type: 'packs/SET-SLIDER-VALUE',
//     min: sliderValue[0],
//     max: sliderValue[1],
//   } as const)
//
// export const setSortPacks = (sortPacks: sortingPacksMethods) =>
//   ({ type: 'packs/SET_SORT_PACKS', sortPacks } as const)
// export const setSortPacksName = (packName: string) =>
//   ({ type: 'packs/SORT_PACKS_NAME', packName } as const)
// export const setUserPacks = (user_id: string) =>
//   ({ type: 'packs/SET_USER_PACKS', user_id } as const)
// export const setIsPacksFetched = (value: boolean) =>
//   ({ type: 'packs/SET_IS_FETCHED', value } as const)
// export const refreshFilters = (queryParams: InitialStateType['queryParams']) =>
//   ({ type: 'packs/REFRESH-FILTERS', queryParams } as const)

export const setPacksTC = (): AppThunk => async (dispatch, getState) => {
  dispatch(setAppStatusAC({ status: 'loading' }))
  try {
    const payload = {
      page: getState().packs.page,
      ...getState().packs.queryParams,
    }

    const response = await packsAPI.getPacks(payload)

    dispatch(setPacks({ packs: response.data }))
    dispatch(setAppStatusAC({ status: 'succeeded' }))
    dispatch(setIsPacksFetched({ value: true }))
  } catch (error) {
    const err = error as Error | AxiosError<{ error: string }>

    errorUtils(err, dispatch)
  } finally {
    dispatch(setAppStatusAC({ status: 'idle' }))
  }
}

export const addPackTC =
  (addPackPayload: CreatePackRequestType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      await packsAPI.createPack(addPackPayload)

      dispatch(setPacksTC())
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC({ status: 'idle' }))
    }
  }

export const deletePackTC =
  (id: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      await packsAPI.deletePack(id)

      dispatch(setPacksTC())
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC({ status: 'idle' }))
    }
  }

export const editPackTC =
  (editPackTitlePayload: UpdatePackRequestType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC({ status: 'loading' }))
    try {
      await packsAPI.updatePack(editPackTitlePayload)

      dispatch(setPacksTC())
      dispatch(setAppStatusAC({ status: 'succeeded' }))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC({ status: 'idle' }))
    }
  }

type InitialStateType = typeof initialState

export type PacksActionType =
  | ReturnType<typeof setPacks>
  | ReturnType<typeof setPacksCurrentPage>
  | ReturnType<typeof setPacksPerPage>
  | ReturnType<typeof setSliderValue>
  | ReturnType<typeof setSortPacks>
  | ReturnType<typeof setSortPacksName>
  | ReturnType<typeof setUserPacks>
  | ReturnType<typeof setIsPacksFetched>
  | ReturnType<typeof refreshFilters>
