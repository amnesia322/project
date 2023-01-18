import React from 'react'

import { Link } from 'react-router-dom'

import deleted from '../../../../assets/svg/delete.svg'
import edit from '../../../../assets/svg/edit.svg'

import s from './CardItemAction.module.css'
export const CardItemActions = () => {
  return (
    <div className={s.wrapper}>
      <Link to={'#'} className={s.link}>
        <img src={edit} alt={'img'} onClick={() => alert('Hello. Put there your changes')} />
      </Link>
      <Link to={'#'} className={s.link}>
        <img src={deleted} alt={'img'} onClick={() => alert('Hello.')} />
      </Link>
    </div>
  )
}
