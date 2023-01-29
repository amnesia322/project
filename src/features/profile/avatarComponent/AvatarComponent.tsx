import React, { ChangeEvent, memo, useEffect, useRef, useState } from 'react'

import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import { Avatar, Fab } from '@mui/material'

import { useAppDispatch } from '../../../app/store'
import { ProfileDataType } from '../profile-api'
import { updateProfileDataTC } from '../profile-reducer'
import s from '../Profile.module.css'

export const AvatarComponent = memo(({ user }: AvatarComponentType) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const [avatar, setAvatar] = useState<string>('')

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }
  //
  // useEffect(() => {
  //   dispatch(updateProfileDataTC({ avatar }))
  // }, [avatar])

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('file: ', file)

      if (file.size < 4000000) {
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onloadend = () => {
          const file64 = reader.result as string

          dispatch(updateProfileDataTC({ avatar: file64 }))
        }
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  return (
    <div className={s.avatarContainer}>
      <Avatar alt="avatar" src={user.avatar} sx={{ width: 96, height: 96, left: 17 }} />
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
