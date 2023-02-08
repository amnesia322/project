import React, { memo, ReactNode, useCallback, useState } from 'react'

import Typography from '@mui/material/Typography'

import { useAppDispatch } from '../../../../../../app/store'
import { BasicModal } from '../../../../../../common/components/BasicModal/BasicModal'
import { ClassicButton } from '../../../../../../common/components/ClassicButton/ClassicButton'
import { deleteCardTC } from '../../../cards-reducer'
import s from '../deleteCardModal/DeleteCardModal.module.css'

type PropsType = {
  children?: ReactNode
  cardId: string
  cardName: string
}
export const DeleteCardModal = memo(({ children, cardId, cardName }: PropsType) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = useCallback(() => setOpen(false), [])

  const deleteCardHandler = () => {
    dispatch(deleteCardTC(cardId))
    setOpen(false)
  }

  return (
    <>
      <div className={s.iconButton} onClick={handleOpen}>
        {children}
      </div>
      <BasicModal title={'Delete card'} open={open} handleClose={handleClose}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Do you really want to remove&nbsp;
          <span className={s.cardName}>{cardName}</span>? The card will be deleted.
        </Typography>
        <div className={s.buttonsContainer}>
          <ClassicButton title={'Cancel'} onClick={handleClose} color={'inherit'} />
          <ClassicButton title={'Delete'} onClick={deleteCardHandler} color={'error'} />
        </div>
      </BasicModal>
    </>
  )
})
