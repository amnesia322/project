import React from 'react'

import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import deleted from '../../../../assets/svg/delete.svg'
import edit from '../../../../assets/svg/edit.svg'
import teacher from '../../../../assets/svg/leran.svg'
import { deletePackTC } from '../../packs-reducer'

import s from './PackItemAction.module.css'

export const PackItemActions = ({ userId, packId }: { userId: string; packId: string }) => {
  const myId = useAppSelector(state => state.profile.user._id)
  const dispatch = useAppDispatch()

  const onDeleteHandler = () => {
    dispatch(deletePackTC(packId))
  }

  return (
    <div className={s.wrapper}>
      <Link to={'#'} className={s.link}>
        <img src={teacher} alt={'img'} onClick={() => alert('Hello')} />
      </Link>
      {myId == userId && (
        <>
          <Link to={'#'} className={s.link}>
            <img src={edit} alt={'img'} onClick={() => alert('Hello. Put there your changes')} />
          </Link>
          <Link to={'#'} className={s.link}>
            <img src={deleted} alt={'img'} onClick={onDeleteHandler} />
          </Link>
        </>
      )}
    </div>
  )
}
