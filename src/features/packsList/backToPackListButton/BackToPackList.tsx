import React from 'react'

import { Link } from 'react-router-dom'

import { PATH } from '../../../app/Routes/Pages'
import back from '../../../assets/svg/back.svg'

import s from './BackToPackList.module.css'

export const BackToPackList = ({ className }: PropsType) => {
  const finalClassName = `${s.wrapperLink} ${className ? s.marginLeft : ''}`

  return (
    <div className={finalClassName}>
      <Link to={PATH.PACK_LIST} className={s.linkButton}>
        <img className={s.imgForLink} src={back} alt={'img'} />
        Back to Packs List
      </Link>
    </div>
  )
}

type PropsType = {
  className?: string
}
