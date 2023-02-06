import React from 'react'

import { Avatar } from '@mui/material'
import { NavLink } from 'react-router-dom'

import avatarImg from '../../assets/img/avatar.png'
import logo from '../../assets/svg/logo.svg'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'
import { PATH } from '../Routes/Pages'
import { useAppSelector } from '../store'

import s from './Header.module.css'

const Header = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLogged)
  const userName = useAppSelector(state => state.profile.user.name)
  const userAvatar = useAppSelector(state => state.profile.user.avatar)

  return (
    <div className={s.header}>
      <img src={logo} alt={'logo'} />
      {!isLoggedIn ? (
        <NavLink to={PATH.LOGIN} className={s.link}>
          <ClassicButton title="Sign In" />
        </NavLink>
      ) : (
        <NavLink to={PATH.PROFILE} className={s.userInfo}>
          <span className={s.userName}>{userName}</span>
          <Avatar alt="avatar" src={userAvatar ? userAvatar : avatarImg} />
        </NavLink>
      )}
    </div>
  )
}

export default Header
