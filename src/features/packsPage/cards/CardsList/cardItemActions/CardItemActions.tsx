import React from 'react'

import deleteIcon from '../../../../../assets/svg/delete.svg'
import editIcon from '../../../../../assets/svg/edit.svg'
import { DeleteCardModal } from '../cardsModals/deleteCardModal/DeleteCardModal'
import { EditCardModal } from '../cardsModals/editCardModal/EditCardModal'

import s from './CardItemAction.module.css'

type PropsType = {
  cardId: string
  cardAnswer: string
  cardQuestion: string
}

export const CardItemActions = ({ cardId, cardAnswer, cardQuestion }: PropsType) => {
  return (
    <div className={s.wrapper}>
      <EditCardModal cardId={cardId} answer={cardAnswer} question={cardQuestion}>
        <img className={s.img} src={editIcon} alt={'editIcon'} />
      </EditCardModal>
      <DeleteCardModal cardId={cardId} cardName={cardAnswer}>
        <img className={s.img} src={deleteIcon} alt={'deleteIcon'} />
      </DeleteCardModal>
    </div>
  )
}
