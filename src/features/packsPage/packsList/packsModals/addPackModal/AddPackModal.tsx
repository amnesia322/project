import React, { ChangeEvent, memo, ReactNode, useCallback, useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'

import { useAppDispatch } from '../../../../../app/store'
import { BasicModal } from '../../../../../common/components/BasicModal/BasicModal'
import { ClassicButton } from '../../../../../common/components/ClassicButton/ClassicButton'
import { addPackTC } from '../../../packs-reducer'
import s from '../addPackModal/AddPackModal.module.css'
type PropsType = {
  children?: ReactNode
}
export const AddPackModal = memo(({ children }: PropsType) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = useCallback(() => setOpen(false), [])

  const [packName, setPackName] = useState('')
  const setNewPackName = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }
  const addPackHandler = () => {
    dispatch(addPackTC({ cardsPack: { name: packName, private: isPrivate } }))
    setOpen(false)
  }

  const [isPrivate, setIsPrivate] = useState(false)
  const setChecked = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.target.checked)
  }

  return (
    <>
      <div className={s.iconButton} onClick={handleOpen}>
        {children}
      </div>
      <BasicModal title={'Add new pack'} open={open} handleClose={handleClose}>
        {/*<ClassicTextInput label={'Pack Name'} placeholder={'Pack Name'} />*/}
        <FormControl fullWidth>
          <TextField
            className={s.container}
            fullWidth={true}
            size="small"
            variant="standard"
            label="Pack Name"
            value={packName}
            onChange={setNewPackName}
            placeholder={'Pack Name'}
          />
          <FormControlLabel
            className={s.container}
            control={<Checkbox checked={isPrivate} onChange={setChecked} />}
            label="Private pack"
          />
        </FormControl>
        <div className={s.buttonsContainer}>
          <ClassicButton title={'Cancel'} onClick={handleClose} color={'inherit'} />
          <ClassicButton title={'Save'} onClick={addPackHandler} />
        </div>
      </BasicModal>
    </>
  )
})
