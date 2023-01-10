import React, { useEffect } from 'react'

import './App.css'
import {
  AppBar,
  Button,
  CircularProgress,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import Header from '../features/Header/Header'
import { logoutTC } from '../features/Profile/profile-reducer'

import { initializeAppTC, RequestStatusType } from './app-reducer'
import Pages from './Routes/Pages'
import { useAppDispatch, useAppSelector } from './store'

function App() {
  const dispatch = useAppDispatch()
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
  const isLoggedIn = useAppSelector<boolean>(state => state.login.isLogged)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }
  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6"></Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <Header />
      <Pages />
    </div>
  )
}

export default App
