import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../../app/app-reducer'
import { AppThunk } from '../../../app/store'
import { errorUtils } from '../../../common/utils/error-utils'
import { packsAPI } from '../packs-api'

const initialState = {
  cards: [] as Array<QuestionType>,
  packUserId: '',
  packName: '',
  packPrivate: false,
  packDeckCover: '',
  packCreated: '',
  packUpdated: '',
  page: 0,
  pageCount: 0,
  cardsTotalCount: 0,
  minGrade: 0,
  maxGrade: 0,
  token: '',
  tokenDeathTime: 0,
}

export const cardsReducer = (
  state: InitialStateTypeForPackQuestion = initialState,
  action: QuestionActionType
): InitialStateTypeForPackQuestion => {
  switch (action.type) {
    case 'packQuestion/SET_PACKS':
      return { ...state, ...action.payload.packQuestion }
    default:
      return state
  }
}

export const setPackQuestionData = (packQuestion: InitialStateTypeForPackQuestion) =>
  ({ type: 'packQuestion/SET_PACKS', payload: { packQuestion } } as const)

export const getQuestionTC =
  (packId: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const id = getState().allCardPacks.cardPacks.find(item => item._id === packId)!._id

    try {
      const response = await packsAPI.getPackQuestion(id)

      dispatch(setPackQuestionData(response.data))
      dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
      const err = error as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export type InitialStateTypeForPackQuestion = {
  cards: Array<QuestionType>
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover: string
  packCreated: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}

export type QuestionType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
}

type setPackQuestionDataType = ReturnType<typeof setPackQuestionData>
export type QuestionActionType = setPackQuestionDataType
