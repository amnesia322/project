import React, { memo, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import IconButton from '@mui/material/IconButton'

import { StyledTableCell } from '../../utils/css/StyledTable'

export const Caption = memo(({ name, callback }: CaptionPropsType) => {
  const [isArrowDown, setIsArrowDown] = useState(true)

  const handler = () => {
    callback(name, isArrowDown)
    setIsArrowDown(!isArrowDown)
  }

  return (
    <StyledTableCell align="center" onClick={handler}>
      {name}{' '}
      {name === 'Question' || name === 'Answer' ? (
        ''
      ) : (
        <IconButton sx={{ padding: '.2rem' }} onClick={handler}>
          {isArrowDown ? <ArrowDropDownIcon color="action" /> : <ArrowDropUpIcon color="action" />}
        </IconButton>
      )}{' '}
    </StyledTableCell>
  )
})

type CaptionPropsType = {
  name: string
  callback: (name: string, positionOfArrow: boolean) => void
}
