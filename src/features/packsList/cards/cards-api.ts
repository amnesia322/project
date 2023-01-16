import { instance } from '../../../app/api'

export const cardsApi = {
  getCards(payload: GetCardsRequestType) {
    return instance.get<GetCardsResponseType>('cards/card', { params: payload })
  },
  createCard(payload: CreateCardRequestType) {
    return instance.post<GetCardsResponseType>('cards/card', payload)
  },
  deleteCard(id: string) {
    return instance.delete<GetCardsResponseType>(`cards/card?id=${id}`)
  },
  updateCard(payload: UpdateCardRequestType) {
    return instance.put<GetCardsResponseType>('cards/card', payload)
  },
}

export type CardType = {
  _id: string
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  questionImg?: string
}

export type GetCardsRequestType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

export type GetCardsResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
  packName: string
}

export type CreateCardRequestType = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type UpdateCardRequestType = {
  _id: string
  answer?: string
  question?: string
  cardsPack_id?: string
  grade?: number
  shots?: number
  user_id?: string
  created?: string
  updated?: string
  questionImg?: string
}
