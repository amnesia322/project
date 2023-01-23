import React from 'react'

import { Button } from '@mui/material'

type ClassicButtonPropsType = {
  title: string
  children?: JSX.Element | JSX.Element[]
  onClick?: () => void
  sx?: { [key: string]: string }
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'

  disabled?: boolean
}

export const ClassicButton = (props: ClassicButtonPropsType) => {
  return (
    <Button
      type={'submit'}
      variant={'contained'}
      color={props.color}
      sx={{
        borderRadius: '30px',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '20px',
        textTransform: 'none',
        ...props.sx,
      }}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.title}
      {props.children}
    </Button>
  )
}
