// import { AxiosError } from 'axios'
//
// import { setAppStatusAC } from '../../../app/app-reducer'
// import { AppThunk } from '../../../app/store'
// import { errorUtils } from '../../../common/utils/error-utils'
// import { packsAPI } from '../packs-api'
//
// const initialState = {
//   cards: [] as Array<QuestionType>,
//   packUserId: '',
//   packName: '',
//   packPrivate: false,
//   packDeckCover: '',
//   packCreated: '',
//   packUpdated: '',
//   page: 0,
//   pageCount: 0,
//   cardsTotalCount: 0,
//   minGrade: 0,
//   maxGrade: 0,
//   token: '',
//   tokenDeathTime: 0,
// }
//
// export const cardsReducer = (
//   state: InitialStateTypeForPackQuestion = initialState,
//   action: QuestionActionType
// ): InitialStateTypeForPackQuestion => {
//   switch (action.type) {
//     case 'packQuestion/SET_PACKS':
//       return { ...state, ...action.payload.packQuestion }
//     default:
//       return state
//   }
// }
//
// export const setPackQuestionData = (packQuestion: InitialStateTypeForPackQuestion) =>
//   ({ type: 'packQuestion/SET_PACKS', payload: { packQuestion } } as const)
//
// export const getQuestionTC =
//   (packId: string): AppThunk =>
//   async (dispatch, getState) => {
//     dispatch(setAppStatusAC('loading'))
//     const id = getState().allCardPacks.cardPacks.find(item => item._id === packId)!._id
//
//     try {
//       const response = await packsAPI.getPackQuestion(id)
//
//       dispatch(setPackQuestionData(response.data))
//       dispatch(setAppStatusAC('succeeded'))
//     } catch (error) {
//       const err = error as Error | AxiosError<{ error: string }>
//
//       errorUtils(err, dispatch)
//     } finally {
//       dispatch(setAppStatusAC('idle'))
//     }
//   }
//
// export type InitialStateTypeForPackQuestion = {
//   cards: Array<QuestionType>
//   packUserId: string
//   packName: string
//   packPrivate: boolean
//   packDeckCover: string
//   packCreated: string
//   packUpdated: string
//   page: number
//   pageCount: number
//   cardsTotalCount: number
//   minGrade: number
//   maxGrade: number
//   token: string
//   tokenDeathTime: number
// }
//
// export type QuestionType = {
//   _id: string
//   cardsPack_id: string
//   user_id: string
//   answer: string
//   question: string
//   grade: number
//   shots: number
//   comments: string
//   type: string
//   rating: number
//   more_id: string
//   created: string
//   updated: string
//   __v: number
// }
//
// type setPackQuestionDataType = ReturnType<typeof setPackQuestionData>
// export type QuestionActionType = setPackQuestionDataType
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
    min: 1,
    max: 4,
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
    try {
      const id = getState().packs.cardPacks.find(item => item._id === cardsPack_id)!._id
      const payload = { ...getState().cards.queryParams, cardsPack_id: id }
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
