import React from 'react'

import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import deleteIcon from '../../../../assets/svg/delete.svg'
import editIcon from '../../../../assets/svg/edit.svg'
import learnIcon from '../../../../assets/svg/leran.svg'
import { setCardsPerPage, setCardsTC } from '../../cards/cards-reducer'
import { deletePackTC, editPackTitleTC } from '../../packs-reducer'

import s from './PackItemAction.module.css'

type PropsType = {
  packId: string
  userId: string
  packName: string
  isPrivate: boolean
}

export const PackItemActions = ({ userId, packId, packName, isPrivate }: PropsType) => {
  const myId = useAppSelector(state => state.profile.user._id)
  const dispatch = useAppDispatch()
  const cardsCount = useAppSelector(
    state => state.packs.cardPacks.find(item => item._id === packId)!.cardsCount
  )

  const onLearnHandler = () => {
    dispatch(setCardsPerPage(cardsCount))
    dispatch(setCardsTC(packId))
  }

  return (
    <div className={s.wrapper}>
      <Link to={'/learn'} className={s.link}>
        <img src={learnIcon} alt={'learn'} onClick={onLearnHandler} />
      </Link>
      {myId == userId && (
        <>
          <EditPackModal packId={packId} packName={packName} isPrivate={isPrivate}>
            <img src={editIcon} alt={'edit'} />
          </EditPackModal>
          <DeletePackModal packId={packId} packName={packName}>
            <img src={deleteIcon} alt={'delete'} />
          </DeletePackModal>
        </>
      )}
    </div>
  )
}
