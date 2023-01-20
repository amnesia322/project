import React, { useState } from 'react'

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import deleteIcon from '../../../../assets/svg/delete.svg'
import editIcon from '../../../../assets/svg/edit.svg'
import learnIcon from '../../../../assets/svg/leran.svg'
import s from '../myPackMenu/MyPackMenu.module.css'

type MyPackMenuPropsType = {
  onEditHandler: () => void
  onDeleteHandler: () => void
  onLearnHandler: () => void
}

export const MyPackMenu = ({
  onEditHandler,
  onDeleteHandler,
  onLearnHandler,
}: MyPackMenuPropsType) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={s.container}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertRoundedIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={onEditHandler} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <img src={editIcon} alt="edit" className={s.img} />
          Edit
        </MenuItem>
        <MenuItem onClick={onDeleteHandler} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <img src={deleteIcon} alt="delete" className={s.img} />
          Delete
        </MenuItem>
        <MenuItem onClick={onLearnHandler} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <img src={learnIcon} alt="learn" className={s.img} />
          Learn
        </MenuItem>
      </Menu>
    </div>
  )
}
