import { instance } from '../../app/api'

import { InitialStateTypeForPacks } from './packs-reducer'

export const packsAPI = {
  getPacks() {
    return instance.get<InitialStateTypeForPacks>('cards/pack', {})
  },
}
