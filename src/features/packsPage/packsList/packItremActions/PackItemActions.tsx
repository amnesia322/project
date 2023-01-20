import React from 'react'

import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import deleteIcon from '../../../../assets/svg/delete.svg'
import editIcon from '../../../../assets/svg/edit.svg'
import learnIcon from '../../../../assets/svg/leran.svg'
import { deletePackTC, editPackTitleTC } from '../../packs-reducer'

import s from './PackItemAction.module.css'

export const PackItemActions = ({ userId, packId }: { userId: string; packId: string }) => {
  const myId = useAppSelector(state => state.profile.user._id)
  const dispatch = useAppDispatch()

  const onEditHandler = () => {
    dispatch(editPackTitleTC({ cardsPack: { _id: packId, name: '!Updated The Best team pack!' } }))
  }
  const onDeleteHandler = () => {
    dispatch(deletePackTC(packId))
  }
  const onLearnHandler = () => {
    alert('onLearnHandler')
  }

  return (
    <div className={s.wrapper}>
      <Link to={'#'} className={s.link}>
        <img src={learnIcon} alt={'learn'} onClick={onLearnHandler} />
      </Link>
      {myId == userId && (
        <>
          <Link to={'#'} className={s.link}>
            <img src={editIcon} alt={'edit'} onClick={onEditHandler} />
          </Link>
          <Link to={'#'} className={s.link}>
            <img src={deleteIcon} alt={'delete'} onClick={onDeleteHandler} />
          </Link>
        </>
      )}
    </div>
  )
}
