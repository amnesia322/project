import React, { ChangeEvent, memo, useState } from 'react'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

import editIcon from '../../../assets/svg/edit.svg'

import s from './EditableSpan.module.css'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = memo(function (props: EditableSpanPropsType) {
  console.log('EditableSpan called')
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(props.value)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <div className={s.container}>
      {' '}
      <TextField
        variant="standard"
        label="Nickname"
        value={title}
        onChange={changeTitle}
        autoFocus
      />
      <Button variant="contained" size="small" onClick={activateViewMode}>
        Save
      </Button>
    </div>
  ) : (
    <div className={s.container}>
      <span>
        {props.value}
        <IconButton onClick={activateEditMode}>
          <img src={editIcon} />
        </IconButton>
      </span>
    </div>
  )
})
