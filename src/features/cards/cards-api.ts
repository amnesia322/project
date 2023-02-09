import { instance } from '../../app/api'

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
  setGrade(payload: { grade: string; card_id: string }) {
    return instance.put<ResponseUpdatedGradeType>('cards/grade', payload)
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
  questionImg?: string | undefined
  card_id?: string
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
  card: {
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
}

export type UpdateCardRequestType = {
  card: {
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
}

export type SetGradeType = {
  grade: number
  card_id: string
}

export type ResponseUpdatedGradeType = {
  updatedGrade: {
    // _id: string
    // cardsPack_id: string
    card_id: string
    // user_id: string
    grade: number
    shots: number
  }
}

// _id: string
// answer: string
// question: string
// cardsPack_id: string
// grade: number
// shots: number
// user_id: string
// created: string
// updated: string
// questionImg?: string
