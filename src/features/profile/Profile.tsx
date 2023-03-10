import React, { useCallback } from 'react'

import LogoutIcon from '@mui/icons-material/Logout'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { BackToPackList } from '../../common/components/BackToPackListButton/BackToPackList'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'

import { AvatarComponent } from './avatarComponent/AvatarComponent'
import { ProfileDataType } from './profile-api'
import { logoutTC, updateProfileDataTC } from './profile-reducer'
import s from './Profile.module.css'

const Profile = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector<ProfileDataType>(state => state.profile.user)

  const onChangeTextHandler = useCallback(
    (name: string) => {
      dispatch(updateProfileDataTC({ name }))
    },
    [dispatch]
  )

  const onclickHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <>
      <BackToPackList className={'marginLeft'} />
      <div className={s.profilePage}>
        <div className={s.profileContainer}>
          <h2 className={s.profileTitle}>Personal Information</h2>
          <AvatarComponent user={user} />
          <div className={s.name}>
            <EditableSpan value={user.name} onChange={onChangeTextHandler} />
          </div>
          <div className={s.email}>{user.email}</div>
          <ClassicButton title={'Log out'} onClick={onclickHandler}>
            <LogoutIcon fontSize={'small'} />
          </ClassicButton>
        </div>
      </div>
    </>
  )
}

export default Profile
