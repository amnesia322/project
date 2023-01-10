import React from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../app/Routes/Pages'
import { useAppSelector } from '../../app/store'
import imgLetter from '../../assets/svg/Group 281.svg'
import SuperButton from '../../common/components/SuperButton/SuperButton'

import s from './ForgotPassword.module.css'

export const CheckEmail = () => {
  const navigate = useNavigate()
  const email = useAppSelector<string>(state => state.forgotPassword.emailForLink)
  const onClickHandler = () => {
    navigate(PATH.LOGIN)
  }

  return (
    <div className={`${s.wrapperLogin} ${s.wrapperForgotForm}`}>
      <h2 className={s.title}>Check Email</h2>
      <img className={s.img} src={imgLetter} alt={'img'} />
      <form className={`${s.form} ${s.formForgotPassword}`}>
        <div className={s.textDescription}>We’ve sent an Email with instructions to {email}</div>
        <SuperButton className={s.button} type={'submit'} onClick={onClickHandler}>
          Back to login
        </SuperButton>
      </form>
    </div>
  )
}
