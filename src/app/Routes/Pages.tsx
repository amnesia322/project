import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import { CheckEmail } from '../../features/auth/ForgotPassword/CheckEmail'
import { ForgotPassword } from '../../features/auth/ForgotPassword/ForgotPassword'
import NewPass from '../../features/auth/ForgotPassword/NewPass/NewPass'
import { Login } from '../../features/auth/Login/Login'
import { Register } from '../../features/auth/Register/Register'
import { Cards } from '../../features/packsList/cards/Cards'
import { PacksList } from '../../features/packsList/PacksList'
import Profile from '../../features/Profile/Profile'

import Error404 from './Error404/Error404'
import { PrivateRoutes } from './PrivateRoutes'

export const PATH = {
  LOGIN: '/Login',
  REGISTER: '/Register',
  PROFILE: '/profile',
  ERROR: '/error404',
  PASS_RECOVERY: '/forgot_password',
  NEW_PASS: '/new_pass/*',
  CHECK_EMAIL: '/check_email',
  PACK_LIST: '/packs_list',
  CARDS_LIST: '/cards_list',
}

function Pages() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate to={PATH.PROFILE} />} />
          <Route path={PATH.PROFILE} element={<Profile />} />
          <Route path={PATH.PACK_LIST} element={<PacksList />} />
          <Route path={PATH.CARDS_LIST} element={<Cards />} />
        </Route>
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.PASS_RECOVERY} element={<ForgotPassword />} />
        <Route path={PATH.NEW_PASS} element={<NewPass />}>
          <Route path=":token" element={<NewPass />} />
        </Route>
        <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
        <Route path={'*'} element={<Navigate to={PATH.ERROR} />} />
        <Route path={PATH.ERROR} element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default Pages
