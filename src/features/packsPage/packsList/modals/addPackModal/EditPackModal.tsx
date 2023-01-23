import React, { ChangeEvent, memo, ReactNode, useCallback, useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'

import { useAppDispatch } from '../../../../../app/store'
import { BasicModal } from '../../../../../common/components/BasicModal/BasicModal'
import { ClassicButton } from '../../../../../common/components/ClassicButton/ClassicButton'
import { editPackTitleTC } from '../../../packs-reducer'

import s from './EditPackModal.module.css'
type PropsType = {
  children?: ReactNode
  packId: string
  packName?: string
  isPrivate?: boolean
}
export const EditPackModal = memo(({ children, packId, packName, isPrivate }: PropsType) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = useCallback(() => setOpen(false), [])

  const [newPackName, setNewPackName] = useState(packName)
  const changePackName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPackName(e.currentTarget.value)
  }
  const editPackHandler = () => {
    dispatch(
      editPackTitleTC({ cardsPack: { _id: packId, name: newPackName, private: packStatus } })
    )
    setOpen(false)
  }

  const [packStatus, setPackStatus] = useState(isPrivate)
  const setChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setPackStatus(e.target.checked)
  }

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <BasicModal title={'Edit pack'} open={open} handleClose={handleClose}>
        <FormControl fullWidth>
          <TextField
            className={s.container}
            fullWidth={true}
            size="small"
            variant="standard"
            label="Pack Name"
            value={newPackName}
            onChange={changePackName}
            placeholder={'Pack Name'}
          />
          <FormControlLabel
            className={s.container}
            control={<Checkbox checked={packStatus} onChange={setChecked} />}
            label="Private pack"
          />
        </FormControl>
        <div className={s.buttonsContainer}>
          <ClassicButton title={'Cancel'} onClick={handleClose} color={'inherit'} />
          <ClassicButton title={'Save'} onClick={editPackHandler} />
        </div>
      </BasicModal>
    </>
  )
})
