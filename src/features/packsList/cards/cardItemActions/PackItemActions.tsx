import React from 'react'

import { Link } from 'react-router-dom'

import deleted from '../../../../assets/svg/Delete.svg'
import edit from '../../../../assets/svg/edit-2.svg'
import s from '../../packItem/packItremActions/PackItemAction.module.css'

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
