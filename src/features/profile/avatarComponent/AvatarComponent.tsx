import React, { ChangeEvent, memo, useEffect, useRef, useState } from 'react'

import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import { Avatar, Fab } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import avatarImg from '../../../assets/img/avatar.png'
import { convertFileToBase64 } from '../../../common/utils/convertFileToBase64'
import { ProfileDataType } from '../profile-api'
import { updateProfileDataTC } from '../profile-reducer'
import s from '../Profile.module.css'

export const AvatarComponent = memo(({ user }: AvatarComponentType) => {
  const avatarFromState = useAppSelector(state => state.profile.user.avatar)
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const [avatar, setAvatar] = useState<string>(avatarFromState as string)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  //
  useEffect(() => {
    if (avatarFromState) {
      dispatch(updateProfileDataTC({ avatar }))
    }
  }, [avatar])

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, setAvatar)
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  return (
    <div className={s.avatarContainer}>
      <Avatar
        alt="avatar"
        src={user.avatar ? user.avatar : avatarImg}
        sx={{ width: 96, height: 96, left: 17 }}
      />
      <input
        type="file"
        name="myImage"
        accept="image/*"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={uploadHandler}
      />
      <Fab size={'small'} sx={{ left: '-17px' }} onClick={selectFileHandler}>
        <PhotoCameraOutlinedIcon fontSize={'small'} />
      </Fab>
    </div>
  )
})

type AvatarComponentType = {
  user: ProfileDataType
}
