import { instance } from '../../app/api'

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
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
  block?: boolean
}
export type GetPacksResponseType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}

export type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  user_name: string
  private: boolean
}

export type CreatePackRequestType = {
  cardsPack: {
    name: string
    deckCover?: string
    private?: boolean
  }
}
export type UpdatePackRequestType = {
  cardsPack: {
    _id: string
    name?: string
    private?: boolean
  }
}
