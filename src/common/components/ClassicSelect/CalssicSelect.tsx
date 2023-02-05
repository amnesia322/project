import React from 'react'

import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import FormControl from '@mui/material/FormControl'

import s from '../ClassicSelect/ClassicSelect.module.css'

type PropsType = {
  value?: string
  title?: string
  handleChange: (value: any) => void
}

export const ClassicSelect = ({ value, title, handleChange }: PropsType) => {
  const onChangeHandler = (event: SelectChangeEvent) => {
    handleChange(event.target.value)
  }

  return (
    <FormControl fullWidth>
      <span className={s.title}>{title}</span>
      <Select value={value} onChange={onChangeHandler} size="small">
        <MenuItem value={'Text'}>Text</MenuItem>
        <MenuItem value={'Picture'}>Picture</MenuItem>
      </Select>
    </FormControl>
  )
}
