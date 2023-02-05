import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'

import deleteIcon from '../../../../../assets/svg/delete.svg'
import editIcon from '../../../../../assets/svg/edit.svg'
import { DeleteCardModal } from '../cardsModals/deleteCardModal/DeleteCardModal'
import { EditCardModal } from '../cardsModals/editCardModal/EditCardModal'

import s from './CardItemAction.module.css'

type PropsType = {
  cardId: string
  cardAnswer: string
  cardQuestion: string
  cardQuestionImg: string | undefined
}

export const CardItemActions = ({
  cardId,
  cardAnswer,
  cardQuestion,
  cardQuestionImg,
}: PropsType) => {
  return (
    <div className={s.wrapper}>
      <EditCardModal
        cardId={cardId}
        answer={cardAnswer}
        question={cardQuestion}
        questionImg={cardQuestionImg}
      >
        <Tooltip title="Edit">
          <img className={s.img} src={editIcon} alt={'editIcon'} />
        </Tooltip>
      </EditCardModal>
      <DeleteCardModal cardId={cardId} cardName={cardAnswer}>
        <Tooltip title="Delete">
          <img className={s.img} src={deleteIcon} alt={'deleteIcon'} />
        </Tooltip>
      </DeleteCardModal>
    </div>
  )
}
