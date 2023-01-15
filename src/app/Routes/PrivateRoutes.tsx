import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../store'

import { PATH } from './Pages'

export const PrivateRoutes = () => {
  const isLogged = useAppSelector(state => state.auth.isLogged)

  return isLogged ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
