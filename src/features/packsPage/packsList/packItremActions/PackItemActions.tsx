import React from 'react'

import { Link } from 'react-router-dom'

import { useAppSelector } from '../../../../app/store'
import deleteIcon from '../../../../assets/svg/delete.svg'
import editIcon from '../../../../assets/svg/edit.svg'
import learnIcon from '../../../../assets/svg/leran.svg'
import { DeletePackModal } from '../packsModals/deletePackModal/DeletePackModal'
import { EditPackModal } from '../packsModals/editPackModal/EditPackModal'

import s from './PackItemAction.module.css'

type PropsType = {
  packId: string
  userId: string
  packName: string
  isPrivate: boolean
}

export const PackItemActions = ({ userId, packId, packName, isPrivate }: PropsType) => {
  const myId = useAppSelector(state => state.profile.user._id)

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
