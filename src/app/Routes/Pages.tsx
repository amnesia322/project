import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import Error404 from '../../features/Error404/Error404'
import { Login } from '../../features/login/Login'
import NewPass from '../../features/NewPass/NewPass'
import ForgotPassword from '../../features/PassRecovery/ForgotPassword'
import Profile from '../../features/Profile/Profile'
import { Register } from '../../features/register/Register'

export const PATH = {
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ERROR: '/error404',
  PASS_RECOVERY: '/forgot_password',
  NEW_PASS: '/new_pass',
}

function Pages() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to={PATH.PROFILE} />} />

        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.PASS_RECOVERY} element={<ForgotPassword />} />
        <Route path={PATH.NEW_PASS} element={<NewPass />} />
        <Route path={'*'} element={<Navigate to={PATH.ERROR} />} />

        <Route path={PATH.ERROR} element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default Pages
