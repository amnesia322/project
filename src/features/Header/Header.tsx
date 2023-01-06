import React from 'react'

import { NavLink } from 'react-router-dom'

import { PATH } from '../../app/Routes/Pages'

import s from './Header.module.css'

const Header = () => {
  return (
    <div className={s.header}>
      <NavLink to={PATH.PROFILE} className={s.link}>
        Profile
      </NavLink>
      <NavLink to={PATH.LOGIN} className={s.link}>
        Login
      </NavLink>
      <NavLink to={PATH.REGISTER} className={s.link}>
        Register
      </NavLink>
      <NavLink to={PATH.NEW_PASS} className={s.link}>
        New Pass
      </NavLink>
      <NavLink to={PATH.PASS_RECOVERY} className={s.link}>
        Pass Recovery
      </NavLink>
      <NavLink to={PATH.ERROR} className={s.link}>
        Error 404
      </NavLink>
    </div>
  )
}

export default Header
