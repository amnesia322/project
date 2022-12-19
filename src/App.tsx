import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import Pages from "./Pages";

function App() {
  return (
      <HashRouter >
          <div className="App">
              <Pages/>
              <h1>TEST</h1>
          </div>
      </HashRouter>

  );
}

export default App;
