import { setAppStatusAC } from '../../app/app-reducer'
import { AppThunkDispatch } from '../../app/store'
import { errorUtils } from '../../common/utils/error-utils'

import { FormikValueTypeForgotPassword } from './ForgotPassword'
import { forgotPasswordApi } from './forgotPassword-api'

const initialState = {
  isSendEmail: false,
  emailForLink: ' ',
}

export const forgotPasswordReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case 'forgotPassword/SET-IS-SEND-EMAIL': {
      return { ...state, isSendEmail: action.payload.value }
    }
    case 'forgotPassword/SET-EMAIL': {
      return { ...state, emailForLink: action.payload.value }
    }
    default:
      return state
  }
}

export const setIsSendEmailAC = (value: boolean) => {
  return {
    type: 'forgotPassword/SET-IS-SEND-EMAIL',
    payload: {
      value,
    },
  } as const
}
export const setEmailForLinkAC = (value: string) => {
  return {
    type: 'forgotPassword/SET-EMAIL',
    payload: {
      value,
    },
  } as const
}

export const ForgotPasswordTC =
  (data: FormikValueTypeForgotPassword) => (dispatch: AppThunkDispatch) => {
    console.log(data.email)
    const dataForRequest = {
      email: data.email,
      from: 'test-front-admin <ai73a@yandex.by>',
      message: `<div style="background-color: grey; padding: 15px">
              password recovery link: 
              <a href='http://localhost:3000/#/new_pass/$token$'>
              link</a>
              </div>`, // хтмп-письмо, вместо $token$ бэк вставит токен
    }

    dispatch(setAppStatusAC('loading'))
    forgotPasswordApi
      .forgot(dataForRequest)
      .then(() => {
        dispatch(setIsSendEmailAC(true))
        dispatch(setEmailForLinkAC(data.email))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch(error => {
        errorUtils(error, dispatch)
      })
      .finally(() => {
        dispatch(setAppStatusAC('idle'))
      })
  }

type setIsSendEmailACType = ReturnType<typeof setIsSendEmailAC>
type setEmailForLinkACType = ReturnType<typeof setEmailForLinkAC>
type InitialStateType = typeof initialState
type ActionsType = setIsSendEmailACType | setEmailForLinkACType
