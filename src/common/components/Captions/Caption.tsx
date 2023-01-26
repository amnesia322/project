import React, { memo, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

export const Caption = memo(({ name, callback }: CaptionPropsType) => {
  const [isArrowDown, setIsArrowDown] = useState(true)

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontFamily: 'Montserrat',
      color: '#000000',
    },
  }))

  const handler = () => {
    callback(name, isArrowDown)
    setIsArrowDown(!isArrowDown)
  }

  return (
    <StyledTableCell align="center" onClick={handler}>
      {name}{' '}
      <IconButton sx={{ padding: '.2rem' }} onClick={handler}>
        {isArrowDown ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
      </IconButton>{' '}
    </StyledTableCell>
  )
})

type CaptionPropsType = {
  name: string
  callback: (name: string, positionOfArrow: boolean) => void
}
