import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../app/store'
import deleteIcon from '../../../../assets/svg/delete.svg'
import editIcon from '../../../../assets/svg/edit.svg'
import learnIcon from '../../../../assets/svg/leran.svg'
import { setCardsPerPage, setCardsTC } from '../../cards/cards-reducer'
import { DeletePackModal } from '../packsModals/deletePackModal/DeletePackModal'
import { EditPackModal } from '../packsModals/editPackModal/EditPackModal'

import s from './PackItemAction.module.css'

type PropsType = {
  packId: string
  userId: string
  packName: string
  isPrivate: boolean
  cardsCount: number
}

export const PackItemActions = ({ userId, packId, packName, isPrivate, cardsCount }: PropsType) => {
  const myId = useAppSelector(state => state.profile.user._id)
  const dispatch = useAppDispatch()

  const onLearnHandler = () => {
    dispatch(setCardsPerPage(cardsCount))
    dispatch(setCardsTC(packId))
  }

  return (
    <div className={s.wrapper}>
      <Link to={`/learn/${packId}`} className={cardsCount ? s.link : s.disabledLink}>
        <Tooltip title="Learn">
          <img
            src={learnIcon}
            className={cardsCount ? s.img : s.imgDisabled}
            alt={'learn'}
            onClick={onLearnHandler}
          />
        </Tooltip>
      </Link>
      {myId == userId && (
        <>
          <EditPackModal packId={packId} packName={packName} isPrivate={isPrivate}>
            <Tooltip title="Edit">
              <img src={editIcon} className={s.img} alt={'edit'} />
            </Tooltip>
          </EditPackModal>
          <DeletePackModal packId={packId} packName={packName}>
            <Tooltip title="Delete">
              <img src={deleteIcon} className={s.img} alt={'delete'} />
            </Tooltip>
          </DeletePackModal>
        </>
      )}
    </div>
  )
}
