import React from 'react'

import { Avatar } from '@mui/material'
import { NavLink } from 'react-router-dom'

import logo from '../../assets/svg/logo.svg'
import { ClassicButton } from '../../common/components/ClassicButton/ClassicButton'
import { PATH } from '../Routes/Pages'
import { useAppSelector } from '../store'

import s from './Header.module.css'

const Header = () => {
  const isLoggedIn = useAppSelector(state => state.login.isLogged)
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
          <Avatar alt="avatar" src={userAvatar} />
        </NavLink>
      )}
      {/*<NavLink to={PATH.PROFILE} className={s.link}>*/}
      {/*  Profile*/}
      {/*</NavLink>*/}
      {/*<NavLink to={PATH.LOGIN} className={s.link}>*/}
      {/*  Login*/}
      {/*</NavLink>*/}
      {/*<NavLink to={PATH.REGISTER} className={s.link}>*/}
      {/*  Register*/}
      {/*</NavLink>*/}
      {/*<NavLink to={PATH.NEW_PASS} className={s.link}>*/}
      {/*  New Pass*/}
      {/*</NavLink>*/}
      {/*<NavLink to={PATH.PASS_RECOVERY} className={s.link}>*/}
      {/*  Forgot Password*/}
      {/*</NavLink>*/}
      {/*<NavLink to={PATH.ERROR} className={s.link}>*/}
      {/*  Error 404*/}
      {/*</NavLink>*/}
    </div>
  )
}

export default Header
