import { Dispatch } from 'redux'

import { registerAPI, registerPayloadType } from './register-api'

const initState = {
  isRegister: false,
}

type InitStateType = typeof initState

export const registerReducer = (state = initState, action: LoadingActionType): InitStateType => {
  switch (action.type) {
    case 'REGISTER': {
      return { ...state, isRegister: action.isRegister }
    }
    default:
      return state
  }
}

type LoadingActionType = ReturnType<typeof registerAC>

export const registerAC = (isRegister: boolean) =>
  ({
    type: 'REGISTER',
    isRegister,
  } as const)

export const registerTC = (payload: registerPayloadType) => (dispatch: Dispatch) => {
  registerAPI
    .register(payload)
    .then(() => {
      dispatch(registerAC(true))
    })
    .catch(err => {
      alert(err.response.data.error)
    })
}
