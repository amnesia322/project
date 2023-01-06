import React from 'react'

import './App.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import store from '../m2-bll/redux/store'

import Header from './Header/Header'

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="App">
          <Header />
          <h1>TEST</h1>
        </div>
      </Provider>
    </HashRouter>
  )
}

export default App
