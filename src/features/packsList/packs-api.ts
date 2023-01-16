import { instance } from '../../app/api'

import { InitialStateTypeForPacks } from './packs-reducer'
import { InitialStateTypeForPackQuestion } from './packsQuestion/packQuestion-reducer'

export const packsAPI = {
  getPacks() {
    return instance.get<InitialStateTypeForPacks>('cards/pack', {
      params: { pageCount: 108, sortPacks: '1created' },
    })
  },
  getPackQuestion(id: string) {
    return instance.get<InitialStateTypeForPackQuestion>('cards/card', {
      params: { cardsPack_id: id, pageCount: 10 },
    })
  },
}
