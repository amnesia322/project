import React, { ChangeEvent, memo, ReactNode, useCallback, useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'

import { useAppDispatch } from '../../../../../app/store'
import { BasicModal } from '../../../../../common/components/BasicModal/BasicModal'
import { ClassicButton } from '../../../../../common/components/ClassicButton/ClassicButton'
import { ClassicFileInput } from '../../../../../common/components/ClassicFileInput/ClassicFileInput'
import { editPackTC } from '../../../packs-reducer'

import s from './EditPackModal.module.css'

type PropsType = {
  children?: ReactNode
  packId: string
  packName?: string
  isPrivate?: boolean
  deckCover?: string
}
export const EditPackModal = memo(
  ({ children, packId, packName, isPrivate, deckCover }: PropsType) => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = useCallback(() => {
      setOpen(false)
      setTimeout(() => {
        setCover(deckCover)
      }, 500)
    }, [])

    const [newPackName, setNewPackName] = useState(packName)
    const changePackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewPackName(e.currentTarget.value)
    }
    const editPackHandler = () => {
      dispatch(
        editPackTC({
          cardsPack: { _id: packId, name: newPackName, private: packStatus, deckCover: cover },
        })
      )
      setOpen(false)
    }

    const [packStatus, setPackStatus] = useState(isPrivate)
    const changeCheckedHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setPackStatus(e.target.checked)
    }

    const [cover, setCover] = useState(deckCover)
    const changeCover = (file64: string) => {
      setCover(file64)
    }

    return (
      <>
        <div className={s.iconButton} onClick={handleOpen}>
          {children}
        </div>
        <BasicModal title={'Edit pack'} open={open} handleClose={handleClose}>
          <FormControl fullWidth>
            <ClassicFileInput changeCover={changeCover} cover={cover} title={'Cover'} />
            <TextField
              className={s.container}
              fullWidth={true}
              size="small"
              variant="standard"
              label="Pack Name"
              value={newPackName}
              onChange={changePackNameHandler}
              placeholder={'Pack Name'}
            />
            <FormControlLabel
              className={s.container}
              control={<Checkbox checked={packStatus} onChange={changeCheckedHandler} />}
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
  }
)
