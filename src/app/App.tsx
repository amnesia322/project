import React from 'react'

import './App.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import Header from '../features/Header/Header'

import Pages from './Routes/Pages'
import { store } from './store'

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="App">
          <Header />
          <Pages />
        </div>
      </Provider>
    </HashRouter>
  )
}

export default App
