import React, { useEffect, useState } from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import { Avatar, Button, Fab } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../app/store'
import avatarImg from '../../assets/img/avatar.png'
import SuperEditableSpan from '../../common/components/SuperEditableSpan/SuperEditableSpan'

import s from './Profile.module.css'
import { ProfileDataType } from './profileApi'
import {
  changeProfileNameTC,
  getProfileEmailTC,
  getProfileNameTC,
  loginTC,
  logoutTC,
} from './profileReducer'

const Profile = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector<ProfileDataType>(state => state.profile)

  useEffect(() => {
    const thunk1 = loginTC({
      email: 'valitvinoff@mail.ru',
      password: '12345678',
    })
    const thunk = getProfileEmailTC()
    const thunk3 = getProfileNameTC()

    dispatch(thunk1)
    dispatch(thunk)
    dispatch(thunk3)
  }, [])

  const [name, setName] = useState(user.name)
  // const [avatar, setAvatar] = useState<string | undefined>('')

  const onChangeNextHandler = (newName: string) => {
    setName(newName)
    dispatch(changeProfileNameTC({ name }))
  }

  const onclickHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <div className={s.profilePage}>
      <div className={s.profileContainer}>
        <h2 className={s.profileTitle}>Personal Information</h2>
        <div className={s.avatarContainer}>
          <Avatar
            alt="avatar"
            src={user.avatar ? user.avatar : avatarImg}
            sx={{ width: 96, height: 96 }}
          />
          <Fab size={'small'} sx={{ left: '-35px' }}>
            <PhotoCameraOutlinedIcon fontSize={'small'} />
          </Fab>
        </div>
        <div className={s.name}>
          <SuperEditableSpan value={user.name} onChangeText={onChangeNextHandler} />
        </div>
        <div>{user.email}</div>
        <Button
          color="primary"
          size="large"
          variant="outlined"
          sx={{
            borderRadius: '30px',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '20px',
            textTransform: 'none',
          }}
          onClick={onclickHandler}
        >
          <LogoutIcon fontSize={'small'} />
          Log out
        </Button>
      </div>
    </div>
  )
}

export default Profile
