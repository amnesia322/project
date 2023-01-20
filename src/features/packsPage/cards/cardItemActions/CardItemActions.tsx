import React from 'react'

import { Link } from 'react-router-dom'

import { useAppDispatch } from '../../../../app/store'
import deleteIcon from '../../../../assets/svg/delete.svg'
import editIcon from '../../../../assets/svg/edit.svg'
import { deleteCardTC, editCardTitleTC } from '../cards-reducer'

import s from './CardItemAction.module.css'
export const CardItemActions = ({ cardId }: { cardId: string }) => {
  const dispatch = useAppDispatch()

  const onEditHandler = () => {
    dispatch(editCardTitleTC({ card: { _id: cardId, question: 'Updated card title' } }))
  }
  const onDeleteHandler = () => {
    dispatch(deleteCardTC(cardId))
  }

  return (
    <div className={s.wrapper}>
      <Link to={'#'} className={s.link}>
        <img src={editIcon} alt={'editIcon'} onClick={onEditHandler} />
      </Link>
      <Link to={'#'} className={s.link}>
        <img src={deleteIcon} alt={'deleteIcon'} onClick={onDeleteHandler} />
      </Link>
    </div>
  )
}
