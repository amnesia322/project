import React, { useEffect } from 'react'

import './App.css'
import { AppBar, CircularProgress, LinearProgress, Toolbar } from '@mui/material'

import Header from '../features/Header/Header'

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

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar></Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <Header />
      <Pages />
    </div>
  )
}

export default App
