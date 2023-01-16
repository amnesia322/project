import React from 'react'

import { Link } from 'react-router-dom'

import { useAppSelector } from '../../../../app/store'
import deleted from '../../../../assets/svg/Delete.svg'
import edit from '../../../../assets/svg/edit-2.svg'
import teacher from '../../../../assets/svg/teacher.svg'

import s from './PackItemAction.module.css'

export const PackItemActions = ({ id }: PropsType) => {
  const myId = useAppSelector(state => state.profile.user._id)

  return (
    <div className={s.wrapper}>
      <Link to={'#'} className={s.link}>
        <img src={teacher} alt={'img'} onClick={() => alert('Hello')} />
      </Link>
      {myId == id && (
        <>
          <Link to={'#'} className={s.link}>
            <img src={edit} alt={'img'} onClick={() => alert('Hello. Put there your changes')} />
          </Link>
          <Link to={'#'} className={s.link}>
            <img src={deleted} alt={'img'} onClick={() => alert('Hello.')} />
          </Link>
        </>
      )}
    </div>
  )
}

type PropsType = {
  id: string
}
