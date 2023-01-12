import React from 'react'

import { Button } from '@mui/material'

type ClassicButtonPropsType = {
  title: string
  sx?: { [key: string]: string }
  onClick?: () => void
}

export const ClassicButton = (props: ClassicButtonPropsType) => {
  return (
    <Button
      type={'submit'}
      variant={'contained'}
      color={'primary'}
      sx={{
        borderRadius: '30px',
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '20px',
        textTransform: 'none',
        // backgroundColor: '#366eff',
        ...props.sx,
      }}
      onClick={props.onClick}
    >
      {props.title}
    </Button>
  )
}
