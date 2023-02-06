import React, { useEffect } from 'react'

import './App.css'
import { AppBar, CircularProgress, LinearProgress } from '@mui/material'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'

import { initializeAppTC, RequestStatusType } from './app-reducer'
import Header from './Header/Header'
import Pages from './Routes/Pages'
import { useAppDispatch, useAppSelector } from './store'

function App() {
  const dispatch = useAppDispatch()
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)

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
      <ErrorSnackbar />

      <AppBar position="static">
        <Header />
        <div style={{ height: '5px', backgroundColor: 'inherit' }}>
          {status === 'loading' && <LinearProgress />}
        </div>
      </AppBar>
      <Pages />
    </div>
  )
}

export default App
