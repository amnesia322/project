import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../../app/app-reducer'
import { AppThunk } from '../../../app/store'
import { sortingCardsMethods } from '../../../common/constants/sortingMethods'
import { errorUtils } from '../../../common/utils/error-utils'

import {
  cardsApi,
  CardType,
  CreateCardRequestType,
  ResponseUpdatedGradeType,
  UpdateCardRequestType,
} from './cards-api'

const initialState = {
  queryParams: {
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 5,
    sortCards: sortingCardsMethods.desGrade,
    page: 1,
    pageCount: 5,
  },
  cards: [] as CardType[],
  cardsTotalCount: 100,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  packUserId: '',
  packName: '',
}

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsActionType
): InitialStateType => {
  switch (action.type) {
    case 'cards/SET_CARDS':
      return { ...state, ...action.cards }
    case 'cards/SET_PAGE':
      return { ...state, page: action.page }
    case 'cards/SET_CARDS_QUESTION':
      return { ...state, queryParams: { ...state.queryParams, cardQuestion: action.cardQuestion } }
    case 'cards/SET_PAGE_COUNT':
      return { ...state, queryParams: { ...state.queryParams, pageCount: action.pageCount } }
    case 'cards/SET_SORT_CARDS':
      return { ...state, queryParams: { ...state.queryParams, sortCards: action.sortCards } }
    case 'cards/SET_PACK_CARDS':
      return { ...state, queryParams: { ...state.queryParams, cardsPack_id: action.cardsPack_id } }
    case 'cards/REFRESH-FILTERS':
      return { ...state, queryParams: { ...state.queryParams, ...action.queryParams } }
    case 'cards/SET_GRADE':
      return {
        ...state,
        cards: state.cards.map(item =>
          item._id === action.updatedGrade.updatedGrade.card_id
            ? {
                ...item,
                grade: action.updatedGrade.updatedGrade.grade,
                shots: action.updatedGrade.updatedGrade.shots,
              }
            : item
        ),
      }
    default:
      return state
  }
}

export const setCards = (cards: any) => ({ type: 'cards/SET_CARDS', cards } as const)
export const setCardsCurrentPage = (page: number) => ({ type: 'cards/SET_PAGE', page } as const)
export const setCardsPerPage = (pageCount: number) =>
  ({ type: 'cards/SET_PAGE_COUNT', pageCount } as const)
export const setCardsQuestion = (cardQuestion: string) =>
  ({ type: 'cards/SET_CARDS_QUESTION', cardQuestion } as const)
export const setSortCards = (sortCards: sortingCardsMethods) =>
  ({ type: 'cards/SET_SORT_CARDS', sortCards } as const)
export const setPackCards = (cardsPack_id: string) =>
  ({ type: 'cards/SET_PACK_CARDS', cardsPack_id } as const)
export const refreshCardsFilters = (queryParams: InitialStateType['queryParams']) =>
  ({ type: 'cards/REFRESH-FILTERS', queryParams } as const)
export const setGrade = (updatedGrade: ResponseUpdatedGradeType) =>
  ({ type: 'cards/SET_GRADE', updatedGrade } as const)

export const setCardsTC =
  (cardsPack_id: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    let queryParams = { ...getState().cards.queryParams }

    try {
      const payload = { ...queryParams, cardsPack_id, page: getState().cards.page }
      const response = await cardsApi.getCards(payload)

      dispatch(setCards(response.data))
      // dispatch(setPackCards(cardsPack_id))
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const addCardTC =
  (addCardPayload: CreateCardRequestType): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
      await cardsApi.createCard(addCardPayload)

      dispatch(setCardsTC(getState().cards.queryParams.cardsPack_id))
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const deleteCardTC =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
      await cardsApi.deleteCard(id)

      dispatch(setCardsTC(getState().cards.queryParams.cardsPack_id))
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const editCardTitleTC =
  (editPackTitlePayload: UpdateCardRequestType): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
      await cardsApi.updateCard(editPackTitlePayload)

      dispatch(setCardsTC(getState().cards.queryParams.cardsPack_id))
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const setCardGradeTC =
  (value: string, id: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    const card_id = id

    try {
      const payload = { grade: value, card_id }

      const response = await cardsApi.setGrade(payload)

      dispatch(setGrade(response.data))
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

type InitialStateType = typeof initialState

export type CardsActionType =
  | ReturnType<typeof setCards>
  | ReturnType<typeof setCardsCurrentPage>
  | ReturnType<typeof setCardsPerPage>
  | ReturnType<typeof setCardsQuestion>
  | ReturnType<typeof setSortCards>
  | ReturnType<typeof setPackCards>
  | ReturnType<typeof refreshCardsFilters>
  | ReturnType<typeof setGrade>
