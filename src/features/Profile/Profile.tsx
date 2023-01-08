import React, { useEffect, useState } from 'react'

import { Avatar } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../app/store'
import SuperEditableSpan from '../../common/components/SuperEditableSpan/SuperEditableSpan'

import { ProfileDataType } from './profileApi'
import { changeProfileNameTC, getProfileEmailTC } from './profileReducer'

const Profile = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector<ProfileDataType>(state => state.profile)

  useEffect(() => {
    const thunk = getProfileEmailTC()

    dispatch(thunk)
  }, [])

  const [name, setName] = useState(user.name)
  // const [avatar, setAvatar] = useState<string | undefined>('')

  const onChangeNextHandler = (newName: string) => {
    setName(newName)
    dispatch(changeProfileNameTC({ name }))
  }

  return (
    <div>
      Profile
      <div>Personal Information</div>
      <div>
        <Avatar />
      </div>
      <div>
        <SuperEditableSpan value={name} onChangeText={onChangeNextHandler} />
      </div>
      <div>{user.email}</div>
    </div>
  )
}

export default Profile
