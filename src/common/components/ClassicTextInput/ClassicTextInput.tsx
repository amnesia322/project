import React, { ChangeEvent, useState } from 'react'

import TextField from '@mui/material/TextField'

import s from '../../../features/packsPage/packsList/packsModals/editPackModal/EditPackModal.module.css'

type PropsType = {
  label: string
  value?: string
  placeholder: string
}
export const ClassicTextInput = ({ label, value, placeholder }: PropsType) => {
  const [text, setText] = useState(value)
  const changeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }

  return (
    <TextField
      className={s.container}
      fullWidth={true}
      size="small"
      variant="standard"
      label={label}
      value={text}
      onChange={changeText}
      placeholder={placeholder}
    />
  )
}
