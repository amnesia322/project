import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../../app/app-reducer'
import { AppThunk } from '../../../app/store'
import { errorUtils } from '../../../common/utils/error-utils'

import { cardsApi, CardType, CreateCardRequestType, UpdateCardRequestType } from './cards-api'

const initialState = {
  queryParams: {
    cardAnswer: '',
    cardQuestion: '',
    cardsPack_id: '',
    min: 0,
    max: 5,
    sortCards: '0grade',
    page: 1,
    pageCount: 7,
  },
  cards: [] as CardType[],
  cardsTotalCount: 100,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  packUserId: '',
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
    default:
      return state
  }
}

export const setCards = (cards: any) => ({ type: 'cards/SET_CARDS', cards } as const)
export const setCardsPage = (page: number) => ({ type: 'cards/SET_PAGE', page } as const)
export const setCardsQuestion = (cardQuestion: string) =>
  ({ type: 'cards/SET_CARDS_QUESTION', cardQuestion } as const)
export const setCardsPageCount = (pageCount: number) =>
  ({ type: 'cards/SET_PAGE_COUNT', pageCount } as const)
export const setSortCards = (sortCards: string) =>
  ({ type: 'cards/SET_SORT_CARDS', sortCards } as const)
export const setPackCards = (cardsPack_id: string) =>
  ({ type: 'cards/SET_PACK_CARDS', cardsPack_id } as const)

export const setCardsTC =
  (cardsPack_id: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    let queryParams = { ...getState().cards.queryParams }

    try {
      const payload = { ...queryParams, cardsPack_id }
      const response = await cardsApi.getCards(payload)

      dispatch(setCards(response.data))
      dispatch(setPackCards(cardsPack_id))
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

type InitialStateType = typeof initialState

export type CardsActionType =
  | ReturnType<typeof setCards>
  | ReturnType<typeof setCardsPage>
  | ReturnType<typeof setCardsQuestion>
  | ReturnType<typeof setCardsPageCount>
  | ReturnType<typeof setSortCards>
  | ReturnType<typeof setPackCards>
