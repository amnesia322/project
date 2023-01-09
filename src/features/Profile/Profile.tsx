import React, { memo, useCallback, useEffect, useState } from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import { Avatar, Button, Fab } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { PATH } from '../../app/Routes/Pages'
import { useAppDispatch, useAppSelector } from '../../app/store'
import avatarImg from '../../assets/img/avatar.png'
import SuperEditableSpan from '../../common/components/SuperEditableSpan/SuperEditableSpan'

import s from './Profile.module.css'
import { ProfileDataType } from './profileApi'
import { getProfileDataTC, loginTC, logoutTC, updateProfileDataTC } from './profileReducer'

const Profile = memo(() => {
  const dispatch = useAppDispatch()
  const user = useAppSelector<ProfileDataType>(state => state.profile.user)

  useEffect(() => {
    const thunk1 = loginTC({
      email: 'valitvinoff@mail.ru',
      password: '12345678',
    })
    const thunk = getProfileDataTC()

    dispatch(thunk1)
    dispatch(thunk)
  }, [])

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [name, setName] = useState(user.name)
  const [avatar, setAvatar] = useState<string | undefined>(avatarImg)

  const onChangeTextHandler = useCallback(
    (newName: string) => {
      setName(newName)
      dispatch(updateProfileDataTC({ name }))
    },
    [dispatch]
  )

  const onclickHandler = useCallback(() => {
    dispatch(logoutTC())
    setIsLoggedIn(false)
  }, [dispatch])

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.profilePage}>
      <div className={s.profileContainer}>
        <h2 className={s.profileTitle}>Personal Information</h2>
        <div className={s.avatarContainer}>
          <Avatar alt="avatar" src={avatar} sx={{ width: 96, height: 96, left: 17 }} />
          <Fab size={'small'} sx={{ left: '-17px' }}>
            <PhotoCameraOutlinedIcon fontSize={'small'} />
          </Fab>
        </div>
        <div className={s.name}>
          <SuperEditableSpan value={user.name} onChangeText={onChangeTextHandler} />
        </div>
        <div className={s.email}>{user.email}</div>
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
})

export default Profile
