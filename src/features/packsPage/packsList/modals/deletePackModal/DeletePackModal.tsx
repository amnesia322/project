import React, { memo, ReactNode, useCallback, useState } from 'react'

import Typography from '@mui/material/Typography'

import { useAppDispatch } from '../../../../../app/store'
import { BasicModal } from '../../../../../common/components/BasicModal/BasicModal'
import { ClassicButton } from '../../../../../common/components/ClassicButton/ClassicButton'
import { deletePackTC } from '../../../packs-reducer'
import s from '../editPackModal/EditPackModal.module.css'
type PropsType = {
  children?: ReactNode
  packId: string
  packName: string | undefined
}
export const DeletePackModal = memo(({ children, packId, packName }: PropsType) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = useCallback(() => setOpen(false), [])

  const deletePackHandler = () => {
    dispatch(deletePackTC(packId))
    setOpen(false)
  }

  return (
    <>
      <div className={s.iconButton} onClick={handleOpen}>
        {children}
      </div>
      <BasicModal title={'Delete pack'} open={open} handleClose={handleClose}>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Do you really want to remove&nbsp;
          <span style={{ fontWeight: 600 }}>{packName}</span>? All tables will be deleted.
        </Typography>
        <div className={s.buttonsContainer}>
          <ClassicButton title={'Cancel'} onClick={handleClose} color={'inherit'} />
          <ClassicButton title={'Delete'} onClick={deletePackHandler} color={'error'} />
        </div>
      </BasicModal>
    </>
  )
})
