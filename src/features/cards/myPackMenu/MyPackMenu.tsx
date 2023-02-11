import React, { memo, useState } from 'react'

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import deleteIcon from '../../../assets/svg/delete.svg'
import editIcon from '../../../assets/svg/edit.svg'
import learnIcon from '../../../assets/svg/leran.svg'
import { DeletePackModal } from '../../packs/packsList/packsModals/deletePackModal/DeletePackModal'
import { EditPackModal } from '../../packs/packsList/packsModals/editPackModal/EditPackModal'

import s from './MyPackMenu.module.css'

type MyPackMenuPropsType = {
  onLearnHandler: () => void
  packId: string
  packName: string | undefined
  isPrivate: boolean
  totalCount: number
  deckCover: string
}

export const MyPackMenu = memo(
  ({ onLearnHandler, packId, packName, isPrivate, totalCount, deckCover }: MyPackMenuPropsType) => {
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
          // onClick={handleClose}
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
          <MenuItem>
            <EditPackModal
              packId={packId}
              packName={packName}
              isPrivate={isPrivate}
              deckCover={deckCover}
            >
              <img src={editIcon} alt="edit" className={s.img} />
              <span>Edit</span>
            </EditPackModal>
          </MenuItem>
          <MenuItem>
            <DeletePackModal packId={packId} packName={packName}>
              <img src={deleteIcon} alt="delete" className={s.img} />
              Delete
            </DeletePackModal>
          </MenuItem>
          <MenuItem onClick={onLearnHandler} disabled={!totalCount}>
            <img src={learnIcon} alt="learn" className={s.img} />
            Learn
          </MenuItem>
        </Menu>
      </div>
    )
  }
)
