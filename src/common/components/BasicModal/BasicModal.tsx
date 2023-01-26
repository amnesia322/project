import React, { memo, ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import s from '../BasicModal/BasicModal.module.css'

type PropsType = {
  title: string
  children?: ReactNode
  open: boolean
  handleClose: () => void
}

export const BasicModal = memo(({ children, title, open, handleClose }: PropsType) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box className={s.container}>
          <Typography id="transition-modal-title" variant="h6" component="h2" className={s.title}>
            {title}
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Typography>
          <Divider variant={'fullWidth'} sx={{ marginBottom: '22px' }} />
          {children}
        </Box>
      </Fade>
    </Modal>
  )
})
