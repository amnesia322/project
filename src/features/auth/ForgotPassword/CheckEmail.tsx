import React from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../app/Routes/Pages'
import { useAppSelector } from '../../../app/store'
import imgLetter from '../../../assets/svg/eamail.svg'
import { ClassicButton } from '../../../common/components/ClassicButton/ClassicButton'

import s from './ForgotPassword.module.css'

export const CheckEmail = () => {
  const navigate = useNavigate()
  const email = useAppSelector<string>(state => state.auth.forgotPassword.emailForLink)
  const onClickHandler = () => {
    navigate(PATH.LOGIN)
  }
  const button = {
    width: '100%',
    marginTop: '40px',
  }

  return (
    <div className={`${s.wrapperLogin} ${s.wrapperForgotForm}`}>
      <h2 className={s.title}>Check Email</h2>
      <img className={s.img} src={imgLetter} alt={'img'} />
      <form className={`${s.form} ${s.formForgotPassword}`}>
        <div className={s.textDescription}>We’ve sent an Email with instructions to {email}</div>
        <ClassicButton title={'Back to Login'} sx={button} onClick={onClickHandler} />
      </form>
    </div>
  )
}
