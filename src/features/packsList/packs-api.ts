import { instance } from '../../app/api'

// import { InitialStateTypeForPackQuestion } from './cards/cards-reducer'
// import { InitialStateTypeForPacks } from './packs-reducer'

// export const packsAPI = {
//   getPacks() {
//     return instance.get<InitialStateTypeForPacks>('cards/pack', {
//       params: { pageCount: 108, sortPacks: '1created' },
//     })
//   },
//   getPackQuestion(id: string) {
//     return instance.get<InitialStateTypeForPackQuestion>('cards/card', {
//       params: { cardsPack_id: id, pageCount: 10 },
//     })
//   },
// }
export const packsAPI = {
  getPacks(payload: GetPacksRequestType) {
    return instance.get<GetPacksResponseType>('cards/pack', { params: payload })
  },
  createPack(payload: CreatePackRequestType) {
    return instance.post<GetPacksResponseType>('cards/pack', payload)
  },
  deletePack(id: string) {
    return instance.delete<GetPacksResponseType>(`cards/pack?id=${id}`)
  },
  updatePack(payload: UpdatePackRequestType) {
    return instance.put<GetPacksResponseType>('cards/pack', payload)
  },
}

export type GetPacksRequestType = {
  packName?: string // не обязательно
  min?: number // не обязательно
  max?: number // не обязательно
  sortPacks?: string // не обязательно
  page?: number // не обязательно
  pageCount?: number // не обязательно
  user_id?: string // чьи колоды не обязательно, или придут все
  block?: boolean // не обязательно
}
export type GetPacksResponseType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number // количество элементов на странице
}

export type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
}

export type CreatePackRequestType = {
  cardsPack: {
    name: string // если не отправить будет таким
    deckCover?: string // не обязателен
    private?: boolean // если не отправить будет такой
  }
}
export type UpdatePackRequestType = {
  cardsPack: {
    _id: string
    name: string // не обязательно
  }
}
