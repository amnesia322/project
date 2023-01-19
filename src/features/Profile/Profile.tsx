import React, { memo, useCallback, useEffect } from 'react'

import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import { Avatar, Fab } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { BackToPackList } from '../packsList/backToPackListButton/BackToPackList'

import { ProfileDataType } from './profile-api'
import { getProfileDataTC, logoutTC, updateProfileDataTC } from './profile-reducer'
import s from './Profile.module.css'

const Profile = memo(() => {
  const dispatch = useAppDispatch()
  const user = useAppSelector<ProfileDataType>(state => state.profile.user)
  const isLoggedIn = useAppSelector(state => state.auth.isLogged)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(getProfileDataTC())
  }, [])

  const onChangeTextHandler = useCallback(
    (name: string) => {
      dispatch(updateProfileDataTC({ name }))
    },
    [dispatch]
  )

  const onclickHandler = useCallback(() => {
    dispatch(logoutTC())
  }, [dispatch])

  return (
    <>
      <BackToPackList className={'marginLeft'} />
      <div className={s.profilePage}>
        <div className={s.profileContainer}>
          <h2 className={s.profileTitle}>Personal Information</h2>
          <div className={s.avatarContainer}>
            <Avatar alt="avatar" src={user.avatar} sx={{ width: 96, height: 96, left: 17 }} />
            <Fab size={'small'} sx={{ left: '-17px' }}>
              <PhotoCameraOutlinedIcon fontSize={'small'} />
            </Fab>
          </div>
          <div className={s.name}>
            <EditableSpan value={user.name} onChange={onChangeTextHandler} />
            <DriveFileRenameOutlineOutlinedIcon fontSize={'small'} sx={{ marginTop: '2px' }} />
          </div>
          <div className={s.email}>{user.email}</div>
          <ClassicButton title={'Log out'} onClick={onclickHandler}>
            <LogoutIcon fontSize={'small'} />
          </ClassicButton>
        </div>
      </div>
    </>
  )
})

export default Profile
